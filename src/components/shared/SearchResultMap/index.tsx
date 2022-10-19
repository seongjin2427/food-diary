import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { SearchMapsActionType, SearchMapsType } from '@/hooks/useSearchMaps';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './SearchResultMap.styled';
import { useAppDispatch } from '@/store/index';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { setPlace } from '@/store/place/placeSlice';

interface SearchResultMapProps {
  searchMapsStates: SearchMapsType;
  searchMapsActions: SearchMapsActionType;
  showList?: boolean;
}

const SearchResultMap = ({
  showList,
  searchMapsStates,
  searchMapsActions,
}: SearchResultMapProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchPlaceResults, currentPlace, folderResults } = searchMapsStates;
  const { setNextPlace, setPrevPlace } = searchMapsActions;

  const [placeWidth, setPlaceWidth] = useState<number>(0);

  useEffect(() => {
    setPlaceWidth(window.innerWidth);
  }, []);

  const moveToPlacePageByPid = useCallback((place: SearchResultType) => {
    dispatch(setPlace(place));
    router.push(`/place`);
  }, []);

  return (
    <S.Container>
      {!showList && searchPlaceResults && searchPlaceResults.length > 0 && (
        <>
          <S.Slider>
            <S.ArrowButton onClick={setPrevPlace}>
              <SVGIcon icon='ChevronLeftIcon' width='1.5rem' />
            </S.ArrowButton>
            <S.SliderContainer>
              <S.SliderArea placeNumber={currentPlace}>
                {searchPlaceResults.map((place, idx) => (
                  <S.PlaceContainer
                    key={idx}
                    placeWidth={placeWidth}
                    onClick={() => moveToPlacePageByPid(place)}
                  >
                    <S.PlaceTitleBox>
                      <S.PlaceName>{place.place_name}</S.PlaceName>
                      <S.PlaceKind>
                        {folderResults?.map(
                          ({ fid, icon, color, places }) =>
                            places.find((p) => p.id === place.id) && (
                              <S.FolderIcon key={fid} selectedColor={color}>
                                <SVGIcon icon={icon} width='1.25rem' height='1.25rem' />
                              </S.FolderIcon>
                            ),
                        )}
                      </S.PlaceKind>
                    </S.PlaceTitleBox>
                    <S.PlaceContentBox>
                      <S.PlaceAddress>{place.address_name}</S.PlaceAddress>
                      <S.PlacePhone>{place.phone}</S.PlacePhone>
                      <S.PlaceDistance>{+place.distance / 1000}km</S.PlaceDistance>
                    </S.PlaceContentBox>
                  </S.PlaceContainer>
                ))}
              </S.SliderArea>
            </S.SliderContainer>
            <S.ArrowButton onClick={setNextPlace}>
              <SVGIcon icon='ChevronRightIcon' width='1.5rem' />
            </S.ArrowButton>
          </S.Slider>
          <S.SliderPagination>
            {searchPlaceResults.map((_, idx) => {
              if (idx < 10)
                return currentPlace === idx ? (
                  <S.FillCircle key={idx} />
                ) : (
                  <S.BlankCircle key={idx} />
                );
            })}
          </S.SliderPagination>
        </>
      )}
      {showList && (
        <>
          {searchPlaceResults &&
            searchPlaceResults.map((place, idx) => (
              <S.PlaceListContainer key={idx}>
                <S.PlaceTitleBox>
                  <S.PlaceName>{place.place_name}</S.PlaceName>
                  <S.PlaceKind>
                    {folderResults?.map(
                      ({ fid, icon, color, places }) =>
                        places.find((p) => p.id === place.id) && (
                          <S.FolderIcon key={fid} selectedColor={color}>
                            <SVGIcon icon={icon} width='1.25rem' height='1.25rem' />
                          </S.FolderIcon>
                        ),
                    )}
                  </S.PlaceKind>
                </S.PlaceTitleBox>
                <S.PlaceContentBox>
                  <S.PlaceAddress>{place.address_name}</S.PlaceAddress>
                  <S.PlacePhone>{place.phone}</S.PlacePhone>
                  <S.PlaceDistance>{+place.distance / 1000}km</S.PlaceDistance>
                </S.PlaceContentBox>
              </S.PlaceListContainer>
            ))}
        </>
      )}
      {searchPlaceResults && searchPlaceResults.length <= 0 && (
        <S.NoPlaces>검색된 장소가 없습니다</S.NoPlaces>
      )}
    </S.Container>
  );
};

export default SearchResultMap;
