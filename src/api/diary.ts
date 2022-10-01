import instance from '@/api/instance';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IFolderState } from '@/store/diary/folderSlice';

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
  folder: IFolderState[];
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

export const addFolderApi = async (folder: IFolderState) => {
  try {
    const { data } = await instance.post('/api/upload/folder', { folder });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
