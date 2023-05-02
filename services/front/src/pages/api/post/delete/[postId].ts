import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { code, twoFaCode, postId } = req.query;

    let deletePostUrl = `/posts/delete/${postId}`;

    if (code) deletePostUrl += `?code=${code}`;
    else if (twoFaCode) deletePostUrl += `?twoFaCode=${twoFaCode}`;

    const { data } = await Api.delete(deletePostUrl, {
      headers: { 'x-access-token': req.headers['x-access-token'] }
    });

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
