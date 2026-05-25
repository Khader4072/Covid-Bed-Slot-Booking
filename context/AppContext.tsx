"use client";

import React, {
  createContext, useContext, useState, useCallback,
  useEffect, ReactNode,
} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { User, Hospital, Booking, Notification } from "@/lib/types";

interface AppContextType {
  currentUser: User | null;
  hospitals: Hospital[];
  bookings: Booking[];
  notifications: Notification[];
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  addBooking: (data: {
    hospitalId: string; hospitalName: string; bedType: string;
    admissionDate: string; covidSeverity: string; notes?: string;
  }) => Promise<Booking | null>;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  getHospitalBookings: (hospitalId: string) => Booking[];
  getUserBookings: (userId: string) => Booking[];
  refreshHospitals: () => Promise<void>;
  refreshBookings: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser: User | null = session?.user
    ? {
        id: (session.user as any).id,
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        role: (session.user as any).role,
        hospitalId: (session.user as any).hospitalId,
        phone: (session.user as any).phone,
        createdAt: "",
      }
    : null;

  const refreshHospitals = useCallback(async () => {
    try {
      const res = await fetch("/api/hospitals");
      if (res.ok) setHospitals(await res.json());
    } catch {}
  }, []);

  const refreshBookings = useCallback(async () => {
    if (!session?.user) return;
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) setBookings(await res.json());
    } catch {}
  }, [session]);

  const refreshNotifications = useCallback(async () => {
    if (!session?.user) return;
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) setNotifications(await res.json());
    } catch {}
  }, [session]);

  useEffect(() => {
    setLoading(true);
    refreshHospitals().finally(() => setLoading(false));
  }, [refreshHospitals]);

  useEffect(() => {
    if (status === "authenticated") {
      refreshBookings();
      refreshNotifications();
    }
  }, [status, refreshBookings, refreshNotifications]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const result = await signIn("credentials", {
      email, password, redirect: false,
    });
    return !result?.error;
  }, []);

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    setBookings([]);
    setNotifications([]);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, phone: string): Promise<boolean> => {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone }),
        });
        if (!res.ok) return false;
        const result = await signIn("credentials", { email, password, redirect: false });
        return !result?.error;
      } catch {
        return false;
      }
    },
    []
  );

  const addBooking = useCallback(async (data: {
    hospitalId: string; hospitalName: string; bedType: string;
    admissionDate: string; covidSeverity: string; notes?: string;
  }): Promise<Booking | null> => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return null;
      const booking = await res.json();
      setBookings((prev) => [booking, ...prev]);
      await refreshHospitals();
      await refreshNotifications();
      return booking;
    } catch {
      return null;
    }
  }, [refreshHospitals, refreshNotifications]);

  const updateBookingStatus = useCallback(
    async (bookingId: string, status: Booking["status"]) => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (res.ok) {
          setBookings((prev) =>
            prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
          );
          await refreshNotifications();
        }
      } catch {}
    },
    [refreshNotifications]
  );

  const markNotificationRead = useCallback(async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {}
  }, []);

  const getHospitalBookings = useCallback(
    (hospitalId: string) => bookings.filter((b) => b.hospitalId === hospitalId),
    [bookings]
  );

  const getUserBookings = useCallback(
    (userId: string) => bookings.filter((b) => b.patientId === userId),
    [bookings]
  );

  return (
    <AppContext.Provider
      value={{
        currentUser,
        hospitals,
        bookings,
        notifications,
        loading,
        login,
        logout,
        register,
        addBooking,
        updateBookingStatus,
        markNotificationRead,
        getHospitalBookings,
        getUserBookings,
        refreshHospitals,
        refreshBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
