import instance from '@/api/instance';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';

interface ImageFileType {
  imageFile: {
    img_id: string;
    fileName: string;
    src: string;
  };
}

export const uploadImageFile = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('img', imageFile);
  try {
    const { data } = await instance.post<ImageFileType>(`/api/upload/addImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.imageFile;
  } catch (err) {
    console.log(err);
  }
};

interface uploadDiaryType {
  diary: IDiaryState;
  folders: FolderSliceFolderType[];
  additionalInfo: IAdditionalInfoState;
}

export const uploadDiary = async (sendData: uploadDiaryType) => {
  console.log(sendData);
  try {
    const { data } = await instance.post('/api/upload/diary', sendData);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addFolderApi = async (folder: FolderSliceFolderType) => {
  try {
    const { data } = await instance.post('/api/upload/folder', { folder });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

interface GetFolderApiType {
  folders: {
    fid: number;
    color: IconColorKeyType;
    icon: IconKeySet;
    places: SearchResultType[];
    title: string;
  }[];
}

export const getFolderApi = async (): Promise<FolderSliceFolderType[] | undefined> => {
  try {
    const { data } = await instance.get<GetFolderApiType>('/api/folder/get-folders');

    return data.folders;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
