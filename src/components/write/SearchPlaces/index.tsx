import React, { FormEvent, useRef } from 'react';

import Spinner from '@/components/shared/Spinner';
import SVGIcon from '@/components/shared/SVGIcon';
import { removePlaceInFolder } from '@/store/diary/folderSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { addPlace, removePlace, setDiaryByName } from '@/store/diary/diarySlice';
import useSearchPlace, { SearchResultType } from '@/hooks/useSearchPlace';
import * as S from './SearchPlaces.styled';

interface SearchPlacesProps {
  slug: string[];
}

const SearchPlaces = ({ slug }: SearchPlacesProps) => {
  const [day, month, year] = slug;
  const dispatch = useAppDispatch();
  const pickedPlaces = useAppSelector(({ diary }) => diary.places);

  const [isFetching, searchedPlaces, { search }] = useSearchPlace();
  const searchWordRef = useRef<HTMLInputElement>(null);

  const submitHandleForSearchPlaces = (e: FormEvent) => {
    e.preventDefault();
    if (searchWordRef.current && searchWordRef.current.value !== '') {
      const searchWord = searchWordRef.current.value;

      search(searchWord);
      searchWordRef.current.value = '';
    }
  };

  const handleClickPickPlace = (place: SearchResultType) => {
    const value = `${year}-${month}-${day}`;
    dispatch(addPlace(place));
    dispatch(setDiaryByName({ name: 'date', value }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClickRemovePlace = (place: SearchResultType) => {
    dispatch(removePlace(place));
    dispatch(removePlaceInFolder(place.id));
  };

  return (
    <S.Container>
      <S.LetMeknowThePlaceTitle>
        <em>
          {year}년 {month}월 {day}일
        </em>
        에 <br />
        <em>방문하신 장소</em>를 알려주세요!
      </S.LetMeknowThePlaceTitle>

      <S.PlaceTags>
        {pickedPlaces.length > 0 &&
          pickedPlaces.map((place) => (
            <S.PlaceTag key={place.address_name}>
              <SVGIcon icon='XMark' width='1rem' onClick={() => handleClickRemovePlace(place)} />
              <S.Tag>{place.place_name}</S.Tag>
            </S.PlaceTag>
          ))}
      </S.PlaceTags>

      <S.WriteDiarySearchPlaceForm onSubmit={submitHandleForSearchPlaces}>
        <S.WriteDiarySearchPlaceInput ref={searchWordRef} />
        <SVGIcon icon='SearchIcon' width='2rem' onClick={submitHandleForSearchPlaces} />
      </S.WriteDiarySearchPlaceForm>

      {isFetching ? (
        <S.PlaceContainer>
          <Spinner color='lightcoral' size='2rem' speed='1' />
        </S.PlaceContainer>
      ) : (
        <S.PlaceContainer>
          {searchedPlaces?.map((val) => (
            <S.PlaceBox key={val.id} onClick={() => handleClickPickPlace(val)}>
              <S.PlaceName>{val.place_name}</S.PlaceName>
              <S.PlaceAddress>{val.address_name}</S.PlaceAddress>
            </S.PlaceBox>
          ))}
          {searchedPlaces && searchedPlaces?.length === 0 && (
            <S.PlaceBox>
              <S.NoPlaces>검색 결과가 없습니다.</S.NoPlaces>
            </S.PlaceBox>
          )}
        </S.PlaceContainer>
      )}
      <S.MorePlacesButton id='place_more_button'>더 보기</S.MorePlacesButton>
    </S.Container>
  );
};

export default SearchPlaces;
