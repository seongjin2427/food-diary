import styled from '@emotion/styled';
import { css } from '@emotion/react';

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
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
