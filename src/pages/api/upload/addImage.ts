import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import multer from 'multer';
import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';
import moment from 'moment';

import s3, { configKey } from '@/server/utils/aws-s3';
import ImageFile from '@/db/models/imageFile.model';

const handler = nc();

const storage = multerS3({
  s3: s3 as any,
  bucket: configKey.s3BucketName,
  key(req, file, cb) {
    const nowDate = moment(Date.now()).format('YYMMDDHHMMhmmss');
    cb(null, `images/${nowDate}_${file.originalname}`);
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
  .use(uploadFile)
  .post(async (req: NextApiRequest & { [key: string]: any }, res: NextApiResponse) => {
    console.log(req.file);
    const { originalname, location } = req.file;

    const uploadedImage = await ImageFile.create({ fileName: originalname, src: location });
    console.log('uploadedImage', uploadedImage);
    res.status(200).json({ url: location });
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
