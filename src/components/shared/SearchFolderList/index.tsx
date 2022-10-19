import React, { useCallback } from 'react';
import { SearchMapsActionType, SearchMapsType } from '@/hooks/useSearchMaps';

import useMakeFolder from '@/hooks/useMakeFolder';
import SVGIcon from '@/components/shared/SVGIcon';
import MakeFolder from '@/components/shared/MakeFolder';
import * as S from './SearchFolderList.styled';

interface SearchResultMapProps {
  searchMapsStates: SearchMapsType;
  searchMapsActions: SearchMapsActionType;
}

const SearchFolderList = ({ searchMapsStates, searchMapsActions }: SearchResultMapProps) => {
  const { currentFolder, folderResults } = searchMapsStates;
  const { changeCurrentFolder } = searchMapsActions;
  const [{ inputMode, newFolderTitle }, { setInputMode, onChangeNewTitle, onClickNewFolderInfo }] =
    useMakeFolder();

  const toggleNewFolder = useCallback(() => setInputMode(!inputMode), [inputMode]);

  const onClickChangeCurrentFolder = useCallback(
    (fid: number | undefined) => {
      if (fid) changeCurrentFolder(fid);
    },
    [folderResults],
  );

  return (
    <S.Container>
      <S.AddFolderButton>
        <SVGIcon icon='CirclePlusIcon' width='2rem' height='2rem' onClick={toggleNewFolder} />
        <S.Backdrop open={inputMode} onClick={toggleNewFolder} />
        <S.NewFolderList open={inputMode}>
          <MakeFolder
            newFolderTitle={newFolderTitle}
            onChangeNewTitle={onChangeNewTitle}
            onClickNewFolderInfo={onClickNewFolderInfo}
          />
        </S.NewFolderList>
      </S.AddFolderButton>
      <S.FolderIconList>
        {folderResults?.map(({ fid, icon, color }) => (
          <S.FolderIconItem
            key={fid}
            selectedColor={color}
            onClick={() => onClickChangeCurrentFolder(fid)}
          >
            <SVGIcon icon={icon} width='1.25rem' height='1.25rem' />
            {currentFolder === fid && (
              <S.CheckIcon>
                <SVGIcon icon='CheckIcon' width='1.75rem' height='1.75rem' />
              </S.CheckIcon>
            )}
          </S.FolderIconItem>
        ))}
      </S.FolderIconList>
    </S.Container>
  );
};

export default SearchFolderList;
