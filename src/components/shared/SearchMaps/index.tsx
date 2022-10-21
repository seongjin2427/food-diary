import React, { useCallback } from 'react';

import useSearchMaps from '@/hooks/useSearchMaps';
import { toggleShowList } from '@/store/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import Map from '@/components/shared/Map';
import SVGIcon from '@/components/shared/SVGIcon';
import SearchInput from '@/components/shared/SearchInput';
import SearchResultMap from '@/components/shared/SearchResultMap';
import SearchFolderList from '@/components/shared/SearchFolderList';
import * as S from './SearchMaps.styled';

const SearchMaps = () => {
  const dispatch = useAppDispatch();
  const { showList } = useAppSelector(({ search }) => search);
  const [states, actions] = useSearchMaps();

  const convertShowList = useCallback(() => {
    dispatch(toggleShowList());
  }, [showList]);

  return (
    <S.Container>
      <S.SearchInputArea>
        <SearchInput searchMap />
        <S.SearchResultDisplayFilter>
          {showList ? (
            <SVGIcon onClick={convertShowList} icon='MapIcon' width='2rem' height='2rem' />
          ) : (
            <SVGIcon onClick={convertShowList} icon='FileListIcon' width='2rem' height='2rem' />
          )}
        </S.SearchResultDisplayFilter>
      </S.SearchInputArea>
      <S.SearchResultArea>
        {!showList && <Map searchMapsStates={states} searchMapsActions={actions} />}
        <SearchFolderList searchMapsStates={states} searchMapsActions={actions} />
        <SearchResultMap
          searchMapsStates={states}
          searchMapsActions={actions}
          showList={showList}
        />
      </S.SearchResultArea>
    </S.Container>
  );
};

export default SearchMaps;
