"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", dot: "bg-yellow-400" },
  inprogress: { label: "In Progress", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-400" },
  completed: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400" },
};

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function IssueCard({ issue, onStatusChange, isUpdating }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const status = issue.status || "pending";
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const [lng, lat] = issue.location?.coordinates || [0, 0];

  const isLong = issue.caption?.length > 80;

  return (
    <div className="bg-[#111318] border border-[#1e2028] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,80,80,0.12)]">

      {/* Image */}
      <div className="relative w-full aspect-video bg-[#0d0f12]">
        {issue.url && !imgError ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c22] via-[#22242c] to-[#1a1c22] animate-pulse" />
            )}
            <img
              src={issue.url}
              alt={issue.caption}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#444]">
            <span className="text-4xl">🏙️</span>
            <span className="text-xs">No image</span>
          </div>
        )}

        {/* Time badge */}
        {issue.createdAt && (
          <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-[#aaa] text-[11px] px-2 py-0.5 rounded-full border border-[#333]">
            {timeAgo(issue.createdAt)}
          </div>
        )}

        {/* Status badge */}
        <div className={`absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
          {cfg.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Caption */}
        <div className="mb-3">
          <p className="text-[#f0f0f0] text-[15px] font-medium leading-snug">
            {issue.caption
              ? showFullCaption
                ? issue.caption
                : issue.caption.slice(0, 80) + (isLong ? "…" : "")
              : <span className="text-[#444] italic text-sm">No caption</span>
            }
          </p>
          {isLong && (
            <button
              onClick={() => setShowFullCaption((prev) => !prev)}
              className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-red-400 hover:text-red-300 px-2.5 py-1 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
            >
              {showFullCaption ? (
                <> Show less <span className="text-[10px]">↑</span> </>
              ) : (
                <> See more <span className="text-[10px]">↓</span> </>
              )}
            </button>
          )}
        </div>

        {/* Location + upvotes */}
        <div className="flex items-center gap-2 mb-3.5 flex-wrap">
          {lat !== 0 && (
            <div className="flex items-center gap-1.5 text-[#555] text-xs">
              <span>📍</span>
              <span>{lat.toFixed(4)}°N, {lng.toFixed(4)}°E</span>
            </div>
          )}
          {issue.upvotes > 0 && (
            <span className="flex items-center gap-1 text-[#555] text-xs">
              🔺 {issue.upvotes}
            </span>
          )}
        </div>

        {/* Footer — Map link + Status changer */}
        <div className="flex items-center justify-between mb-3">
          <a
            href={`https://maps.google.com/?q=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-red-500 text-xs px-3 py-1.5 rounded-lg border border-red-950 bg-red-500/5 hover:bg-red-500/15 transition-colors duration-200 no-underline"
          >
            🗺️ View on Map
          </a>
          <span className="text-[#333] text-[11px] font-mono">
            #{issue._id?.toString().slice(-6)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1e2028] mb-3" />

        {/* ─── Status Changer ──────────────────────────────────── */}
        <div>
          <p className="text-[11px] text-[#444] mb-2 uppercase tracking-widest">Update Status</p>
          <div className="flex gap-1.5">
            {[
              { key: "pending", label: "Pending" },
              { key: "inprogress", label: "In Progress" },
              { key: "completed", label: "Completed" },
            ].map(({ key, label }) => {
              const c = STATUS_CONFIG[key];
              const isActive = status === key;
              return (
                <button
                  key={key}
                  disabled={isActive || isUpdating}
                  onClick={() => onStatusChange(issue._id, key)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all border cursor-pointer
                    ${isActive
                      ? `${c.color} ${c.bg} ${c.border}`
                      : "text-[#555] bg-white/[0.03] border-[#2a2a2a] hover:text-white hover:bg-white/[0.07]"
                    }
                    ${isUpdating && !isActive ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                >
                  {isUpdating && !isActive
                    ? <span className="animate-spin inline-block">◌</span>
                    : label
                  }
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashBoard() {
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [adminUser, setAdminUser] = useState("");
  const [fetchError, setFetchError] = useState("");

  // ─── Auth Guard ───────────────────────────────────────────────
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) { router.push("/adminLogIn"); return; }
    setAdminUser(localStorage.getItem("adminUser") || "Admin");
    fetchAllIssues();
  }, []);

  // ─── Fetch ALL issues ─────────────────────────────────────────
  const fetchAllIssues = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/getALLIssues");
      const data = await res.json();
      if (data.success) {
        const sorted = data.data.sort((a, b) => b.upvotes - a.upvotes);
        setIssues(sorted);
      } else {
        setFetchError("Failed to load issues from database.");
      }
    } catch (err) {
      setFetchError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Update Status ────────────────────────────────────────────
  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      // Find the full issue object to get caption and url
      const issue = issues.find((i) => i._id === id);
      if (!issue) return;

      const res = await fetch("/api/updateStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption: issue.caption,
          url: issue.url,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIssues((prev) =>
          prev.map((i) =>
            i._id === id ? { ...i, status: newStatus } : i
          )
        );
      } else {
        console.error("Status update failed:", data.message);
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // ─── Logout ───────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminUser");
    router.push("/adminLogIn");
  };

  // ─── Derived ─────────────────────────────────────────────────
  const getStatus = (i) => i.status || "pending";

  const filtered = filterStatus === "all"
    ? issues
    : issues.filter((i) => getStatus(i) === filterStatus);

  const counts = {
    all: issues.length,
    pending: issues.filter((i) => getStatus(i) === "pending").length,
    inprogress: issues.filter((i) => getStatus(i) === "inprogress").length,
    completed: issues.filter((i) => getStatus(i) === "completed").length,
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] font-sans">

      {/* ─── Navbar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 border-b border-[#1a1c22] px-6 py-5 flex items-center justify-between bg-[#0a0b0e]/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight">
            CITY<span className="text-red-500">FIX</span>
          </h1>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 tracking-widest">
            ADMIN
          </span>
          <p className="text-[#444] text-xs hidden sm:block">
            {issues.length} issue{issues.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-sm text-[#555] hidden sm:block">
            👤 <span className="text-[#aaa] font-medium">{adminUser}</span>
          </span>
          <button
            onClick={fetchAllIssues}
            disabled={loading}
            className="bg-transparent border border-[#2a2a2a] text-[#666] px-3.5 py-2 rounded-xl text-[13px] cursor-pointer hover:border-[#444] hover:text-[#aaa] transition-all duration-200 disabled:opacity-40"
          >
            {loading ? <span className="animate-spin inline-block">◌</span> : "↻"} Refresh
          </button>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-red-950 text-red-500 px-3.5 py-2 rounded-xl text-[13px] font-semibold cursor-pointer hover:bg-red-500/10 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ─── Body ───────────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { key: "all", label: "Total", icon: "📋", color: "text-white" },
            { key: "pending", label: "Pending", icon: "⏳", color: "text-yellow-400" },
            { key: "inprogress", label: "In Progress", icon: "🔧", color: "text-blue-400" },
            { key: "completed", label: "Completed", icon: "✅", color: "text-emerald-400" },
          ].map(({ key, label, icon, color }) => (
            <div
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`bg-[#111318] border rounded-2xl p-4 cursor-pointer transition-all hover:-translate-y-0.5 ${filterStatus === key ? "border-red-500/40" : "border-[#1e2028] hover:border-[#2e3038]"
                }`}
            >
              <p className="text-xl mb-1">{icon}</p>
              <p className={`text-3xl font-extrabold ${color}`}>{counts[key]}</p>
              <p className="text-xs text-[#444] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: "all", label: "All Issues" },
            { key: "pending", label: "⏳ Pending" },
            { key: "inprogress", label: "🔧 In Progress" },
            { key: "completed", label: "✅ Completed" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-2 cursor-pointer
                ${filterStatus === key
                  ? "bg-red-500 text-white border-none"
                  : "bg-transparent border border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#aaa]"
                }`}
            >
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-md ${filterStatus === key ? "bg-white/20" : "bg-white/5 text-[#555]"}`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Error */}
        {fetchError && (
          <div className="bg-red-500/[0.08] border border-red-500/20 rounded-xl px-4 py-3.5 mb-6 text-red-400 text-sm">
            ⚠️ {fetchError}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-[#444]">
            <span className="animate-spin text-3xl">◌</span>
            <p className="text-sm">Loading issues from database…</p>
          </div>

          /* Empty */
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-[#555] text-xl font-bold">No issues found</p>
            <p className="text-[#333] text-sm mt-2">No reports match this filter</p>
          </div>

          /* Grid */
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
            {filtered.map((issue) => (
              <IssueCard

                key={issue._id}
                issue={issue}
                onStatusChange={updateStatus}
                isUpdating={updatingId === issue._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}