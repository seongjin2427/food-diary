import { removeTempImage } from '@/db/utils/image';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import { ImageFileType } from '@/store/diary/diarySlice';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.use(authToken).delete(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  const { did } = req.query;

  const foundDiary = await user?.getDiary({
    where: {
      did,
    },
  });

  console.log('foundDiary', foundDiary);
  try {
    if (foundDiary) {
      const foundImages = await foundDiary[0].getImages();
      const removeImages = foundImages.map(({ img_id, src }) => ({ img_id: img_id + '', src }));

      await removeTempImage(removeImages);
      await foundDiary[0].destroy();
    }

    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;
