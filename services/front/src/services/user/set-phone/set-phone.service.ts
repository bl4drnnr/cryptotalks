import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { SetPhonePayload, SetPhoneResponse } from '@services/set-phone/set-phone.interface';

export const useSetPhoneService = () => {
  const [loading, setLoading] = React.useState(false);

  const setPhone = async (payload: SetPhonePayload)
    : Promise<SetPhoneResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post<SetPhoneResponse>('/user/set-phone', {
        phone: payload.phone,
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

  return { setPhone, loading };
};
