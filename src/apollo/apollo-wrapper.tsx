import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import {
  split,
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const urlHasura = import.meta.env.VITE_HASURA_LINK;
const hasuraKey = import.meta.env.VITE_HASURA_KEY;

const httpLink = new HttpLink({
  uri: urlHasura,
  fetchOptions: { cache: "no-store" },
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "x-hasura-admin-secret": hasuraKey,
    },
  });
  return forward(operation);
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: urlHasura.replace("http", "ws"),
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": hasuraKey,
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
