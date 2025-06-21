import { gql } from "@apollo/client";

export const bidSubscription = gql`
  subscription GetBidSubscription($auction_id: uuid!) {
    bids(
      where: { auction_id: { _eq: $auction_id } }
      order_by: { bid_time: desc }
    ) {
      auction_id
      user {
        customer_code
        full_name
      }
      name_bot
      bid_time
      bid_amount
      auction {
        name
        start_amount
        start_time
        status
        updated_at
        end_time
      }
    }
  }
`;

export const GET_MY_BIDS = gql`
  query GetUserLatestBids($user_id: uuid!) {
    bids(
      where: { user_id: { _eq: $user_id } }
      order_by: [{ auction_id: desc }, { bid_time: desc }]
      distinct_on: auction_id
    ) {
      is_win
      auction_id
      bid_amount
      bid_time
      name_bot
      user {
        customer_code
      }
      auction {
        name
        start_amount
        start_time
        status
        end_time
        car {
          image_slide
          name
          image_url
        }
      }
    }
  }
`;

export const GET_USER_BIDS = gql`
  query GetUserHighestBids {
    bids(
      order_by: [{ auction_id: asc }, { bid_time: desc }]
      distinct_on: auction_id
    ) {
      auction_id
      bid_amount
      bid_time
      # name_bot
      user {
        customer_code
      }
      auction {
        name
        start_amount
        start_time
        status
        end_time
        car {
          image_slide
          name
          image_url
        }
      }
    }
  }
`;
