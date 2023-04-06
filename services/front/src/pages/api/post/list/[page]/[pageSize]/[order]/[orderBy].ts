import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page, pageSize, order, orderBy, searchQuery, userId } = req.query;
    const { data } = await Api.get(`/posts/list/${page}/${pageSize}/${order}/${orderBy}?searchQuery=${searchQuery || ''}&userId=${userId}`);

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
