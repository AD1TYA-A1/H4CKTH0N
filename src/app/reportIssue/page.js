"use client"
import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function ReportIssue() {
  const router = useRouter()
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]); // { file, previewUrl, name, size }
  const [location, setLocation] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  // ─── Image Handling ───────────────────────────────────────────
  const handleImageChange = async (files) => {
    const file = Array.from(files)[0];
    if (!file) return;
    setImages([{
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
    }]);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/isGeoTagged", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Geotag result:", data);
    if (!data.isGeotagged) {
      // ✅ Warn but don't redirect — let them use Live Location instead
      toast.warn('No Geo Tag Detected', {
        position: "top-center", autoClose: 8000, theme: "dark"
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    else {
      // ✅ Warn but don't redirect — let them use Live Location instead
      toast.success('Geo Tag Detected', {
        position: "top-center", autoClose: 8000, theme: "dark"
      });

    }
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageChange(e.dataTransfer.files);
  };

  // ─── Location ─────────────────────────────────────────────────
  const getLocation = () => {
    setLocLoading(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude.toFixed(5),
          lng: pos.coords.longitude.toFixed(5),
          accuracy: Math.round(pos.coords.accuracy),
        });
        setLocLoading(false);
      },
      () => {
        setLocError("Could not fetch location. Please allow access.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // ─── Upload single image → Cloudinary ─────────────────────────
  const uploadImageToCloudinary = async (file) => {


    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    const result = JSON.parse(text);
    console.log("Upload result:", result); // ← add this
    if (!result.success) throw new Error(result.message || "Image upload failed");
    return result.url; // Cloudinary secure_url
  };

  // ─── Save report (URL + caption + location) → MongoDB ─────────
  const saveReportToMongo = async (url) => {
    const payload = {
      url: url || null,
      caption,
      lat: location ? parseFloat(location.lat) : null,
      lng: location ? parseFloat(location.lng) : null,
    };

    console.log("Submitting:", payload); // verify in browser console

    const res = await fetch("/api/uploadDATA", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log("DB result:", result);

    if (!result.success) throw new Error(result.error || "Failed to save");
  };
  // ─── Submit Handler ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      if (images.length > 0) {
        // Upload all images to Cloudinary in parallel
        const uploadedUrls = await Promise.all(
          images.map((img) => uploadImageToCloudinary(img.file))
        );
        // Save each URL + report metadata to MongoDB
        await Promise.all(uploadedUrls.map((url) => saveReportToMongo(url)));
        console.log("All uploaded URLs:", uploadedUrls);
      } else {
        // No images — just save caption + location
        await saveReportToMongo(null);
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Success Screen ───────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 100%)", fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');`}</style>
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ background: "rgba(0,217,163,0.15)", border: "2px solid #00d9a3" }}
          >
            ✓
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: "#fff" }}>
            Issue Reported!
          </h2>
          <p className="mb-6" style={{ color: "#64748b" }}>
            Your report has been submitted successfully.
          </p>
          <button
            onClick={() => {
              setSubmitted(false); setCaption(""); setImages([]);
              setLocation(null); setSubmitError("");
            }}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: "#00d9a3", color: "#0a0f1e" }}
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  // ─── Main Form ────────────────────────────────────────────────
  return (
    <>
      <ToastContainer position="top-right" autoClose={false} newestOnTop closeOnClick={false} rtl={false} pauseOnFocusLoss draggable theme="dark" />

      <div
        className="min-h-screen px-4 py-10 flex flex-col items-center"
        style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 100%)", fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        textarea:focus, input:focus { outline: none; }
        .upload-zone { transition: all 0.2s ease; }
        .upload-zone:hover { border-color: #00d9a3 !important; background: rgba(0,217,163,0.05) !important; }
        .img-card { transition: transform 0.2s ease; }
        .img-card:hover { transform: scale(1.02); }
        @keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 0 rgba(0,217,163,0.4)} 50%{box-shadow:0 0 0 8px rgba(0,217,163,0)} }
        .loc-pulse { animation: pulse-ring 1.8s infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; display: inline-block; }
      `}</style>

        {/* Header */}
        <div className="w-full max-w-lg mb-8">
          <a href="/" className="flex items-center gap-2 mb-8 w-fit">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: "#00d9a3", color: "#0a0f1e", fontFamily: "Syne, sans-serif" }}>C</div>
            <span className="font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>CityFix</span>
          </a>
          <p className="text-sm mb-1" style={{ color: "#00d9a3" }}>Make your voice heard</p>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
            Report an Issue
          </h1>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-7"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#cbd5e1" }}>
              Caption <span style={{ color: "#00d9a3" }}>*</span>
            </label>
            <div className="relative">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe the issue — e.g. 'Large pothole near Gate 4, causing accidents at night'"
                rows={4}
                maxLength={300}
                required
                className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: caption.length > 0 ? "1px solid rgba(0,217,163,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  transition: "border 0.2s ease",
                }}
              />
              <span className="absolute bottom-3 right-3 text-xs"
                style={{ color: caption.length > 250 ? "#f59e0b" : "#475569" }}>
                {caption.length}/300
              </span>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#cbd5e1" }}>
              Photo <span style={{ color: "#475569", fontWeight: 400 }}>(1 max)</span>
            </label>

            {images.length < 1 && (
              <div
                className="upload-zone rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer mb-4"
                style={{
                  border: `2px dashed ${dragOver ? "#00d9a3" : "rgba(255,255,255,0.12)"}`,
                  background: dragOver ? "rgba(0,217,163,0.07)" : "rgba(255,255,255,0.02)",
                }}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                  style={{ background: "rgba(0,217,163,0.1)" }}>📷</div>
                <p className="text-sm font-medium text-white">Drag & drop or click to upload</p>
                <p className="text-xs mt-1" style={{ color: "#475569" }}>PNG, JPG, WEBP — max 10MB each</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e.target.files)}
                />
              </div>
            )}

            {images.length > 0 && (
              <div className="relative rounded-xl overflow-hidden group"
                style={{ border: "1px solid rgba(255,255,255,0.08)", aspectRatio: "16/9" }}>
                <img src={images[0].previewUrl} alt={images[0].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.55)" }}>
                  <button type="button" onClick={() => removeImage(0)}
                    className="self-end w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "#ef4444", color: "#fff" }}>✕</button>
                  <p className="text-xs truncate text-white">{images[0].name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Live Location */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#cbd5e1" }}>Location</label>
            <button
              type="button"
              onClick={getLocation}
              disabled={locLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: location ? "rgba(0,217,163,0.12)" : "rgba(255,255,255,0.05)",
                border: location ? "1px solid rgba(0,217,163,0.4)" : "1px solid rgba(255,255,255,0.1)",
                color: location ? "#00d9a3" : "#94a3b8",
                cursor: locLoading ? "not-allowed" : "pointer",
              }}
            >
              {locLoading ? (
                <><span className="spin text-base">◌</span> Fetching location…</>
              ) : location ? (
                <>
                  <span className="w-2 h-2 rounded-full loc-pulse" style={{ background: "#00d9a3", flexShrink: 0 }} />
                  📍 {location.lat}, {location.lng}
                  <span className="ml-auto text-xs font-normal" style={{ color: "#475569" }}>±{location.accuracy}m</span>
                </>
              ) : (
                <><span className="text-lg">📍</span> Get Live Location</>
              )}
            </button>
            {locError && <p className="mt-2 text-xs" style={{ color: "#f87171" }}>⚠ {locError}</p>}
            {location && (
              <button type="button" onClick={() => setLocation(null)} className="mt-2 text-xs" style={{ color: "#475569" }}>
                Clear location
              </button>
            )}
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

          {/* Error Banner */}
          {submitError && (
            <div className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
              ⚠ {submitError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!caption.trim() || submitting}
            className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
            style={{
              background: caption.trim() && !submitting ? "#00d9a3" : "rgba(255,255,255,0.06)",
              color: caption.trim() && !submitting ? "#0a0f1e" : "#334155",
              cursor: caption.trim() && !submitting ? "pointer" : "not-allowed",
              fontFamily: "Syne, sans-serif",
            }}
          >
            {submitting
              ? <><span className="spin">◌</span> Uploading & Submitting…</>
              : "Submit Report →"
            }
          </button>

          <p className="text-center text-xs" style={{ color: "#334155" }}>
            Your report will be reviewed and forwarded to the relevant authorities.
          </p>
        </form>
      </div>
    </>

  );
}