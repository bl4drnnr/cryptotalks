export interface SetPersonalSettingsPayload {
  token: string | null;
  bio?: string;
  firstName?: string;
  lastName?: string;
  linkedIn?: string;
  personalWebsite?: string;
  title?: string;
  twitter?: string;
  username?: string;
}

export interface SetPersonalSettingsResponse {
  message: string;
}
