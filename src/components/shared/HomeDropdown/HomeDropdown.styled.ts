import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

interface BackdropProps {
  toggle: boolean;
}

export const Backdrop = styled.div<BackdropProps>`
  display: none;
  position: fixed;
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

export const Selected = styled.div`
  display: flex;
  align-items: center;

  svg {
    :first-child {
      border: 1px solid black;
      padding: 0.125rem;
      border-radius: 0.25rem;
    }
  }
`;

interface OpenProps {
  isOpen: boolean;
}

export const DropdownList = styled.ul<OpenProps>`
  display: none;
  position: absolute;
  top: 2.5rem;
  z-index: 10;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}
`;

export const DropdownItem = styled.li`
  background: ${({ theme }) => theme.color.white};
  
  svg {
    border: 1px solid black;
    padding: 0.125rem;
    border-radius: 0.25rem;
  }
`;
