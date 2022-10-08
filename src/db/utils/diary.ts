import models from '@/db/index';
import User from '@/db/models/user.model';
import Diary from '@/db/models/diary.model';
import { findPlace } from '@/db/utils/place';
import { removeTempImage } from '@/db/utils/image';
import { IDiaryState } from '@/store/diary/diarySlice';
import { IAdditionalInfoState } from '@/store/diary/additionalInfoSlice';

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

    if (did) {
      const foundDiary = await user?.getDiary({
        where: {
          did,
        },
      });
      if (foundDiary) {
        selectedDiary = foundDiary[0];
        await selectedDiary.update(toSaveDiary);

        await Promise.all(
          images.map(async ({ img_id }) => {
            const image = await models.ImageFile.findByPk(img_id);
            if (image) {
              await selectedDiary?.addImage(image);
            }
          }),
        );
      }
    } else {
      selectedDiary = await user?.createDiary(toSaveDiary);

      if (selectedDiary) {
        await Promise.all(
          images.map(async ({ img_id }) => {
            const image = await models.ImageFile.findByPk(img_id);
            if (image) {
              await selectedDiary?.addImage(image);
            }
          }),
        );
      }
    }

    await Promise.all(
      places.map(async ({ id, ...rest }) => {
        const foundPlace = await findPlace(id);

        if (foundPlace) {
          await selectedDiary?.addPlace(foundPlace);
        } else {
          const createdPlace = await models.Place.create({ id, ...rest });

          await user?.addPlace(createdPlace);
          await selectedDiary?.addPlace(createdPlace);
        }
      }),
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
