"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Zap,
  Globe,
  ChevronRight,
  Menu,
  X,
  Cpu,
  Aperture,
  MonitorPlay,
  Instagram as InstagramIcon,
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";
import * as THREE from "three";

// ----------------------
// Smooth animation curve
// ----------------------
const SMOOTH_TRANSITION = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

// ----------------------
// Subtle, professional 3D background (kept minimal)
// ----------------------
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Soft, neutral lighting
    const ambient = new THREE.AmbientLight(0x9ca3af, 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.4);
    keyLight.position.set(6, 9, 12);
    scene.add(keyLight);

    const sideLight = new THREE.DirectionalLight(0x4f46e5, 0.35);
    sideLight.position.set(-10, -4, 8);
    scene.add(sideLight);

    const root = new THREE.Group();
    scene.add(root);

    // Subtle ground grid (structured / professional)
    const gridHelper = new THREE.GridHelper(80, 40, 0x1f2937, 0x111827);
    gridHelper.position.y = -10;
    gridHelper.position.z = -20;
    gridHelper.rotation.x = -Math.PI / 2;
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    root.add(gridHelper);

    // Horizontal panels – hint of “section” layout behind content
    const panelMatBase = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.2,
      roughness: 0.9,
    });

    const panels = [];
    const panelConfig = [
      { y: 4, z: -10, width: 16, depth: 4.5, tilt: 0.03 },
      { y: 0, z: -13, width: 18, depth: 4.2, tilt: 0.05 },
      { y: -4, z: -16, width: 16, depth: 4.8, tilt: 0.02 },
    ];

    panelConfig.forEach((cfg, idx) => {
      const geo = new THREE.BoxGeometry(cfg.width, 0.16, cfg.depth);
      const mat = panelMatBase.clone();
      mat.color = new THREE.Color(idx === 1 ? "#020617" : "#020617");
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, cfg.y, cfg.z);
      mesh.rotation.x = -0.22 - cfg.tilt;
      mesh.userData = {
        baseY: cfg.y,
        floatOffset: Math.random() * Math.PI * 2,
      };
      root.add(mesh);
      panels.push(mesh);
    });

    // Very subtle “columns” for depth
    const columnGeo = new THREE.BoxGeometry(0.25, 5, 0.25);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      metalness: 0.25,
      roughness: 0.9,
    });

    const columns = [];
    const colXPositions = [-6, -2, 2, 6];
    colXPositions.forEach((x) => {
      const col = new THREE.Mesh(columnGeo, columnMat);
      col.position.set(x, 2, -12 - Math.random() * 2.5);
      root.add(col);
      columns.push(col);
    });

    // Slight mouse-based parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle, slow motion
      root.rotation.y = Math.sin(t * 0.02) * 0.04;
      root.rotation.x = Math.sin(t * 0.015) * 0.02;

      panels.forEach((panel) => {
        const { baseY, floatOffset } = panel.userData;
        panel.position.y = baseY + Math.sin(t * 0.25 + floatOffset) * 0.18;
      });

      columns.forEach((col, idx) => {
        col.rotation.y = Math.sin(t * 0.12 + idx) * 0.04;
      });

      const targetX = mouseX * 1.5;
      const targetY = mouseY * 1.0;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      columnGeo.dispose();
      columnMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};

// --------- Helpers ----------
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ ...SMOOTH_TRANSITION, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// --------- Navbar ----------
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/10"
          : "bg-gradient-to-b from-slate-950/90 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-50 flex items-center justify-center shadow-lg shadow-slate-900/40">
            <span className="text-slate-900 font-semibold text-lg">T</span>
          </div>
          <span className="font-medium text-sm tracking-[0.18em] uppercase text-slate-100 group-hover:text-white">
            TVL Studios
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-xs text-slate-200">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#work" className="hover:text-white transition-colors">
            Work
          </a>
          <button
            onClick={() => (window.location.href = "/start-project")}
            className="ml-4 px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-all shadow-md shadow-slate-900/20"
          >
            Start a project
          </button>
        </div>

        <button
          className="md:hidden text-slate-100"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-slate-100">
            {["about", "services", "process", "work"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = "/start-project";
              }}
              className="mt-2 px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-semibold"
            >
              Start a project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// -------------
