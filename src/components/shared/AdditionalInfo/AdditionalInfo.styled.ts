import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`;

export const Description = styled.h1`
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.5;
`;

export const InfoContainer = styled.div`
  width: 100%;
`;

export const InfoArea = styled.div`
  display: flex;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const InfoSubject = styled.p`
  width: 3rem;
  font-size: 1.125rem;
  margin-top: 0.375rem;
`;

export const InfoInputsContainer = styled.div`
  width: calc(100% - 3.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoMemoArea = styled.div`
  width: 100%;
`;

export const InfoTextarea = styled.textarea`
  width: calc(100% - 2.5rem);
  height: 6rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  resize: none;
  border: 1px solid black;
  border-radius: 0.25rem;
  line-height: 1.5;
  outline: none;

  :read-only {
    color: #555;
    background: #eee;
  }
`;
