import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 1s ease-in-out;
`;

export const LeftButtonArea = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;

  svg {
    margin: 0.25rem;
  }
`;

interface ButtonDisabledProps {
  disabled?: boolean;
}

export const RightButtonArea = styled.div<ButtonDisabledProps>`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  svg {
    margin-left: 0.75rem;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: rgba(10, 10, 10, 0.3);
    `}
`;

export const ButtonSpan = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;
