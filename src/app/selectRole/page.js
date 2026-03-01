"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RoleSelect() {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0b0e] flex flex-col items-center justify-center px-6 font-sans overflow-hidden relative">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          CITY<span className="text-red-500">FIX</span>
        </h1>
        <p className="text-[#444] text-sm mt-2 tracking-widest uppercase">Who are you?</p>
      </div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl">

        {/* User Card */}
        <button
          onMouseEnter={() => setHovered("user")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => router.push("/signUp")}
          className="group flex-1 relative bg-[#111318] border border-[#1e2028] rounded-2xl p-8 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] text-left"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110">
            🙋
          </div>

          <div className="text-center">
            <p className="text-white text-lg font-bold mb-1">I'm a Citizen</p>
            <p className="text-[#555] text-xs leading-relaxed">
              Report civic issues, upvote problems in your area, and track resolution progress.
            </p>
          </div>

          {/* Arrow */}
          <div className={`mt-auto flex items-center gap-1.5 text-blue-400 text-xs font-semibold transition-all duration-300 ${hovered === "user" ? "opacity-100 translate-x-1" : "opacity-0"}`}>
            Enter as Citizen <span>→</span>
          </div>

          {/* Active border glow */}
          <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-300 pointer-events-none" />
        </button>

        {/* Divider */}
        <div className="flex sm:flex-col items-center justify-center gap-2">
          <div className="flex-1 h-px sm:h-full sm:w-px bg-[#1e2028]" />
          <span className="text-[#333] text-xs font-mono">OR</span>
          <div className="flex-1 h-px sm:h-full sm:w-px bg-[#1e2028]" />
        </div>

        {/* Admin Card */}
        <button
          onMouseEnter={() => setHovered("admin")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => router.push("/adminLogIn")}
          className="group flex-1 relative bg-[#111318] border border-[#1e2028] rounded-2xl p-8 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_12px_40px_rgba(255,80,80,0.12)] text-left"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl transition-all duration-300 group-hover:bg-red-500/20 group-hover:scale-110">
            🛡️
          </div>

          <div className="text-center">
            <p className="text-white text-lg font-bold mb-1">I'm an Admin</p>
            <p className="text-[#555] text-xs leading-relaxed">
              Manage reported issues, update statuses, and oversee city operations.
            </p>
          </div>

          {/* Arrow */}
          <div className={`mt-auto flex items-center gap-1.5 text-red-400 text-xs font-semibold transition-all duration-300 ${hovered === "admin" ? "opacity-100 translate-x-1" : "opacity-0"}`}>
            Enter as Admin <span>→</span>
          </div>

          {/* Active border glow */}
          <div className="absolute inset-0 rounded-2xl border border-red-500/0 group-hover:border-red-500/30 transition-all duration-300 pointer-events-none" />
        </button>

      </div>

      {/* Footer */}
      <p className="mt-10 text-[#2a2a2a] text-[11px] tracking-widest uppercase">
        CityFix · Built for better cities
      </p>

    </div>
  );
}