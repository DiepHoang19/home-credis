import {
  AuthChangePasswordRequest,
  AuthForgetPasswordRequest,
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthSendCode,
} from "../types/auth.type";
import apiClient from "./httpService";

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;
const API_ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh-token",
  CHANGE_PASSWORD: "/user/change-password",
  FORGET_PASSWORD: "/auth/forget-password",
  SEND_CODE: "/auth/send-code",
};

export class AuthService {
  login = async (data: AuthLoginRequest) => {
    return await apiClient.post(BASE_URL_API + API_ENDPOINT.LOGIN, data);
  };

  register = async (data: AuthRegisterRequest) => {
    return await apiClient.post(BASE_URL_API + API_ENDPOINT.REGISTER, data);
  };

  refresh = async (refresh_token: string) => {
    return await apiClient.post(BASE_URL_API + API_ENDPOINT.REFRESH, {
      refresh_token: refresh_token,
    });
  };
  logout = async (refresh_token: string) => {
    return await apiClient.post(BASE_URL_API + API_ENDPOINT.LOGOUT, {
      refresh_token: refresh_token,
    });
  };
  changePassword = async (data: AuthChangePasswordRequest) => {
    return await apiClient.post(
      BASE_URL_API + API_ENDPOINT.CHANGE_PASSWORD,
      data
    );
  };

  forgetPassword = async (data: AuthForgetPasswordRequest) => {
    return await apiClient.post(
      BASE_URL_API + API_ENDPOINT.FORGET_PASSWORD,
      data
    );
  };

  sendCode = async (data: AuthSendCode) => {
    return await apiClient.post(BASE_URL_API + API_ENDPOINT.SEND_CODE, data);
  };
}

const authService = new AuthService();
export default authService;
