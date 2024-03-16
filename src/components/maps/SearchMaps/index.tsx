import React, { useCallback } from 'react';

import useSearchMaps from '@/hooks/useSearchMaps';
import { toggleShowList } from '@/store/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import Map from '@/components/shared/Map';
import Spinner from '@/components/shared/Spinner';
import SVGIcon from '@/components/shared/SVGIcon';
import SearchInput from '@/components/shared/SearchInput';
import SearchResultMap from '@/components/maps/SearchResultMap';
import SearchFolderList from '@/components/maps/SearchFolderList';
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
          <SVGIcon
            onClick={convertShowList}
            icon={showList ? 'MapIcon' : 'FileListIcon'}
            width='2rem'
            height='2rem'
          />
        </S.SearchResultDisplayFilter>
      </S.SearchInputArea>
      <S.SearchResultArea>
        {states.isFetching || states.isFetchingSearchPlaceInFolder ? (
          <Spinner color='lightcoral' size='2rem' speed='1' />
        ) : (
          <>
            {!showList && <Map searchMapsStates={states} searchMapsActions={actions} />}
            <SearchFolderList searchMapsStates={states} searchMapsActions={actions} />
            <SearchResultMap
              searchMapsStates={states}
              searchMapsActions={actions}
              showList={showList}
            />
          </>
        )}
      </S.SearchResultArea>
    </S.Container>
  );
};

export default SearchMaps;
