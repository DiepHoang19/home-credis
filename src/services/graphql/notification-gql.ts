import { gql } from "@apollo/client";

export const queryGetListNotification = gql`
  subscription MySubscription($user_id: Int!) {
    notifications(
      where: { deletedAt: { _is_null: true }, user_id: { _eq: $user_id } }
      order_by: { createdAt: desc }
    ) {
      id
      createdAt
      content
      notifications_notification_config {
        title
      }
    }
  }
`;
