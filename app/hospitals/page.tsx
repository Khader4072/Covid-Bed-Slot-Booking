"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalCard from "@/components/HospitalCard";
import { Search, Filter, MapPin, SlidersHorizontal } from "lucide-react";
import { BedType } from "@/lib/types";

const cities = ["All Cities", "Mumbai", "Delhi", "New Delhi", "Bangalore", "Kolkata", "Gurgaon"];
const bedTypeOptions: { value: "all" | BedType; label: string }[] = [
  { value: "all", label: "All Bed Types" },
  { value: "general", label: "General Ward" },
  { value: "icu", label: "ICU" },
  { value: "oxygen", label: "Oxygen Support" },
  { value: "ventilator", label: "Ventilator" },
];

export default function HospitalsPage() {
  const { hospitals } = useApp();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [bedType, setBedType] = useState<"all" | BedType>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.state.toLowerCase().includes(search.toLowerCase());
    const matchesCity = city === "All Cities" || h.city === city;
    const matchesBed =
      bedType === "all" || h.availableBeds[bedType] > 0;
    const matchesAvailable =
      !onlyAvailable ||
      Object.values(h.availableBeds).some((v) => v > 0);

    return matchesSearch && matchesCity && matchesBed && matchesAvailable;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Find Covid Hospitals</h1>
          <p className="text-blue-200 mb-6">Search across {hospitals.length} hospitals for available beds</p>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by hospital name, city, or state..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex items-center gap-2 text-slate-600">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={bedType}
            onChange={(e) => setBedType(e.target.value as "all" | BedType)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {bedTypeOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 font-medium">Available only</span>
          </label>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-600 text-sm">
            Showing <span className="font-bold text-slate-800">{filtered.length}</span> of {hospitals.length} hospitals
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-slate-600 font-semibold text-lg">No hospitals found</h3>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((h) => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
