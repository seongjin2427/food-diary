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
  :last-child {
    margin-bottom: 1rem;
  }
`;

export const KakaoMapLink = styled.a`
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const Distance = styled.p``;
