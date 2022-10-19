import instance from '@/api/instance';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';

interface GetPlaceByIdData {
  folders: FolderSliceFolderType[] & { places: SearchResultType[] };
  diaries: { did: number; title: string; date: string }[];
}

export const getPlaceById = async (pid: string) => {
  try {
    const { data } = await instance.get<GetPlaceByIdData>(`/api/place/${pid}`);
    console.log('??', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
