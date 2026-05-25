"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCard from "@/components/BookingCard";
import {
  User, Bed, Clock, CheckCircle, XCircle, Search, Bell, ChevronRight
} from "lucide-react";

export default function PatientDashboard() {
  const { currentUser, getUserBookings, updateBookingStatus, notifications, markNotificationRead } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push("/login");
    else if (currentUser.role !== "patient") router.push("/admin");
  }, [currentUser, router]);

  if (!currentUser) return null;

  const bookings = getUserBookings(currentUser.id);
  const userNotifs = notifications.filter((n) => n.userId === currentUser.id);
  const unreadNotifs = userNotifs.filter((n) => !n.isRead);

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: Bed, color: "text-blue-600 bg-blue-50" },
    { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: CheckCircle, color: "text-green-600 bg-green-50" },
    { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: Clock, color: "text-yellow-600 bg-yellow-50" },
    { label: "Rejected", value: bookings.filter((b) => b.status === "rejected").length, icon: XCircle, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
              Welcome, {currentUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-slate-500 mt-1">Manage your Covid bed bookings here</p>
          </div>
          <Link
            href="/hospitals"
            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" /> Book a Bed
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-extrabold text-slate-800">{s.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-lg">My Bookings</h2>
              <span className="text-sm text-slate-500">{bookings.length} total</span>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
                <Bed className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-600 mb-2">No bookings yet</h3>
                <p className="text-slate-400 text-sm mb-4">Find a hospital and book a Covid bed</p>
                <Link
                  href="/hospitals"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors inline-block"
                >
                  Find Hospitals
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <BookingCard
                    key={b.id}
                    booking={b}
                    onAction={updateBookingStatus}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-lg">Notifications</h2>
              {unreadNotifs.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadNotifs.length}
                </span>
              )}
            </div>

            <div className="space-y-3">
              {userNotifs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
                  <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No notifications</p>
                </div>
              ) : (
                userNotifs.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-colors hover:border-blue-200 ${
                      !n.isRead ? "border-blue-200 bg-blue-50" : "border-slate-100"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Bell className={`w-4 h-4 mt-0.5 flex-shrink-0 ${!n.isRead ? "text-blue-500" : "text-slate-400"}`} />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-slate-700 mb-3">Profile</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{currentUser.phone}</p>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <Link href="/hospitals" className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Find a Hospital <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
