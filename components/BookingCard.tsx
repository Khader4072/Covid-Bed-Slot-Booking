"use client";

import { Booking } from "@/lib/types";
import { getBedTypeLabel, getBedTypeColor, getStatusColor, getSeverityColor, formatDate, formatDateTime } from "@/lib/utils";
import { Calendar, Clock, AlertCircle } from "lucide-react";

interface Props {
  booking: Booking;
  onAction?: (id: string, action: "confirmed" | "rejected" | "cancelled") => void | Promise<void>;
  isAdmin?: boolean;
}

export default function BookingCard({ booking, onAction, isAdmin }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800">{isAdmin ? booking.patientName : booking.hospitalName}</h3>
          <p className="text-slate-500 text-sm">{isAdmin ? booking.patientPhone : `Booking #${booking.id}`}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getBedTypeColor(booking.bedType)}`}>
            {getBedTypeLabel(booking.bedType)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-slate-600">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Admission: {formatDate(booking.admissionDate)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Booked: {formatDateTime(booking.bookedAt)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-600">Severity:</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getSeverityColor(booking.covidSeverity)}`}>
          {booking.covidSeverity.charAt(0).toUpperCase() + booking.covidSeverity.slice(1)}
        </span>
      </div>

      {booking.notes && (
        <p className="text-sm text-slate-500 bg-slate-50 rounded-lg px-3 py-2 mb-3">
          {booking.notes}
        </p>
      )}

      {isAdmin && booking.status === "pending" && onAction && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onAction(booking.id, "confirmed")}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => onAction(booking.id, "rejected")}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-2 rounded-xl transition-colors"
          >
            Reject
          </button>
        </div>
      )}

      {!isAdmin && booking.status === "confirmed" && onAction && (
        <button
          onClick={() => onAction(booking.id, "cancelled")}
          className="mt-3 w-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold py-2 rounded-xl transition-colors"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
