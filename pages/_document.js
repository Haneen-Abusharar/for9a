import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>

          <link rel="preload" href='/cairo/Cairo-ExtraLight.ttf' as="font" crossOrigin="true" />
          <link rel="preload" href='/cairo/Cairo-Light.ttf' as="font" crossOrigin="true" />
          <link rel="preload" href='/cairo/Cairo-Regular.ttf' as="font" crossOrigin="true" />
          <link rel="preload" href='/cairo/Cairo-medium.ttf' as="font" crossOrigin="true" />
          <link rel="preload" href='/cairo/Cairo-SemiBold.ttf' as="font" crossOrigin="true" />
          <link rel="preload" href='/cairo/Cairo-Bold.ttf' as="font" crossOrigin="true"/>
          <link rel="preload" href='/cairo/Cairo-ExtraBold.ttf' as="font" crossOrigin="true" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument