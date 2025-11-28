'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, User, Building2, PenTool, ArrowRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-500">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-500">TVL STUDIOS</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Process', 'Work'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
          <button 
            onClick={() => window.location.href = "/start-project"}
            className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Start Project
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden backdrop-blur-xl"
        >
          {['Work', 'Services', 'Process', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-xl text-gray-300 hover:text-white">
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <Navbar />

      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 blur-[90px]" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative z-10 container mx-auto px-6 py-28">
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
            Tell us what you're building — our team will get back within 24 hours with next steps.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
        >

          <form className="space-y-8">

            {/* Name */}
            <div>
              <label className="text-gray-300 font-medium">Your Name</label>
              <div className="flex items-center gap-3 mt-2 bg-white/5 border border-white/10 p-4 rounded-xl">
                <User size={20} className="text-indigo-400" />
                <input 
                  type="text"
                  placeholder="John Doe"
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
                  placeholder="email@example.com"
                  className="bg-transparent w-full outline-none text-white"
                />
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

            {/* Message */}
            <div>
              <label className="text-gray-300 font-medium">Project Details</label>
              <textarea
                rows="5"
                placeholder="Tell us about your vision…"
                className="mt-2 bg-white/5 border border-white/10 p-4 rounded-xl w-full outline-none text-white"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-12 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                Submit
                <ArrowRight />
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
