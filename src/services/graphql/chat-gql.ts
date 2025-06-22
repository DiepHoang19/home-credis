import { gql } from "@apollo/client";

export const GET_ROOM_CHAT = gql`
  query MyQuery($user_id: uuid!) {
    room_chat(
      where: { user_id: { _eq: $user_id }, deleted_at: { _is_null: true } }
      limit: 1
    ) {
      id
    }
  }
`;

export const GET_CHAT = gql`
  subscription MyQuery($room_id: uuid!) {
    chat_message(
      where: { room_id: { _eq: $room_id }, deleted_at: { _is_null: true } }
    ) {
      created_at
      message
      id
      reply_id
      send_id
      room_id
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation MyMutation($user_id: uuid!, $admin_id: uuid!) {
    insert_room_chat(
      objects: { created_at: "now", admin_id: $admin_id, user_id: $user_id }
    ) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation MyMutation(
    $send_id: uuid!
    $message: String!
    $room_id: uuid!
    $reply_id: uuid!
  ) {
    insert_chat_message(
      objects: {
        room_id: $room_id
        created_at: "now"
        message: $message
        reply_id: $reply_id
        send_id: $send_id
      }
    ) {
      affected_rows
    }
  }
`;
