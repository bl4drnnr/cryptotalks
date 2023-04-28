import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page, pageSize, order, orderBy, searchQuery } = req.query;

    let listCryptoUrl = `/crypto/list/${page}/${pageSize}/${order}/${orderBy}`;

    if (searchQuery) listCryptoUrl += `?searchQuery=${searchQuery}`;

    const { data } = await Api.get(listCryptoUrl);

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
