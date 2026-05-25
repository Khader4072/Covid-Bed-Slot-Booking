"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Bell, Menu, X, Activity, LogOut, User, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { currentUser, logout, notifications } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const unread = notifications.filter(
    (n) => n.userId === currentUser?.id && !n.isRead
  ).length;

  const getDashboardLink = () => {
    if (!currentUser) return "/login";
    if (currentUser.role === "hospital_admin") return "/admin";
    if (currentUser.role === "super_admin") return "/super-admin";
    return "/dashboard";
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Covi<span className="text-blue-600">Care</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/hospitals" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Find Hospitals
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            {currentUser ? (
              <>
                <Link href={getDashboardLink()} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="relative p-2 text-slate-600 hover:text-blue-600"
                  >
                    <Bell className="w-5 h-5" />
                    {unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {unread}
                      </span>
                    )}
                  </button>
                  {dropOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50">
                      <div className="p-4 border-b border-slate-100">
                        <p className="font-semibold text-slate-700">Notifications</p>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.filter((n) => n.userId === currentUser.id).length === 0 ? (
                          <p className="p-4 text-slate-500 text-sm">No notifications</p>
                        ) : (
                          notifications
                            .filter((n) => n.userId === currentUser.id)
                            .map((n) => (
                              <div
                                key={n.id}
                                className={`px-4 py-3 border-b border-slate-50 ${!n.isRead ? "bg-blue-50" : ""}`}
                              >
                                <p className="text-sm font-medium text-slate-700">{n.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{currentUser.name.split(" ")[0]}</span>
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50">
                    <Link
                      href={getDashboardLink()}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={async () => { await logout(); window.location.href = "/"; }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/hospitals" className="text-slate-600 hover:text-blue-600 font-medium py-2">
              Find Hospitals
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium py-2">
              About
            </Link>
            {currentUser ? (
              <>
                <Link href={getDashboardLink()} className="text-slate-600 hover:text-blue-600 font-medium py-2">
                  Dashboard
                </Link>
                <button onClick={async () => { await logout(); window.location.href = "/"; }} className="text-red-600 font-medium py-2 text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 font-medium py-2">Login</Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
