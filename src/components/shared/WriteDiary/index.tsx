import Editor from '@/components/shared/Editor';
import SVGIcon from '@/components/shared/SVGIcon';
import { useAppSelector } from '@/store/index';
import React from 'react';
import * as S from './WriteDiary.styled';

const WriteDiary = () => {
  const currentPost = useAppSelector(({ diary }) => diary.post);
  const { places } = currentPost;

  return (
    <S.Container>
      <S.TagTitle>
        <SVGIcon icon='MapPinIcon' width='2.5rem' height='2.5rem' />
        저장 장소
      </S.TagTitle>
      <S.TagContainer>
        {places.map((place) => (
          <S.TagBox key={place.id}>{place.place_name}</S.TagBox>
        ))}
      </S.TagContainer>
      <S.DiaryTitle />
      <Editor />
    </S.Container>
  );
};

export default WriteDiary;
