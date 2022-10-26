import { useState, useRef, RefObject } from 'react';

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

const useSearchPlace = (): [
  SearchResultType[] | undefined,
  RefObject<string[]>,
  SearchPlaceActions,
] => {
  const [searchedPlaces, setSearchedPlaces] = useState<SearchResultType[]>([]);
  const searchHistoryRef = useRef<string[]>([]);

  const search = async (searchWord: string) => {
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
            searchHistoryRef.current.push(searchWord);
            const prevSearchWord = searchHistoryRef.current[0];
            if (prevSearchWord === searchWord) {
              setSearchedPlaces((prev) => [...prev, ...data]);
            } else {
              setSearchedPlaces(data);
            }
          } else if (status === 'ZERO_RESULT') {
            setSearchedPlaces([]);
          }

          // 검색 기록 2칸 유지
          if (searchHistoryRef.current.length > 1) {
            searchHistoryRef.current.shift();
          }

          // 다음 버튼 눌렀을 때, 다음 목록 불러오기
          const nextBtn = document.getElementById('place_next_button') as HTMLButtonElement;
          if (!nextBtn) return;
          if (!pagination.hasNextPage) {
            nextBtn.style.display = 'none';
          } else {
            nextBtn.style.display = 'block';
            nextBtn.onclick = () => {
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

  return [searchedPlaces, searchHistoryRef, actions];
};

export default useSearchPlace;
