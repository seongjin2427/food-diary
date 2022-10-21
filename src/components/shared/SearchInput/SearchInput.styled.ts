import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 100%;
  background: white;
  border-bottom: 5px solid ${({ theme }) => theme.color.primary};
  font-size: 1.25rem;
`;

interface BackdropProps {
  toggle: boolean;
}

export const Backdrop = styled.div<BackdropProps>`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `}
`;

export const SelectSearchOption = styled.div``;

export const SearchInputSelectArea = styled.div`
  display: flex;
  justify-content: center;
  width: 5rem;
  position: relative;
  padding: 0.5rem;
  margin: 0.125rem;
  border: 1px solid black;
  border-radius: 0.25rem;
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
  top: 2.75rem;
  left: -2px;
  background: white;
  border: 1px solid black;
  border-radius: 0.25rem;
  z-index: 10;

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
  display: flex;
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

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
`;
