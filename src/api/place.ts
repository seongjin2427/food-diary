import instance from '@/api/instance';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';

interface GetPlaceByIdData {
  diaries: { did: number; title: string; date: string }[];
}

export const getPlaceById = async (pid: string) => {
  try {
    const { data } = await instance.get<GetPlaceByIdData>(`/api/place/${pid}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPlace = async (place: SearchResultType) => {
  try {
    const { data } = await instance.post('/api/place/register', { place });
  } catch (err) {
    console.log(err);
  }
};

interface UpdateFolderProps {
  folders: FolderSliceFolderType[];
  id: string;
}

export const updateFolder = async ({ folders, id }: UpdateFolderProps) => {
  try {
    const { data } = await instance.post('/api/upload/update-folder', { folders, id });
  } catch (err) {
    console.log(err);
  }
};
