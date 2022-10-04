import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { getSearchDiaryBySearchWord, SearchedDiaryType } from '@/api/diary';

export interface SearchDiaryType {
  open: boolean;
  searchWord: string;
  searchOption: string;
  prevDate: Date;
  nextDate: Date;
  searchResults: SearchedDiaryType[] | undefined;
}

export interface SearchDiaryActionType {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  selectSearchOption: (e: string) => void;
  onToggleOpen: () => void;
  setSearchPrevDate: (date: Date, e: ChangeEvent<HTMLInputElement>) => void;
  setSearchNextDate: (date: Date, e: ChangeEvent<HTMLInputElement>) => void;
}

const useSearchDiary = (): [SearchDiaryType, SearchDiaryActionType] => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('all');

  const [prevDate, setPrevDate] = useState<Date>(new Date());
  const [nextDate, setNextDate] = useState<Date>(new Date());

  const [searchResults, setSearchResults] = useState<SearchedDiaryType[] | undefined>([]);

  useEffect(() => {
    if (prevDate > nextDate) {
      setNextDate(prevDate);
    }
  }, [nextDate, prevDate]);

  useQuery(
    ['searchResult', searchWord],
    () => {
      const formattedPrevDate = dayjs(prevDate).format('YYYY-MM-DD');
      const formattedNextDate = dayjs(nextDate).format('YYYY-MM-DD');

      return getSearchDiaryBySearchWord({
        nextDate: formattedNextDate,
        prevDate: formattedPrevDate,
        searchOption,
        searchWord,
      });
    },
    {
      onSuccess: (searchedData) => {
        setSearchResults(searchedData);
      },
    },
  );

  const actions: SearchDiaryActionType = {
    onSearch: useCallback(
      async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(value);
      },
      [searchWord],
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
  };

  return [{ open, searchWord, searchOption, prevDate, nextDate, searchResults }, actions];
};

export default useSearchDiary;
