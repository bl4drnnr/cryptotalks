import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { AccountConfirmationResponse } from '@services/account-confirmation/account-confirmation.interface';
import { EmailChangeConfirmationPayload } from '@services/email-change-confirmation/email-change-confirmation.interface';

export const useEmailChangeConfirmationService = () => {
  const [loading, setLoading] = React.useState(false);

  const confirmEmailChange = async (payload: EmailChangeConfirmationPayload)
    : Promise<AccountConfirmationResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<AccountConfirmationResponse>(`/user/email-change-confirmation/${payload.hash}`);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { confirmEmailChange, loading };
};
