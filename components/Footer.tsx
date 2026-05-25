import { Activity, Heart, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Covi<span className="text-blue-400">Care</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              India's fastest Covid bed slot booking platform. We help patients find and
              book hospital beds in real-time during the pandemic.
            </p>
            <div className="flex items-center gap-1 mt-4 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <span>for India</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/hospitals" className="hover:text-blue-400 transition-colors">Find Hospitals</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Patient Login</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition-colors">Register</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Emergency</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> 104 (Health Helpline)</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-red-400" /> 112 (Emergency)</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> support@covicare.in</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> Pan India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2021 CoviCare. All rights reserved.</p>
          <p className="text-sm text-slate-500">
            Demo credentials: <span className="text-blue-400">patient@demo.com</span> |{" "}
            <span className="text-blue-400">admin@demo.com</span> (any password)
          </p>
        </div>
      </div>
    </footer>
  );
}
