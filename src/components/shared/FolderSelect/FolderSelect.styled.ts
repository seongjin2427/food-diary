import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IconColorKeyType } from '@/styles/theme';

export const Container = styled.div`
  width: 12rem;
  position: relative;
`;

export const SelectTitle = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  background: none;
  padding: 0.5rem 1rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

interface SelectListUlProps {
  isOpen: boolean;
}

export const SelectListUl = styled.ul<SelectListUlProps>`
  display: none;
  width: 12rem;
  position: absolute;
  background: lightblue;
  top: 2.75rem;
  border-radius: 0.25rem;
  overflow: hidden;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}
`;

interface SelectListTitleProps {
  isPlus?: boolean;
}

export const SelectListLi = styled.li<SelectListTitleProps>`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  :not(:first-of-type) {
    border-top: 0.5px solid #fff;
  }

  :hover {
    background: lightskyblue;
  }

  ${({ isPlus }) =>
    isPlus &&
    css`
      color: grey;
      svg {
        fill: grey;
        color: grey;
      }
    `}
`;

export const SelectListTitle = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
`;

interface ColorProps {
  selectColor?: IconColorKeyType | undefined;
}

export const SelectListIcon = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.375rem;

  svg {
    fill: ${({ theme, selectColor = 'black' }) => selectColor && theme.iconColor[selectColor]};
  }
`;

export const NewFolderInput = styled.input`
  width: 100%;
  height: 1.25rem;
  background: none;
  padding: 0.25rem;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

export const NewFolderLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  border-top: 0.5px solid #fff;
`;

export const FolderIcon = styled.div``;

export const FolderColor = styled.div<ColorProps>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: ${({ theme, selectColor = 'black' }) => selectColor && theme.iconColor[selectColor]};
`;
