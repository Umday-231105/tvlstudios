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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

          <span className="font-medium text-sm tracking-[0.18em] uppercase text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white transition">
            TVL Studios
          </span>
        </a>

        <div className="hidden md:flex items-center gap-5 text-xs text-neutral-600 dark:text-neutral-300">
          <a href="/" className="hover:text-neutral-900 dark:hover:text-white transition">Home</a>
          <button
            onClick={() => (window.location.href = "/start-project")}
            className="px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 text-xs font-semibold hover:bg-neutral-800 transition dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
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
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-neutral-800 dark:text-neutral-100">
            <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = "/start-project";
              }}
              className="px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Start a project
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
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
              Have something coming up?
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md">
              Share your idea, timeline and goals — we’ll get back with clear next steps.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 text-xs text-neutral-700 dark:text-neutral-200">
            <button
              onClick={() => (window.location.href = "/start-project")}
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-50 font-semibold hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
            >
              Start a project
            </button>
            <span className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <strong>Email:</strong> tvlstudioz@gmail.com
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <span>© 2026 TVL Studios.</span>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="hover:text-neutral-800 dark:hover:text-neutral-200">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-neutral-800 dark:hover:text-neutral-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* -------------------- PAGE CONTENT -------------------- */
export default function TermsOfServicePage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-neutral-900 text-neutral-50" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      {/* Light Mode Background */}
      {theme !== "dark" && <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-neutral-50 to-amber-50/40 pointer-events-none" />}

      {/* Dark Mode Background */}
      {theme === "dark" && (
        <>
          <div className="absolute inset-0 bg-neutral-900" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-900 opacity-80" />
        </>
      )}

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/80 backdrop-blur-2xl p-10 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Terms of Service</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-10">
            Last Updated: 28th November 2025
          </p>

          <div className="space-y-6 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the services provided by TVL Studios ("we", "us", "our"). By accessing or using our website or services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8">1. Services</h2>
            <p>
              TVL Studios provides design, product and web development services. All project scopes, deliverables, timelines and pricing are defined in separate statements of work or proposals.
            </p>

            <h2 className="text-xl font-semibold mt-8">2. Payment & Fees</h2>
            <p>
              Unless otherwise agreed in writing, fees are invoiced according to the project proposal. Late payments may incur interest or suspension of services.
            </p>

            <h2 className="text-xl font-semibold mt-8">3. Intellectual Property</h2>
            <p>
              Unless agreed otherwise, we retain rights to design process materials and templates. Delivered final assets are licensed to the client as specified in the project agreement.
            </p>

            <h2 className="text-xl font-semibold mt-8">4. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential information private and use it only to perform obligations under these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8">5. Termination</h2>
            <p>
              Either party may terminate the engagement in accordance with the project agreement. On termination, outstanding invoices become due and we will provide reasonable handover materials.
            </p>

            <h2 className="text-xl font-semibold mt-8">6. Disclaimers & Limitation of Liability</h2>
            <p>
              We make reasonable efforts to deliver quality work, but do not guarantee results. Our liability is limited to direct damages up to the total fees paid for the services in question.
            </p>

            <h2 className="text-xl font-semibold mt-8">7. Governing Law</h2>
            <p>
              These Terms are governed by applicable law where TVL Studios is incorporated. Any disputes will be resolved in the competent courts.
            </p>

            <h2 className="text-xl font-semibold mt-8">8. Changes to Terms</h2>
            <p>
              We may update these Terms occasionally. Continued use of our services after changes implies acceptance of the updated Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at <strong>tvlstudioz@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
