import styled from '@emotion/styled';

export const Container = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
`;

export const Description = styled.h1`
  font-size: 1.5rem;
  margin: 2rem 0;

  em {
    color: ${({ theme }) => theme.color.primary};
    font-weight: 800;
  }
`;

export const LoginButton = styled.button`
  background: none;
  border: none;
  outline: none;
`;

export const LoginButtonImage = styled.img``;
