
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Globe,
  Menu,
  X,
  Cpu,
  Aperture,
  MonitorPlay,
  Instagram as InstagramIcon,
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

const SMOOTH_TRANSITION = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.22 }}
    transition={{ ...SMOOTH_TRANSITION, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ---------------- NAVBAR ----------------
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
          <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
          <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
          <a href="#process" className="hover:text-slate-900 transition-colors">Process</a>
          <a href="#work" className="hover:text-slate-900 transition-colors">Work</a>

          {/* ⭐ Assistant Link */}
          <a href="/assistant" className="hover:text-slate-900 transition-colors">
            Assistant
          </a>

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
            {["about", "services", "process", "work"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                className="py-1"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}

            {/* ⭐ Assistant Link (mobile) */}
            <a
              href="/assistant"
              onClick={() => setMobileOpen(false)}
              className="py-1"
            >
              Assistant
            </a>

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

// ---------------- MAIN PAGE ----------------
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* subtle blue glow on left like Scaler */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-[420px] -z-10">
        <div className="w-full h-full bg-gradient-to-br from-sky-500/40 via-sky-500/10 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* HERO */}
        <main className="pt-24 md:pt-28 pb-14">
          <section className="max-w-6xl mx-auto px-4">
            {/* Dark hero card */}
            <div className="rounded-[32px] bg-slate-950 text-slate-50 px-6 md:px-10 py-10 md:py-14 shadow-[0_26px_80px_rgba(15,23,42,0.85)]">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                {/* Left content */}
                <div className="flex-1">
                  <Reveal delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] uppercase tracking-[0.2em] text-slate-300 mb-6">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      <span>Design, product & web for modern teams</span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-semibold tracking-tight leading-tight mb-4">
                      Calm, high‑trust
                      <span className="block text-sky-400">
                        digital experiences.
                      </span>
                    </h1>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <p className="text-sm md:text-[15px] text-slate-200/90 max-w-xl mb-6">
                      TVL Studios works with product teams to design and ship
                      marketing sites, product pages and brand systems that feel
                      clear, modern and trustworthy—without unnecessary noise.
                    </p>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <button
                        onClick={() =>
                          (window.location.href = "/start-project")
                        }
                        className="px-5 py-2.5 rounded-full bg-sky-500 text-white text-xs md:text-sm font-semibold flex items-center gap-1.5 hover:bg-sky-400 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm shadow-sky-500/60"
                      >
                        Start a project
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById("work");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-4 py-2 rounded-full bg-transparent border border-slate-700 text-xs md:text-sm text-slate-50 flex items-center gap-1.5 hover:bg-slate-900 transition-all"
                      >
                        View work
                        <Play className="w-3 h-3" />
                      </button>
                    </div>
                  </Reveal>

                  <Reveal delay={0.28}>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-300">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-sky-300" />
                        <span>Product & marketing sites</span>
                      </div>
                      <span className="hidden sm:inline-block w-px h-3 bg-slate-600" />
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Remote, async‑friendly collaboration</span>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Right visual (image / video style) */}
                <div className="flex-1 max-w-md w-full">
                  <Reveal delay={0.18}>
                    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
                      {/* top "video" bar */}
                      <div className="h-9 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/80">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Studio preview
                        </span>
                      </div>

                      <div className="aspect-video bg-gradient-to-br from-sky-500/50 via-slate-900 to-emerald-500/40 relative overflow-hidden">
                        {/* building / interface blocks */}
                        <div className="absolute inset-0 px-6 py-5 flex flex-col gap-4">
                          <div className="flex gap-3">
                            <div className="w-24 h-16 rounded-xl bg-slate-900/80 border border-slate-700" />
                            <div className="flex-1 h-16 rounded-xl bg-slate-900/80 border border-slate-700" />
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-1 h-20 rounded-xl bg-slate-900/80 border border-slate-700" />
                            <div className="w-24 h-20 rounded-xl bg-sky-500/30 border border-sky-300/60" />
                          </div>
                          <div className="flex gap-3 mt-auto">
                            <div className="w-20 h-3 rounded-full bg-slate-700/70" />
                            <div className="w-14 h-3 rounded-full bg-slate-700/50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* Info cards row under hero (like CS & AI / Bangalore / etc) */}
            <div className="-mt-8 md:-mt-10 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Reveal delay={0.05}>
                  <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/80 border border-slate-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                        <MonitorPlay className="w-4 h-4 text-sky-600" />
                      </div>
                      <span className="text-xs font-semibold text-sky-700">
                        Web & Product
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-slate-900 mb-1">
                      Marketing & product pages
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Clear, conversion‑ready sites for launches & updates.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/80 border border-slate-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-700">
                        AI & Systems
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-slate-900 mb-1">
                      AI‑aware content flows
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Structures, prompts and templates that stay on‑brand.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/80 border border-slate-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Aperture className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-xs font-semibold text-amber-700">
                        Visual Identity
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-slate-900 mb-1">
                      Brand & motion systems
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Identity that works across product, web, decks & social.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/80 border border-slate-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-slate-700" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        Remote‑first
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-slate-900 mb-1">
                      Based in India, working globally
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Async‑friendly, clear documentation and ownership.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        {/* ABOUT */}
        <section
          id="about"
          className="w-full border-t border-slate-100 bg-slate-50 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="rounded-3xl bg-white border border-slate-100 shadow-sm shadow-slate-200/60 px-6 md:px-10 py-10">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="md:w-1/2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">
                      Studio
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3 text-slate-900">
                      A small studio with product thinking built in.
                    </h2>
                    <p className="text-sm text-slate-600">
                      We operate like an embedded product and brand team. Design,
                      content and build sit together so the work feels coherent
                      and moves forward on a predictable cadence.
                    </p>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-2 gap-4 text-xs text-slate-800">
                    <div className="rounded-2xl border border-slate-100 bg-sky-50 p-4">
                      <p className="text-[11px] text-sky-700 mb-1">
                        Focus areas
                      </p>
                      <p>Product, marketing, brand and simple internal tools.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-emerald-50 p-4">
                      <p className="text-[11px] text-emerald-700 mb-1">
                        Ideal projects
                      </p>
                      <p>First launches, repositioning, new product bets.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[11px] text-slate-500 mb-1">
                        Collaboration
                      </p>
                      <p>Clear owners, short check‑ins, async docs.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[11px] text-slate-500 mb-1">Stack</p>
                      <p>Figma, Next.js, Tailwind, motion and AI‑powered tools.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="w-full border-t border-slate-100 bg-white py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Services
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    From first launch to ongoing iteration.
                  </h2>
                </div>
                <p className="text-xs text-slate-600 md:max-w-xs">
                  We can own the full journey—structure, design, build and
                  content—or plug into your existing product & engineering teams.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 h-full flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:shadow-slate-200/90 transition-transform duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center mb-3">
                      <MonitorPlay className="w-4 h-4 text-sky-600" />
                    </div>
                    <h3 className="font-semibold mb-2 text-slate-900">
                      Websites & product pages
                    </h3>
                    <p className="text-slate-600 text-xs">
                      Multi‑section marketing sites, launch pages and product
                      detail pages with clear hierarchy and strong messaging.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-4">
                    Tech: Next.js, React, Tailwind, motion
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 h-full flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:shadow-emerald-100/80 transition-transform duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                      <Cpu className="w-4 h-4 text-emerald-700" />
                    </div>
                    <h3 className="font-semibold mb-2 text-slate-900">
                      AI‑aware content & systems
                    </h3>
                    <p className="text-slate-700 text-xs">
                      Content structures, prompts and templates that help your
                      team produce high‑quality work faster while staying
                      on‑brand.
                    </p>
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-4">
                    Output: docs, templates, messaging frameworks
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 h-full flex flex-col justify-between hover:-translate-y-1 hover:shadow-md hover:shadow-amber-100/80 transition-transform duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                      <Aperture className="w-4 h-4 text-amber-700" />
                    </div>
                    <h3 className="font-semibold mb-2 text-slate-900">
                      Visual identity & graphics
                    </h3>
                    <p className="text-slate-700 text-xs">
                      Identity foundations and key visuals that scale across
                      product UI, web, decks and social channels.
                    </p>
                  </div>
                  <p className="text-[11px] text-amber-700 mt-4">
                    Tools: Figma, Adobe, motion tools
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section
          id="process"
          className="w-full border-t border-slate-100 bg-slate-50 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Process
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    Simple phases, clear checkpoints.
                  </h2>
                </div>
                <p className="text-xs text-slate-600 md:max-w-sm">
                  Work moves in defined stages with room for feedback, but
                  without endless loops. You always know what we&apos;re doing
                  and what&apos;s coming next.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {[
                {
                  num: "01",
                  title: "Discover & define",
                  desc: "Structured intake, a short call if helpful, and a concise spec capturing goals, constraints, audience and scope.",
                },
                {
                  num: "02",
                  title: "Design, iterate & build",
                  desc: "From structure to visuals to implementation, with feedback in context—not just static screens in a deck.",
                },
                {
                  num: "03",
                  title: "Launch & support",
                  desc: "QA, documentation and handoff. Optional support for future iterations, new pages or additional flows.",
                },
              ].map((step, i) => (
                <Reveal key={step.num} delay={0.05 * (i + 1)}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 hover:-translate-y-1 hover:shadow-md hover:shadow-slate-200/80 transition-transform duration-300">
                    <p className="text-[11px] text-slate-500 mb-1">
                      {step.num}
                    </p>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section
          id="work"
          className="w-full border-t border-slate-100 bg-white py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Work
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    Early examples & collaborations.
                  </h2>
                </div>
                <p className="text-xs text-slate-600 md:max-w-xs">
                  This is where deeper case studies will live—Open Word War,
                  Jibhi Homestead Cabins and future product & brand work.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-slate-100 bg-slate-50 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/90 transition-transform duration-300">
                  <div className="h-40 bg-gradient-to-br from-sky-500/40 via-slate-900/80 to-emerald-500/40" />
                  <div className="p-5">
                    <p className="text-[11px] text-slate-500 mb-1">
                      Concept
                    </p>
                    <h3 className="font-semibold text-slate-900">
                      Open Word War
                    </h3>
                    <p className="mt-2 text-xs text-slate-600">
                      A focused branding and social media management for MUN.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-slate-100 bg-slate-50 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/90 transition-transform duration-300">
                  <div className="h-40 bg-gradient-to-br from-emerald-500/40 via-slate-900/80 to-amber-500/40" />
                  <div className="p-5">
                    <p className="text-[11px] text-slate-500 mb-1">
                      Client
                    </p>
                    <h3 className="font-semibold text-slate-900">
                      Jibhi Homestead Cabins
                    </h3>
                    <p className="mt-2 text-xs text-slate-600">
                      Crafting a warm, nature‑first website for Jibhi Homestead Cabins.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-slate-100 bg-slate-50 py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-900">
                  Have something coming up?
                </h2>
                <p className="text-xs text-slate-600 max-w-md">
                  Share a brief overview—timing, context, goals. We&apos;ll
                  respond with fit, a rough shape of the work and clear next
                  steps.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 text-xs text-slate-700">
                <button
                  onClick={() => (window.location.href = "/start-project")}
                  className="px-5 py-2.5 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-500 transition-all shadow-sm shadow-sky-500/40"
                >
                  Start a project
                </button>
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
                <a
                  href="/privacy-policy"
                  className="hover:text-slate-700 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="hover:text-slate-700 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
