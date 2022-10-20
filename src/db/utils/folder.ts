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
        await user?.removePlace(d);
      });
      
      addArr.forEach(async (a) => {
        if (a.id) {
          const foundPlace = await findPlace(a.id);
          if (foundPlace) {
            await foundFolder?.addPlace(foundPlace);

            const userPlace = await user?.hasPlace(foundPlace);
            if (!userPlace) await user?.addPlace(foundPlace);
          } else {
            const createdPlace = await models.Place.create(a);
            await foundFolder?.addPlace(createdPlace);

            const userPlace = await user?.hasPlace(createdPlace);
            if (!userPlace) await user?.addPlace(createdPlace);
          }
        }
      });
    } else {
      places.forEach(async (p) => {
        const foundPlace = await findPlace(p.id);
        if (foundPlace) {
          await foundFolder?.addPlace(foundPlace);

          const userPlace = await user?.hasPlace(foundPlace);
          if (!userPlace) await user?.addPlace(foundPlace);
        } else {
          const createdPlace = await models.Place.create(p);
          await foundFolder?.addPlace(createdPlace);

          const userPlace = await user?.hasPlace(createdPlace);
          if (!userPlace) await user?.addPlace(createdPlace);
        }
      });
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
