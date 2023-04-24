import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetUserByUsernameResponse, GetUserByUsernamePayload } from '@services/get-user-by-username/get-user-by-username.interface';

export const useGetUserByUsernameService = () => {
  const [loading, setLoading] = React.useState(false);

  const getUserByUsername = async (payload: GetUserByUsernamePayload)
    : Promise<GetUserByUsernameResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<GetUserByUsernameResponse>(`/user/get/${payload.username}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getUserByUsername, loading };
};
