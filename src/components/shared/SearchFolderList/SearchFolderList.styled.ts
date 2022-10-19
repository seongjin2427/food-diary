import { IconColorKeyType } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

export const AddFolderButton = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

interface NewFolderListProps {
  open: boolean;
}

export const NewFolderList = styled.ul<NewFolderListProps>`
  width: 12.5rem;
  display: none;
  background: lightcoral;
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  border-radius: 0.5rem;
  z-index: 10;
  ${({ open }) =>
    open &&
    css`
      display: block;
    `}
`;

export const Backdrop = styled.div<NewFolderListProps>`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  ${({ open }) =>
    open &&
    css`
      display: block;
    `};
`;

export const FolderIconList = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

export const FolderIconItem = styled.li<{ selectedColor: IconColorKeyType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  padding: 0.5rem;
  border-radius: 50%;
  position: relative;

  ${({ theme, selectedColor }) => css`
    svg {
      fill: ${theme.iconColor[selectedColor]};
    }
  `}
`;

export const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  svg {
    fill: #ffffff;
  }
`;
