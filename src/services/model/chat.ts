export interface IChatMessage {
  id: number; // ID của tin nhắn
  created_at: string; // Ngày giờ tạo (ISO 8601 format: "2025-06-04T12:00:00Z")
  message: string; // Nội dung tin nhắn
  reply_id?: number; // ID của tin nhắn được reply (nếu có)
  send_id: number; // ID của người gửi
  room_id: number; // ID của phòng chat
}
