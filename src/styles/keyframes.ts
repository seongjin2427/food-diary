import { keyframes } from '@emotion/react';

export const PopUp = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Spinner = keyframes`
  0% {
      transform: rotate(0deg); border-radius: 50%; 
    }
  50% {
    transform: rotate(90deg); border-radius: 0%; 
  }
  100% {
    transform: rotate(180deg); border-radius: 50%; 
  }
`;
