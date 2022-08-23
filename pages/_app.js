
import Head from "next/head";
import * as ReactDOM from 'react-dom/client';
import { config } from "@fortawesome/fontawesome-svg-core";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { useApollo } from "../utilities/client";
import { initializeApollo } from "../utilities/client";
import { setContext } from '@apollo/client/link/context';
import '../styles/globals.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Layout from '../components/layout/main';
import { ThemeProvider } from "../DarkModeContext";

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => {

  const apolloClient = useApollo(pageProps.initialApolloState);
    
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Learn</title>
        <meta name="description"
          content="تحتوي بوابة تعلم على " />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
