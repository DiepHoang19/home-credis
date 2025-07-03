import { gql } from "@apollo/client";

export const queryGetListNotification = gql`
  subscription MySubscription($user_id: Int!, $type: Int!) {
    notifications(
      where: {
        type: { _eq: $type }
        deletedAt: { _is_null: true }
        user_id: { _eq: $user_id }
      }
      order_by: { createdAt: desc }
    ) {
      id
      createdAt
      content
      type
      notifications_notification_config {
        title
        code
        color
      }
    }
  }
`;

export const getListNotification = gql`
  query MySubscription($user_id: Int!, $type: Int!) {
    notifications(
      where: {
        type: { _eq: $type }
        deletedAt: { _is_null: true }
        user_id: { _eq: $user_id }
      }
      order_by: { createdAt: desc }
    ) {
      id
      createdAt
      content
      type
      notifications_notification_config {
        title
        code
        color
      }
    }
  }
`;
