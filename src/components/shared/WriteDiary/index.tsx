import React, { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/index';
import { setDiaryByName } from '@/store/diary/diarySlice';
import Editor from '@/components/shared/Editor';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './WriteDiary.styled';

const WriteDiary = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { places, title } = state.diary;

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDiaryByName({ name: 'title', value }));
  };

  return (
    <S.Container>
      <S.TagTitle>
        <SVGIcon icon='RoadMapIcon' width='1.5rem' height='1.5rem' />
        <em>추가된 위치</em>
      </S.TagTitle>
      <S.TagContainer>
        {places.map((place) => (
          <S.TagBox key={place.address_name}>
            <SVGIcon icon='MapPinIcon' width='1rem' height='1rem' />
            <S.Tag>{place.place_name}</S.Tag>
          </S.TagBox>
        ))}
      </S.TagContainer>
      <S.DiaryTitle placeholder='제목을 입력해주세요' value={title} onChange={onChange} />
      <Editor editable={true} />
    </S.Container>
  );
};

export default React.memo(WriteDiary);
