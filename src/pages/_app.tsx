import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Cache, QueryInput, query } from "@urql/exchange-graphcache";
import theme from '../theme'
import { Query, MeDocument, LoginMutation, MeQuery, RegisterMutation, LogoutMutation } from '../generated/graphql';
function betterCacheUpdateQuery<Result,Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn:(r:Result,q:Query) => Query
){
  return cache.updateQuery(qi, (data)=> fn(result,data as any)as any );
}
const Client = createClient({
  url:'http://localhost:3100/graphql',
  fetchOptions:{
    credentials:'include',
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
  }),fetchExchange]
})
function MyApp({ Component, pageProps }) {
  return (
    <Provider value={Client}>
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider> */}
        <CSSReset />
        <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </ThemeProvider>
    </Provider>
  )
}

export default MyApp
