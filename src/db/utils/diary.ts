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
      console.log('did in uploadDiary', did);
      const foundDiary = await user?.getDiary({
        where: {
          did,
        },
      });
      console.log('foundDiary in uploadDiary', foundDiary);
      if (foundDiary) {
        selectedDiary = foundDiary[0];
        await selectedDiary.update(toSaveDiary);
      }
    } else {
      selectedDiary = await user?.createDiary(toSaveDiary);
      console.log('selectedDiary in uploadDiary', selectedDiary);

      if (selectedDiary) {
        await Promise.all(
          images.map(async ({ id }) => {
            const image = await models.ImageFile.findByPk(id);
            if (image) {
              await selectedDiary?.addImage(image);
            }
          }),
        );
        console.log('places in uploadDiary', places);
        await Promise.all(
          places.map(async ({ id, ...rest }) => {
            const foundPlace = await findPlace(id);
            console.log('findPlace in uploadDiary', foundPlace);

            if (foundPlace) {
              await selectedDiary?.addPlace(foundPlace);
            } else {
              console.log('uploadDiary', foundPlace);
              const createdPlace = await models.Place.create({ id, ...rest });
              console.log('uploadDiary created', createdPlace);
              const a = await user?.addPlace(createdPlace);
              console.log('user addPlace', a);

              const b = await selectedDiary?.addPlace(createdPlace);
              console.log('diary addPlace', b);
            }
          }),
        );
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
