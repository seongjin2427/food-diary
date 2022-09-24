import React, { useContext, ChangeEvent } from 'react';

import { EditorContext } from '@/components/shared/Editor/context/editorContext';
import { useAppSelector } from '@/store/index';
import Editor from '@/components/shared/Editor';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './WriteDiary.styled';

const WriteDiary = () => {
  const currentPost = useAppSelector(({ diary }) => diary.post);
  const { places } = currentPost;
  const { title, setTitle } = useContext(EditorContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target?.value);
  };

  return (
    <S.Container>
      <S.TagContainer>
        {places.map((place) => (
          <S.TagBox key={place.id}>
            <SVGIcon icon='MapPinIcon' width='1rem' height='1rem' />
            <S.Tag>{place.place_name}</S.Tag>
          </S.TagBox>
        ))}
      </S.TagContainer>
      <S.DiaryTitle placeholder='제목을 입력해주세요' value={title} onChange={onChange} />
      <Editor />
    </S.Container>
  );
};

export default React.memo(WriteDiary);
