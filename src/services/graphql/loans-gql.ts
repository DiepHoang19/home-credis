import { gql } from "@apollo/client";

export const CREATE_LOANS = gql`
  mutation CreateLoans($data: [loans_insert_input!]!) {
    insert_loans(objects: $data) {
      affected_rows
    }
  }
`;

export const UPDATE_LOANS = gql`
  mutation UpdateLoan($id: Int!, $data: loans_set_input!) {
    update_loans(where: { id: { _eq: $id } }, _set: $data) {
      affected_rows
    }
  }
`;

export const GET_LOAN_BY_ID = gql`
  query MyQuery($id: Int!) {
    loans(
      where: { id: { _eq: $id }, deletedAt: { _is_null: true } }
      order_by: { createdAt: desc }
    ) {
      signature
      loan_code
      step
      id
      detail
      rate
      price
      status
      updatedAt
      user_id
      num_months
      createdAt
      user {
        address
        createdAt
        date_of_birth
        deletedAt
        email
        full_name
        gender
        id
        identity_image_back
        identity_image_front
        identity_number
        job
        phone_number
        relatives
        status
        income
      }
    }
  }
`;

export const GET_LOAN_USER = gql`
  query MyQuery($user_id: Int!) {
    loans(
      where: { user_id: { _eq: $user_id }, deletedAt: { _is_null: true } }
      order_by: { createdAt: desc }
    ) {
      signature
      loan_code
      step
      id
      detail
      rate
      price
      status
      updatedAt
      user_id
      num_months
      createdAt
      purpose
      user {
        address
        createdAt
        date_of_birth
        deletedAt
        email
        full_name
        gender
        id
        identity_image_back
        identity_image_front
        identity_number
        job
        phone_number
        relatives
        status
        income
      }
    }
  }
`;
