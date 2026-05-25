export type UserRole = "patient" | "hospital_admin" | "super_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hospitalId?: string;
  phone?: string;
  createdAt: string;
}

export type BedType = "general" | "icu" | "oxygen" | "ventilator";

export interface Bed {
  id: string;
  hospitalId: string;
  type: BedType;
  isAvailable: boolean;
  floor: string;
  ward: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  isVerified: boolean;
  totalBeds: number;
  availableBeds: {
    general: number;
    icu: number;
    oxygen: number;
    ventilator: number;
  };
  rating: number;
  imageUrl: string;
  pincode: string;
}

export type BookingStatus = "pending" | "confirmed" | "rejected" | "cancelled" | "completed";

export interface Booking {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  hospitalId: string;
  hospitalName: string;
  bedType: BedType;
  status: BookingStatus;
  bookedAt: string;
  admissionDate: string;
  notes?: string;
  covidSeverity: "mild" | "moderate" | "severe" | "critical";
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: "booking" | "update" | "alert";
}
