export interface User {
  id: string;
  full_name?: string | null;
  avatar?: string | null;
  password?: string | null;
  email?: string | null;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
  deleted_at?: string | Date | null;
  customer_code?: string | null;
  phone_number?: string | null;
  cccd_before?: string | null;
  cccd_after?: string | null;
  balance?: number | null;
  role_id?: string | null;
  refresh_token?: string | null;
  bank_owner_name: string | null;
  is_update_profile: boolean;
  bank_account_no?: string | null;
  bank_account_name?: string | null;
  is_auction?: IS_AUCTION;
  number_cccd?: string;
  credit_score?: number;
}

export enum IS_AUCTION {
  OPEN = 1,
  CLOSE = 0,
}

export interface RequestUpdateUser {
  user_id: string | undefined;
  full_name: string;
  email: string;
  cccd_before: string;
  cccd_after: string;
  bank_account_no: string;
  bank_account_name: string;
  bank_owner_name: string;
  number_cccd: string;
  phone_number: string;
}
