import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BedType, BookingStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBedTypeLabel(type: BedType): string {
  const labels: Record<BedType, string> = {
    general: "General Ward",
    icu: "ICU",
    oxygen: "Oxygen Support",
    ventilator: "Ventilator",
  };
  return labels[type];
}

export function getBedTypeColor(type: BedType): string {
  const colors: Record<BedType, string> = {
    general: "bg-blue-100 text-blue-700",
    icu: "bg-red-100 text-red-700",
    oxygen: "bg-cyan-100 text-cyan-700",
    ventilator: "bg-purple-100 text-purple-700",
  };
  return colors[type];
}

export function getStatusColor(status: BookingStatus): string {
  const colors: Record<BookingStatus, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-700",
    completed: "bg-blue-100 text-blue-700",
  };
  return colors[status];
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    mild: "bg-green-100 text-green-700",
    moderate: "bg-yellow-100 text-yellow-700",
    severe: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
  };
  return colors[severity] || "bg-gray-100 text-gray-700";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
