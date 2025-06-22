import { User } from "./user";

export interface LoanDetail {
  due_date: string;         // Ngày đến hạn (ISO date string: 'YYYY-MM-DD')
  principal: number;        // Số tiền gốc cần trả kỳ này
  interest: number;         // Tiền lãi kỳ này
  total_payment: number;    // Tổng số tiền phải trả kỳ này (gốc + lãi)
  opening_balance: number;  // Dư nợ đầu kỳ
}

export interface Loan {
  id: number;
  num_months: number;       // Số tháng vay
  price: number;            // Số tiền gốc vay
  rate: number;             // Lãi suất (%)
  detail: LoanDetail[];     // Mảng chi tiết từng kỳ thanh toán
  status: 0 | 1 | 2 | 3;     // Trạng thái: 0 - Chờ duyệt, 1 - Chờ ký, 2 - Đang vay, 3 - Đã huỷ
  user_id: number;          // FK đến người dùng vay
  createdAt: string;        // ISO datetime string
  updatedAt: string;        // ISO datetime string
  user: User,
  step: ENUM_STEP_LOAN //0: Chọn khoản vay 1: Xác minh tài khoản  2: Thông tin cá nhân  3: hoan tat
}


export enum ENUM_STEP_LOAN {
    ONE= 0, 
    TW0= 1,
    THREE= 2,
    DONE= 3,

}