
import Head from "next/head";
import * as ReactDOM from 'react-dom/client';
import { config } from "@fortawesome/fontawesome-svg-core";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import '../styles/globals.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Layout from '../components/layout/main';
import { ThemeProvider } from "../DarkModeContext";

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => {

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
  const client = new ApolloClient({
    uri: 'https://lara.for9a.com/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(
      {typePolicies: {
        Query: {
          savedLearn: {
            savedLearn: {
              read(existing, { args: { first=12, page=1 }}) {
                // A read function should always return undefined if existing is
                // undefined. Returning undefined signals that the field is
                // missing from the cache, which instructs Apollo Client to
                // fetch its value from your GraphQL server.
                return existing && existing.slice(first, first + page);
              },
    
              // The keyArgs list and merge function are the same as above.
              keyArgs: [],
              merge(existing, incoming, { args: { first =12 }}) {
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
      
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Learn</title>
        <meta name="description"
          content="تحتوي بوابة تعلم على " />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp;
