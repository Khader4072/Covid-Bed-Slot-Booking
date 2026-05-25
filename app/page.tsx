"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalCard from "@/components/HospitalCard";
import {
  Activity,
  Search,
  Bed,
  Shield,
  Clock,
  ChevronRight,
  Users,
  Building2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Hospitals Registered", value: "500+", icon: Building2, color: "text-blue-600" },
  { label: "Beds Available", value: "12,000+", icon: Bed, color: "text-green-600" },
  { label: "Patients Helped", value: "50,000+", icon: Users, color: "text-purple-600" },
  { label: "Cities Covered", value: "120+", icon: Activity, color: "text-orange-600" },
];

const features = [
  {
    icon: Search,
    title: "Real-time Availability",
    desc: "Check live bed availability across hospitals in your city instantly.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    desc: "Book a bed in under 2 minutes. No calls, no waiting, no hassle.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Shield,
    title: "Verified Hospitals",
    desc: "All hospitals are verified and approved by our medical team.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Priority",
    desc: "Critical patients get priority booking for ICU and ventilator beds.",
    color: "bg-red-100 text-red-600",
  },
];

const howItWorks = [
  { step: "01", title: "Search", desc: "Enter your city and preferred bed type" },
  { step: "02", title: "Choose", desc: "Pick a verified hospital with available beds" },
  { step: "03", title: "Book", desc: "Fill patient details and submit your request" },
  { step: "04", title: "Confirm", desc: "Receive confirmation and head to hospital" },
];

export default function Home() {
  const { hospitals } = useApp();
  const featuredHospitals = hospitals.filter((h) => h.isVerified).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm mb-6">
            <CheckCircle className="w-4 h-4 text-blue-300" />
            <span className="text-blue-200">Trusted by 50,000+ patients across India</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Find Covid Hospital Beds
            <span className="block text-blue-400">Instantly, Anywhere</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Real-time bed availability across 500+ hospitals. Book General, ICU, Oxygen, and
            Ventilator beds in minutes — not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hospitals"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Find Beds Now
            </Link>
            <Link
              href="/register"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Register as Patient
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className={`w-8 h-8 ${s.color} mx-auto mb-2`} />
              <div className="text-3xl font-extrabold text-slate-800">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Why Choose CoviCare?</h2>
          <p className="text-slate-500">We make finding and booking Covid hospital beds as simple as possible.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center card-hover">
              <div className={`w-12 h-12 ${f.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-slate-400">Book a Covid hospital bed in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-blue-500/30" />
                )}
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-lg font-black mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-white mb-1">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Featured Hospitals</h2>
            <p className="text-slate-500 mt-1">Top verified Covid care centers with available beds</p>
          </div>
          <Link
            href="/hospitals"
            className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHospitals.map((h) => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link
            href="/hospitals"
            className="w-full block text-center border border-blue-600 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50"
          >
            View All Hospitals
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Covid Hospital Bed?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Don't waste time calling hospitals. Book instantly online and get confirmed in minutes.
          </p>
          <Link
            href="/hospitals"
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Book a Bed Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
