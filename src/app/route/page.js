"use client"
import { useRouter } from "next/navigation";
export default function RoutePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white flex flex-col relative overflow-hidden">
      {/* Grid background */}
      <div
        className=" cursor-pointer absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,130,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,130,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,100,0.08) 0%, transparent 70%)",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Navbar */}
      <nav className="flex items-center px-12 py-5 relative z-10">
        <div className="flex items-center gap-2 text-white font-medium text-lg">
          <div className="w-8 h-8 bg-[#00c875] rounded-lg flex items-center justify-center text-[#0a0f0d] font-bold text-sm">
            C
          </div>
          CityFix
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-md">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(0,200,117,0.12)] border border-[rgba(0,200,117,0.3)] rounded-full px-4 py-1.5 text-[#00c875] text-sm mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c875]" />
            Under Viksit Bharat Initiative · SDG 9 &amp; 11
          </div>

          <h1 className="font-serif text-6xl font-black leading-tight mb-4">
            Join the
            <br />
            <span className="text-[#00c875]">Movement.</span>
          </h1>
          <p className="text-white/40 italic font-light text-base leading-relaxed mb-10">
            Report issues, upvote what matters,
            <br />
            and hold authorities accountable.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Sign Up */}
            <button
              onClick={() => router.push("/signUp")}
              className=" cursor-pointer bg-[#00c875] border border-[#00c875] rounded-2xl overflow-hidden text-left transition-all duration-300 hover:bg-[#00e085] hover:border-[#00e085] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,200,117,0.35)] group"
            >
              {/* SVG – City Skyline */}
              <div className="w-full h-28 overflow-hidden">
                <svg viewBox="0 0 200 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="200" height="112" fill="#009a5a" />
                  <circle cx="20" cy="15" r="1.2" fill="white" opacity="0.6"/>
                  <circle cx="50" cy="8" r="0.8" fill="white" opacity="0.5"/>
                  <circle cx="80" cy="18" r="1" fill="white" opacity="0.4"/>
                  <circle cx="130" cy="10" r="1.2" fill="white" opacity="0.6"/>
                  <circle cx="170" cy="20" r="0.8" fill="white" opacity="0.5"/>
                  <circle cx="155" cy="6" r="1" fill="white" opacity="0.4"/>
                  <circle cx="175" cy="18" r="8" fill="#00e085" opacity="0.6"/>
                  <circle cx="179" cy="15" r="6" fill="#009a5a"/>
                  <rect x="0" y="88" width="200" height="24" fill="#007a45"/>
                  <rect x="80" y="30" width="36" height="58" fill="#006e3c" rx="2"/>
                  <rect x="85" y="36" width="7" height="7" fill="#00c875" opacity="0.8" rx="1"/>
                  <rect x="96" y="36" width="7" height="7" fill="#00c875" opacity="0.4" rx="1"/>
                  <rect x="85" y="48" width="7" height="7" fill="#00c875" opacity="0.9" rx="1"/>
                  <rect x="96" y="48" width="7" height="7" fill="#00c875" opacity="0.6" rx="1"/>
                  <rect x="85" y="60" width="7" height="7" fill="#00c875" opacity="0.3" rx="1"/>
                  <rect x="96" y="60" width="7" height="7" fill="#00c875" opacity="0.8" rx="1"/>
                  <rect x="96" y="22" width="2" height="10" fill="#005c31"/>
                  <circle cx="97" cy="21" r="2" fill="#00c875" opacity="0.9"/>
                  <rect x="30" y="50" width="28" height="38" fill="#005c31" rx="2"/>
                  <rect x="35" y="56" width="6" height="6" fill="#00c875" opacity="0.6" rx="1"/>
                  <rect x="44" y="56" width="6" height="6" fill="#00c875" opacity="0.3" rx="1"/>
                  <rect x="35" y="66" width="6" height="6" fill="#00c875" opacity="0.8" rx="1"/>
                  <rect x="44" y="66" width="6" height="6" fill="#00c875" opacity="0.5" rx="1"/>
                  <rect x="10" y="62" width="20" height="26" fill="#007040" rx="2"/>
                  <rect x="14" y="67" width="5" height="5" fill="#00c875" opacity="0.5" rx="1"/>
                  <rect x="22" y="67" width="5" height="5" fill="#00c875" opacity="0.7" rx="1"/>
                  <rect x="140" y="45" width="32" height="43" fill="#005c31" rx="2"/>
                  <rect x="145" y="51" width="6" height="6" fill="#00c875" opacity="0.7" rx="1"/>
                  <rect x="155" y="51" width="6" height="6" fill="#00c875" opacity="0.4" rx="1"/>
                  <rect x="145" y="62" width="6" height="6" fill="#00c875" opacity="0.5" rx="1"/>
                  <rect x="155" y="62" width="6" height="6" fill="#00c875" opacity="0.9" rx="1"/>
                  <rect x="174" y="60" width="22" height="28" fill="#007040" rx="2"/>
                  <rect x="178" y="65" width="5" height="5" fill="#00c875" opacity="0.6" rx="1"/>
                  <rect x="186" y="65" width="5" height="5" fill="#00c875" opacity="0.3" rx="1"/>
                  <rect x="0" y="92" width="200" height="4" fill="#005c31"/>
                  <rect x="30" y="93" width="16" height="1.5" fill="#00c875" opacity="0.4" rx="1"/>
                  <rect x="90" y="93" width="16" height="1.5" fill="#00c875" opacity="0.4" rx="1"/>
                  <rect x="150" y="93" width="16" height="1.5" fill="#00c875" opacity="0.4" rx="1"/>
                </svg>
              </div>
              <div className="px-5 pb-5 pt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#0a0f0d] font-bold text-lg">Sign Up</span>
                  <span className="text-[#0a0f0d]/50 group-hover:translate-x-1 transition-transform duration-200 text-lg">→</span>
                </div>
                <div className="text-[#0a0f0d]/60 text-xs font-light leading-snug">
                  New to CityFix?<br />Create your account
                </div>
              </div>
            </button>

            {/* Log In */}
            <button
              onClick={() => router.push("userLogIn")}
              className= " cursor-pointer bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:border-[rgba(0,200,117,0.5)] hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,200,117,0.1)] group"
            >
              {/* SVG – Key / Unlock */}
              <div className="w-full h-28 overflow-hidden">
                <svg viewBox="0 0 200 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="200" height="112" fill="#111a14"/>
                  <line x1="0" y1="28" x2="200" y2="28" stroke="#00c875" strokeOpacity="0.06" strokeWidth="1"/>
                  <line x1="0" y1="56" x2="200" y2="56" stroke="#00c875" strokeOpacity="0.06" strokeWidth="1"/>
                  <line x1="0" y1="84" x2="200" y2="84" stroke="#00c875" strokeOpacity="0.06" strokeWidth="1"/>
                  <line x1="50" y1="0" x2="50" y2="112" stroke="#00c875" strokeOpacity="0.06" strokeWidth="1"/>
                  <line x1="100" y1="0" x2="100" y2="112" stroke="#00c875" strokeOpacity="0.06" strokeWidth="1"/>
                  <line x1="150" y1="0" x2="150" y2="112" stroke="#00c875" strokeOpacity="0.06" strokeWidth="1"/>
                  <ellipse cx="100" cy="56" rx="50" ry="30" fill="#00c875" fillOpacity="0.07"/>
                  <circle cx="78" cy="52" r="18" stroke="#00c875" strokeWidth="5" fill="none"/>
                  <circle cx="78" cy="52" r="9" stroke="#00c875" strokeWidth="3" fill="none" strokeOpacity="0.5"/>
                  <rect x="90" y="50" width="50" height="5" rx="2.5" fill="#00c875"/>
                  <rect x="118" y="55" width="5" height="9" rx="2" fill="#00c875"/>
                  <rect x="130" y="55" width="5" height="13" rx="2" fill="#00c875"/>
                  <rect x="155" y="38" width="28" height="24" rx="4" fill="#1a2e22" stroke="#00c875" strokeWidth="2"/>
                  <path d="M163 38 C163 32 175 32 175 38" stroke="#00c875" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <circle cx="169" cy="48" r="4" fill="#00c875" opacity="0.8"/>
                  <rect x="167" y="50" width="4" height="6" rx="1" fill="#00c875" opacity="0.5"/>
                  <circle cx="30" cy="30" r="2" fill="#00c875" opacity="0.4"/>
                  <circle cx="45" cy="80" r="1.5" fill="#00c875" opacity="0.3"/>
                  <circle cx="170" cy="85" r="1.5" fill="#00c875" opacity="0.4"/>
                </svg>
              </div>
              <div className="px-5 pb-5 pt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold text-lg">Log In</span>
                  <span className="text-white/30 group-hover:translate-x-1 group-hover:text-[#00c875] transition-all duration-200 text-lg">→</span>
                </div>
                <div className="text-white/40 text-xs font-light leading-snug">
                  Welcome back,<br />continue your work
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}