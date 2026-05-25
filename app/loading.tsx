import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
        </div>
        <p className="text-slate-500 text-sm mt-3 font-medium">Loading CoviCare...</p>
      </div>
    </div>
  );
}
