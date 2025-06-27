import { User } from "./user";

export interface LoanDetail {
  due_date: string; // Ngày đến hạn (ISO date string: 'YYYY-MM-DD')
  principal: number; // Số tiền gốc cần trả kỳ này
  interest: number; // Tiền lãi kỳ này
  total_payment: number; // Tổng số tiền phải trả kỳ này (gốc + lãi)
  opening_balance: number; // Dư nợ đầu kỳ
}

export interface Loan {
  id: number;
  num_months: number; // Số tháng vay
  price: number; // Số tiền gốc vay
  rate: number; // Lãi suất (%)
  detail: LoanDetail[]; // Mảng chi tiết từng kỳ thanh toán
  status: ENUM_STATUS_LOAN;
  user_id: number; // FK đến người dùng vay
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  user: User;
  step: ENUM_STEP_LOAN; //0: Chọn khoản vay 1: Xác minh tài khoản  2: Thông tin cá nhân  3: hoan tat 4: xác nhận thông tin ngân hàng  5:Ký xác nhận
  loan_code: string; // mã code
  signature: string;
}

export enum ENUM_STEP_LOAN {
  ONE = 0,
  TW0 = 1,
  THREE = 2,
  FOUR = 3,
  FIVE = 4,
  DONE = 5,
}

export enum ENUM_STATUS_LOAN {
  REQUEST = 0, // Chờ duyệt vay
  WAIT_COMFIRM_CONTACT = 1, // Đã được admin phê duyệt, chờ xác nhận ký hợp đồng đối với user
  IN_CONTACT = 2, // Đang trong thời gian vay (thơi gian hợp đông có hiệu lực)
  REJECT = 3, // Từ chối
  DONE = 4, // Hoàn thành khoản vay
}

export const ENUM_STATUS_LOAN_LABEL = {
  0: "Chờ duyệt vay",
  1: "Chờ xác nhận ký hợp đồng",
  2: "Đang vay",
  3: "Từ chối",
  4: "Hoàn thành khoản vay",
};
