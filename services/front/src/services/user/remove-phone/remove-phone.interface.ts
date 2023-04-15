export interface RemovePhonePayload {
  code?: string;
  token: string | null;
}

export interface RemovePhoneResponse {
  message: string;
}
