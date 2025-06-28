import axios from "axios";

const API_ENDPOINT = {
  LOGIN: "/api/authen/login",
  REGISTER: "/api/authen/register",
  CHANGE_PASSWORD: "/api/authen/change-password",
};

const BASE_URL_SERVER = import.meta.env.VITE_BASE_URL_SERVER;

class AuthenService {
  onLogin = async (data: { phone_number: string; password: string }) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.LOGIN, data);
  };
  onRegister = async (data: { phone_number: string; password: string }) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.REGISTER, data);
  };
  onChangePassword = async (data: {
    old_password: string;
    new_password: string;
    id: Number;
  }) => await axios.post(BASE_URL_SERVER + API_ENDPOINT.CHANGE_PASSWORD, data);
}

const authenService = new AuthenService();
export default authenService;
