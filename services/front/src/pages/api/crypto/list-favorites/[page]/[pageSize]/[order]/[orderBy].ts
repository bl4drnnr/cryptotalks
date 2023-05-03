import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page, pageSize, order, orderBy, username } = req.query;

    let listFavoritesUrl = `/crypto/list-favorites/${page}/${pageSize}/${order}/${orderBy}`;

    if (username) listFavoritesUrl += `?username=${username}`;

    const { data } = await Api.get(listFavoritesUrl, {
      headers: { 'x-access-token': req.headers['x-access-token'] }
    });

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
