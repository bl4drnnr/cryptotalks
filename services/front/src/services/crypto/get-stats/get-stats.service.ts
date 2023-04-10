import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { GetStatsResponse } from '@services/get-stats/get-stats.interface';

export const useGetStatsService = () => {
  const [loading, setLoading] = React.useState(false);

  const getStats = async (): Promise<GetStatsResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.get<GetStatsResponse>('/crypto/market-stats');

      return data;
    } catch (error: any) {
      throw ExceptionHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { getStats, loading };
};
