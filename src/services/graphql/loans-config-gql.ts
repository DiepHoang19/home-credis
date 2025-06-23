import { gql } from "@apollo/client";

export const GET_LOANS_CONFIGS = gql`
  query MyQuery {
    loans_config(limit: 1, where: { deletedAt: { _is_null: true } }) {
      max_loan_amount
      max_loan_months
      min_loan_amount
      min_loan_months
      interest_rate_fixed
      signature
    }
  }
`;
