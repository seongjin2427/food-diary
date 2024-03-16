import { useState } from 'react';

interface GeolocationType {
  coords: GeolocationCoordinates;
}

export interface SearchResultType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface SearchResultPaginationType {
  current: number;
  first: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (a: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  last: number;
  nextPage: () => void;
  perPage: number;
  prevPage: () => void;
  totalCount: number;
}

interface SearchPlaceActions {
  search: (s: string) => void;
}

const useSearchPlace = (): [boolean, SearchResultType[] | undefined, SearchPlaceActions] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [searchedPlaces, setSearchedPlaces] = useState<SearchResultType[]>([]);

  const search = async (searchWord: string) => {
    const moreButton = document.getElementById('place_more_button') as HTMLButtonElement;
    if (moreButton) {
      moreButton.style.display = 'none';
    }
    setIsFetching(true);

    navigator.geolocation.getCurrentPosition(({ coords }: GeolocationType) => {
      const kakao = window.kakao;
      const places = new kakao.maps.services.Places();

      places.keywordSearch(
        searchWord,
        (
          data: SearchResultType[],
          status: 'OK' | 'ZERO_RESULT',
          pagination: SearchResultPaginationType,
        ) => {
          if (status === kakao.maps.services.Status.OK) {
            setSearchedPlaces((prev) => {
              if (pagination.current === 1) return data;
              else return [...prev, ...data];
            });
          } else if (status === 'ZERO_RESULT') {
            setSearchedPlaces([]);
          }
          setIsFetching(false);

          // 다음 버튼 눌렀을 때, 다음 목록 불러오기
          if (!moreButton) return;
          if (!pagination.hasNextPage) {
            moreButton.style.display = 'none';
          } else {
            moreButton.style.display = 'block';
            moreButton.onclick = () => {
              if (pagination.hasNextPage) {
                pagination.nextPage();
              }
            };
          }
        },
        {
          category_group_code: 'FD6, CE7',
          radius: 20000,
          location: new kakao.maps.LatLng(coords.latitude, coords.longitude),
        },
      );
    });
  };

  const actions = {
    search,
  };

  return [isFetching, searchedPlaces, actions];
};

export default useSearchPlace;
