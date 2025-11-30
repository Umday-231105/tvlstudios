"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  Instagram as InstagramIcon,
} from "lucide-react";

const SMOOTH_TRANSITION = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ ...SMOOTH_TRANSITION, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ------- Navbar -------
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
          <span className="font-semibold text-sm tracking-[0.18em] uppercase text-slate-800 group-hover:text-slate-900">
            TVL Studios
          </span>
        </a>

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
            <a href="/" onClick={() => setMobileOpen(false)} className="py-1">
              Home
            </a>
            <a
              href="/#services"
              onClick={() => setMobileOpen(false)}
              className="py-1"
            >
              Services
            </a>
            <a
              href="/#work"
              onClick={() => setMobileOpen(false)}
              className="py-1"
            >
              Work
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ------- Footer -------
const Footer = () => (
  <footer className="w-full border-t border-slate-100 bg-slate-50 py-10 mt-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-900">
            Prefer email instead?
          </h2>
          <p className="text-xs text-slate-600 max-w-md">
            You can always reach out directly with context and links. We&apos;ll
            reply with clarifying questions or next steps.
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
            className="flex items-center gap-1 hover:text-slate-700 transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            Instagram
          </a>
          <a href="/privacy-policy" className="hover:text-slate-700 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-slate-700 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ------- PAGE -------
export default function StartProjectPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24 md:pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[3fr,2fr] gap-8 items-start">
              {/* Left: form */}
              <div className="rounded-3xl bg-white border border-slate-100 shadow-sm shadow-slate-200/70 px-6 md:px-8 py-8">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-slate-900">
                  Start a project
                </h1>
                <p className="text-sm text-slate-600 mb-6 max-w-md">
                  Tell us a bit about your team, timeline and what you&apos;d
                  like to build. We&apos;ll get back to you with fit and
                  suggested next steps.
                </p>

                <form
                  className="space-y-5 text-sm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(
                      "This form is a front‑end only placeholder. Hook it up to your backend, Airtable, Notion or email tool."
                    );
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Your name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Company / organisation
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Founder, PM, Designer…"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      What are you looking to work on?
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
                      placeholder="Briefly describe the product, website or brand work you have in mind."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Rough timing
                      </label>
                      <select
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option>As soon as possible</option>
                        <option>Next 1–3 months</option>
                        <option>3–6 months</option>
                        <option>Just exploring</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Budget range (optional)
                      </label>
                      <select
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a range
                        </option>
                        <option>Under $2k</option>
                        <option>$2k – $5k</option>
                        <option>$5k – $10k</option>
                        <option>$10k+</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Links (optional)
                    </label>
                    <textarea
                      rows={2}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
                      placeholder="Product, site, deck or reference links that help us understand context."
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition-all shadow-sm shadow-sky-500/40"
                  >
                    Submit enquiry
                  </button>

                  <p className="text-[11px] text-slate-500 mt-3">
                    This form does not automatically create a project. We&apos;ll
                    review your message and respond by email.
                  </p>
                </form>
              </div>

              {/* Right: small info block */}
              <div className="rounded-3xl bg-slate-900 text-slate-50 px-6 py-7 shadow-[0_20px_70px_rgba(15,23,42,0.7)]">
                <h2 className="text-lg font-semibold mb-3">
                  How we typically work
                </h2>
                <ul className="space-y-3 text-sm text-slate-200/90">
                  <li>
                    <span className="font-medium">01 · Intake</span> — we read
                    your note, follow any links and ask for missing context.
                  </li>
                  <li>
                    <span className="font-medium">02 · Shape</span> — we propose
                    a rough shape: scope, timeline, pricing approach and who&apos;s
                    involved.
                  </li>
                  <li>
                    <span className="font-medium">03 · Decide</span> — if it
                    feels like a fit on both sides, we formalise scope and
                    schedule a start date.
                  </li>
                </ul>

                <div className="mt-6 border-t border-slate-700 pt-4 text-xs text-slate-300 space-y-2">
                  <p>
                    For very small or experimental projects, we may suggest a{" "}
                    <span className="font-medium">short paid exploration</span>{" "}
                    first, then a larger phase based on what we learn.
                  </p>
                  <p>
                    If we&apos;re not the right studio, we&apos;ll try to point
                    you in a useful direction.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
