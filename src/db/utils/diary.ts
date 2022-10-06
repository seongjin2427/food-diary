import models from '@/db/index';
import User from '@/db/models/user.model';
import { findPlace } from '@/db/utils/place';
import { removeTempImage } from '@/db/utils/image';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';
import Diary from '@/db/models/diary.model';

export const saveDiary = async (
  user: User | null,
  diary: IDiaryState,
  additionalInfo: IAdditionalInfoState,
) => {
  const { did, thumbnail, title, content, date, images, places, tempImages } = diary;
  const { memo, menus } = additionalInfo;

  await removeTempImage(tempImages);

  const toSaveDiary = {
    title,
    content,
    thumbnail,
    memo,
    date: new Date(date),
    menus: JSON.stringify(menus),
  };

  try {
    let selectedDiary: Diary | undefined;
    const foundUser = await models.User.findByPk(user?.id);

    if (did) {
      const foundDiary = await user?.getDiary({
        where: {
          did,
        },
      });
      if (foundDiary) {
        selectedDiary = foundDiary[0];
        await selectedDiary.update(toSaveDiary);
      }
    } else {
      selectedDiary = await foundUser?.createDiary(toSaveDiary);

      if (selectedDiary) {
        images.forEach(async ({ id }) => {
          const image = await models.ImageFile.findByPk(id);
          if (image) {
            await selectedDiary?.addImage(image);
          }
        });
        places.forEach(async ({ id, ...rest }) => {
          const foundPlace = await findPlace(id);

          if (foundPlace) {
            await selectedDiary?.addPlace(foundPlace);
          } else {
            const createdPlace = await models.Place.create({ place_id: id, ...rest });
            await foundUser?.addPlace(createdPlace);
            await selectedDiary?.addPlace(createdPlace);
          }
        });
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
