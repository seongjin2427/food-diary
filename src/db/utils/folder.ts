import models from '@/db/index';
import Place from '@/db/models/place.model.';
import User from '@/db/models/user.model';
import { findPlace } from '@/db/utils/place';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';

export const saveFolder = async (folderArr: FolderSliceFolderType[]) => {
  const resultArr = await Promise.all(folderArr.map((f) => updateFolder(f)));
  const result = resultArr.every((r) => r);

  return result;
};

export const updateFolder = async (folder: FolderSliceFolderType, user?: User | null) => {
  const { fid, places } = folder;

  try {
    const foundFolder = await models.Folder.findByPk(fid);
    const foundFolderPlaces = await foundFolder?.getPlaces();

    if (foundFolderPlaces && foundFolderPlaces.length > 0) {
      const deleteArr: Place[] = [];
      foundFolderPlaces?.forEach((fp) => {
        const target = places.find((p) => p.id === fp.id);
        if (!target) deleteArr.push(fp);
      });

      const addArr: SearchResultType[] = [];
      places.forEach((p) => {
        const target = foundFolderPlaces?.find((fp) => fp.id === p.id);
        if (!target) addArr.push(p);
      });

      console.log('deleteArr', deleteArr);
      console.log('addArr', addArr);

      deleteArr.forEach(async (d) => {
        await foundFolder?.removePlace(d);
      });

      addArr.forEach(async (a) => {
        const foundPlace = await findPlace(a.id);
        if (foundPlace) await foundFolder?.addPlace(foundPlace);
      });
    } else {
      places.forEach(async (p) => {
        const foundPlace = await findPlace(p.id);
        if (foundPlace) await foundFolder?.addPlace(foundPlace);
      });
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
