import instance from '@/api/instance';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';

export const getPlaceById = async (pid: string) => {
  try {
    const { data } = await instance.get<{
      places: SearchResultType & { folder: FolderSliceFolderType[] };
    }>(`/api/place/${pid}`);
    console.log(data);
    return data.places;
  } catch (err) {
    console.log(err);
  }
};
