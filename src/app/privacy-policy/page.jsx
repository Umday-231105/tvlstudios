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
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Last updated: November 30, 2025
        </p>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-8 text-sm text-slate-700 space-y-5">
          <p>
            TVL Studios respects your privacy. This page explains what
            information we collect when you interact with our website and how we
            use it.
          </p>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              Information we collect
            </h2>
            <p>
              When you submit the Start a Project form or contact us by email,
              we collect the details you share, such as your name, email address
              and a description of your project. We do not knowingly collect
              sensitive personal information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              How we use your information
            </h2>
            <p>
              We use the information you provide to understand your project,
              respond to your enquiry and, if we work together, to manage our
              collaboration. We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              Analytics & tooling
            </h2>
            <p>
              We may use privacy‑respecting analytics or infrastructure tools
              (such as hosting platforms) that collect basic technical
              information like device type, approximate region or pages visited.
              This helps us understand how the site is being used and keep it
              reliable.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              How long we keep data
            </h2>
            <p>
              We keep project enquiries and related communication for as long as
              reasonably necessary to discuss potential work or maintain our
              records if we collaborate.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              Your choices
            </h2>
            <p>
              You can ask us to update or delete information you have shared
              with us, subject to any legal obligations we have to keep certain
              records. Reach us at{" "}
              <span className="font-medium">tvlstudioz@gmail.com</span>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-1.5 text-slate-900">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time as our studio or
              tooling changes. The "Last updated" date will always show the most
              recent version.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
