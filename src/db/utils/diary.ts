import Diary from '@/db/models/diary.model';
import { updateFolder } from '@/db/utils/folder';
import { removeTempImage } from '@/db/utils/image';
import { getPlaceIds } from '@/db/utils/place';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IFolderState } from '@/store/diary/folderSlice';

export const saveDiary = async (diary: IDiaryState, additionalInfo: IAdditionalInfoState) => {
  const { thumbnail, title, content, date, images, places, tempImages } = diary;
  const { memo, menus } = additionalInfo;

  const imageIds = JSON.stringify(images.map(({ id }) => id));
  const placeIds = JSON.stringify(await Promise.all(places.map((p) => getPlaceIds(p))));

  const menusToString = JSON.stringify(menus.map((menu) => JSON.stringify(menu)));

  await removeTempImage(tempImages);

  const toSaveDiary = {
    d_title: title,
    d_content: content,
    d_date: date,
    d_images: imageIds,
    d_places: placeIds,
    d_thumbnail: thumbnail,
    d_memo: memo,
    d_menus: menusToString,
  };

  console.log(toSaveDiary);

  try {
    await Diary.sync();
    const createdDiary = await Diary.create(toSaveDiary);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const saveFolder = async (folderArr: IFolderState[]) => {
  console.log('saveFolder', folderArr);
  const resultArr = await Promise.all(folderArr.map((f) => updateFolder(f)));
  const result = resultArr.every((r) => r);
  console.log('saveFolder Result', result);
  return result;
};
