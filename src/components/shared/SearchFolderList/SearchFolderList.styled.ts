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
`;

export const FolderIconList = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

export const FolderIconItem = styled.li<{ selectedColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ selectedColor }) => css`
    svg {
      fill: ${selectedColor};
    }
  `}
`;
