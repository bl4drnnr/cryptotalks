export interface ForgotPasswordPayload {
  email?: string;
  phone?: string;
  verificationString?: string;
}

export interface ForgotPasswordResponse {
  message: string;
}
