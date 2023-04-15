export interface SetPhonePayload {
  phone: string;
  code?: string;
  token: string | null;
}

export interface SetPhoneResponse {
  message: string;
}
