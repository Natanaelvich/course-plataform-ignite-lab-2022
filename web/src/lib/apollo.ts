// import { ApolloClient, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
// import { GetServerSidePropsContext } from "next";

import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";

// export type ApolloClientContext = GetServerSidePropsContext;

// export function getApolloClient(
//     ctx?: ApolloClientContext,
//     ssrCache?: NormalizedCacheObject
//   ) {
//     const httpLink = createHttpLink({
//       uri: 'http://localhost:3000/api',
//       fetch,
//     })

//     const cache = new InMemoryCache().restore(ssrCache ?? {})
const httpLink = createHttpLink({
  uri: "http://localhost:3335/graphql",
  fetch,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache,
});

export {apolloClient}
//   }
