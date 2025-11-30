"use client";

import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, Menu, X } from "lucide-react";

// ---------------- NAVBAR ----------------
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAssistant = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("tvl-open-assistant"));
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md shadow-slate-200/70"
          : "bg-white/95 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-emerald-400 to-teal-300 flex items-center justify-center shadow-sm shadow-sky-500/40">
            <span className="text-slate-900 font-semibold text-lg">T</span>
          </div>
          <span className="font-semibold text-sm tracking-[0.18em] uppercase text-slate-800 group-hover:text-slate-900">
            TVL Studios
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-[13px] text-slate-600">
          <a href="/" className="hover:text-slate-900 transition-colors">
            Home
          </a>
          <a href="/#services" className="hover:text-slate-900 transition-colors">
            Services
          </a>
          <a href="/#work" className="hover:text-slate-900 transition-colors">
            Work
          </a>

          {/* Assistant – opens popup */}
          <button
            type="button"
            onClick={openAssistant}
            className="hover:text-sky-600 transition-colors"
          >
            Assistant
          </button>

          <button
            onClick={() => (window.location.href = "/start-project")}
            className="ml-2 px-4 py-2 rounded-full bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-all shadow-sm shadow-sky-500/40"
          >
            Start a project
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-slate-800">
            {[
              { href: "/", label: "Home" },
              { href: "/#services", label: "Services" },
              { href: "/#work", label: "Work" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-1"
              >
                {item.label}
              </a>
            ))}

            {/* Assistant – mobile */}
            <button
              type="button"
              className="text-left py-1"
              onClick={() => {
                setMobileOpen(false);
                openAssistant();
              }}
            >
              Assistant
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                window.location.href = "/start-project";
              }}
              className="mt-2 px-4 py-2 rounded-full bg-sky-600 text-white text-xs font-semibold"
            >
              Start a project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// ---------------- PAGE ----------------
export default function StartProjectPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Start a project
        </h1>
        <p className="text-sm text-slate-600 mb-6 max-w-xl">
          Share a quick overview of what you’re planning. We’ll review and get
          back with fit, rough scope and next steps.
        </p>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
          <form
            className="space-y-5 text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submit is not wired yet. You can hook this to email or a backend later.");
            }}
          >
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Your name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Company / team (optional)
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                What are you looking to work on?
              </label>
              <textarea
                rows={4}
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50 resize-none"
                placeholder="Example: marketing site for a new product launch, redesign of our existing site, ongoing design support..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Ideal timeline
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50"
                  placeholder="e.g. launch in March 2026"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Budget range (optional)
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50"
                  placeholder="Rough range is enough"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition-all shadow-sm shadow-sky-500/40"
            >
              Submit project overview
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-600">
            <Mail className="w-3.5 h-3.5 text-sky-500" />
            <span>Prefer email? Reach us at tvlstudioz@gmail.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
