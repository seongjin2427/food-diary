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
          src: url('/fonts/Pretendard-Bold.subset.woff') format('woff');
          font-weight: 700;
          font-display: swap;
        }
        @font-face {
          font-family: 'Pretendard';
          src: url('/fonts/Pretendard-Regular.subset.woff') format('woff');
          font-weight: 400;
          font-display: swap;
        }
      `}
    />
  );
};

export default GlobalStyle;
