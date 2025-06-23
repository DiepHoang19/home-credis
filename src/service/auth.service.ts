import axios from "axios";

const API_ENDPOINT = {
  LOGIN: "/api/authen/login",
  REGISTER: "/api/authen/register",
};

const BASE_URL_SERVER = import.meta.env.VITE_BASE_URL_SERVER;

class AuthenService {
  onLogin = async (data: { phone_number: string; password: string }) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.LOGIN, data);
  };
  onRegister = async (data: { phone_number: string; password: string }) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.REGISTER, data);
  };
}

const authenService = new AuthenService();
export default authenService;
