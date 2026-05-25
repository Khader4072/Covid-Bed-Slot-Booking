"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCard from "@/components/BookingCard";
import {
  Building2, Bed, Clock, CheckCircle, XCircle, Users, Activity, BarChart3
} from "lucide-react";
import BedAvailabilityBar from "@/components/BedAvailabilityBar";
import { BookingStatus } from "@/lib/types";

export default function AdminDashboard() {
  const { currentUser, hospitals, getHospitalBookings, updateBookingStatus } = useApp();
  const router = useRouter();
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  useEffect(() => {
    if (!currentUser) router.push("/login");
    else if (currentUser.role === "patient") router.push("/dashboard");
  }, [currentUser, router]);

  if (!currentUser || currentUser.role === "patient") return null;

  const hospital = hospitals.find((h) => h.id === currentUser.hospitalId);
  const allBookings = hospital
    ? getHospitalBookings(hospital.id)
    : [];
  const filteredBookings = filter === "all" ? allBookings : allBookings.filter((b) => b.status === filter);

  const stats = hospital
    ? [
        { label: "Total Beds", value: hospital.totalBeds, icon: Bed, color: "text-blue-600 bg-blue-50" },
        { label: "Available", value: Object.values(hospital.availableBeds).reduce((a, b) => a + b, 0), icon: CheckCircle, color: "text-green-600 bg-green-50" },
        { label: "Total Bookings", value: allBookings.length, icon: Users, color: "text-purple-600 bg-purple-50" },
        { label: "Pending", value: allBookings.filter((b) => b.status === "pending").length, icon: Clock, color: "text-yellow-600 bg-yellow-50" },
      ]
    : [];

  const statusFilters: { value: BookingStatus | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "rejected", label: "Rejected" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full px-4 py-8 flex-1">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Hospital Admin Dashboard</h1>
            <p className="text-slate-500 mt-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {hospital?.name || "Hospital Management"}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-medium">
            <Activity className="w-4 h-4" />
            Live Dashboard
          </div>
        </div>

        {hospital && (
          <>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Bed className="w-5 h-5 text-blue-500" /> Bed Availability
                </h2>
                <BedAvailabilityBar availableBeds={hospital.availableBeds} totalBeds={hospital.totalBeds} />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" /> Booking Summary
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Confirmed", count: allBookings.filter((b) => b.status === "confirmed").length, color: "bg-green-500" },
                    { label: "Pending Review", count: allBookings.filter((b) => b.status === "pending").length, color: "bg-yellow-400" },
                    { label: "Rejected", count: allBookings.filter((b) => b.status === "rejected").length, color: "bg-red-400" },
                    { label: "Completed", count: allBookings.filter((b) => b.status === "completed").length, color: "bg-blue-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm text-slate-600">{item.label}</span>
                      </div>
                      <span className="font-bold text-slate-800">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 text-lg">Booking Requests</h2>
            <div className="flex gap-2 flex-wrap">
              {statusFilters.map((sf) => (
                <button
                  key={sf.value}
                  onClick={() => setFilter(sf.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === sf.value
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {sf.label}
                </button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-600">No bookings in this category</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBookings.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  isAdmin
                  onAction={updateBookingStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
