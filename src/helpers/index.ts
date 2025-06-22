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
