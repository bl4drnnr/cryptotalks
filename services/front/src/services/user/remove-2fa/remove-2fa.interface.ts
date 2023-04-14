export interface Remove2FaPayload {
  token: string | null;
  twoFaCode: string;
}

export interface Remove2FaResponse {
  message: string;
}
