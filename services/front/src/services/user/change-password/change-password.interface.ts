export interface ChangePasswordRequest {
  password: string;
  passwordRepeat: string;
  token: string | null;
}

export interface ChangePasswordResponse {
  message: string;
}
