export interface UploadPhotoPayload {
  token: string | null;
  photo: string;
}

export interface UploadPhotoResponse {
  message: string;
}
