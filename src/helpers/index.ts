export function formatNumber(value: number | string) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function parseFormattedNumber(value: string) {
  return Number(value.replace(/\./g, ""));
}


export function safeParseJSON<T>(value: string | undefined): T | null {
  try {
    if (!value) return null;
    return JSON.parse(value);
  } catch (e) {
    console.error("❌ Lỗi parse JSON:", e);
    return null;
  }
}

export function generateCode(id: number): string {
  const now = new Date();
  const year = now.getFullYear() % 100; // lấy 2 số cuối của năm (2025 => 25)
  const month = String(now.getMonth() + 1).padStart(2, '0'); // tháng (01–12)
  const day = String(now.getDate()).padStart(2, '0'); // ngày (01–31)
  const paddedId = String(id).padStart(3, '0'); // id pad đủ 3 chữ số

  return `HD000${year}${month}${day}${paddedId}`;
}
