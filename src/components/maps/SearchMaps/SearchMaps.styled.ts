import { PopUp } from '@/styles/keyframes';
import styled from '@emotion/styled';

export const Container = styled.div`
  animation: ${PopUp} 0.5s ease-in-out;
`;

export const SearchInputArea = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const SearchResultDisplayFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
`;

export const SearchResultArea = styled.div``;
