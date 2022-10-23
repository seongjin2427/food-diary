import axios from 'axios';
import nc from 'next-connect';
import { NextApiResponse } from 'next';

import models from '@/db/index';
import { removeTempImage } from '@/db/utils/image';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

export default handler
  .use(authToken)
  .get<NextApiExpanededRequest, NextApiResponse>(async (req, res) => {
    const { user } = req;

    try {
      await axios.post(
        'https://kapi.kakao.com/v1/user/unlink',
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const diaries = await user?.getDiary({
        include: {
          model: models.ImageFile,
          as: 'images',
        },
      });

      if (diaries)
        await Promise.all(
          diaries?.map(async (diary) => {
            const imageFileType = diary?.images?.map(({ img_id, src }) => ({
              img_id: img_id + '',
              src,
            }));
            if (imageFileType) removeTempImage(imageFileType);
            await diary.destroy();
          }),
        );
      await user?.destroy();

      res.setHeader('Set-Cookie', `fd_refresh_token=0; path=/; Max-Age=0;`);
      res.status(200).json({ message: '탈퇴 완료' });
    } catch (err) {
      res.status(500).json({ message: 'Fail!' });
    }
  });
