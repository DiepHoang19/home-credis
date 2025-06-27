import { gql } from "@apollo/client";

export const GET_COMPANY_INFO = gql`
  query MyQuery {
    company_info(limit: 1, where: { deletedAt: { _is_null: true } }) {
      name
      email
      hotline
      address
      description
    }
  }
`;
