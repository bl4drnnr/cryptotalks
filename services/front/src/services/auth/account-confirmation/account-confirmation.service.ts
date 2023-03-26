import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import {
  AccountConfirmationPayload,
  AccountConfirmationResponse
} from '@services/account-confirmation/account-confirmation.interface';

export const useAccountConfirmationService = () => {
  const [loading, setLoading] = React.useState(false);

  const confirmAccount = async (payload: AccountConfirmationPayload)
    : Promise<AccountConfirmationResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<AccountConfirmationResponse>(`/auth/account-confirmation/${payload.hash}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { confirmAccount, loading };
};
