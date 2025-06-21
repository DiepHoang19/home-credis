export interface STEP_TYPE{
    label: string,
    key: number,
}

export const LOANS_STEPS =  [
        {
            label: 'Chọn khoản vay',
            key: 1
        },
         {
            label: 'Xác minh tài khoản',
            key: 2
        },
         {
            label: 'Thông tin cá nhân',
            key: 3
        },
    ] as STEP_TYPE[]

function formatNumber(value: number | string) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseFormattedNumber(value: string) {
  return Number(value.replace(/\./g, ""));
}