import styled from '@emotion/styled';

import { IconColorKeyType } from '@/styles/theme';

interface ColorProps {
  selectColor?: IconColorKeyType | undefined;
}

export const NewFolderInput = styled.input`
  width: 100%;
  height: 1.25rem;
  background: none;
  padding: 0.75rem 0.25rem;
  font-size: 1rem;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
`;

export const NewFolderLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-top: 0.5px solid #fff;
`;

export const SelectButton = styled.button`
  width: 3.5rem;
  background: white;
  margin-left: 0.5rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;

  :disabled {
    opacity: 0.8;
  }
`;

export const FolderIcon = styled.div`
  border-radius: 0.25rem;
  position: relative;
  svg {
    :nth-of-type(2) {
      background: rgba(120, 120, 120, 0.8);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

export const FolderColorArea = styled.div`
  border-radius: 0.25rem;
  position: relative;
  svg {
    :nth-of-type(1) {
      background: rgba(120, 120, 120, 0.8);
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 9999px;
    }
  }
`;

export const FolderColor = styled.div<ColorProps>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: ${({ theme, selectColor = 'black' }) => selectColor && theme.iconColor[selectColor]};
`;

export const SelectListIcon = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.375rem;

  svg {
    fill: ${({ theme, selectColor = 'black' }) => selectColor && theme.iconColor[selectColor]};
  }
`;
