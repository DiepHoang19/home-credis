export interface User {
  id: number;
  fullname: string;
  password: string;
  email?: string;
  phone: string;
  date_of_birth?: string; // ISO date format: 'YYYY-MM-DD'
  gender?: boolean; // true = nam, false = nữ (nếu dùng kiểu boolean)
  identity_number?: string;
  identity_image_front?: string;
  identity_image_back?: string;
  job?: string;
  address?: string;
  relatives?: Relative[];
  role_id: number;
  status: 0 | 1; // 0 = không hoạt động, 1 = hoạt động
  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
}

export interface Relative {
  name: string;
  relationship: string;
  phone: string;
  address: string;
}