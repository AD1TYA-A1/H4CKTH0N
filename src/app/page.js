'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [count, setCount] = useState({ reports: 0, resolved: 0, cities: 0 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate counters
  useEffect(() => {
    const targets = { reports: 1240, resolved: 987, cities: 42 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let current = { reports: 0, resolved: 0, cities: 0 }
    const timer = setInterval(() => {
      current = {
        reports: Math.min(current.reports + Math.ceil(targets.reports / steps), targets.reports),
        resolved: Math.min(current.resolved + Math.ceil(targets.resolved / steps), targets.resolved),
        cities: Math.min(current.cities + Math.ceil(targets.cities / steps), targets.cities),
      }
      setCount({ ...current })
      if (current.reports >= targets.reports) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [])

  const issues = [
    { icon: '🚧', label: 'Broken Roads', color: 'from-orange-500/20 to-orange-600/5', border: 'border-orange-500/30' },
    { icon: '💡', label: 'Dead Streetlights', color: 'from-yellow-500/20 to-yellow-600/5', border: 'border-yellow-500/30' },
    { icon: '🗑️', label: 'Garbage Overflow', color: 'from-red-500/20 to-red-600/5', border: 'border-red-500/30' },
    { icon: '🚰', label: 'Water Issues', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30' },
    { icon: '⚡', label: 'Power Outages', color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/30' },
    { icon: '🌳', label: 'Fallen Trees', color: 'from-green-500/20 to-green-600/5', border: 'border-green-500/30' },
  ]

  const steps = [
    { num: '01', icon: '📸', title: 'Snap & Report', desc: 'Take a photo of the issue. GPS auto-detects your location. Add a quick caption and submit in under 30 seconds.' },
    { num: '02', icon: '▲', title: 'Community Upvotes', desc: 'Others in your area see the report and upvote it. Most urgent issues rise to the top automatically.' },
    { num: '03', icon: '⚙️', title: 'Authorities Act', desc: 'Admin sees top-voted issues on their dashboard. Status updates to In Progress when work begins.' },
    { num: '04', icon: '✅', title: 'Issue Resolved', desc: 'Report moves to Fixed Issues tab. Citizens get accountability. City gets better — together.' },
  ]

  return (
    <div className="min-h-screen bg-[#080D1A] text-white overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#080D1A]/95 backdrop-blur-md border-b border-white/5 py-3' : 'py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-sm font-bold text-black">C</div>
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>CityFix</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#how" className="hover:text-white transition-colors">How it Works</a>
            <a href="#issues" className="hover:text-white transition-colors">Issues</a>
            <a href="#impact" className="hover:text-white transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link href="/signUp" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#00C28B 1px, transparent 1px), linear-gradient(90deg, #00C28B 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 text-sm text-emerald-400 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Under Viksit Bharat Initiative · SDG 9 & 11
          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6 tracking-tight">
            <span className="text-white">Your City.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Your Voice.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic' }}>
            Report broken roads, dead streetlights, and garbage overflow.
            Community upvotes surface what matters most. Authorities fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signUp" className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,194,139,0.4)]">
              Report an Issue
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link href="/issues" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl text-lg transition-all duration-200">
              Browse Issues
              <span className="text-white/40">↗</span>
            </Link>
          </div>

          {/* Floating status cards */}
          <div className="mt-20 flex flex-wrap gap-3 justify-center">
            {[
              { status: 'PENDING', color: 'text-red-400 bg-red-500/10 border-red-500/20', label: 'Pothole on MG Road · 47 upvotes' },
              { status: 'IN PROGRESS', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', label: 'Street light out · Station Road' },
              { status: 'RESOLVED', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Garbage overflow · Sector 14' },
            ].map((card, i) => (
              <div key={i} className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${card.color} backdrop-blur-sm`}>
                <span className="text-xs font-bold tracking-widest">{card.status}</span>
                <span className="w-px h-4 bg-current opacity-30" />
                <span className="text-xs opacity-70">{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="impact" className="py-20 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: count.reports, label: 'Issues Reported', suffix: '+' },
            { value: count.resolved, label: 'Issues Resolved', suffix: '+' },
            { value: count.cities, label: 'Cities Active', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-2 tabular-nums">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-white/40 text-sm tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Issue Categories */}
      <section id="issues" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm tracking-widest uppercase mb-4">What Can Be Reported</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Every civic problem,<br /><span className="text-white/40">one platform.</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {issues.map((issue, i) => (
              <div key={i} className={`group relative bg-gradient-to-br ${issue.color} border ${issue.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer`}>
                <div className="text-4xl mb-4">{issue.icon}</div>
                <div className="font-semibold text-white">{issue.label}</div>
                <div className="text-white/40 text-sm mt-1">Tap to report →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm tracking-widest uppercase mb-4">The Process</p>
            <h2 className="text-4xl md:text-5xl font-bold">From problem<br /><span className="text-white/40">to resolution.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative group bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-emerald-500/20 rounded-2xl p-8 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="text-3xl mb-1">{step.icon}</div>
                    <div className="text-emerald-500/40 text-xs font-bold tracking-widest">{step.num}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 via-transparent to-teal-950/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Every city has problems.
            <br />
            <span className="text-emerald-400">CityFix makes sure</span>
            <br />
            someone finally answers.
          </h2>
          <p className="text-white/40 text-lg mb-10 italic" style={{ fontFamily: 'Georgia, serif' }}>
            Join thousands of citizens building better cities — one report at a time.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-10 py-5 rounded-xl text-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,194,139,0.5)]">
            Start Reporting Free
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs font-bold text-black">C</div>
            <span className="text-white/60 text-sm">CityFix · Lakshagriha Hackathon 2026</span>
          </div>
          <div className="text-white/30 text-sm">
            Built under Viksit Bharat Initiative · SDG 9 & 11
          </div>
        </div>
      </footer>
    </div>
  )
}
