'use client';
import React from "react";
import { motion } from "framer-motion";
import { Mail, User, Building2, PenTool, ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

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
