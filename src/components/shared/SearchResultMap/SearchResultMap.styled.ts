import { IconColorKeyType } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div``;

export const Slider = styled.div`
  display: flex;
`;

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

interface SliderAreaProps {
  placeNumber: number;
}

export const SliderArea = styled.div<SliderAreaProps>`
  display: flex;

  ${({ placeNumber }) => css`
    transition: all 0.5s;
    margin-left: ${placeNumber * -100}%;
  `}
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  outline: none;
`;

export const PlaceListContainer = styled.div`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  margin: 0.5rem 0;
  border-radius: 0.5rem;
`;

interface PlaceContainerProps {
  placeWidth: number;
}

export const PlaceContainer = styled.div<PlaceContainerProps>`
  ${({ placeWidth }) => css`
    width: calc(${placeWidth}px - 7rem);
  `}
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.black};
  margin: 0 0.5rem;
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

export const SliderPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
  gap: 0.5rem;
`;

export const BlankCircle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 50%;
`;

export const FillCircle = styled(BlankCircle)`
  background: ${({ theme }) => theme.color.primary};
`;

export const NoPlaces = styled.div``;
