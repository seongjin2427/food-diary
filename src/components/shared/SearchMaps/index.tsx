import React, { useCallback, useState } from 'react';

import useSearchMaps from '@/hooks/useSearchMaps';
import Map from '@/components/shared/Map';
import SVGIcon from '@/components/shared/SVGIcon';
import SearchInput from '@/components/shared/SearchInput';
import SearchResultMap from '@/components/shared/SearchResultMap';
import * as S from './SearchMaps.styled';
import SearchFolderList from '@/components/shared/SearchFolderList';

const SearchMaps = () => {
  const [states, actions] = useSearchMaps();
  const [showList, setShowList] = useState(false);

  const toggleShowList = useCallback(() => {
    setShowList(!showList);
  }, [showList]);

  return (
    <S.Container>
      <S.SearchInputArea>
        <SearchInput onSearch={actions.onSearch} searchMap />
        <S.SearchResultDisplayFilter>
          {showList ? (
            <SVGIcon onClick={toggleShowList} icon='MapIcon' width='2rem' height='2rem' />
          ) : (
            <SVGIcon onClick={toggleShowList} icon='FileListIcon' width='2rem' height='2rem' />
          )}
        </S.SearchResultDisplayFilter>
      </S.SearchInputArea>
      <S.SearchResultArea>
        <Map searchMapsStates={states} searchMapsActions={actions} />
        <SearchFolderList searchMapsStates={states} searchMapsActions={actions} />
        <SearchResultMap searchMapsStates={states} searchMapsActions={actions} />
      </S.SearchResultArea>
    </S.Container>
  );
};

export default SearchMaps;
