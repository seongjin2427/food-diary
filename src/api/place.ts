import instance from '@/api/instance';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';

interface GetPlaceByIdData {
  diaries: { did: number; title: string; date: string }[];
}

export const getPlaceById = async (pid: string) => {
  try {
    const { data } = await instance.get<GetPlaceByIdData>(`/api/place/${pid}`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateFolder = async (folders: FolderSliceFolderType[]) => {
  try {
    const { data } = await instance.post('/api/upload/update-folder', { folders });
  } catch (err) {
    console.log(err);
  }
};
