import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { SignInPayload, SignInResponse } from '@services/signin/signin.interface';

export const useSignInService = () => {
  const [loading, setLoading] = React.useState(false);

  const signIn = async (payload: SignInPayload)
    : Promise<SignInResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<SignInResponse>('/auth/sign-in', payload);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};
