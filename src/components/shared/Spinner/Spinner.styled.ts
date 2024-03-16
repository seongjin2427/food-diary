import styled from '@emotion/styled';

import { Spinner } from '@/styles/keyframes';
import { css } from '@emotion/react';

interface SpinnerProps {
  size: string;
  color: string;
  speed: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const SpinnerBody = styled.div<SpinnerProps>`
  ${({ size, color, speed }) => css`
    width: ${size};
    height: ${size};
    border-radius: 50%;
    background: ${color};
    animation: ${Spinner} ${speed}s infinite linear;
  `}
`;
