import React from 'react';
import { SearchMapsActionType, SearchMapsType } from '@/hooks/useSearchMaps';

import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './SearchFolderList.styled';

interface SearchResultMapProps {
  searchMapsStates: SearchMapsType;
  searchMapsActions: SearchMapsActionType;
}

const SearchFolderList = ({ searchMapsStates, searchMapsActions }: SearchResultMapProps) => {
  const { folderResults } = searchMapsStates;
  const { setNextPlace, setPrevPlace } = searchMapsActions;

  return (
    <S.Container>
      <S.AddFolderButton>
        <SVGIcon icon='CirclePlusIcon' width='2rem' height='2rem' />
      </S.AddFolderButton>
      <S.FolderIconList>
        {folderResults?.map(({ fid, icon, color }) => (
          <S.FolderIconItem key={fid} selectedColor={color}>
            <SVGIcon icon={icon} width='2rem' height='2rem' />
          </S.FolderIconItem>
        ))}
      </S.FolderIconList>
    </S.Container>
  );
};

export default SearchFolderList;
