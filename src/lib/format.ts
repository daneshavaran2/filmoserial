export function toPersianDigits(value: string | number) {
  return String(value).replace(/[0-9]/g, (digit) =>
    "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]
  );
}

export function formatJalaliDate(dateString: string | null | undefined) {
  if (!dateString) return "نامشخص";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "نامشخص";
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(date);
}

export function formatJalaliYear(dateString: string | null | undefined) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(date);
}

export function formatRating(value: number) {
  return toPersianDigits(value.toFixed(1));
}

export function formatRuntime(minutes: number | null | undefined) {
  if (!minutes) return "نامشخص";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const parts: string[] = [];
  if (hours > 0) parts.push(`${toPersianDigits(hours)} ساعت`);
  if (mins > 0) parts.push(`${toPersianDigits(mins)} دقیقه`);
  return parts.join(" و ") || "نامشخص";
}
