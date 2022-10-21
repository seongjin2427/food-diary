import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IconColorKeyType } from '@/styles/theme';

export const FolderIconItem = styled.li<{ selectedColor: IconColorKeyType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  position: relative;

  ${({ theme, selectedColor }) => css`
    svg {
      fill: ${theme.iconColor[selectedColor]};
    }
  `}
`;

export const Backdrop = styled.div<SmallModalProps>`
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

interface SmallModalProps {
  open: boolean;
}

export const SmallModalWrapper = styled.div<SmallModalProps>`
  display: none;
  position: absolute;
  padding: 1rem;
  left: 0.5rem;
  top: -3rem;
  z-index: 10;

  ${({ open }) =>
    open &&
    css`
      display: block;
    `}
`;

export const SmallModal = styled.div`
  width: 7.5rem;
  border-radius: 0.25rem;
  padding: 0.75rem;
  font-size: 1.25rem;
  background: lightcoral;
  text-align: center;
`;
