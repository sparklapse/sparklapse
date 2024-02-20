import { ApolloClient, InMemoryCache } from "@apollo/client/core";

export { gql } from "@apollo/client/core";
export const keystone = new ApolloClient({
  uri: "https://ks.sparklapse.com/api/graphql",
  cache: new InMemoryCache(),
});
