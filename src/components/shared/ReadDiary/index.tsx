import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@/store/index';
import { setPlace } from '@/store/place/placeSlice';
import { SearchResultType } from '@/hooks/useSearchPlace';
import Editor from '@/components/shared/Editor';
import SVGIcon from '@/components/shared/SVGIcon';
import AdditinalInfo from '@/components/shared/AdditionalInfo';
import * as S from './ReadDiary.styled';

const ReadDiary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { places, title } = useAppSelector(({ diary }) => diary);

  const movePlacePage = (place: SearchResultType) => {
    dispatch(setPlace(place));
    router.push(`/place`);
  };

  return (
    <S.Container>
      <S.TagTitle>
        <SVGIcon icon='RoadMapIcon' width='1.5rem' height='1.5rem' />
        저장된 위치
      </S.TagTitle>
      <S.TagContainer>
        {places.map((p) => (
          <S.TagBox key={p.address_name} onClick={() => movePlacePage(p)}>
            <SVGIcon icon='MapPinIcon' width='1rem' height='1rem' />
            <S.Tag>{p.place_name}</S.Tag>
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
