export interface SignInPayload {
  email: string;
  password: string;
  twoFaCode?: string;
  code?: string;
}

export interface SignInResponse {
  _at: string;
  message?: 'two-fa-required' | 'phone-two-fa-required';
}
