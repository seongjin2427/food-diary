import styled from '@emotion/styled';

import { Spinner } from '@/styles/keyframes';
import { css } from '@emotion/react';

interface SpinnerProps {
  size: string;
  color: string;
  speed: string;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinnerBody = styled.div<SpinnerProps>`
  ${({ size, color, speed }) => css`
    width: ${size};
    height: ${size};
    border-radius: 50%;
    margin: 3em;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    background: ${color};
    animation: ${Spinner} ${speed}s infinite linear;
  `}
`;
