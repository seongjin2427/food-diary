import React from 'react';

import { SearchDiaryActionType, SearchDiaryType } from '@/hooks/useSearchDiary';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './SearchResultMap.styled';

interface SearchResultMapProps {
  searchDiaryStates: SearchDiaryType;
  searchDiaryActions: SearchDiaryActionType;
}

const SearchResultMap = ({ searchDiaryStates, searchDiaryActions }: SearchResultMapProps) => {
  const { searchPlaceResults, currentPlace } = searchDiaryStates;
  const { setNextPlace, setPrevPlace } = searchDiaryActions;

  return (
    <S.Container>
      {searchPlaceResults && searchPlaceResults.length > 0 && (
        <>
          <S.Slider>
            <S.ArrowButton onClick={setPrevPlace}>
              <SVGIcon icon='ChevronLeftIcon' width='1.5rem' />
            </S.ArrowButton>
            <S.SliderContainer>
              <S.SliderArea placeNumber={currentPlace}>
                {searchPlaceResults.map(
                  ({ id, category_group_name, address_name, place_name, phone, distance }, idx) => (
                    <S.PlaceContainer key={idx}>
                      <S.PlaceTitleBox>
                        <S.PlaceName>{place_name}</S.PlaceName>
                        <S.PlaceKind>{category_group_name}</S.PlaceKind>
                      </S.PlaceTitleBox>
                      <S.PlaceContentBox>
                        <S.PlaceAddress>{address_name}</S.PlaceAddress>
                        <S.PlacePhone>{phone}</S.PlacePhone>
                        <S.PlaceDistance>{+distance / 1000}km</S.PlaceDistance>
                      </S.PlaceContentBox>
                    </S.PlaceContainer>
                  ),
                )}
              </S.SliderArea>
            </S.SliderContainer>
            <S.ArrowButton onClick={setNextPlace}>
              <SVGIcon icon='ChevronRightIcon' width='1.5rem' />
            </S.ArrowButton>
          </S.Slider>
          <S.SliderPagination>
            {searchPlaceResults.map((_, idx) =>
              currentPlace === idx ? <S.FillCircle key={idx} /> : <S.BlankCircle key={idx} />,
            )}
          </S.SliderPagination>
        </>
      )}
      {searchPlaceResults && searchPlaceResults.length <= 0 && (
        <S.NoPlaces>검색된 장소가 없습니다</S.NoPlaces>
      )}
    </S.Container>
  );
};

export default SearchResultMap;
