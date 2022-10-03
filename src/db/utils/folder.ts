import models from '@/db/index';
import { findPlace } from '@/db/utils/place';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';

export const saveFolder = async (folderArr: FolderSliceFolderType[]) => {
  const resultArr = await Promise.all(folderArr.map((f) => updateFolder(f)));
  const result = resultArr.every((r) => r);

  return result;
};

export const updateFolder = async (folder: FolderSliceFolderType) => {
  const { fid, places } = folder;
  try {
    const foundFolder = await models.Folder.findByPk(fid);
    if (foundFolder) {
      places.forEach(async ({ id }) => {
        const foundPlace = await findPlace(id);
        if (foundPlace) {
          const existedPlace = await foundFolder.hasPlace(foundPlace);
          if (!existedPlace) {
            await foundFolder.addPlace(foundPlace);
          }
        }
      });
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
