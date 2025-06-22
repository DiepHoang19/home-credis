import { gql } from "@apollo/client";

export const queryLogin = gql`
  query queryLogin($phone_number: String!, $password: String!) {
    users(
      where: {
        phone_number: { _eq: $phone_number }
        password: { _eq: $password }
        deletedAt: { _is_null: true }
      }
    ) {
      id
      full_name
      phone_number
    }
  }
`;
