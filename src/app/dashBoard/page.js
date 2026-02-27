"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MOCK_DATA = [
  {
    _id: "69a1749b0ef0f309b42714fb",
    caption: "Dam is broken",
    url: "https://res.cloudinary.com/dyzvhcu9e/image/upload/v1772188817/cityfix/sample1.jpg",
    createdAt: "2026-02-27T10:40:27.206+00:00",
    location: { type: "Point", coordinates: [77.93074, 30.38484] },
    upvotes: 12,
  },
  {
    _id: "69a191546ca8a35e85f4c790",
    caption: "Make it clean",
    url: "https://res.cloudinary.com/dyzvhcu9e/image/upload/v1772196170/cityfix/sample2.jpg",
    createdAt: "2026-02-27T12:43:00.840+00:00",
    location: { type: "Point", coordinates: [77.925, 30.381] },
    upvotes: 5,
  },
];

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

  const [lng, lat] = issue.location?.coordinates || [0, 0];

  const handleUpvote = (url) => {
    if (!voted) {
      setUpvotes((prev) => prev + 1);
      setVoted(true);



      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "url": url
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("/api/upVote", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
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
          <span>{lat.toFixed(4)}°N, {lng.toFixed(4)}°E</span>
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
            onClick={()=>{handleUpvote(issue.url)}}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 border transition-all duration-200 cursor-pointer ${voted
              ? "bg-red-500/15 border-red-500/50 text-red-400"
              : "bg-white/[0.04] border-[#2a2a2a] text-[#888] hover:bg-red-500/[0.08] hover:border-red-500/30 hover:text-red-400"
              }`}
          >
            <span className={`text-base transition-transform duration-200 inline-block ${voted ? "scale-125" : "scale-100"}`}>
              🔺
            </span>
            <span className="text-[13px] font-semibold">{upvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IssuesFeed() {
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (!data) {
      router.push("/");
    }
  }, []);

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
        const sorted = data.data.sort((a, b) => b.upvotes - a.upvotes); // 👈 add this
        setIssues(sorted);
      }
      else throw new Error("Failed to fetch");
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

  useEffect(() => {
    if (useMock) setIssues(MOCK_DATA);
  }, [useMock]);

  const displayIssues = useMock ? MOCK_DATA : issues;

  return (
    <div className="min-h-screen bg-[#0a0b0e] font-sans">

      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[#1a1c22] px-6 py-5 flex items-center justify-between bg-[#0a0b0e]/90 backdrop-blur-xl">
        <div>
          <h1 className="text-[22px] font-extrabold text-white tracking-tight">
            CITY<span className="text-red-500">FIX</span>
          </h1>
          <p className="text-[#444] text-xs mt-0.5">
            {displayIssues.length} issue{displayIssues.length !== 1 ? "s" : ""} nearby
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setUseMock(true)}
            className="bg-transparent border border-[#2a2a2a] text-[#666] px-3.5 py-2 rounded-xl text-[13px] cursor-pointer hover:border-[#444] hover:text-[#aaa] transition-all duration-200"
          >
            Use Mock Data
          </button>

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
        {!loading && displayIssues.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏙️</div>
            <p className="text-[#555] text-xl font-bold">No issues loaded yet</p>
            <p className="text-[#333] text-sm mt-2">
              Click "Use My Location" or "Use Mock Data" to get started
            </p>
          </div>
        )}

        {/* Grid */}
        {displayIssues.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
            {displayIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}