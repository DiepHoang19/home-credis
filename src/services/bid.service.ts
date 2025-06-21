import apiClient from "./httpService";
import { ICreateBid } from "./model/bid";

const API_ENDPOINT = {
  CREATE: "/bids/create",
  CREATE_AUCTION_RESULTS: "/bids/create-auction-result",
};

export class BidService {
  create = async (data: ICreateBid) => {
    return await apiClient.post(
      process.env.NEXT_PUBLIC_BASE_URL_API + API_ENDPOINT.CREATE,
      data
    );
  };
  createAuctionResult = async (data: {
    auction_id: string;
    winner_id: string;
    user_id: string;
  }) => {
    return await apiClient.post(
      process.env.NEXT_PUBLIC_BASE_URL_API +
        API_ENDPOINT.CREATE_AUCTION_RESULTS,
      data
    );
  };
}

const bidService = new BidService();
export default bidService;
