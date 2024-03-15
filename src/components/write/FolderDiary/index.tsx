import React from 'react';

import { useAppSelector } from '@/store/index';
import SVGIcon from '@/components/shared/SVGIcon';
import FolderSelect from '@/components/write/FolderSelect';
import AdditinalInfo from '@/components/shared/AdditionalInfo';
import * as S from './FolderDiary.styled';

const FolderDiary = () => {
  const { places } = useAppSelector(({ diary }) => diary);

  return (
    <S.Container>
      <S.FolderContainer>
        <S.Title>
          <em>어디에 저장할까요?</em>
        </S.Title>
        <S.FolderTagArea>
          {places.map((place) => (
            <S.FolderArea key={place.address_name}>
              <S.TagBox>
                <SVGIcon icon='MapPinIcon' width='1rem' height='1rem' />
                <S.Tag>{place.place_name}</S.Tag>
              </S.TagBox>
              <S.FolderSelectArea>
                <FolderSelect place={place} right />
              </S.FolderSelectArea>
            </S.FolderArea>
          ))}
        </S.FolderTagArea>
      </S.FolderContainer>
      <S.AdditionalInfoContainer>
        <AdditinalInfo />
      </S.AdditionalInfoContainer>
    </S.Container>
  );
};

export default FolderDiary;
