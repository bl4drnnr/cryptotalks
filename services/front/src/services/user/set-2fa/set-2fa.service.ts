import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { Set2FaPayload, Set2FaResponse } from '@services/set-2fa/set-2fa.interface';

export const useSet2FaService = () => {
  const [loading, setLoading] = React.useState(false);

  const set2Fa = async (payload: Set2FaPayload)
    : Promise<Set2FaResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<Set2FaResponse>('/twofactor/set', {}, {
        headers: { 'Application-Authorization': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { set2Fa, loading };
};
