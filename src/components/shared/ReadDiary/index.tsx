import React from 'react';

import { useAppSelector } from '@/store/index';
import Editor from '@/components/shared/Editor';
import SVGIcon from '@/components/shared/SVGIcon';
import AdditinalInfo from '@/components/shared/AdditionalInfo';
import * as S from './ReadDiary.styled';

const ReadDiary = () => {
  const state = useAppSelector((state) => state);
  const { places, title } = state.diary;

  return (
    <S.Container>
      <S.TagTitle>
        <SVGIcon icon='RoadMapIcon' width='1.5rem' height='1.5rem' />
        저장된 위치
      </S.TagTitle>
      <S.TagContainer>
        {places.map((place) => (
          <S.TagBox key={place.address_name}>
            <SVGIcon icon='MapPinIcon' width='1rem' height='1rem' />
            <S.Tag>{place.place_name}</S.Tag>
          </S.TagBox>
        ))}
      </S.TagContainer>
      <S.DiaryTitle>{title}</S.DiaryTitle>
      <Editor editable={false} />
      <AdditinalInfo readOnly />
    </S.Container>
  );
};

export default React.memo(ReadDiary);
