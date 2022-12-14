import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconColorKeyType } from '@/styles/theme';

export const Container = styled.div``;

export const ResultsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MoveButton = styled.button`
  width: 2rem;
  background: none;
  border: none;
`;

export const PlaceListContainer = styled.div`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  margin: 0.5rem 0;
  border-radius: 0.5rem;
`;

export const PlaceContainer = styled.div`
  height: 8rem;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 0.5rem;
`;

export const PlaceTitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

export const PlaceContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PlaceName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PlaceKind = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const FolderIcon = styled.div<{ selectedColor: IconColorKeyType }>`
  display: flex;
  align-items: center;
  ${({ theme, selectedColor }) => css`
    svg {
      fill: ${theme.iconColor[selectedColor]};
    }
  `}
`;
export const PlaceAddress = styled.p``;

export const PlacePhone = styled.p``;

export const PlaceDistance = styled.p``;

export const NoPlaces = styled.div``;