// Main App
// -------------
export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <ThreeBackground />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* HERO – dark, primary section */}
        <main className="w-full pt-24 md:pt-28 pb-14">
          <section className="max-w-6xl mx-auto px-4">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-slate-900/70 backdrop-blur-xl px-6 md:px-10 py-10 md:py-14 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Left: text */}
                <div className="flex-1">
                  <Reveal delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.2em] text-slate-200 mb-5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Design, product & web for AI-native teams</span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                      Clear, modern experiences
                      <span className="block text-slate-100 mt-1">
                        that ship on time—and last.
                      </span>
                    </h1>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl mb-6">
                      TVL Studios partners with teams to design and build
                      websites, product pages and brand foundations that feel
                      simple, considered and future-focused—without looking
                      like templates.
                    </p>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <button
                        onClick={() =>
                          (window.location.href = "/start-project")
                        }
                        className="px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs md:text-sm font-semibold flex items-center gap-1.5 hover:bg-slate-100 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-slate-900/50"
                      >
                        Start a project
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById("work");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs md:text-sm text-slate-100 flex items-center gap-1.5 hover:bg-white/10 transition-all"
                      >
                        View work
                        <Play className="w-3 h-3" />
                      </button>
                    </div>
                  </Reveal>

                  <Reveal delay={0.28}>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-slate-200" />
                        <span>Product & marketing sites</span>
                      </div>
                      <span className="w-px h-3 bg-white/20 hidden sm:inline-block" />
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-slate-200" />
                        <span>Remote, async-friendly collaboration</span>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Right: glassy “stack” card */}
                <div className="flex-1 max-w-md w-full">
                  <Reveal delay={0.18}>
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.85)] hover:-translate-y-1 transition-transform duration-500">
                      <div className="mb-4">
                        <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em] mb-1">
                          How we show up
                        </p>
                        <h2 className="text-sm font-medium text-white">
                          One partner for design, build and content.
                        </h2>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between rounded-2xl bg-slate-950/60 border border-white/10 px-4 py-3 hover:bg-slate-900/70 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                              <MonitorPlay className="w-4 h-4 text-slate-100" />
                            </div>
                            <div>
                              <p className="font-medium text-white text-xs">
                                Websites & launch pages
                              </p>
                              <p className="text-[11px] text-slate-400">
                                Modern, responsive builds with motion baked in.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 border border-white/10 px-4 py-3 hover:bg-slate-900/70 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                              <Cpu className="w-4 h-4 text-slate-100" />
                            </div>
                            <div>
                              <p className="font-medium text-white text-xs">
                                AI-aware systems
                              </p>
                              <p className="text-[11px] text-slate-400">
                                Content structures and workflows built to work
                                with AI tools.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 border border-white/10 px-4 py-3 hover:bg-slate-900/70 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                              <Aperture className="w-4 h-4 text-slate-100" />
                            </div>
                            <div>
                              <p className="font-medium text-white text-xs">
                                Visual identity
                              </p>
                              <p className="text-[11px] text-slate-400">
                                Type, color and components that stay coherent
                                over time.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ABOUT – slightly lighter slate, glass block */}
        <section
          id="about"
          className="w-full border-t border-white/5 bg-gradient-to-b from-slate-950/95 to-slate-900/90 py-14"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-2xl px-6 md:px-10 py-10">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="md:w-1/2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200 mb-3">
                      Studio
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">
                      A small team, broad skill set.
                    </h2>
                    <p className="text-sm text-slate-300">
                      We operate like an embedded product and brand team for a
                      handful of clients at a time. Strategy, UX, UI, build and
                      content live in one place so work moves forward without
                      unnecessary friction.
                    </p>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-2 gap-4 text-xs text-slate-200">
                    <div className="rounded-2xl border border-white/10 bg-white/5/90 bg-slate-950/40 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-slate-400 mb-1">
                        Focus areas
                      </p>
                      <p>Product, marketing, brand and simple internal tools.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-slate-400 mb-1">
                        Ideal projects
                      </p>
                      <p>First launches, redesigns, repositioning and new bets.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-slate-400 mb-1">
                        Collaboration
                      </p>
                      <p>Clear owners, regular check-ins, async-friendly.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-slate-400 mb-1">Stack</p>
                      <p>Figma, Next.js, Tailwind, motion tools and AI support.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES – slightly different tone, hint of blue */}
        <section
          id="services"
          className="w-full border-t border-white/5 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200 mb-2">
                    Services
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold">
                    From idea to shipped, or in-between.
                  </h2>
                </div>
                <p className="text-xs text-slate-400 md:max-w-xs">
                  We can own the full journey—structure, design, implementation
                  and content—or collaborate tightly with your in-house
                  designers and engineers.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-900/80 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center mb-3">
                      <MonitorPlay className="w-4 h-4 text-slate-100" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">
                      Websites & product pages
                    </h3>
                    <p className="text-slate-300 text-xs">
                      Marketing sites, launch pages and multi-section
                      experiences with strong hierarchy and motion where it
                      adds clarity.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-4">
                    Tech: Next.js, React, Tailwind, motion
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-900/85 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center mb-3">
                      <Cpu className="w-4 h-4 text-slate-100" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">
                      AI-aware content & systems
                    </h3>
                    <p className="text-slate-300 text-xs">
                      Content structures, prompts and templates that help your
                      team produce on-brand work faster across pages, decks and
                      campaigns.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-4">
                    Output: docs, templates, messaging frameworks
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/75 to-slate-950/85 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center mb-3">
                      <Aperture className="w-4 h-4 text-slate-100" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">
                      Visual identity & graphics
                    </h3>
                    <p className="text-slate-300 text-xs">
                      Identity foundations, key visuals and simple systems that
                      scale across product UI, web, decks and social.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-4">
                    Tools: Figma, Adobe, motion tools
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS – warm slate tone */}
        <section
          id="process"
          className="w-full border-t border-white/5 bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-900/92 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200 mb-2">
                    Process
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold">
                    Simple phases, so you always know where we are.
                  </h2>
                </div>
                <p className="text-xs text-slate-400 md:max-w-sm">
                  We focus on clarity and momentum. Work moves forward in clear
                  steps, with space for feedback without endless loops.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-[11px] text-slate-400 mb-1">01</p>
                  <h3 className="font-semibold text-white mb-2">
                    Discover & define
                  </h3>
                  <p className="text-xs text-slate-300">
                    Intake, a short call if helpful, and a structured doc that
                    captures goals, constraints, audience and scope.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-[11px] text-slate-400 mb-1">02</p>
                  <h3 className="font-semibold text-white mb-2">
                    Design, iterate & build
                  </h3>
                  <p className="text-xs text-slate-300">
                    We move from structure to visuals to implementation, with a
                    few focused rounds of feedback in context—not in the
                    abstract.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-[11px] text-slate-400 mb-1">03</p>
                  <h3 className="font-semibold text-white mb-2">
                    Launch & support
                  </h3>
                  <p className="text-xs text-slate-300">
                    QA, documentation and handoff. Optional support for future
                    iterations, new pages or additional product flows.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WORK – slightly brighter neutrals */}
        <section
          id="work"
          className="w-full border-t border-white/5 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/96 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200 mb-2">
                    Work
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold">
                    Early examples & collaborations.
                  </h2>
                </div>
                <p className="text-xs text-slate-400 md:max-w-xs">
                  This is where we&apos;ll go deeper on case studies—Open Word War,
                  Jibhi Homestead Cabins and future client launches.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="h-40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
                  <div className="p-5">
                    <p className="text-[11px] text-slate-400 mb-1">Concept</p>
                    <h3 className="font-semibold text-white">
                      Launch site for an AI product
                    </h3>
                    <p className="mt-2 text-xs text-slate-300">
                      A focused, calm marketing site for a new AI tool with
                      clear narrative, structure and a single primary action.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="h-40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                  <div className="p-5">
                    <p className="text-[11px] text-slate-400 mb-1">Client</p>
                    <h3 className="font-semibold text-white">
                      Visual system for a hospitality brand
                    </h3>
                    <p className="mt-2 text-xs text-slate-300">
                      Layout, visuals and site structure for a stay that feels
                      warm and understated, instead of loud and busy.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOOTER – solid base color */}
        <footer className="w-full border-t border-white/10 bg-slate-950 py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  Have something coming up?
                </h2>
                <p className="text-xs text-slate-400 max-w-md">
                  Share a brief overview—timing, context, goals. We&apos;ll
                  respond with fit, a rough shape of the work and next steps.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 text-xs text-slate-200">
                <button
                  onClick={() => (window.location.href = "/start-project")}
                  className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all shadow-md shadow-slate-900/40"
                >
                  Start a project
                </button>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-200" />
                  <span>tvlstudioz@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-slate-500 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-slate-200 to-white flex items-center justify-center">
                  <span className="text-slate-900 text-sm font-semibold">
                    T
                  </span>
                </div>
                <span>© 2026 TVL Studios.</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/tvlstudios.xyz/"
                  className="flex items-center gap-1 hover:text-slate-300 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a
                  href="/privacy-policy"
                  className="hover:text-slate-300 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="hover:text-slate-300 transition-colors"
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
