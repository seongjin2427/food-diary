import { PopUp } from '@/styles/keyframes';
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
`;

export const InfoDescriptionAreaInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 0.5rem;
  background: none;
  border: none;
  outline: none;
`;

export const InfoCostArea = styled.div`
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid black;
  border-radius: 0.25rem;
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

export const InfoMemoArea = styled.div`
  width: 100%;
`;

export const InfoTextarea = styled.textarea`
  width: calc(100% - 2.5rem);
  height: 6rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  line-height: 1.5;
  outline: none;
  resize: none;
`;
