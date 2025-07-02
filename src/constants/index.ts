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
      return "Chờ xin giải ngân";
    case 1:
      return "Chờ xác nhận OTP";
    case 2:
      return "Chờ xác minh hợp đồng";
    case 3:
      return "Đang xác minh hợp đồng";
    case 4:
      return "Đang trong hợp đồng";
  }
};

export const getStatusOTP = (status: number) => {
  switch (status) {
    case 0:
      return "Xin giải ngân";
    case 1:
      return "Chờ xác nhận OTP";
  }
};

export const USER_ID = Number(import.meta.env.VITE_USER_ID);
