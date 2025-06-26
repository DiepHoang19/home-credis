import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $data: users_set_input!) {
    update_users(where: { id: { _eq: $id } }, _set: $data) {
      affected_rows
    }
  }
`;

export const GET_USER = gql`
  query MyQuery($id: Int!) {
    users(where: { id: { _eq: $id }, deletedAt: { _is_null: true } }) {
      accountname
      accountnumber
      address
      bankname
      createdAt
      date_of_birth
      email
      full_name
      gender
      id
      identity_image_back
      identity_image_front
      income
      identity_number
      job
      phone_number
      relatives
      status
      createdAt
    }
  }
`;
