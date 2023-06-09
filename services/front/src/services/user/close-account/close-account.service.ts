import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { CloseAccountPayload, CloseAccountResponse } from '@services/close-account/close-account.interface';

export const useCloseAccountService = () => {
  const [loading, setLoading] = React.useState(false);

  const closeAccount = async (payload: CloseAccountPayload)
    : Promise<CloseAccountResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<CloseAccountResponse>('/user/close-account', {
        password: payload.password,
        code: payload.code
      }, {
        headers: { 'x-access-token': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { closeAccount, loading };
};
