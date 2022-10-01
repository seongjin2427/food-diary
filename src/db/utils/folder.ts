import Folder from '@/db/models/folder.models';
import { IFolderState } from '@/store/diary/folderSlice';

export const updateFolder = async (folder: IFolderState) => {
  const { fid, places } = folder;
  try {
    const foundFolder = await Folder.findByPk(fid);
    await foundFolder?.update({ f_places: JSON.stringify(places) });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
