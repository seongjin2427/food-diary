import nc from 'next-connect';
import multer from 'multer';
import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';

import models from '@/db/index';
import s3, { configKey } from '@/server/utils/aws-s3';
import authToken from '@/server/middlewares/use-token';

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = nc();

const storage = multerS3({
  s3: s3 as any,
  bucket: configKey.s3BucketName,
  key(req, file, cb) {
    const now = Date.now();
    const nowDate = moment(now).format('YYMMDDHHMMhmmss');
    const nowYear = moment(now).format('YY');
    const nowMonth = moment(now).format('MM');
    const nowDay = moment(now).format('DD');
    cb(null, `images/${nowYear}/${nowMonth}/${nowDay}/${nowDate}_${file.originalname}`);
  },
  acl: 'public-read',
  contentType: AUTO_CONTENT_TYPE,
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadFile = upload.single('img');

handler
  .use(authToken)
  .use(uploadFile)
  .post(async (req: NextApiRequest & { [key: string]: any }, res: NextApiResponse) => {
    const { originalname, location, key } = req.file;

    const uploadedImage = await models.ImageFile.create({
      fileName: originalname,
      src: location,
      fileSrc: key,
    });
    console.log('uploadedImage', uploadedImage);
    res.status(200).json({ imageFile: uploadedImage });
  });

export default handler;
