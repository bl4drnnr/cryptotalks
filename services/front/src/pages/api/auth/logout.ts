import { AxiosError } from 'axios';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';


export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { data, headers } = await Api.post('/user/logout', {}, {
      headers: { 'Application-Authorization': req.headers['application-authorization'] }
    });

    if (headers['set-cookie']) {
      res.setHeader('Set-Cookie', serialize(
        '_rt', '', {
          path: '/',
          httpOnly: true,
          maxAge: -1
        }
      ));
    }

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
