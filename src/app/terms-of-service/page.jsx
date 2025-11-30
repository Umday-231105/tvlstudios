"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Instagram as InstagramIcon, Mail } from "lucide-react";

// ---------------- NAVBAR ----------------
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md shadow-slate-200/70"
          : "bg-white/95 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-emerald-400 to-teal-300 flex items-center justify-center shadow-sm shadow-sky-500/40">
            <span className="text-slate-900 font-semibold text-lg">T</span>
          </div>
          <span className="font-semibold text-sm tracking-[0.18em] uppercase text-slate-800">
            TVL Studios
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-[13px] text-slate-600">
          <a href="/" className="hover:text-slate-900">Home</a>
          <a href="/#services" className="hover:text-slate-900">Services</a>
          <a href="/#work" className="hover:text-slate-900">Work</a>
          <a href="/assistant" className="hover:text-blue-600">Assistant</a>
        </div>

        <button
          className="md:hidden text-slate-800"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-slate-800">
            <a href="/" onClick={() => setMobileOpen(false)}>Home</a>
            <a href="/#services" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="/#work" onClick={() => setMobileOpen(false)}>Work</a>
            <a href="/assistant" onClick={() => setMobileOpen(false)}>Assistant</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ---------------- FOOTER ----------------
const Footer = () => (
  <footer className="w-full border-t border-slate-100 bg-slate-50 py-10">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-900">
            Have questions?
          </h2>
          <p className="text-xs text-slate-600 max-w-md">
            Reach out anytime. We usually respond within a few hours.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-sky-500" />
            <span>tvlstudioz@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-slate-500 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-sky-500 via-emerald-400 to-teal-300 flex items-center justify-center">
            <span className="text-slate-900 text-sm font-semibold">T</span>
          </div>
          <span>© 2026 TVL Studios.</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/tvlstudios.xyz/"
            className="flex items-center gap-1 hover:text-slate-700"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            Instagram
          </a>

          <a href="/privacy-policy" className="hover:text-slate-700">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-slate-700">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ---------------- PAGE CONTENT ----------------
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>

        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          These Terms of Service (“Terms”) govern your use of TVL Studios'
          website, services and any related materials.
        </p>

        {/* Add your ToS text... */}
      </main>

      <Footer />
    </div>
  );
}
