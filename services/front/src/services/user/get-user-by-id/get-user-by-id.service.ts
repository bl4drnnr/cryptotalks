import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetUserByIdPayload, GetUserByIdResponse } from '@services/get-user-by-id/get-user-by-id.interface';

export const useGetUserByIdService = () => {
  const [loading, setLoading] = React.useState(false);

  const getUserById = async (payload: GetUserByIdPayload)
    : Promise<GetUserByIdResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<GetUserByIdResponse>(`/user/get/${payload.userId}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getUserById, loading };
};
