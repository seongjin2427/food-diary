import React from 'react';

import { SearchResultType } from '@/hooks/useSearchPlace';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './PlaceDetail.styled';
import PlaceMap from '@/components/shared/PlaceMap';

interface PlaceDetailProps {
  placeInformation: SearchResultType & {
    folder: FolderSliceFolderType[];
  };
}

const PlaceDetail = ({ placeInformation: pi }: PlaceDetailProps) => {
  return (
    <S.Container>
      <S.PlaceName>{pi.place_name}</S.PlaceName>
      <S.FolderIconList>
        {pi.folder.map(({ fid, icon, color }) => (
          <S.FolderIconItem key={fid} selectedColor={color}>
            <SVGIcon icon={icon} width='2rem' height='2rem' />
          </S.FolderIconItem>
        ))}
      </S.FolderIconList>
      <S.InformationBox>
        <S.InformationParagraph>{pi.address_name}</S.InformationParagraph>
        <S.InformationParagraph>{pi.category_name}</S.InformationParagraph>
        {/* <S.InformationParagraph>{pi.category_group_name}</S.InformationParagraph> */}
        <S.InformationParagraph>{pi.phone}</S.InformationParagraph>
        {/* <S.InformationParagraph>{pi.place_name}</S.InformationParagraph> */}
      </S.InformationBox>

      <PlaceMap x={pi.x} y={pi.y} />

      <S.InformationBox>
        <S.KakaoMapLink href={pi.place_url}>{pi.place_url}</S.KakaoMapLink>
        <S.Distance>거리 {+pi.distance / 1000}km</S.Distance>
      </S.InformationBox>
    </S.Container>
  );
};

export default PlaceDetail;
