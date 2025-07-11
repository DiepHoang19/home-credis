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

export const GET_ADMIN_BY_CODE_ROLE = gql`
  query MyQuery {
    users(
      where: { deletedAt: { _is_null: true }, role: { code: { _eq: "admin" } } }
    ) {
      id
    }
  }
`;

export const COMFIRM_OTP_LOAN = gql`
  query MyQuery($id: Int!) {
    otp_logs(where: { loanid: { _eq: $id } }, order_by: { createdat: desc }) {
      id
      otpcode
    }
  }
`;

export const queryVerifyOtpCode = gql`
  query queryVerifyOtpCode($verify_code: String!) {
    users(
      where: {
        deletedAt: { _is_null: true }
        verify_code: { _eq: $verify_code }
      }
    ) {
      id
    }
  }
`;
