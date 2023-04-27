export interface ForgotPasswordPayload {
  email?: string;
  phone?: string;
  verificationString?: string;
  password?: string;
}

export interface ForgotPasswordResponse {
  message: string;
}
