"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2, Bed, Users, CheckCircle, XCircle, Activity,
  TrendingUp, MapPin, Star, BarChart3
} from "lucide-react";

export default function SuperAdminPage() {
  const { currentUser, hospitals, bookings } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "hospitals" | "bookings">("overview");

  useEffect(() => {
    if (!currentUser) router.push("/login");
    else if (currentUser.role !== "super_admin") router.push("/dashboard");
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== "super_admin") return null;

  const totalBeds = hospitals.reduce((acc, h) => acc + h.totalBeds, 0);
  const totalAvailable = hospitals.reduce(
    (acc, h) => acc + Object.values(h.availableBeds).reduce((a, b) => a + b, 0),
    0
  );
  const verifiedHospitals = hospitals.filter((h) => h.isVerified).length;

  const globalStats = [
    { label: "Total Hospitals", value: hospitals.length, icon: Building2, color: "text-blue-600 bg-blue-50" },
    { label: "Total Beds", value: totalBeds.toLocaleString(), icon: Bed, color: "text-green-600 bg-green-50" },
    { label: "Available Beds", value: totalAvailable.toLocaleString(), icon: CheckCircle, color: "text-cyan-600 bg-cyan-50" },
    { label: "Total Bookings", value: bookings.length, icon: Users, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto w-full px-4 py-8 flex-1">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Super Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Platform-wide overview and management</p>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-xl text-sm font-medium">
            <Activity className="w-4 h-4" />
            Super Admin
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {globalStats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-extrabold text-slate-800">{s.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {(["overview", "hospitals", "bookings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" /> Booking Status Breakdown
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Confirmed", count: bookings.filter((b) => b.status === "confirmed").length, color: "bg-green-500" },
                  { label: "Pending", count: bookings.filter((b) => b.status === "pending").length, color: "bg-yellow-400" },
                  { label: "Rejected", count: bookings.filter((b) => b.status === "rejected").length, color: "bg-red-400" },
                  { label: "Completed", count: bookings.filter((b) => b.status === "completed").length, color: "bg-blue-400" },
                  { label: "Cancelled", count: bookings.filter((b) => b.status === "cancelled").length, color: "bg-slate-400" },
                ].map((item) => {
                  const pct = bookings.length > 0 ? Math.round((item.count / bookings.length) * 100) : 0;
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600 font-medium">{item.label}</span>
                        <span className="font-bold text-slate-800">{item.count} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" /> Platform Health
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm text-slate-600 font-medium">Hospital Verification Rate</span>
                  <span className="font-bold text-green-600">{Math.round((verifiedHospitals / hospitals.length) * 100)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm text-slate-600 font-medium">Bed Occupancy Rate</span>
                  <span className="font-bold text-orange-600">{Math.round(((totalBeds - totalAvailable) / totalBeds) * 100)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm text-slate-600 font-medium">Booking Confirmation Rate</span>
                  <span className="font-bold text-blue-600">
                    {bookings.length > 0
                      ? Math.round((bookings.filter((b) => b.status === "confirmed").length / bookings.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-sm text-slate-600 font-medium">Critical Cases</span>
                  <span className="font-bold text-red-600">
                    {bookings.filter((b) => b.covidSeverity === "critical").length} bookings
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hospitals" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-5 py-3.5 text-sm font-semibold text-slate-600">Hospital</th>
                    <th className="text-left px-5 py-3.5 text-sm font-semibold text-slate-600">Location</th>
                    <th className="text-center px-5 py-3.5 text-sm font-semibold text-slate-600">Status</th>
                    <th className="text-center px-5 py-3.5 text-sm font-semibold text-slate-600">Available</th>
                    <th className="text-center px-5 py-3.5 text-sm font-semibold text-slate-600">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((h) => {
                    const available = Object.values(h.availableBeds).reduce((a, b) => a + b, 0);
                    return (
                      <tr key={h.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800 text-sm">{h.name}</div>
                          <div className="text-xs text-slate-500">Total: {h.totalBeds} beds</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <MapPin className="w-3.5 h-3.5" />
                            {h.city}, {h.state}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-center">
                          {h.isVerified ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                              <XCircle className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className={`font-bold text-sm ${available === 0 ? "text-red-600" : "text-green-600"}`}>
                            {available}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-slate-700">{h.rating}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-5 py-3.5 text-sm font-semibold text-slate-600">Patient</th>
                    <th className="text-left px-5 py-3.5 text-sm font-semibold text-slate-600">Hospital</th>
                    <th className="text-center px-5 py-3.5 text-sm font-semibold text-slate-600">Bed Type</th>
                    <th className="text-center px-5 py-3.5 text-sm font-semibold text-slate-600">Severity</th>
                    <th className="text-center px-5 py-3.5 text-sm font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800 text-sm">{b.patientName}</div>
                        <div className="text-xs text-slate-500">{b.patientPhone}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{b.hospitalName}</td>
                      <td className="px-5 py-4 text-center">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full capitalize">
                          {b.bedType}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                          b.covidSeverity === "critical" ? "bg-red-100 text-red-700" :
                          b.covidSeverity === "severe" ? "bg-orange-100 text-orange-700" :
                          b.covidSeverity === "moderate" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {b.covidSeverity}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                          b.status === "confirmed" ? "bg-green-100 text-green-700" :
                          b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          b.status === "rejected" ? "bg-red-100 text-red-700" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
