export const TODO = "TODO";

export function isTodo(value) {
  return value === TODO;
}

export function hasValue(value) {
  if (value === TODO || value === null || value === undefined) return false;
  return String(value).trim() !== "";
}

export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function normalizePhone(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function isValidIndianMobile(value) {
  return /^[6-9]\d{9}$/.test(normalizePhone(value));
}

export function whatsappHref(number, message = "") {
  if (!hasValue(number)) return null;
  const digits = String(number).replace(/\D/g, "");
  if (digits.length < 10) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function formatPrice(value) {
  if (!hasValue(value)) return null;
  if (typeof value === "number") return `₹${value}`;
  return String(value).startsWith("₹") ? String(value) : `₹${value}`;
}

export function formatTime(time) {
  if (!hasValue(time)) return null;
  const [rawHour, rawMinute = "0"] = String(time).split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  const suffix = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function minutesFromTime(time) {
  const [hour, minute] = String(time).split(":").map(Number);
  return hour * 60 + minute;
}

export function getTodayStatus(hours, timezone = "Asia/Kolkata", now = new Date()) {
  if (!Array.isArray(hours) || hours.length === 0) return null;

  let parts;
  try {
    parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
  } catch {
    return null;
  }

  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  if (!weekday || Number.isNaN(hour) || Number.isNaN(minute)) return null;

  const today = hours.find((entry) => entry.day === weekday);
  if (!today) return null;

  const open = minutesFromTime(today.open);
  const close = minutesFromTime(today.close);
  const current = hour * 60 + minute;
  const overnight = close <= open;
  const isOpen = overnight
    ? current >= open || current < close
    : current >= open && current < close;

  return {
    isOpen,
    label: isOpen ? "Open now" : "Closed now",
    hoursLabel: `${formatTime(today.open)} – ${formatTime(today.close)}`,
    day: weekday,
  };
}

export function todayISO(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function prettyDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function buildReservationMessage(site, form) {
  const lines = [
    `Table request — ${site.name}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Date: ${prettyDate(form.date)}`,
    `Time: ${form.time}`,
    `Guests: ${form.guests}`,
  ];
  if (form.notes) lines.push(`Special request: ${form.notes}`);
  return lines.join("\n");
}
