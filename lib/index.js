import { useMemo } from "react";
import { ApolloClient,HttpLink,InMemoryCache } from "@apollo/client";
let uri ="https://simpuskesmasjungkat.online/graphql/";
let apolloClient;
function createApolloClient(){ 
  return new ApolloClient({
    ssrMode:typeof window=='undefined',
    link: new HttpLink({uri}),
    cache: new InMemoryCache
  })
}
export function initApollo(initialState=null ){
  const client = apolloClient || createApolloClient();
  if(initialState){
    client.cache.restore({
       ...client.extract(),
       ...initialState
    })
  } 
  if(typeof window == 'undefined'){
    return client;
  }
  if(!apolloClient){
    apolloClient = client;
  }
  return client;
}
export function useApollo(initialState){ 
    return useMemo(()=>initApollo(initialState),[initialState]);
}
