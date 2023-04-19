import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Api } from '@api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page, pageSize, order, orderBy, searchQuery, username } = req.query;
    const queryParams = [];
    let listPostsPath = `/posts/list/${page}/${pageSize}/${order}/${orderBy}?`;

    if (searchQuery) queryParams.push({ searchQuery });
    if (username) queryParams.push({ username });

    if (queryParams.length) {
      queryParams.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
          listPostsPath += `${key}=${value}&`;
        });
      });
    }

    const { data } = await Api.get(listPostsPath);

    return res.json(data);
  } catch (error: any) {
    return res
      .status((error as AxiosError).response?.status as number)
      .json((error as AxiosError).response?.data);
  }
};
