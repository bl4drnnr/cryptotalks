import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetUserSettingsPayload, GetUserSettingsResponse } from '@services/get-user-settings/get-user-settings.interface';

export const useGetUserSettingsService = () => {
  const [loading, setLoading] = React.useState(false);

  const getUserSettings = async (payload: GetUserSettingsPayload)
    : Promise<GetUserSettingsResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<GetUserSettingsResponse>('/user/get-user-settings', {
        headers: { 'Application-Authorization': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getUserSettings, loading };
};
