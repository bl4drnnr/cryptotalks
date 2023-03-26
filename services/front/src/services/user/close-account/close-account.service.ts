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
      const { data } = await ApiClient.patch<CloseAccountResponse>('/user/close-account', {}, {
        headers: { 'Application-Authorization': `Bearer ${payload.token}` }
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
