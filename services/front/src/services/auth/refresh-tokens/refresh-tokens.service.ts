import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import {
  RefreshTokenPayload, RefreshTokenResponse
} from '@services/refresh-tokens/refresh-tokens.interface';

export const useRefreshTokenService = () => {
  const [loading, setLoading] = React.useState(false);

  const refreshToken = async (payload: RefreshTokenPayload)
    : Promise<RefreshTokenResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<RefreshTokenResponse>('/auth/refresh-token', {
        headers: { 'Application-Authorization': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { refreshToken, loading };
};
