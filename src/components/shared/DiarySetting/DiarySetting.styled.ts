import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div`
  padding: 0 1rem;
`;

export const Card = styled.div`
  padding: 0 1.25rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid black;
`;

export const CardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 2rem 0;
`;

export const CardContentContainer = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
`;

export const CardSubject = styled.p`
  width: 7rem;
`;

export const CardContent = styled.p``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

interface ButtonProps {
  withDraw?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 1rem 2rem;
  background: white;
  border: none;
  outline: none;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 0.5rem;
  color: red;

  ${({ theme, withDraw }) =>
    withDraw &&
    css`
      background: ${theme.color.primary};
      color: white;
    `}
`;
