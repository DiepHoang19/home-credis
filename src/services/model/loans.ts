import { User } from "./user";

export enum ENUM_STATUS_LOAN_DETAIL {
  UNPAID = 0, // CHƯA THANH TOÁN
  COMFIRM = 1, // CHỜ XÁC NHẬN TỪ ADMIN
  PAID = 2, // ĐÃ THANH TOÁN
}
export interface LoanDetail {
  due_date: string; // Ngày đến hạn (ISO date string: 'YYYY-MM-DD')
  principal: number; // Số tiền gốc cần trả kỳ này
  interest: number; // Tiền lãi kỳ này
  total_payment: number; // Tổng số tiền phải trả kỳ này (gốc + lãi)
  opening_balance: number; // Dư nợ đầu kỳ
  status: ENUM_STATUS_LOAN_DETAIL;
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
  purpose: string; // Mục đích vay
}

export enum ENUM_STEP_LOAN {
  ONE = 0,
  TW0 = 1,
  THREE = 2,
  FOUR = 3,
  FIVE = 4,
  DONE = 5,
}

export enum ENUM_STATUS_LOAN { // Không theo
  REQUEST = 0, // "Chờ gửi mã OTP",
  WAIT_COMFIRM_CONTACT = 1, // "Chờ xác nhận mã OTP",
  IN_CONTACT = 2, // "Chờ xác minh hợp đồng",
  REJECT = 3, // "Đang xác minh hợp đồng",
  DONE = 4, // "Từ chối",
}

export const ENUM_STATUS_LOAN_LABEL = {
  0: "Chờ gửi mã OTP",
  1: "Chờ xác nhận mã OTP",
  2: "Chờ xác minh hợp đồng",
  3: "Đang xác minh hợp đồng",
  4: "Từ chối",
};

export enum TYPE_NOTIFICATION {
  SYSTEM = 1, // Thông báo hệ thống
  KHOAN_VAY = 2, // Thông báo người dùng VỀ TÌNH TRẠNG KHOẢN VAY
}
