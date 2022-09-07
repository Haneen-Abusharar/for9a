
import Head from "next/head";
import { ApolloProvider } from '@apollo/client';
import { useApollo } from "../utilities/client"
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../components/layout/main';
import { ThemeProvider } from "../DarkModeContext";
import '../styles/globals.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


const MyApp = ({ Component, pageProps }) => {

  const apolloClient = useApollo(pageProps.initialApolloState);
  const queryClient = new QueryClient()
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
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp;
