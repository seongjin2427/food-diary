import Head from 'next/head';
import { useState } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import { store } from '@/store/index';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
          <script
            type='text/javascript'
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JAVASCRIPT_KEY}&libraries=services,clusterer,drawing`}
          ></script>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
