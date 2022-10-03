import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const SearchInputBox = styled.div`
  display: flex;
  width: 20rem;
  background: white;
  border: 1px solid black;
  font-size: 1.25rem;
  border-radius: 0.25rem;
`;

export const SelectSearchOption = styled.div``;

export const SearchInputSelectArea = styled.div`
  display: flex;
  justify-content: center;
  width: 5rem;
  position: relative;
  padding: 0.5rem;
  margin: 0.125rem;
  border-right: 1px solid black;
`;

interface OpenProps {
  isOpen: boolean;
}

export const SearchInputSelectUl = styled.ul<OpenProps>`
  display: none;
  align-items: center;
  flex-direction: column;
  width: 5.125rem;
  position: absolute;
  top: 2.5rem;
  left: -2px;
  background: white;
  border: 1px solid black;
  border-radius: 0 0 0.25rem 0.25rem;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: flex;
    `}
`;

export const SearchInputSelectLi = styled.li`
  width: 90%;
  padding: 0.75rem 0;
  text-align: center;

  :not(:first-of-type) {
    border-top: 1px solid black;
  }
`;

export const SearchInputArea = styled.div`
  flex: 1;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  font-size: 1.25rem;
  background: none;
  border: none;
  outline: none;
`;
