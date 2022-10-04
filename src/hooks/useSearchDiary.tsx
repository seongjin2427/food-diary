import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import {
  getSearchDiaryBySearchWord,
  getSearchPlacesBySearchWord,
  SearchedDiaryType,
} from '@/api/diary';
import { SearchResultType } from '@/hooks/useSearchPlace';

export interface SearchDiaryType {
  open: boolean;
  searchWord: string;
  searchOption: string;
  prevDate: Date;
  nextDate: Date;
  searchDiaryResults: SearchedDiaryType[] | undefined;
  searchPlaceResults: SearchResultType[] | undefined;
  currentPlace: number;
}

export interface SearchDiaryActionType {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  selectSearchOption: (e: string) => void;
  onToggleOpen: () => void;
  setSearchPrevDate: (date: Date, e: ChangeEvent<HTMLInputElement>) => void;
  setSearchNextDate: (date: Date, e: ChangeEvent<HTMLInputElement>) => void;
  setPrevPlace: () => void;
  setNextPlace: () => void;
  changeCurrentPlace: (n: number) => void;
}

const useSearchDiary = (): [SearchDiaryType, SearchDiaryActionType] => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('all');

  const [prevDate, setPrevDate] = useState<Date>(new Date());
  const [nextDate, setNextDate] = useState<Date>(new Date());

  const [searchDiaryResults, setSearchDiaryResults] = useState<SearchedDiaryType[] | undefined>([]);

  const [currentPlace, setCurrentPlace] = useState<number>(0);
  const [searchPlaceResults, setSearchPlaceResults] = useState<SearchResultType[] | undefined>([]);

  const queryClient = new QueryClient();

  if (searchOption === 'all' || searchOption === 'diary') {
    useQuery(
      ['searchDiaryResult', searchWord],
      () => {
        const formattedPrevDate = dayjs(prevDate).format('YYYY-MM-DD');
        const formattedNextDate = dayjs(nextDate).format('YYYY-MM-DD');

        return getSearchDiaryBySearchWord({
          nextDate: formattedNextDate,
          prevDate: formattedPrevDate,
          searchWord,
        });
      },
      {
        refetchOnWindowFocus: false,
        onSuccess: (searchedData) => {
          setSearchDiaryResults(searchedData);
          queryClient.invalidateQueries();
        },
      },
    );
  }

  if (searchOption === 'map') {
    useQuery(
      ['searchPlaceResult', searchWord],
      () => {
        const formattedPrevDate = dayjs(prevDate).format('YYYY-MM-DD');
        const formattedNextDate = dayjs(nextDate).format('YYYY-MM-DD');

        return getSearchPlacesBySearchWord({
          nextDate: formattedNextDate,
          prevDate: formattedPrevDate,
          searchWord,
        });
      },
      {
        refetchOnWindowFocus: false,
        onSuccess: (searchedData) => {
          setSearchPlaceResults(searchedData);
          queryClient.invalidateQueries();
        },
      },
    );
  }

  useEffect(() => {
    if (prevDate > nextDate) {
      setNextDate(prevDate);
    }
  }, [nextDate, prevDate]);

  const actions: SearchDiaryActionType = {
    onSearch: useCallback(
      async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(value);
        setCurrentPlace(0);
      },
      [searchWord, currentPlace],
    ),
    selectSearchOption: useCallback(
      (select: string) => {
        setSearchOption(select);
        setOpen(false);
      },
      [open],
    ),
    onToggleOpen: useCallback(() => {
      setOpen(!open);
    }, [open]),
    setSearchPrevDate: useCallback(
      (date: Date) => {
        setPrevDate(date);
      },
      [prevDate, nextDate],
    ),
    setSearchNextDate: useCallback(
      (date: Date) => {
        setNextDate(date);
      },
      [prevDate, nextDate],
    ),
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
  };

  return [
    {
      open,
      searchWord,
      searchOption,
      prevDate,
      nextDate,
      searchDiaryResults,
      searchPlaceResults,
      currentPlace,
    },
    actions,
  ];
};

export default useSearchDiary;
