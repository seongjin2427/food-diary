import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IconColorKeyType } from '@/styles/theme';

interface IsOpenProps {
  isOpen: boolean;
}

export const Container = styled.div`
  width: 100%;
  margin-left: 0.5rem;
`;

export const Backdrop = styled.div<IsOpenProps>`
  display: none;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}
`;

export const SelectContainer = styled.div`
  width: 2.25rem;
  position: relative;
  background: white;
`;

export const SelectButton = styled.button<IsOpenProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.25rem;

  ${({ theme, isOpen }) =>
    isOpen &&
    css`
      background: ${theme.color.third};
    `}
`;

interface SelectListTitleProps {
  isPlus?: boolean;
}

export const SelectListUl = styled.ul<IsOpenProps & { right?: boolean }>`
  display: none;
  width: 12rem;
  height: 20rem;
  position: absolute;
  background: ${({ theme }) => theme.color.third};
  top: 2.25rem;
  border-radius: 0.25rem;
  overflow: scroll;
  z-index: 10;

  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}

  ${({ right }) =>
    right
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
`;

export const SelectListLi = styled.li<SelectListTitleProps>`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0.75rem 0.75rem 0.5rem;

  :not(:first-of-type) {
    border-top: 0.5px solid #fff;
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
  margin: 0 0.375rem;

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

export const FolderIcon = styled.div`
  padding: 0.25rem;
`;

export const FolderColor = styled.div<ColorProps>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: ${({ theme, selectColor = 'black' }) => selectColor && theme.iconColor[selectColor]};
`;
