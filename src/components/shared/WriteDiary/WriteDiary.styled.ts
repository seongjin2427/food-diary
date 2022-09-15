import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 1rem 0.5rem;
`;

export const TagTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.25rem;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
`;

export const TagBox = styled.p`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: lightblue;
`;
