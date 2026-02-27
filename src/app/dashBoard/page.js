"use client"
import Link from "next/link";
import { useState } from "react";

const stats = [
  { label: "Total Issues", value: "1,284", change: "+12%", icon: "🗂️", color: "from-emerald-500/20 to-teal-500/10" },
  { label: "Resolved", value: "947", change: "+8%", icon: "✅", color: "from-green-500/20 to-emerald-500/10" },
  { label: "Pending", value: "237", change: "-3%", icon: "⏳", color: "from-yellow-500/20 to-amber-500/10" },
  { label: "Upvotes Today", value: "3,891", change: "+24%", icon: "👆", color: "from-teal-500/20 to-cyan-500/10" },
];

const recentIssues = [
  { id: "#1042", title: "Broken streetlight near MG Road", category: "Streetlight", status: "Pending", upvotes: 142, time: "2h ago", priority: "high" },
  { id: "#1041", title: "Pothole on NH-48 bypass stretch", category: "Roads", status: "In Progress", upvotes: 98, time: "4h ago", priority: "high" },
  { id: "#1040", title: "Garbage overflow at Sector 12", category: "Sanitation", status: "Resolved", upvotes: 76, time: "6h ago", priority: "medium" },
  { id: "#1039", title: "Water logging near bus stand", category: "Drainage", status: "Pending", upvotes: 54, time: "1d ago", priority: "medium" },
  { id: "#1038", title: "Broken park bench, Lodi Garden", category: "Parks", status: "Resolved", upvotes: 31, time: "2d ago", priority: "low" },
];

const statusColor = {
  "Pending": "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  "In Progress": "bg-teal-500/20 text-teal-300 border border-teal-500/30",
  "Resolved": "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
};

const priorityDot = {
  high: "bg-red-400",
  medium: "bg-yellow-400",
  low: "bg-emerald-400",
};

const categories = [
  { name: "Roads", count: 412, pct: 32 },
  { name: "Streetlight", count: 298, pct: 23 },
  { name: "Sanitation", count: 257, pct: 20 },
  { name: "Drainage", count: 193, pct: 15 },
  { name: "Parks", count: 124, pct: 10 },
];

const navItems = ["Dashboard", "Issues", "Map View", "Reports", "Settings"];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 50%, #0a1120 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        .accent { color: #00d9a3; }
        .glow { box-shadow: 0 0 24px rgba(0,217,163,0.15); }
        .card-hover { transition: all 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,217,163,0.1); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #00d9a330; border-radius: 2px; }
        .bar-fill { transition: width 1s cubic-bezier(.4,0,.2,1); }
        .sidebar-overlay { display: none; }
        @media (max-width: 1023px) {
          .sidebar-overlay { display: block; }
        }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 flex flex-col z-30 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{ background: "rgba(10,15,30,0.97)", borderRight: "1px solid rgba(0,217,163,0.1)" }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(0,217,163,0.1)" }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "#00d9a3", color: "#0a0f1e", fontFamily: "Syne, sans-serif" }}>C</div>
          <span className="text-xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>CityFix</span>
          {/* Close button on mobile */}
          <button
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item} onClick={() => { setActiveNav(item); setSidebarOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={activeNav === item
                ? { background: "rgba(0,217,163,0.15)", color: "#00d9a3", borderLeft: "3px solid #00d9a3" }
                : { color: "#94a3b8" }}>
              {item}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(0,217,163,0.1)" }}>
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "#00d9a3", color: "#0a0f1e" }}>A</div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs truncate" style={{ color: "#64748b" }}>admin@cityfix.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(10,15,30,0.97)", borderBottom: "1px solid rgba(0,217,163,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white p-1"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ background: "#00d9a3", color: "#0a0f1e", fontFamily: "Syne, sans-serif" }}>C</div>
          <span className="text-lg font-bold" style={{ fontFamily: "Syne, sans-serif" }}>CityFix</span>
        </div>
        <Link href="/reportIssue">
          <button className="px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "#00d9a3", color: "#0a0f1e" }}>
            + Report
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <p className="text-sm mb-1" style={{ color: "#64748b" }}>Good morning, Admin 👋</p>
            <h1 className="text-2xl lg:text-3xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
              Dashboard <span style={{ color: "#00d9a3" }}>Overview</span>
            </h1>
          </div>
          {/* Desktop header actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}>
              📅 Feb 27, 2026
            </div>
            <Link href="/reportIssue">
              <button className="cursor-pointer px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ background: "#00d9a3", color: "#0a0f1e" }}>
                + Report Issue
              </button>
            </Link>
          </div>
          {/* Mobile date */}
          <div className="lg:hidden px-3 py-1.5 rounded-xl text-xs" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}>
            📅 Feb 27
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`card-hover rounded-2xl p-4 lg:p-5 bg-gradient-to-br ${s.color}`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-start justify-between mb-2 lg:mb-3">
                <span className="text-xl lg:text-2xl">{s.icon}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${s.change.startsWith("+") ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                  {s.change}
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{s.value}</p>
              <p className="text-xs lg:text-sm" style={{ color: "#64748b" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">

          {/* Recent Issues */}
          <div className="xl:col-span-2 rounded-2xl p-4 lg:p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-4 lg:mb-5">
              <h2 className="font-bold text-base lg:text-lg" style={{ fontFamily: "Syne, sans-serif" }}>Recent Issues</h2>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "rgba(0,217,163,0.1)", color: "#00d9a3", border: "1px solid rgba(0,217,163,0.2)" }}>
                View All →
              </button>
            </div>
            <div className="space-y-2 lg:space-y-3">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="card-hover flex items-center gap-3 p-3 lg:p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[issue.priority]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-mono" style={{ color: "#00d9a3" }}>{issue.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}>{issue.category}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{issue.title}</p>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                    <span className="text-xs hidden sm:inline" style={{ color: "#64748b" }}>👆 {issue.upvotes}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[issue.status]}`}>
                      {/* Shorten label on small screens */}
                      <span className="hidden sm:inline">{issue.status}</span>
                      <span className="sm:hidden">{issue.status === "In Progress" ? "Active" : issue.status}</span>
                    </span>
                    <span className="text-xs hidden md:block w-12 text-right" style={{ color: "#475569" }}>{issue.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="rounded-2xl p-4 lg:p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="font-bold text-base lg:text-lg mb-4 lg:mb-5" style={{ fontFamily: "Syne, sans-serif" }}>By Category</h2>
            <div className="space-y-3 lg:space-y-4">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{cat.name}</span>
                    <span style={{ color: "#64748b" }}>{cat.count}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div className="h-full rounded-full bar-fill"
                      style={{ width: `${cat.pct}%`, background: "linear-gradient(90deg, #00d9a3, #00b8d4)" }} />
                  </div>
                  <p className="text-xs mt-0.5 text-right" style={{ color: "#475569" }}>{cat.pct}%</p>
                </div>
              ))}
            </div>

            {/* Quick Summary */}
            <div className="mt-4 lg:mt-6 p-4 rounded-xl" style={{ background: "rgba(0,217,163,0.08)", border: "1px solid rgba(0,217,163,0.2)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#00d9a3" }}>Resolution Rate</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>73.7%</p>
              <p className="text-xs mt-1" style={{ color: "#64748b" }}>947 of 1,284 issues resolved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}