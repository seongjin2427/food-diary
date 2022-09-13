import Head from 'next/head';
import type { AppProps } from 'next/app';

import GlobalStyle from '@/styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
