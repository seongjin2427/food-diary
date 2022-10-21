import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 1rem 0.5rem;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;

  em {
    border-bottom: 5px solid ${({ theme }) => theme.color.primary};
  }
`;

export const FolderContainer = styled.div`
  padding: 0.75rem;
  padding-bottom: 2rem;
`;

export const FolderSelectArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FolderTagArea = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FolderArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TagBox = styled.div`
  width: fit-content;
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.color.third};
  border-radius: 9999px;
`;

export const Tag = styled.div`
  max-width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AdditionalInfoContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
  border-top: 1px solid black;
`;
