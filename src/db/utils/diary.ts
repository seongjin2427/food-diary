import models from '@/db/index';
import { findPlace } from '@/db/utils/place';
import { removeTempImage } from '@/db/utils/image';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';

export const saveDiary = async (
  userId: number | undefined,
  diary: IDiaryState,
  additionalInfo: IAdditionalInfoState,
) => {
  const { thumbnail, title, content, date, images, places, tempImages } = diary;
  const { memo, menus } = additionalInfo;

  const menusToString = JSON.stringify(menus);

  await removeTempImage(tempImages);

  const toSaveDiary = {
    d_title: title,
    d_content: content,
    d_date: new Date(date),
    d_thumbnail: thumbnail,
    d_memo: memo,
    d_menus: menusToString,
  };

  try {
    const foundUser = await models.User.findByPk(userId);
    const createdDiary = await foundUser?.createDiary(toSaveDiary);

    if (createdDiary) {
      images.forEach(async ({ id }) => {
        const image = await models.ImageFile.findByPk(id);
        if (image) {
          await createdDiary.addImageFile(image);
        }
      });
      places.forEach(async ({ id, ...rest }) => {
        const foundPlace = await findPlace(id);

        if (foundPlace) {
          await createdDiary.addPlace(foundPlace);
        } else {
          const createdPlace = await models.Place.create({ place_id: id, ...rest });
          await foundUser?.addPlace(createdPlace);
          await createdDiary.addPlace(createdPlace);
        }
      });
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
