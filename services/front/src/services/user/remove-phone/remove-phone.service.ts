import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { RemovePhonePayload, RemovePhoneResponse } from '@services/remove-phone/remove-phone.interface';

export const useRemovePhoneService = () => {
  const [loading, setLoading] = React.useState(false);

  const removePhone = async (payload: RemovePhonePayload)
    : Promise<RemovePhoneResponse> => {
    try {
      const { data } = await ApiClient.post<RemovePhoneResponse>('/user/remove-phone', {
        code: payload.code
      }, {
        headers: { 'x-access-token': `Bearer ${payload.token}` }
      });

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { removePhone, loading };
};
