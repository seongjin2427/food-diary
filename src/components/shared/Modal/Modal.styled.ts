import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FadeIn } from '../../../styles/keyframes';

export const BlackBackground = styled.div<{ modal: boolean }>`
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);

  ${({ modal }) =>
    modal &&
    css`
      display: block;
    `}
`;

export const Container = styled.div`
  width: 90%;
  height: 90%;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  animation: ${FadeIn} 0.5s ease-in-out;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ModalBody = styled.div``;
