import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

export const Selected = styled.div`
  display: flex;
  align-items: center;
`;

interface OpenProps {
  isOpen: boolean;
}

export const DropdownList = styled.ul<OpenProps>`
  display: none;
  position: absolute;

  top: 2.5rem;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}
`;

export const DropdownItem = styled.li``;
