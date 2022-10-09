import React, { useState, createContext } from "react";
import Head from "next/head";
import { ApolloProvider } from '@apollo/client';
import { useApollo } from "../utilities/client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '../components/layout/main';
import { ThemeProvider } from "../DarkModeContext";
import '../styles/globals.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export const ThemeContext = createContext(null);

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const queryClient = new QueryClient()
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }
 
    return (
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:site_name" content="FORSA" />
          <meta property="og:locale" content="ar_SA" />
          <meta property="og:url" content="https://www.for9a.com/learn" />
          <meta property="og:type" content="website" />
        </Head>
        <ThemeProvider>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </ThemeContext.Provider>
        </ThemeProvider>
      </ApolloProvider>
    )
}

export default MyApp;
