export interface ChangeEmailRequest {
  newEmail: string;
  token: string | null;
}

export interface ChangeEmailResponse {
  message: string;
}
