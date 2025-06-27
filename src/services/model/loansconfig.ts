export interface LoansConfig {
  max_loan_amount: number; // Số tiền vay tối đa (VND)
  max_loan_months: number; // Số tháng vay tối đa
  min_loan_amount: number; // Số tiền vay tối thiểu (VND)
  min_loan_months: number; // Số tháng vay tối thiểu
  interest_rate_fixed: number; // Lãi suất cố định (% hoặc số thập phân)
  signature: string;
}
