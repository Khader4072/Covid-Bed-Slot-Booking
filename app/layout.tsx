import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: "CoviCare – Covid Bed Slot Booking",
  description: "Find and book Covid hospital beds instantly across India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50">
        <SessionWrapper>
          <AppProvider>{children}</AppProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
