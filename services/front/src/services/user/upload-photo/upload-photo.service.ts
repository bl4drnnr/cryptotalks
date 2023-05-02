import React from 'react';

import { ApiClient } from '@api-client';
import { ExceptionHandler } from '@exception-handler';
import { UploadPhotoPayload, UploadPhotoResponse } from '@services/upload-photo/upload-photo.interface';

export const useUploadPhotoService = () => {
  const [loading, setLoading] = React.useState(false);

  const uploadPhoto = async (payload: UploadPhotoPayload)
    : Promise<UploadPhotoResponse> => {
    try {
      setLoading(true);
      const { data } = await ApiClient.post('/user/upload-photo', {
        photo: payload.photo
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

  return { uploadPhoto, loading };
};
