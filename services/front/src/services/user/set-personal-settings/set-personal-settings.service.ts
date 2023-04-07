import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import {
  SetPersonalSettingsPayload,
  SetPersonalSettingsResponse
} from '@services/set-personal-settings/set-personal-settings.interface';

export const useSetPersonalSettingsService = () => {
  const [loading, setLoading] = React.useState(false);

  const setPersonalSettings = async (payload: SetPersonalSettingsPayload)
    : Promise<SetPersonalSettingsResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.patch<SetPersonalSettingsResponse>(
        '/user/set-personal-settings', payload, {
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
