import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client"
import { SchemaLink } from '@apollo/client/link/schema';
import merge from "deepmerge";

let apolloClient;

function createIsomorphLink() {
    if (typeof window === "undefined") {
        const { SchemaLink } = require("@apollo/client/link/schema");
        //const { schema } = require("./schema");
        return new SchemaLink({ schema });
    } else {
        const { HttpLink } = require("@apollo/client/link/http");
        return new HttpLink({
            uri: "/api/graphql",
            credentials: "same-origin",
        });
    }
}

function createApolloClient() {
    const authLink = setContext((_, { headers }) => {

          return {
            headers: {
              ...headers,
              'authentication': 'i0qvLgN2AfwTgajvdOcB7m1IHEoKu7ou'
      
            }
          }
        });
    const httpLink = createHttpLink({
        uri: 'https://lara.for9a.com/graphql',
    });
    return new ApolloClient({
        uri: 'https://lara.for9a.com/graphql',
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(
            {
                typePolicies: {
                    Query: {
                        savedLearn: {
                            savedLearn: {
                                read(existing, { args: { first = 12, page = 1 } }) {
                                    // A read function should always return undefined if existing is
                                    // undefined. Returning undefined signals that the field is
                                    // missing from the cache, which instructs Apollo Client to
                                    // fetch its value from your GraphQL server.
                                    return existing && existing.slice(first, first + page);
                                },

                                // The keyArgs list and merge function are the same as above.
                                keyArgs: [],
                                merge(existing, incoming, { args: { first = 12 } }) {
                                    const merged = existing ? existing.slice(0) : [];
                                    for (let i = 0; i < incoming.length; ++i) {
                                        merged[first + i] = incoming[i];
                                    }
                                },
                            }
                        }
                    }
                }
            }
        )
})
}

    export function initializeApollo(initialState = null) {
        const _apolloClient = apolloClient ?? createApolloClient();

        // If your page has Next.js data fetching methods that use Apollo Client, the initial state
        // get hydrated here
        if (initialState) {
            // Get existing cache, loaded during client side data fetching
            const existingCache = _apolloClient.extract();

            // Merge the existing cache into data passed from getStaticProps/getServerSideProps
            const data = merge(initialState, existingCache);

            // Restore the cache with the merged data
            _apolloClient.cache.restore(data);
        }
        // For SSG and SSR always create a new Apollo Client
        if (typeof window === "undefined") return _apolloClient;
        // Create the Apollo Client once in the client
        if (!apolloClient) apolloClient = _apolloClient;

        return _apolloClient;
    }

    export function useApollo(initialState) {
        const store = useMemo(() => initializeApollo(initialState), [initialState]);
        return store;
    }