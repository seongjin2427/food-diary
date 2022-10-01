import ImageFile from '@/db/models/imageFile.model';
import s3, { configKey } from '@/server/utils/aws-s3';
import { ImageFileType } from '@/store/diary/diarySlice';

export const removeTempImage = async (tempImages: ImageFileType[]) => {
  const resultArr = await Promise.all(
    tempImages.map(async ({ id }) => {
      const foundImage = await ImageFile.findByPk(id);

      if (foundImage) {
        await s3.deleteObject(
          {
            Bucket: configKey.s3BucketName,
            Key: foundImage.fileSrc,
          },
          (err, data) => {
            if (err) throw err;
          },
        );

        foundImage.destroy();

        return true;
      } else {
        return false;
      }
    }),
  );
  return resultArr.every((bool) => bool);
};
