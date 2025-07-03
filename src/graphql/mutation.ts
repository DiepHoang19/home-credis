import { gql } from "@apollo/client";

export const mutationRegister = gql`
  mutation insert_users_one($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;

export const mutationUdpateRemoveOtp = gql`
  mutation MyMutation($id: Int!, $verify_code: String!) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { verify_code: $verify_code }
    ) {
      id
    }
  }
`;
