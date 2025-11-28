'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, User, Building2, PenTool, ArrowRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight group-hover:text-indigo-300 transition-colors duration-300">
            TVL STUDIOS
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/start-project"
            className="text-sm text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full border border-white/10 bg-white/5"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-6">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <a
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/start-project"
              className="text-sm text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-center"
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

// Footer with more relatable copy
const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10 relative overflow-hidden mt-24">
      {/* Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-t from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to start <br /> your project?
            </h2>
            <p className="text-lg text-gray-400 max-w-md">
              Tell us about your website, brand, or idea. We&apos;ll review it and
              get back to you with the next steps.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <button
              onClick={() => (window.location.href = "/start-project")}
              className="px-8 py-3 bg-white text-black rounded-full text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Start a project
              <ArrowRight size={18} />
            </button>
            <p className="text-xs text-gray-500">
              Share a few details and we&apos;ll usually respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 text-sm text-gray-600">
          <p>&copy; 2026 TVL Studios. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 blur-[90px]" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-28">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Start Your Project
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fill in a few details about what you need, and we&apos;ll reach out with ideas,
            pricing, and timelines.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-black/60 border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl shadow-indigo-500/10 backdrop-blur-xl"
        >
          <form className="grid grid-cols-1 gap-8">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-gray-300 font-medium">Full Name</label>
                <div className="flex items-center gap-3 mt-2 bg-white/5 border border-white/10 p-4 rounded-xl">
                  <User size={20} className="text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-transparent w-full outline-none text-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 font-medium">Email</label>
                <div className="flex items-center gap-3 mt-2 bg-white/5 border border-white/10 p-4 rounded-xl">
                  <Mail size={20} className="text-indigo-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-transparent w-full outline-none text-white"
                  />
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="text-gray-300 font-medium">Company / Brand (optional)</label>
              <div className="flex items-center gap-3 mt-2 bg-white/5 border border-white/10 p-4 rounded-xl">
                <Building2 size={20} className="text-indigo-400" />
                <input
                  type="text"
                  placeholder="Your Company"
                  className="bg-transparent w-full outline-none text-white"
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="text-gray-300 font-medium">Project Type</label>
              <div className="flex items-center gap-3 mt-2 bg-white/5 border border-white/10 p-4 rounded-xl">
                <PenTool size={20} className="text-indigo-400" />
                <select className="bg-transparent w-full outline-none text-white">
                  <option className="text-black">Website</option>
                  <option className="text-black">Branding</option>
                  <option className="text-black">UI/UX</option>
                  <option className="text-black">Graphic Design</option>
                  <option className="text-black">Full Creative Package</option>
                </select>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label className="text-gray-300 font-medium">Project Details</label>
              <textarea
                rows="5"
                placeholder="Tell us what you&apos;re looking for, your goals, and any references you like…"
                className="mt-2 bg-white/5 border border-white/10 p-4 rounded-xl w-full outline-none text-white"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-between items-center flex-col md:flex-row gap-4">
              <p className="text-gray-500 text-sm max-w-md">
                By submitting, you agree that we may contact you about this project.
              </p>
              <button
                type="submit"
                className="px-12 py-4 bg.white text-black rounded-full text-sm font-semibold tracking-wide hover:bg-gray-100 md:hover:bg-white/90 md:text-black transition-all duration-300 flex items-center gap-2"
              >
                Submit
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
