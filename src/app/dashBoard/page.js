"use client"

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

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navItems = ["Dashboard", "Issues", "Map View", "Reports", "Settings"];

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
      `}</style>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 flex flex-col z-10"
        style={{ background: "rgba(10,15,30,0.95)", borderRight: "1px solid rgba(0,217,163,0.1)" }}>
        
        {/* Logo */}
        <div className="p-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(0,217,163,0.1)" }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "#00d9a3", color: "#0a0f1e", fontFamily: "Syne, sans-serif" }}>C</div>
          <span className="text-xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>CityFix</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item} onClick={() => setActiveNav(item)}
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
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "#00d9a3", color: "#0a0f1e" }}>A</div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs" style={{ color: "#64748b" }}>admin@cityfix.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm mb-1" style={{ color: "#64748b" }}>Good morning, Admin 👋</p>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
              Dashboard <span style={{ color: "#00d9a3" }}>Overview</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}>
              📅 Feb 27, 2026
            </div>
            <button className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#00d9a3", color: "#0a0f1e" }}>
              + Report Issue
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`card-hover rounded-2xl p-5 bg-gradient-to-br ${s.color}`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${s.change.startsWith("+") ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                  {s.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{s.value}</p>
              <p className="text-sm" style={{ color: "#64748b" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Recent Issues - spans 2 cols */}
          <div className="col-span-2 rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>Recent Issues</h2>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "rgba(0,217,163,0.1)", color: "#00d9a3", border: "1px solid rgba(0,217,163,0.2)" }}>
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="card-hover flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[issue.priority]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono" style={{ color: "#00d9a3" }}>{issue.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}>{issue.category}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{issue.title}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs" style={{ color: "#64748b" }}>👆 {issue.upvotes}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[issue.status]}`}>
                      {issue.status}
                    </span>
                    <span className="text-xs w-12 text-right" style={{ color: "#475569" }}>{issue.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Syne, sans-serif" }}>By Category</h2>
            <div className="space-y-4">
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
            <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(0,217,163,0.08)", border: "1px solid rgba(0,217,163,0.2)" }}>
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