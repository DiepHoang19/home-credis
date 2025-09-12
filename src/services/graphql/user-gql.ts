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
      credit_score
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
  subscription MyQuery($id: Int!) {
    otp_logs(
      where: { is_expired: { _eq: false }, loanid: { _eq: $id } }
      order_by: { createdat: desc }
      limit: 1
    ) {
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

export const mutationUpdateTimeOtpLog = gql`
  mutation mutationUpdateTimeOtpLog($loan_id: Int!) {
    update_otp_logs(
      where: { loanid: { _eq: $loan_id } }
      _set: { is_expired: true }
    ) {
      affected_rows
    }
  }
`;

export const queryGetCreditScore = gql`
  query queryGetCreditScore($user_id: Int!) {
    users_by_pk(id: $user_id) {
      credit_score
    }
  }
`;

export const queryUserInfo = gql`
  query MyQuery($id: Int!) {
    users_by_pk(id: $id) {
      credit_score
      loans {
        id
      }
    }
  }
`;
