"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTheme } from "../ThemeProvider";

/* -------------------- NAVBAR -------------------- */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "bg-neutral-900/85 backdrop-blur-xl border-b border-neutral-800 py-4"
            : "bg-white/80 backdrop-blur-xl border-b border-neutral-200 py-4"
          : theme === "dark"
          ? "bg-neutral-900/40 backdrop-blur-xl py-6"
          : "bg-white/60 backdrop-blur-xl py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-200 via-amber-100 to-lime-100 dark:from-emerald-500/40 dark:via-amber-400/30 dark:to-lime-400/40 flex items-center justify-center shadow-md border border-white/80 dark:border-neutral-800">
            <span className="text-neutral-900 dark:text-neutral-900 font-semibold text-lg">T</span>
          </div>

          <span className="font-medium text-sm tracking-[0.18em] uppercase text-neutral-700 dark:text-neutral-300 transition">
            TVL Studios
          </span>
        </a>

        <div className="hidden md:flex items-center gap-5 text-xs text-neutral-600 dark:text-neutral-300">
          <a href="/" className="hover:text-neutral-900 dark:hover:text-white transition">
            Home
          </a>

          <button
            onClick={() => (window.location.href = "/start-project")}
            className="px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 font-semibold"
          >
            Start a project
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden text-neutral-700 dark:text-neutral-100"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 text-neutral-800 dark:text-neutral-100 flex flex-col gap-3">
            <a href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = "/start-project";
              }}
              className="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

/* -------------------- FOOTER -------------------- */
const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-neutral-300/40 dark:border-neutral-800 pb-4">
          <p>© 2026 TVL Studios</p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:opacity-60">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:opacity-60">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* -------------------- START PROJECT PAGE -------------------- */
export default function StartProjectPage() {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const v = validate();
    setErrors(v);

    if (Object.keys(v).length > 0) return;

    setSubmitted(true);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-neutral-900 text-neutral-50"
          : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* --- Light Mode Background --- */}
      {theme === "light" && (
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-emerald-50/30 z-0"></div>
      )}

      {/* --- Dark Mode Background --- */}
      {theme === "dark" && (
        <>
          <div className="absolute inset-0 bg-neutral-900 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 z-0 opacity-80"></div>
        </>
      )}

      {/* NAVBAR */}
      <Navbar />


     {/* ---------- MAIN GLASS CARD ---------- */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        <div
          className="
            rounded-3xl
            bg-white/20 dark:bg-neutral-800/30
            backdrop-blur-2xl
            border border-white/40 dark:border-neutral-700
            shadow-[0_8px_40px_rgba(0,0,0,0.12)]
            p-10
          "
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Start a Project</h1>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-10">
            Tell us about what you're building — we’ll get back within 24 hours.
          </p>

          {/* ---------- FORM ---------- */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold">Name</label>
              <input
                className="w-full px-4 py-2 mt-1 rounded-lg bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/40 dark:border-neutral-700 text-sm"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold">Email</label>
              <input
                className="w-full px-4 py-2 mt-1 rounded-lg bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/40 dark:border-neutral-700 text-sm"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="text-xs font-semibold">Company (optional)</label>
              <input
                className="w-full px-4 py-2 mt-1 rounded-lg bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/40 dark:border-neutral-700 text-sm"
                placeholder="Company or project name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-semibold">Tell us about the project</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 mt-1 rounded-lg bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/40 dark:border-neutral-700 text-sm resize-none"
                placeholder="Explain your idea in 2–3 sentences"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 text-sm font-semibold hover:scale-[1.02] active:scale-[0.97] transition"
            >
              Send Inquiry
            </button>

            {submitted && (
              <p className="text-emerald-500 text-sm mt-2">Message received!</p>
            )}
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
