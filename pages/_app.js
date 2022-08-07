
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import '../styles/globals.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Layout from '../components/layout/main';

import { ThemeProvider, ThemeContext } from "../DarkModeContext";

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <title>Learn</title>
        <meta name="description"
          content="تحتوي بوابة تعلم على " />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" /> 
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" /> 
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      </Head>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp;
