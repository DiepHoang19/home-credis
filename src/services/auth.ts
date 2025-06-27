import apiClient from "./httpService";

export const login = (data: { email: string; password: string }) =>
  apiClient.post("/auth/login", data);

export const refreshToken = (data: { refresh_token: string }) =>
  apiClient.post("/auth/refresh-token", data);

export const changePassword = (data: {
  old_password: string;
  new_password: string;
  id: Number;
}) => apiClient.post("/auth/change-password", data);
