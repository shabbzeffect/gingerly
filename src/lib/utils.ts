export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatKes(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "Price on enquiry";
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function timeZones() {
  return [
    { label: "Nairobi (EAT, UTC+3)", value: "Africa/Nairobi" },
    { label: "London (GMT/BST)", value: "Europe/London" },
    { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
    { label: "New York (ET)", value: "America/New_York" },
  ] as const;
}

export function formatEventDate(date: string | Date, tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(date));
}
