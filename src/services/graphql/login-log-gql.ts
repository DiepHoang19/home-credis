import { gql } from "@apollo/client";

export const GET_LOGIN_LOG = gql`
  query MyQuery($user_id: Int!) {
    login_logs(
      order_by: { created_at: desc }
      where: { user_id: { _eq: $user_id } }
    ) {
      browser
      created_at
      description
      id
      ip_public
      status
      user_id
    }
  }
`;
