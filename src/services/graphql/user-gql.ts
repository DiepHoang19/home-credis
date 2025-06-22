import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $data: users_set_input!) {
    update_users(where: { id: { _eq: $id } }, _set: $data) {
      affected_rows
    }
  }
`;