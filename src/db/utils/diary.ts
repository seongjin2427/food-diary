import models from '@/db/index';
import Diary from '@/db/models/diary.model';
import User from '@/db/models/user.model';
import { updateFolder } from '@/db/utils/folder';
import { removeTempImage } from '@/db/utils/image';
import { findPlace, getPlaceIds } from '@/db/utils/place';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IFolderState } from '@/store/diary/folderSlice';

export const saveDiary = async (
  userId: number | undefined,
  diary: IDiaryState,
  additionalInfo: IAdditionalInfoState,
) => {
  const { thumbnail, title, content, date, images, places, tempImages } = diary;
  const { memo, menus } = additionalInfo;

  console.log('aiwhiuawhrgiuahiuwerhg');
  // const placeIds = await Promise.all(places.map((p) => getPlaceIds(p)));

  const menusToString = JSON.stringify(menus);

  await removeTempImage(tempImages);

  const toSaveDiary = {
    d_title: title,
    d_content: content,
    d_date: date,
    d_thumbnail: thumbnail,
    d_memo: memo,
    d_menus: menusToString,
  };

  console.log('toSaveDiary', toSaveDiary);

  const foundUser = await models.User.findByPk(userId);

  try {
    const createdDiary = await foundUser?.createDiary(toSaveDiary);
    console.log('createdDiary', createdDiary);

    if (createdDiary) {
      images.forEach(async ({ id }) => {
        const image = await models.ImageFile.findByPk(id);
        if (image) {
          const test = await createdDiary.createImageFile({
            diaryId: createdDiary.did,
            fileName: image.fileName,
            fileSrc: image.fileSrc,
            src: image.src,
          });
          console.log('test images', test);
        }
        // if (image) {
        //   image?.update({ diaryId: createdDiary.did });
        // }
      });
      places.forEach(async ({ id, ...rest }) => {
        const test = await createdDiary.createPlace({ place_id: id, ...rest });
        // console.log('test places', test);
      });
    }
    console.log('done');

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
