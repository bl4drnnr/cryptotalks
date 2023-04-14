export interface Set2FaPayload {
  token: string | null;
  twoFaToken: string;
  twoFaCode: string;
}

export interface Set2FaResponse {
  message: string;
}
