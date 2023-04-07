import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';

export const useSetSecuritySettingsService = () => {
  const [loading, setLoading] = React.useState(false);

  const setSecurityUserSettings = async (payload: any) => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch('/user/set-security-settings', {}, {
        headers: { 'x-access-token': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { setSecurityUserSettings, loading };
};
