export interface STEP_TYPE {
  label: string;
  key: number;
}

export const LOANS_STEPS = [
  {
    label: "Chọn khoản vay",
    key: 1,
  },
  {
    label: "Xác minh tài khoản",
    key: 2,
  },
  {
    label: "Thông tin cá nhân",
    key: 3,
  },
] as STEP_TYPE[];

export const INFO_BANK = {
  label: "Thông tin ngân hàng",
  key: 4,
};

export const SIGN_COMFIRM = {
  label: "Ký xác nhận",
  key: 5,
};

export const CCCD_STEPS = [
  {
    label: "CMND mặt trước",
    key: 1,
  },
  {
    label: "CMND mặt sau",
    key: 2,
  },
  {
    label: "Ảnh chân dung",
    key: 3,
  },
] as STEP_TYPE[];

export const getStatus = (status: number) => {
  switch (status) {
    case 0:
      return "Chờ duyệt";
    case 1:
      return "Chờ ký";
    case 2:
      return "Đang vay";
    case 3:
      return "Đã huỷ";
    case 4:
      return "Đã hoàn thành khoản vay";
  }
};

export const USER_ID = Number(import.meta.env.VITE_USER_ID);
