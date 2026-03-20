"use client";
import { useState, useEffect } from "react";
import IssueBoard from "../issueDashboard/page";
import { useRouter } from "next/navigation";




function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function IssueCard({ issue }) {

  const [upvotes, setUpvotes] = useState(issue.upvotes || 0);
  const [voted, setVoted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [userName, setUserName] = useState("")

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("userData")).userName);
    // (?.userName)
    console.log(userName);
    const upvote = false;
    const url = issue.url
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({url , userName, upvote }),
      redirect: "follow",
    };

    fetch("/api/upVote", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // if (result.setUpvotedBy.includes(userName)) {
        //   setVoted(true)
        // }
        console.log(result);
        if (result.upVote) {
          console.log("Cannot Upvote You already Upvoted");
          setVoted(true)
        }else{
          setVoted(false)
        }
      })
      .catch((error) => console.error(error));




  }, [userName])

  const [lng, lat] = issue.location?.coordinates || [0, 0];

  const handleUpvote = (url) => {
    if (!voted) {
      setUpvotes((prev) => prev + 1);
      setVoted(true);
      const upvote = true

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ url, userName, upvote }),
        redirect: "follow",
      };

      fetch("/api/upVote", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // if (result.setUpvotedBy.includes(userName)) {
          //   setVoted(true)
          // }
          console.log(result);
          if (result.upVote) {
            console.log("Cannot Upvote You already Upvoted");
            setVoted(true)
          }
        })
        .catch((error) => console.error(error));
    } else {
      setUpvotes((prev) => prev - 1);
      setVoted(false);
    }
  };

  return (
    <div className="bg-[#111318] border border-[#1e2028] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,80,80,0.12)]">
      {/* Image */}
      <div className="relative w-full aspect-video bg-[#0d0f12]">
        {!imgError ? (
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
        <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-[#aaa] text-[11px] px-2 py-0.5 rounded-full border border-[#333]">
          {timeAgo(issue.createdAt)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[#f0f0f0] text-[15px] font-medium mb-3 leading-snug">
          {issue.caption}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[#555] text-xs mb-3.5">
          <span>📍</span>
          <span>
            {lat.toFixed(4)}°N, {lng.toFixed(4)}°E
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <a
            href={`https://maps.google.com/?q=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-red-500 text-xs px-3 py-1.5 rounded-lg border border-red-950 bg-red-500/5 hover:bg-red-500/15 transition-colors duration-200 no-underline"
          >
            🗺️ View on Map
          </a>

          {/* Upvote */}
          <button
            onClick={() => handleUpvote(issue.url)}
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer overflow-hidden group"
            style={{
              background: voted ? '#fcebeb' : 'var(--background)',
              borderColor: voted ? '#f09595' : 'rgba(255,255,255,0.12)',
            }}
          >
            {/* Hover wash */}
            {!voted && (
              <span className="absolute inset-0 bg-red-500/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full" />
            )}

            {/* Arrow icon */}
            <span
              className={`relative z-10 flex items-center justify-center transition-transform duration-300 ${voted ? 'scale-125 -translate-y-px' : 'scale-100'
                }`}
              style={{ width: 18, height: 18 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2L12 9H2L7 2Z"
                  fill={voted ? '#e24b4a' : 'rgba(255,255,255,0.3)'}
                  stroke={voted ? '#e24b4a' : 'rgba(255,255,255,0.3)'}
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                  style={{ transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                />
              </svg>
            </span>

            {/* Count */}
            <span
              className="relative z-10 text-[13px] font-medium transition-colors duration-200"
              style={{ color: voted ? '#a32d2d' : '#888' }}
            >
              {upvotes}
            </span>

            {/* Label */}
            <span
              className="relative z-10 text-[12px] tracking-wide transition-colors duration-200 group-hover:text-red-400"
              style={{ color: voted ? '#a32d2d' : 'rgba(255,255,255,0.3)' }}
            >
              upvotes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IssuesFeed() {



  const router = useRouter();
  const [completedIssues, setCompletedIssues] = useState([]);
  const [inProgressIssues, setInProgressIssues] = useState([]);
  const [pendingIssues, setPendingIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const totalIssues = completedIssues.length + inProgressIssues.length + pendingIssues.length;

  const fetchIssues = async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/getIssues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng, maxDistance: 10000 }),
      });
      const data = await res.json();
      if (data.success) {
        setCompletedIssues(data.completed || []);
        setInProgressIssues(data.inProgress || []);
        setPendingIssues(data.pending || []);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) return setError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchIssues(pos.coords.latitude, pos.coords.longitude),
      () => setError("Location access denied")
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] font-sans">

      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[#1a1c22] px-6 py-5 flex items-center justify-between bg-[#0a0b0e]/90 backdrop-blur-xl">
        <div>
          <h1 className="text-[22px] font-extrabold text-white tracking-tight">
            CITY<span className="text-red-500">FIX</span>
          </h1>
          <p className="text-[#444] text-xs mt-0.5">
            {totalIssues} issue{totalIssues !== 1 ? "s" : ""} nearby
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => router.push("/reportIssue")}
            className="bg-transparent border border-red-500 text-red-500 px-4 py-2 rounded-xl text-[13px] font-semibold cursor-pointer hover:bg-red-500/10 transition-all duration-200"
          >
            🚨 Report an Issue
          </button>

          <button
            onClick={getLocation}
            disabled={loading}
            className={`border-none text-white px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${loading
              ? "bg-[#1a0a0a] opacity-60 cursor-not-allowed"
              : "bg-red-500 cursor-pointer hover:bg-red-600"
              }`}
          >
            {loading ? "Fetching..." : "📍 Use My Location"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Error */}
        {error && (
          <div className="bg-red-500/[0.08] border border-red-500/20 rounded-xl px-4 py-3.5 mb-6 text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && totalIssues === 0 && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏙️</div>
            <p className="text-[#555] text-xl font-bold">No issues loaded yet</p>
            <p className="text-[#333] text-sm mt-2">
              Click "Use My Location" to get started
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <p className="text-[#555] text-sm">Fetching issues nearby...</p>
          </div>
        )}

        {/* Issue Sections */}
        {totalIssues > 0 && (
          <div>
            <div className="flex gap-4 p-4">

              {/* Pending */}
              <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                    Pending
                  </span>
                </div>
                <span className="text-xs font-bold bg-amber-500 text-black px-2 py-0.5 rounded-full">
                  {pendingIssues.length}
                </span>
              </div>

              {/* In Progress */}
              <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    In Progress
                  </span>
                </div>
                <span className="text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  {inProgressIssues.length}
                </span>
              </div>

              {/* Completed */}
              <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl p-3 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-green-500">
                    Completed
                  </span>
                </div>
                <span className="text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">
                  {completedIssues.length}
                </span>
              </div>

            </div>

            {/* In Progress */}
            {inProgressIssues.length > 0 && (
              <div className="mb-8">
                <h2 className="text-yellow-400 font-bold text-lg mb-3">
                  🔄 In Progress ({inProgressIssues.length})
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                  {inProgressIssues.map((issue) => (
                    <IssueCard key={issue._id} issue={issue} />
                  ))}
                </div>
              </div>
            )}

            {/* Pending */}
            {pendingIssues.length > 0 && (
              <div className="mb-8">
                <h2 className="text-red-400 font-bold text-lg mb-3">
                  ⏳ Pending ({pendingIssues.length})
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                  {pendingIssues.map((issue) => (
                    <IssueCard key={issue._id} issue={issue} />
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {completedIssues.length > 0 && (
              <div className="mb-8">
                <h2 className="text-green-400 font-bold text-lg mb-3">
                  ✅ Completed ({completedIssues.length})
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                  {completedIssues.map((issue) => (
                    <IssueCard key={issue._id} issue={issue} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}