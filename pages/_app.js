
import Head from "next/head";
import { ApolloProvider } from '@apollo/client';
import { useApollo } from "../utilities/client";
import Layout from '../components/layout/main';
import { ThemeProvider } from "../DarkModeContext";
import '../styles/globals.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


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
