"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          These terms outline how TVL Studios works with clients and how this
          website may be used.
        </p>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-8 text-sm text-slate-700 space-y-5">
          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">1. General</h2>
            <p>
              TVL Studios is a design and development studio focused on websites,
              product pages and visual identity work. By working with us or
              using this site, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              2. Project discussions
            </h2>
            <p>
              Completing the Start a Project form or contacting us does not
              create an obligation for either party. We’ll review your enquiry,
              and if there’s a potential fit, we’ll propose scope, timelines and
              commercial terms in writing.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              3. Proposals & agreements
            </h2>
            <p>
              Specific project details—including pricing, deliverables and
              timelines—are defined in separate proposals, statements of work or
              agreements. Those documents take precedence over this page for the
              relevant project.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              4. Intellectual property
            </h2>
            <p>
              Unless otherwise agreed in writing, final approved deliverables
              become yours once invoices are paid in full. Underlying tools,
              processes and non‑project‑specific assets remain owned by TVL
              Studios.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              5. Use of work in portfolio
            </h2>
            <p>
              We may display non‑confidential work and high‑level case studies
              in our portfolio and marketing materials, unless a different
              arrangement is agreed.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              6. Limitation of liability
            </h2>
            <p>
              We aim to deliver reliable, high‑quality work, but we cannot
              guarantee specific business outcomes. To the extent permitted by
              law, TVL Studios is not liable for indirect or consequential
              losses arising from the use of our work or this website.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              7. Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of this
              site or ongoing collaboration after changes are published means
              you accept the updated version.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              8. Contact
            </h2>
            <p>
              If you have questions about these terms or a specific project,
              reach us at <span className="font-medium">tvlstudioz@gmail.com</span>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
