import React from 'react';

import { useAppSelector } from '@/store/index';
import SVGIcon from '@/components/shared/SVGIcon';
import FolderSelect from '@/components/shared/FolderSelect';
import AdditinalInfo from '@/components/shared/AdditionalInfo';
import * as S from './FolderDiary.styled';

const FolderDiary = () => {
  const { places } = useAppSelector(({ diary }) => diary);

  return (
    <S.Container>
      <S.FolderContainer>
        <S.Title>어디에 저장할까요?</S.Title>
        <S.FolderSelectArea>
          <FolderSelect />
        </S.FolderSelectArea>
        <S.TagContainer>
          {places.map(({ id, place_name }) => (
            <S.TagBox key={id}>
              <SVGIcon icon='MapPinIcon' width='1rem' height='1rem' />
              <S.Tag>{place_name}</S.Tag>
            </S.TagBox>
          ))}
        </S.TagContainer>
      </S.FolderContainer>
      <S.AdditionalInfoContainer>
        <AdditinalInfo />
      </S.AdditionalInfoContainer>
    </S.Container>
  );
};

export default FolderDiary;
