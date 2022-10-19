import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';

import useSearchPlace, { SearchResultType } from '@/hooks/useSearchPlace';
import { useAppSelector } from '@/store/index';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import { getSearchPlacesBySearchWord } from '@/api/diary';

export interface SearchMapsType {
  currentPlace: number;
  currentFolder: number | undefined;
  searchPlaceResults: SearchResultType[] | undefined;
  folderResults: FolderSliceFolderType[] | undefined;
}

export interface SearchMapsActionType {
  setPrevPlace: () => void;
  setNextPlace: () => void;
  changeCurrentPlace: (n: number) => void;
  changeCurrentFolder: (n: number) => void;
  onSetSearchPlacesResults: (p: SearchResultType[]) => void;
}

const useSearchMaps = (): [SearchMapsType, SearchMapsActionType] => {
  const { searchWord, searchOption } = useAppSelector(({ search }) => search);

  const [currentPlace, setCurrentPlace] = useState<number>(0);
  const [searchPlaceResults, setSearchPlaceResults] = useState<SearchResultType[] | undefined>([]);

  const [currentFolder, setCurrentFolder] = useState<number>();
  const [folderResults, setFolderResults] = useState<FolderSliceFolderType[] | undefined>([]);

  const [searchedPlaces, , { search }] = useSearchPlace();

  useQuery(['searchPlaceResult', searchWord], () => getSearchPlacesBySearchWord(searchWord), {
    refetchOnWindowFocus: false,
    onSuccess: (searchedData) => {
      console.log('gg', searchedData);
      if (searchOption === 'folder') {
        setSearchPlaceResults(searchedData?.places);
      }
      setFolderResults(searchedData?.folder);
    },
  });

  useEffect(() => {
    if (searchWord && searchOption === 'map') search(searchWord);
    setCurrentFolder(undefined);
    setCurrentPlace(0);
  }, [searchWord]);

  useEffect(() => {
    setSearchPlaceResults(searchedPlaces);
  }, [searchedPlaces]);

  const actions: SearchMapsActionType = {
    setPrevPlace: useCallback(() => {
      if (currentPlace > 0) {
        setCurrentPlace((prev) => prev - 1);
      }
    }, [searchPlaceResults, currentPlace]),
    setNextPlace: useCallback(() => {
      if (searchPlaceResults) {
        if (currentPlace < searchPlaceResults.length - 1) {
          setCurrentPlace((prev) => prev + 1);
        }
      }
    }, [searchPlaceResults, currentPlace]),
    changeCurrentPlace: useCallback((position: number) => {
      setCurrentPlace(position);
    }, []),
    changeCurrentFolder: useCallback(
      (n: number) => {
        setCurrentPlace(0);
        setCurrentFolder(n);

        if (folderResults && folderResults.length > 0) {
          const places = folderResults[n].places;
          setSearchPlaceResults(places);
        }
      },
      [folderResults],
    ),
    onSetSearchPlacesResults: useCallback((places: SearchResultType[]) => {
      setSearchPlaceResults(places);
    }, []),
  };

  return [
    {
      currentPlace,
      currentFolder,
      searchPlaceResults,
      folderResults,
    },
    actions,
  ];
};

export default useSearchMaps;
