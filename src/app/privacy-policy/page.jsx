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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4"
            : "bg-white/80 backdrop-blur-xl border-b border-neutral-200 py-4"
          : theme === "dark"
          ? "bg-transparent py-8"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-br from-indigo-500 to-purple-500 shadow-indigo-500/30"
                : "bg-gradient-to-br from-indigo-600 to-purple-600 shadow-purple-300/40"
            }`}
          >
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            TVL STUDIOS
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className={`text-sm transition-colors duration-200 ${
              theme === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Home
          </a>

          <a
            href="/start-project"
            className={`text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
              theme === "dark"
                ? "text-white border-white/10 bg-white/5 hover:bg-white/10"
                : "text-black border-black/10 bg-black/5 hover:bg-black/10"
            }`}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-full border ${
            theme === "dark"
              ? "border-white/10 bg-white/5"
              : "border-black/10 bg-black/5"
          }`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <X size={20} className={theme === "dark" ? "text-white" : "text-black"} />
          ) : (
            <Menu size={20} className={theme === "dark" ? "text-white" : "text-black"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-6">
          <div
            className={`rounded-2xl p-4 flex flex-col gap-3 border backdrop-blur-xl ${
              theme === "dark"
                ? "bg-black/80 border-white/10"
                : "bg-white/80 border-black/10"
            }`}
          >
            <a
              href="/"
              className={`text-sm transition-colors ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>

            <a
              href="/start-project"
              className={`text-sm px-4 py-2 rounded-full border transition-all duration-200 text-center ${
                theme === "dark"
                  ? "text-white border-white/10 bg-white/5 hover:bg-white/10"
                  : "text-black border-black/10 bg-black/5 hover:bg-black/10"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Start a Project
            </a>
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
    <footer
      className={`pt-24 pb-12 border-t relative overflow-hidden mt-24 ${
        theme === "dark"
          ? "bg-black border-white/10"
          : "bg-white border-black/10"
      }`}
    >
      {/* Glow Background */}
      {theme === "dark" && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-t from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[120px]" />
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2
              className={`text-4xl md:text-6xl font-bold mb-6 tracking-tight ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Ready to start <br /> your project?
            </h2>
            <p
              className={`text-lg max-w-md ${
                theme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Tell us about your idea. We'll respond with the next steps.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <button
              onClick={() => (window.location.href = "/start-project")}
              className={`px-8 py-3 rounded-full text-sm font-medium tracking-wide flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                theme === "dark"
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              Start a project
              <ArrowRight size={18} />
            </button>
            <p className={theme === "dark" ? "text-xs text-gray-500" : "text-xs text-gray-600"}>
              We'll usually respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center pt-6 border-t text-sm ${
            theme === "dark"
              ? "border-white/10 text-gray-500"
              : "border-black/10 text-gray-600"
          }`}
        >
          <p>&copy; 2026 TVL Studios. All rights reserved.</p>

          <div className="flex gap-8 mt-4 md:mt-0">
            <a
              href="/privacy-policy"
              className="hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
/* -------------------- PAGE CONTENT -------------------- */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 blur-[90px]" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />

      {/* Navbar */}
      <Navbar />

      {/* Privacy Policy Content */}
      <div className="relative z-10 container mx-auto px-6 py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400 mb-10">Last Updated: 28th November 2025 </p>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              At <strong>TVL Studios</strong>, we are committed to protecting your
              privacy and ensuring that your personal information is handled
              responsibly. This Privacy Policy explains how we collect, use,
              store, and protect your data when you interact with our website,
              services, or communication channels.
            </p>

            <p>
              TVL Studios is founded by <strong>Uday Sood</strong> and{" "}
              <strong>Vishal Baibhav Panda</strong>, with{" "}
              <strong>Arnav Verma</strong> serving as Co-Founder.
            </p>

            <h2 className="text-2xl font-semibold mt-10">1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>

            <ul className="list-disc ml-6 space-y-2">
              <li>Personal Information (name, email, phone number, company, project details)</li>
              <li>Usage Data (IP address, browser type, device information, pages viewed, time spent)</li>
              <li>Cookies and tracking technology data</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>To communicate with you about your project or inquiry</li>
              <li>To understand your requirements and provide services</li>
              <li>To improve our website experience and services</li>
              <li>To send updates or promotional content (only if you opt in)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10">3. Sharing of Information</h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal
              information. We may share your data only with trusted third-party
              tools (such as email or analytics providers) or when required by
              law, legal processes, or to protect our rights.
            </p>

            <h2 className="text-2xl font-semibold mt-10">4. Data Security</h2>
            <p>
              We use industry-standard measures to protect your personal
              information, including secure servers and restricted access.
              However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold mt-10">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data, where legally allowed</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10">6. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under the age of 13. We
              do not knowingly collect personal data from children.
            </p>

            <h2 className="text-2xl font-semibold mt-10">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated &quot;Last Updated&quot; date.
            </p>

            <h2 className="text-2xl font-semibold mt-10">8. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, you can contact us at:</p>
            <p>
              <strong>Email:</strong> tvlstudioz@gmail.com <br />
              <strong>Company:</strong> TVL Studios <br />
              <strong>Founders:</strong> Uday Sood, Vishal Baibhav Panda <br />
              <strong>Co-Founder:</strong> Arnav Verma
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
