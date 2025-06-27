export interface LoginLog {
  id: number; // ID duy nhất
  user_id: number; // ID người dùng liên kết
  ip_public: string; // IP public
  description: string; // Mô tả
  status: number; // Trạng thái (có thể sửa lại thành enum nếu có giá trị cố định)
  created_at: string; // Thời gian tạo (ISO string), có thể đổi sang Date nếu cần
  browser: string;
}
