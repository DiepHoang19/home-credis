import { gql } from "@apollo/client";

export const mutationRegister = gql`
  mutation insert_users_one($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;
