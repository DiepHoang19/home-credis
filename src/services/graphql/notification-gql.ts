import { gql } from "@apollo/client";

export const GET_NOTIFICATION_BY_USER = gql`
  query MyQuery($phone_number: String!) {
    notifications(
      where: {
        phone_number: { _eq: $phone_number }
        deletedAt: { _is_null: true }
      }
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
