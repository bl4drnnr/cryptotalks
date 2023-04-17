export interface ChangePasswordRequest {
  password: string;
  passwordRepeat: string;
  token: string | null;
  code?: string;
  twoFaCode?: string;
}

export interface ChangePasswordResponse {
  message: string;
}
