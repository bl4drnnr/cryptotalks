import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { ForgotPasswordPayload, ForgotPasswordResponse } from '@services/forgot-password/forgot-password.interface';

export const useForgotPasswordService = () => {
  const [loading, setLoading] = React.useState(false);

  const forgotPassword = async (payload: ForgotPasswordPayload)
    : Promise<ForgotPasswordResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<ForgotPasswordResponse>('');

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading };
};
