import { PopUp } from '@/styles/keyframes';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const InfoInputsArea = styled.div`
  width: calc(100% - 0.25rem);
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  animation: ${PopUp} 0.5s ease-in-out;
`;

export const InfoDescriptionArea = styled.div`
  background: white;
  border: 1px solid black;
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const InfoDescriptionAreaInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 0.5rem;
  background: none;
  border: none;
  outline: none;

  :read-only {
    color: #555;
    background: #eee;
  }
`;

interface ReadOnlyProps {
  readOnly?: boolean;
}

export const InfoCostArea = styled.div<ReadOnlyProps>`
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid black;
  border-radius: 0.25rem;

  ${({ readOnly }) =>
    readOnly &&
    css`
      background: #eee;
    `}
`;

export const InfoCostInput = styled.input`
  width: 3.5rem;
  height: 2rem;
  padding: 0 0 0 0.5rem;
  background: none;
  border: none;
  outline: none;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  :read-only {
    color: #555;
  }
`;

export const InfoCostWon = styled.p`
  margin-bottom: 0.125rem;
  padding-right: 0.5rem;
`;

export const IconArea = styled.div`
  width: 1.75rem;
  display: flex;
  align-items: center;
`;
