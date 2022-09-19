import Head from 'next/head';
import type { AppProps } from 'next/app';

import GlobalStyle from '@/styles/global';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import EditorProvider from '@/components/shared/Editor/context/editorContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
        <script
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JAVASCRIPT_KEY}&libraries=services,clusterer,drawing`}
        ></script>
      </Head>
      <Provider store={store}>
        <EditorProvider>
          <Component {...pageProps} />
        </EditorProvider>
      </Provider>
    </>
  );
}

export default MyApp;
