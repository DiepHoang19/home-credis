import { gql } from "@apollo/client";

export const GET_AUCTION_BY_ID = gql`
  subscription GetAuctionById($auction_id: uuid!) {
    auction_by_pk(id: $auction_id) {
      car {
        name
        image_url
        image_slide
        slug
        model
        id
        brand
        description
        year
      }
      car_id
      start_amount
      start_time
      status
      start_amount
      end_time
      price_step
      view
      name
      audio_link
    }
  }
`;

export const auctionSubscription = gql`
  subscription OnAuctionUpdated($statuses: [Int!]) {
    auction(
      order_by: { created_at: desc }
      where: { status: { _in: $statuses }, deleted_at: { _is_null: true } }
    ) {
      end_time
      id
      name
      start_amount
      start_time
      status
      car {
        brand
        description
        id
        image_url
        model
        name
        slug
        year
        image_slide
      }
      is_start
    }
  }
`;

export const bannerSlidesListSubscription = gql`
  query MyQuery {
    banner_slides(
      where: { deleted_at: { _is_null: true } }
      limit: 1
      order_by: { created_at: desc }
    ) {
      image
    }
  }
`;

export const mutationUpdateAuction = gql`
  mutation MyMutation($auction_id: uuid!, $data: auction_set_input!) {
    update_auction(where: { id: { _eq: $auction_id } }, _set: $data) {
      affected_rows
    }
  }
`;

export const mutationInsertAuctionResult = gql`
  mutation MyMutation($data: [auction_results_insert_input!]!) {
    insert_auction_results(objects: $data) {
      affected_rows
    }
  }
`;

export const getAudio = gql`
  query MyQuery {
    audio(where: { deleted_at: { _is_null: true } }) {
      audio_link
    }
  }
`;
