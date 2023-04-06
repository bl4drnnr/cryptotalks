import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';

export const useSetPersonalSettingsService = () => {
  const [loading, setLoading] = React.useState(false);

  const setPersonalSettings = async (payload: any) => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch('/user/set-personal-settings', {}, {
        headers: { 'x-access-token': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { setPersonalSettings, loading };
};
