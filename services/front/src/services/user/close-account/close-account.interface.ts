export interface CloseAccountPayload {
  token: string | null;
  password: string;
  code?: string;
}

export interface CloseAccountResponse {
  message: string;
}
