"use client";

import Link from "next/link";
import { Activity, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center mb-6">
        <Activity className="w-9 h-9 text-blue-300" />
      </div>
      <h1 className="text-8xl font-black text-white mb-2">404</h1>
      <h2 className="text-2xl font-bold text-blue-200 mb-3">Page Not Found</h2>
      <p className="text-slate-400 max-w-sm mb-8">
        This page doesn't exist. If you were looking for a hospital bed, we can help with that.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
        <Link
          href="/hospitals"
          className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <Search className="w-4 h-4" /> Find Hospitals
        </Link>
      </div>
    </div>
  );
}
