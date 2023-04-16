export interface ChangeEmailRequest {
  email: string;
  token: string | null;
  twoFaCode?: string;
  code?: string;
}

export interface ChangeEmailResponse {
  message: string;
}
