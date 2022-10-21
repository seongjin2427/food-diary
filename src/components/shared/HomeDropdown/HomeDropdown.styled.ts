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
    :first-of-type {
      border: 1px solid black;
      padding: 0.25rem;
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
  top: 2.75rem;
  z-index: 10;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}
`;

export const DropdownItem = styled.li`
  svg {
    background: ${({ theme }) => theme.color.white};
    padding: 0.25rem;
    border: 1px solid ${({ theme }) => theme.color.black};
    border-radius: 0.25rem;
  }
`;
