import { AuthRegisterRequest } from "../types/auth.type";
import apiClient from "./httpService";
import { TRANSACTION_TYPE } from "./model/transaction";

const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;
const API_ENDPOINT = {
  LIST: "/bank/list",
};

export class BankService {
  list = async () => {
    return await apiClient.post(BASE_URL_API + API_ENDPOINT.LIST);
  };
}

const bankService = new BankService();
export default bankService;
