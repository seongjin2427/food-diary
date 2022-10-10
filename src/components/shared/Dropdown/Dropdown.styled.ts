import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  position: relative;
`;

export const DropdownSelectItem = styled.div`
  display: flex;
  align-items: center;
`;

interface IsOpenProps {
  toggle?: boolean;
}

export const DropdownList = styled.ul<IsOpenProps>`
  display: none;
  background: white;
  padding: 0.5rem;
  position: absolute;
  top: 3rem;
  left: -0.5rem;
  border: 1px solid black;
  border-radius: 0.25rem;

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `}
`;

export const DropdownItem = styled.li``;
