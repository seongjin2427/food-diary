import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 1rem 0.5rem;
`;

export const TagTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 1.75em;
  margin-bottom: 0.75rem;

  svg {
    margin-right: 0.25rem;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.25rem;
`;

export const TagBox = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: lightblue;
`;

export const Tag = styled.p``;

export const DiaryTitle = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1.375rem;
  border: none;
  border-bottom: 1px solid black;

  :focus {
    outline: none;
  }
`;
