"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin, Phone, Mail, Star, CheckCircle, Bed, ArrowLeft, AlertTriangle
} from "lucide-react";
import { getBedTypeLabel, getBedTypeColor } from "@/lib/utils";
import { BedType } from "@/lib/types";
import BedAvailabilityBar from "@/components/BedAvailabilityBar";

const bedTypes: BedType[] = ["general", "icu", "oxygen", "ventilator"];
const severities = ["mild", "moderate", "severe", "critical"] as const;

export default function HospitalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { hospitals, currentUser, addBooking } = useApp();
  const router = useRouter();

  const hospital = hospitals.find((h) => h.id === id);

  const [selectedBed, setSelectedBed] = useState<BedType | null>(null);
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe" | "critical">("mild");
  const [admissionDate, setAdmissionDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  if (!hospital) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Hospital not found</h2>
            <Link href="/hospitals" className="text-blue-600 hover:underline">← Back to hospitals</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (!selectedBed) return;

    const result = await addBooking({
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      bedType: selectedBed,
      admissionDate,
      covidSeverity: severity,
      notes,
    });
    if (result) setSubmitted(true);
  };

  const totalAvailable = Object.values(hospital.availableBeds).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1">
        <Link href="/hospitals" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Hospitals
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="relative h-48 bg-gradient-to-br from-blue-700 to-slate-800">
            <img
              src={hospital.imageUrl}
              alt={hospital.name}
              className="w-full h-full object-cover opacity-40"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {hospital.isVerified && (
                    <span className="flex items-center gap-1 bg-green-500 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${totalAvailable === 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {totalAvailable === 0 ? "No Beds Available" : `${totalAvailable} Beds Available`}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">{hospital.name}</h1>
                <div className="flex items-center gap-3 mt-1 text-blue-200 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{hospital.address}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{hospital.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>{hospital.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{hospital.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Pincode: {hospital.pincode}</span>
              </div>
            </div>

            <h2 className="font-bold text-slate-800 text-lg mb-4">Bed Availability</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bedTypes.map((bt) => {
                const count = hospital.availableBeds[bt];
                return (
                  <div
                    key={bt}
                    onClick={() => count > 0 && setSelectedBed(bt)}
                    className={`rounded-xl p-4 border-2 text-center cursor-pointer transition-all ${
                      selectedBed === bt
                        ? "border-blue-500 bg-blue-50"
                        : count === 0
                        ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                        : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <Bed className={`w-6 h-6 mx-auto mb-2 ${count === 0 ? "text-slate-300" : "text-blue-500"}`} />
                    <div className={`text-2xl font-extrabold mb-1 ${count === 0 ? "text-slate-400" : "text-slate-800"}`}>{count}</div>
                    <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getBedTypeColor(bt)}`}>
                      {getBedTypeLabel(bt)}
                    </div>
                    {count === 0 && <p className="text-xs text-red-500 mt-1">Full</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Availability sidebar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <h2 className="font-bold text-slate-800 text-lg mb-4">Live Bed Availability</h2>
          <BedAvailabilityBar availableBeds={hospital.availableBeds} totalBeds={hospital.totalBeds} />
          <p className="text-xs text-slate-400 mt-4 text-center">
            Updated in real-time · Click a bed type in the grid above to select
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Booking Submitted!</h2>
            <p className="text-green-600 mb-6">
              Your {selectedBed && getBedTypeLabel(selectedBed)} bed request at{" "}
              <strong>{hospital.name}</strong> is under review. You'll be notified once confirmed.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
                View My Bookings
              </Link>
              <Link href="/hospitals" className="border border-green-300 text-green-700 font-bold px-6 py-2.5 rounded-xl hover:bg-green-50 transition-colors">
                Find More Hospitals
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="font-bold text-slate-800 text-lg mb-1">Book a Bed</h2>
            <p className="text-slate-500 text-sm mb-6">
              Select a bed type above, then fill in your details below.
            </p>

            {!currentUser && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-700 flex items-center gap-2 mb-5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>You must be <Link href="/login" className="font-semibold underline">logged in</Link> to book a bed.</span>
              </div>
            )}

            <form onSubmit={handleBook} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Selected Bed Type</label>
                <div className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 bg-slate-50">
                  {selectedBed ? getBedTypeLabel(selectedBed) : "Click a bed type above to select"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Covid Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as typeof severity)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {severities.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Admission Date</label>
                <input
                  type="date"
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Symptoms, medication history, special requirements..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedBed || !currentUser}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                Submit Booking Request
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
