import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
