export interface SignInResponse {
  _at: string;
  message?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
  twoFaCode?: string;
}
