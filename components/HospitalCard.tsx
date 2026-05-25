"use client";

import Link from "next/link";
import { Hospital } from "@/lib/types";
import { MapPin, Phone, Star, CheckCircle, Bed } from "lucide-react";

interface Props {
  hospital: Hospital;
}

const bedTypes = [
  { key: "general", label: "General", color: "bg-blue-100 text-blue-700" },
  { key: "icu", label: "ICU", color: "bg-red-100 text-red-700" },
  { key: "oxygen", label: "Oxygen", color: "bg-cyan-100 text-cyan-700" },
  { key: "ventilator", label: "Ventilator", color: "bg-purple-100 text-purple-700" },
] as const;

export default function HospitalCard({ hospital }: Props) {
  const totalAvailable = Object.values(hospital.availableBeds).reduce((a, b) => a + b, 0);
  const availabilityColor =
    totalAvailable === 0
      ? "text-red-600 bg-red-50"
      : totalAvailable < 10
      ? "text-yellow-600 bg-yellow-50"
      : "text-green-600 bg-green-50";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
      <div className="relative h-40 bg-gradient-to-br from-blue-600 to-slate-700 overflow-hidden">
        <img
          src={hospital.imageUrl}
          alt={hospital.name}
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 flex items-end p-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {hospital.isVerified && (
                <span className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${availabilityColor}`}>
                {totalAvailable === 0 ? "Full" : `${totalAvailable} beds available`}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-slate-700">{hospital.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-800 text-base leading-tight mb-1">{hospital.name}</h3>
        <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{hospital.city}, {hospital.state}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {bedTypes.map((bt) => (
            <div key={bt.key} className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium ${bt.color}`}>
              <span>{bt.label}</span>
              <span className="font-bold">{hospital.availableBeds[bt.key]}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
          <Phone className="w-3.5 h-3.5" />
          <span>{hospital.phone}</span>
        </div>

        <Link
          href={`/hospitals/${hospital.id}`}
          className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
        >
          View & Book Beds
        </Link>
      </div>
    </div>
  );
}
