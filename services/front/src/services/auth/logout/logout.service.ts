import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { LogoutRequest, LogoutResponse } from '@services/logout/logout.interface';

export const useLogoutService = () => {
  const [loading, setLoading] = React.useState(false);

  const logout = async (payload: LogoutRequest)
    : Promise<LogoutResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<LogoutResponse>('/user/logout', {}, {
        headers: { 'Application-Authorization': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};
