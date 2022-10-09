import instance from '@/api/instance';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';

export const getDiaryByMonth = async (date: string) => {
  const { data } = await instance.get(`/api/diary/month/${date}`);
  console.log(data);
  return data;
};

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

export interface FetchedPlacesType {
  pid: number;
  id: string;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface GetFolderApiType {
  folders: {
    fid: number;
    color: IconColorKeyType;
    icon: IconKeySet;
    places: FetchedPlacesType[];
    title: string;
  }[];
}

export const getFolderApi = async (): Promise<FolderSliceFolderType[] | undefined> => {
  try {
    const {
      data: { folders },
    } = await instance.get<GetFolderApiType>('/api/folder/get-folders');

    return folders;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

interface SearchOptionsType {
  searchWord: string;
  prevDate: Date;
  nextDate: Date;
}

export interface SearchedDiaryType {
  did: number;
  title: string;
  date: string;
  content: string;
  thumbnail: string;
}

export interface SearchedDiaryApiType {
  results: SearchedDiaryType[];
}

export const getSearchDiaryBySearchWord = async (searchOptions: SearchOptionsType) => {
  const { nextDate, prevDate, searchWord } = searchOptions;
  try {
    let results: SearchedDiaryType[] = [];
    if (searchWord) {
      const { data } = await instance.get<SearchedDiaryApiType>(
        `/api/search/diary?searchWord=${searchWord}&prevDate=${prevDate}&nextDate=${nextDate}`,
      );
      results = data.results;
    }
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

export interface SearchedPlaceApiType {
  results: SearchResultType[];
}

export const getSearchPlacesBySearchWord = async (searchOptions: SearchOptionsType) => {
  const { nextDate, prevDate, searchWord } = searchOptions;
  try {
    let results: SearchResultType[] = [];
    if (searchWord) {
      const { data } = await instance.get<SearchedPlaceApiType>(
        `/api/search/place?searchWord=${searchWord}&prevDate=${prevDate}&nextDate=${nextDate}`,
      );
      results = data.results;
    }
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

export interface GetDiaryType {
  diary: (IDiaryState & IAdditionalInfoState)[];
}

export const getDiaryByDid = async (did: string) => {
  try {
    const { data } = await instance.get<GetDiaryType>(`/api/diary/${did}`);
    console.log(data);
    return data.diary[0];
  } catch (err) {
    console.log(err);
  }
};
