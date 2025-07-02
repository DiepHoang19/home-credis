export interface Notification {
  id: number | string;
  content: string;
  phone_number: string;
  createdAt: string; // hoặc Date nếu bạn xử lý nó dưới dạng đối tượng Date
  isseen: boolean;
  notifications_notification_config: {
    code: string;
    title: string;
  };
}
