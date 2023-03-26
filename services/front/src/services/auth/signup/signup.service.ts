import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { SignUpPayload, SignUpResponse } from '@services/signup/signup.interface';


export const useSignUpService = () => {
  const [loading, setLoading] = React.useState(false);

  const signUp = async (payload: SignUpPayload)
    : Promise<SignUpResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<SignUpResponse>('/auth/sign-up', payload);

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading };
};
