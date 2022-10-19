import { IconColorKeyType } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 1rem 1.5rem;
`;

export const PlaceName = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  word-break: keep-all;
  line-height: 120%;
`;

export const FolderIconList = styled.ul`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

interface FolderIconItemProps {
  selectedColor: IconColorKeyType;
}

export const FolderIconItem = styled.li<FolderIconItemProps>`
  ${({ theme, selectedColor }) => css`
    svg {
      fill: ${theme.iconColor[selectedColor]};
    }
  `}
`;

export const InformationBox = styled.div``;

export const InformationParagraph = styled.p`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  word-break: keep-all;
  line-height: 120%;

  :last-child {
    margin-bottom: 1rem;
  }
`;

export const ArcodianBox = styled.div`
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

export const ArcodianTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  font-size: 1.375rem;
`;

interface ToggleProps {
  toggle: boolean;
}

export const VistiedList = styled.ul<ToggleProps>`
  display: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `}
`;

export const SmallText = styled.small`
  color: gray;
  font-size: 0.75rem;
`;

export const VisitedItem = styled.li`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.25rem 0;
  border-bottom: 1px solid grey;

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const KakaoMapLink = styled.a`
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const Distance = styled.p``;
