import { dedupExchange, fetchExchange } from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import { betterCacheUpdateQuery } from "./betterCacheUpdateQuery"
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from "../generated/graphql"

export const createUrqlClient = (ssrExchange: any) =>({
    url:'http://localhost:3100/graphql',
    fetchOptions:{
      credentials:'include' as const,
    },
    exchanges:[dedupExchange,cacheExchange({
      updates:{
        Mutation:{
          logout:(_result,args,cache,info)=>{
            betterCacheUpdateQuery<LogoutMutation,MeQuery>(cache,{query:MeDocument},_result,()=>{
              return ({me:null})
            })
          },
          login:(_result,args,cache,info)=>{
            betterCacheUpdateQuery<LoginMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
              if(result.login.errors){
                return query
              }else {
                return {
                  me:result.login.user
                }
              }
            })
          },
          register:(_result,args,cache,info)=>{
            betterCacheUpdateQuery<RegisterMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
              if(result.register.errors){
                return query
              }else {
                return {
                  me:result.register.user
                }
              }
            })
          }
        }
      }
    }),
    ssrExchange
    ,fetchExchange]
});