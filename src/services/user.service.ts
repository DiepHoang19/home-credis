import apiClient from "./httpService";
import { RequestUpdateUser } from "./model/user";

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;
const API_ENDPOINT = {
  DETAIL: "/user/detail",
  UPDATE: "/user/update",
};

export class UserService {
  detail = async (user_id: string) => {
    return await apiClient.get(
      BASE_URL_API + API_ENDPOINT.DETAIL + "?user_id=" + user_id
    );
  };

  update = async (data: RequestUpdateUser) => {
    return await apiClient.put(BASE_URL_API + API_ENDPOINT.UPDATE, data);
  };
}

const userService = new UserService();
export default userService;
