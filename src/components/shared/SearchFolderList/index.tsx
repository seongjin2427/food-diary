import React, { useCallback } from 'react';
import { SearchMapsActionType, SearchMapsType } from '@/hooks/useSearchMaps';

import useMakeFolder from '@/hooks/useMakeFolder';
import SVGIcon from '@/components/shared/SVGIcon';
import MakeFolder from '@/components/shared/MakeFolder';
import RemoveWindow from '@/components/shared/RemoveWindow';
import * as S from './SearchFolderList.styled';

interface SearchResultMapProps {
  searchMapsStates: SearchMapsType;
  searchMapsActions: SearchMapsActionType;
}

const SearchFolderList = ({ searchMapsStates, searchMapsActions }: SearchResultMapProps) => {
  const { currentFolder, folderResults } = searchMapsStates;
  const { changeCurrentFolder } = searchMapsActions;
  const [
    { inputMode, newFolderTitle },
    { setInputMode, setNewFolderTitle, onChangeNewTitle, onClickNewFolderInfo },
  ] = useMakeFolder();

  const toggleNewFolder = () => setInputMode(true);

  const closeBackdrop = () => {
    setInputMode(false);
    setNewFolderTitle('');
  };

  const onClickChangeCurrentFolder = useCallback(
    (idx: number) => {
      changeCurrentFolder(idx);
    },
    [folderResults],
  );

  return (
    <S.Container>
      <S.AddFolderButton>
        <SVGIcon icon='CirclePlusIcon' width='2rem' height='2rem' onClick={toggleNewFolder} />
        <S.Backdrop open={inputMode} onClick={closeBackdrop} />
        <S.NewFolderList open={inputMode}>
          <MakeFolder
            newFolderTitle={newFolderTitle}
            onChangeNewTitle={onChangeNewTitle}
            onClickNewFolderInfo={onClickNewFolderInfo}
          />
        </S.NewFolderList>
      </S.AddFolderButton>
      <S.FolderIconList>
        {folderResults?.map((folder, idx) => (
          <RemoveWindow
            key={folder.fid}
            folder={folder}
            idx={idx}
            currentFolder={currentFolder}
            fn={onClickChangeCurrentFolder}
          />
        ))}
      </S.FolderIconList>
    </S.Container>
  );
};

export default SearchFolderList;
