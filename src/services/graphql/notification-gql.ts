import { gql } from "@apollo/client";

export const GET_NOTIFICATION_BY_USER = gql`
  query MyQuery($user_id: Int!) {
    notifications(
      where: { user_id: { _eq: $user_id }, deletedAt: { _is_null: true } }
      order_by: { createdAt: desc }
    ) {
      content
      id
      notifications_notification_config {
        code
        title
      }
      phone_number
      createdAt
      isseen
    }
  }
`;
