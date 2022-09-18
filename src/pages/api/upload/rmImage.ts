import s3, { configKey } from '@/server/utils/aws-s3';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // s3.deleteObject(
    //   {
    //     Bucket: configKey.s3BucketName,
    //     Key: `image/${req.params.id}`,
    //   },
    //   (err, data) => {
    //     if (err) throw err;
    //   },
    // );

    return res.status(200).json({
      message: 'success',
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});

export default handler;
