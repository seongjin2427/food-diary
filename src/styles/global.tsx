import { css, Global } from '@emotion/react';
import reset from 'emotion-reset';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${reset}

        *, *::before, *::after {
          box-sizing: border-box;
        }

        body {
          font-family: 'Pretendard';
        }

        a {
          color: black;
          -webkit-tap-highlight-color: transparent;
        }

        @font-face {
          font-family: 'Pretendard';
          src: url('/fonts/Pretendard-Bold.otf') format('opentype'),
            url('/font/Pretendard-Bold.ttf') format('ttf');
          font-weight: 700;
          font-display: swap;
        }
        @font-face {
          font-family: 'Pretendard';
          src: url('/fonts/Pretendard-Regular.otf') format('opentype'),
            url('/font/Pretendard-Regular.ttf') format('ttf');
          font-weight: 400;
          font-display: swap;
        }
      `}
    />
  );
};

export default GlobalStyle;
