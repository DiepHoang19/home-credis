import { gql } from "@apollo/client";

export const GET_ROOM_CHAT = gql`
  query MyQuery($user_id: Int!) {
    room_chat(
      where: { user_id: { _eq: $user_id }, deletedAt: { _is_null: true } }
      limit: 1
    ) {
      id
    }
  }
`;

export const GET_CHAT = gql`
  subscription MyQuery($room_chat_id: Int!) {
    message_chat(
      where: {
        room_chat_id: { _eq: $room_chat_id }
        deletedAt: { _is_null: true }
      }
    ) {
      createdAt
      message
      id
      reply_id
      send_id
      room_chat_id
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation MyMutation($user_id: Int!, $admin_id: Int!) {
    insert_room_chat(
      objects: { createdAt: "now", admin_id: $admin_id, user_id: $user_id }
    ) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation MyMutation(
    $send_id: Int!
    $message: String!
    $room_chat_id: Int!
    $reply_id: Int!
  ) {
    insert_message_chat(
      objects: {
        room_chat_id: $room_chat_id
        createdAt: "now"
        message: $message
        reply_id: $reply_id
        send_id: $send_id
      }
    ) {
      affected_rows
    }
  }
`;
