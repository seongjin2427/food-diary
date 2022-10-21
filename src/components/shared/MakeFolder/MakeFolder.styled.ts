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

  ::placeholder {
    color: ${({ theme }) => theme.color.black};
    opacity: 0.4;
  }
`;

export const NewFolderLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  :not(:first-child) {
    border-top: 0.5px solid #fff;
  }
`;

export const SelectButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 0.125rem;
  background: ${({ theme }) => theme.color.white};

  :disabled {
    opacity: 0.7;
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
