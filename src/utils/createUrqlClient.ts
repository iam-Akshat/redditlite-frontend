import { dedupExchange, fetchExchange, stringifyVariables } from "urql"
import { cacheExchange, NullArray, Resolver, Variables } from "@urql/exchange-graphcache"
import { betterCacheUpdateQuery } from "./betterCacheUpdateQuery"
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from "../generated/graphql"
import { filter, pipe, tap } from 'wonka';
import { Exchange } from 'urql';
import Router from "next/router";
import { isTypeSystemDefinitionNode } from "graphql";
interface PaginationParams {
  cursorArgument?: string;

}
const cursorPagination = ({
   cursorArgument = 'cursor',
}: PaginationParams = {}): Resolver => {


  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    // console.log('entityKey',entityKey);
    // console.log('fieldName',fieldName);
    // console.log('cache',cache);
    // console.log('info',info);
    const allFields = cache.inspectFields(entityKey);
    //console.log("All fields",allFields);
   
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};





export const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      // If the OperationResult has an error send a request to sentry
      if (error) {
        if (error.message.includes('User not authenticated')) {
          Router.replace("/login")
        }
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:3100/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [dedupExchange, cacheExchange({
    resolvers:{
      Query:{
        posts:cursorPagination()
      }
    },
    updates: {
      Mutation: {
        createPost:(_result, args, cache, info) => {
          const allFields = cache.inspectFields("Query")
          const fieldInfos = allFields.filter((info) => info.fieldName==="posts")
          fieldInfos.forEach(fi => {
            cache.invalidate("Query","posts",fi.arguments || {})
          })
        },
        logout: (_result, args, cache, info) => {
          betterCacheUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => {
            return ({ me: null })
          })
        },
        login: (_result, args, cache, info) => {
          betterCacheUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
            if (result.login.errors) {
              return query
            } else {
              return {
                me: result.login.user
              }
            }
          })
        },
        register: (_result, args, cache, info) => {
          betterCacheUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
            if (result.register.errors) {
              return query
            } else {
              return {
                me: result.register.user
              }
            }
          })
        }
      }
    }
  }),
    ssrExchange,
    errorExchange
    , fetchExchange]
});