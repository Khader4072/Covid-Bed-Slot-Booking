"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Activity, Shield, Clock, Users, Building2, Bed,
  HeartHandshake, Code2, Database, Globe, CheckCircle
} from "lucide-react";

const techStack = [
  { icon: Code2, name: "Next.js 14", desc: "App Router, SSR, TypeScript" },
  { icon: Database, name: "React Context", desc: "Global state management" },
  { icon: Globe, name: "Tailwind CSS", desc: "Utility-first styling" },
  { icon: Activity, name: "Lucide Icons", desc: "Clean SVG icon system" },
];

const features = [
  "Real-time Covid bed availability tracking",
  "Multi-role authentication (Patient, Hospital Admin, Super Admin)",
  "Hospital search with city & bed-type filters",
  "One-click bed booking with severity assessment",
  "Hospital admin dashboard — confirm or reject requests",
  "Super admin platform overview with analytics",
  "In-app notification system",
  "Fully responsive mobile-first design",
  "Booking lifecycle management",
  "Verified hospital badges",
];

const timeline = [
  { year: "Apr 2021", event: "Platform launched during India's second Covid wave" },
  { year: "May 2021", event: "500+ hospitals onboarded across 10 states" },
  { year: "Jun 2021", event: "50,000 patients helped find beds" },
  { year: "Jul 2021", event: "ICU & Ventilator priority booking introduced" },
  { year: "Aug 2021", event: "Super Admin analytics dashboard released" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HeartHandshake className="w-9 h-9 text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About CoviCare</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            CoviCare was built to solve one of India's most critical problems during the pandemic —
            families desperately calling hospitals only to find no beds available. We built a platform
            to change that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Clock, title: "Speed", desc: "Book a bed in under 2 minutes, not hours of phone calls.", color: "bg-blue-100 text-blue-600" },
            { icon: Shield, title: "Trust", desc: "Every hospital is verified by our medical review team before listing.", color: "bg-green-100 text-green-600" },
            { icon: Users, title: "Access", desc: "Available 24/7, across 120+ cities for every patient in need.", color: "bg-purple-100 text-purple-600" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center card-hover">
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Platform Features</h2>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Timeline</h2>
            <div className="relative pl-6 border-l-2 border-blue-200 space-y-6">
              {timeline.map((t) => (
                <div key={t.year} className="relative">
                  <div className="absolute -left-[25px] w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow" />
                  <p className="text-xs font-bold text-blue-600 mb-0.5">{t.year}</p>
                  <p className="text-slate-600 text-sm">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-center card-hover">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <t.icon className="w-5 h-5 text-slate-700" />
                </div>
                <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-800 rounded-2xl p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-8">Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, value: "500+", label: "Hospitals" },
              { icon: Bed, value: "12,000+", label: "Beds Tracked" },
              { icon: Users, value: "50,000+", label: "Patients Served" },
              { icon: Globe, value: "120+", label: "Cities" },
            ].map((s) => (
              <div key={s.label}>
                <s.icon className="w-7 h-7 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-extrabold">{s.value}</div>
                <div className="text-slate-400 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Try the Demo</h2>
          <p className="text-slate-500 mb-6">
            Log in with demo credentials to explore all three user roles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Login as Patient
            </Link>
            <Link href="/hospitals" className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl transition-colors">
              Browse Hospitals
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
