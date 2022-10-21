import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

export default handler.get<NextApiRequest, NextApiResponse>(async (req, res) => {
  const cookie = req.headers.cookie;
  // const token = cookie?.split('=')[1];

  res.setHeader('Set-Cookie', `fd_refresh_token; Max-Age=0`);
  res.status(200);
});
