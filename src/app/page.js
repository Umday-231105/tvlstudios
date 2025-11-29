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
  duration: 0.9,
  ease: [0.25, 0.1, 0.25, 1],
};

// ----------------------
// Subtle, professional 3D background
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

    // Root group
    const root = new THREE.Group();
    scene.add(root);

    // Subtle grid plane in the back (like a structured layout hint)
    const gridHelper = new THREE.GridHelper(80, 40, 0x1f2937, 0x111827);
    gridHelper.position.y = -10;
    gridHelper.position.z = -20;
    gridHelper.rotation.x = -Math.PI / 2;
    gridHelper.material.opacity = 0.35;
    gridHelper.material.transparent = true;
    root.add(gridHelper);

    // Horizontal "cards" suggesting layout / sections
    const panelMatBase = new THREE.MeshStandardMaterial({
      color: 0x0b1220,
      metalness: 0.25,
      roughness: 0.85,
    });

    const panels = [];
    const panelConfig = [
      { y: 4, z: -10, width: 14, depth: 4.5, tilt: 0.04 },
      { y: 0, z: -12, width: 18, depth: 4.2, tilt: 0.08 },
      { y: -4, z: -14, width: 16, depth: 4.8, tilt: 0.03 },
    ];

    panelConfig.forEach((cfg, idx) => {
      const geo = new THREE.BoxGeometry(cfg.width, 0.18, cfg.depth);
      const mat = panelMatBase.clone();
      mat.color = new THREE.Color(idx === 1 ? "#0f172a" : "#020617");
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, cfg.y, cfg.z);
      mesh.rotation.x = -0.25 - cfg.tilt;
      mesh.userData = {
        baseY: cfg.y,
        floatOffset: Math.random() * Math.PI * 2,
      };
      root.add(mesh);
      panels.push(mesh);
    });

    // Vertical accent "columns"
    const columnGeo = new THREE.BoxGeometry(0.25, 5, 0.25);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.3,
      roughness: 0.9,
    });

    const columns = [];
    const colXPositions = [-6, -2, 2, 6];
    colXPositions.forEach((x) => {
      const col = new THREE.Mesh(columnGeo, columnMat);
      col.position.set(x, 2, -10 - Math.random() * 3);
      root.add(col);
      columns.push(col);
    });

    // A subtle accent plane behind hero content, slightly offset
    const accentGeo = new THREE.PlaneGeometry(16, 9);
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      metalness: 0.2,
      roughness: 0.9,
      transparent: true,
      opacity: 0.9,
    });
    const accentPlane = new THREE.Mesh(accentGeo, accentMat);
    accentPlane.position.set(3, 1, -8);
    accentPlane.rotation.y = -0.25;
    root.add(accentPlane);

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

    // Animation loop
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Very gentle global motion
      root.rotation.y = Math.sin(t * 0.03) * 0.06;
      root.rotation.x = Math.sin(t * 0.02) * 0.03;

      panels.forEach((panel) => {
        const { baseY, floatOffset } = panel.userData;
        panel.position.y =
          baseY + Math.sin(t * 0.4 + floatOffset) * 0.3;
      });

      columns.forEach((col, idx) => {
        col.rotation.y = Math.sin(t * 0.2 + idx) * 0.08;
      });

      const targetX = mouseX * 1.8;
      const targetY = mouseY * 1.2;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      panelConfig.forEach(() => {
        // geometries/materials already shared above; safely dispose in bulk
      });
      accentGeo.dispose();
      accentMat.dispose();
      columnGeo.dispose();
      columnMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};

// -------------
// Helpers
// -------------
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...SMOOTH_TRANSITION, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// -------------
// Navbar
// -------------
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
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-semibold text-lg">T</span>
          </div>
          <span className="font-medium text-sm tracking-[0.18em] uppercase text-gray-200 group-hover:text-white">
            TVL Studios
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-xs text-gray-300">
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
            className="ml-4 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-all shadow-md shadow-indigo-500/10"
          >
            Start a project
          </button>
        </div>

        {/* Mobile nav */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-gray-200">
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
              className="mt-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold"
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D background */}
      <ThreeBackground />

      {/* Soft overlay for readability */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85 z-0" />

      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <main className="max-w-6xl mx-auto px-4 pt-28 pb-20 md:pt-32">
          <section className="flex flex-col md:flex-row items-center gap-10">
            {/* Left: text */}
            <div className="flex-1">
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.2em] text-gray-300 mb-5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>AI-aware design & web studio</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                  Digital experiences that
                  <span className="block text-slate-100 mt-1">
                    feel considered, not complicated.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="text-sm md:text-base text-gray-300 max-w-xl mb-6">
                  TVL Studios helps teams ship clear, modern websites and brand
                  systems with a calm, product-focused feel. Less noise, more
                  clarity—guided by AI where it actually helps.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    onClick={() => (window.location.href = "/start-project")}
                    className="px-5 py-2.5 rounded-full bg-white text-black text-xs md:text-sm font-semibold flex items-center gap-1.5 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-slate-900/50"
                  >
                    Start a project
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("work");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs md:text-sm text-gray-100 flex items-center gap-1.5 hover:bg-white/10 transition-all"
                  >
                    View work
                    <Play className="w-3 h-3" />
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Product & marketing sites</span>
                  </div>
                  <span className="w-px h-3 bg-white/20 hidden sm:inline-block" />
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Remote, async-friendly collaboration</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: simple “stack” card */}
            <div className="flex-1 max-w-md w-full">
              <Reveal delay={0.15}>
                <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-6 shadow-[0_24px_60px_rgba(15,23,42,0.9)]">
                  <div className="mb-4">
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mb-1">
                      How we show up
                    </p>
                    <h2 className="text-sm font-medium text-white">
                      One studio for design, web and content.
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                          <MonitorPlay className="w-4 h-4 text-slate-100" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            Websites & product pages
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Modern UI, responsive layouts, motion where it
                            matters.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-black/35 border border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-slate-100" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            AI-aware workflows
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Content and design systems built to work with AI,
                            not fight it.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-black/30 border border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                          <Aperture className="w-4 h-4 text-slate-100" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            Visual identity
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Type, color, graphics and components that are easy
                            to keep consistent.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        {/* ABOUT */}
        <section
          id="about"
          className="max-w-6xl mx-auto px-4 py-14 border-t border-white/10"
        >
          <Reveal>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="md:w-1/2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300 mb-3">
                  Studio
                </p>
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Focused, small team. Wide set of skills.
                </h2>
                <p className="text-sm text-gray-300">
                  We operate like an embedded in-house team for a limited number
                  of clients at a time. Strategy, UX, UI, implementation and
                  content all stay in one place, instead of being split across
                  different vendors.
                </p>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4 text-xs text-gray-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">
                    What we cover
                  </p>
                  <p>Product, marketing, brand, and simple internal tools.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">
                    Ideal projects
                  </p>
                  <p>New product launches, redesigns, or first-time brand work.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">
                    Collaboration
                  </p>
                  <p>Clear owners, fast feedback, no endless cycles.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">Stack</p>
                  <p>Figma, Next.js, Tailwind, motion, and AI support tools.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="max-w-6xl mx-auto px-4 py-16 border-t border-white/10"
        >
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300 mb-2">
                  Services
                </p>
                <h2 className="text-xl md:text-2xl font-semibold">
                  From zero to shipped, or somewhere in between.
                </h2>
              </div>
              <p className="text-xs text-gray-400 md:max-w-xs">
                We can own the whole path—structure, visuals, build—or partner
                with your in-house team for specific slices of the work.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center mb-3">
                    <MonitorPlay className="w-4 h-4 text-slate-100" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">
                    Websites & product pages
                  </h3>
                  <p className="text-gray-300 text-xs">
                    Marketing sites, detail pages and flows that feel simple to
                    navigate and easy to extend.
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-4">
                  Tech: Next.js, React, Tailwind, motion
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center mb-3">
                    <Cpu className="w-4 h-4 text-slate-100" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">
                    AI-aware content & systems
                  </h3>
                  <p className="text-gray-300 text-xs">
                    Content structures, prompts and templates that help your
                    team produce on-brand work faster.
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-4">
                  Output: docs, templates, messaging frameworks
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center mb-3">
                    <Aperture className="w-4 h-4 text-slate-100" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">
                    Visual identity & graphics
                  </h3>
                  <p className="text-gray-300 text-xs">
                    Identity foundations, key visuals and simple systems for
                    product, web and decks.
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-4">
                  Tools: Figma, Adobe, motion tools
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROCESS */}
        <section
          id="process"
          className="max-w-6xl mx-auto px-4 py-16 border-t border-white/10"
        >
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300 mb-2">
                  Process
                </p>
                <h2 className="text-xl md:text-2xl font-semibold">
                  Clear phases, so you always know where we are.
                </h2>
              </div>
              <p className="text-xs text-gray-400 md:max-w-sm">
                We focus on momentum and clarity. Fewer surprises, fewer
                revisions, more steady progress.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] text-gray-500 mb-1">01</p>
                <h3 className="font-semibold text-white mb-2">
                  Discover & define
                </h3>
                <p className="text-xs text-gray-300">
                  Short intake, a call if helpful, and a concise doc capturing
                  goals, constraints and scope.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] text-gray-500 mb-1">02</p>
                <h3 className="font-semibold text-white mb-2">
                  Design & build
                </h3>
                <p className="text-xs text-gray-300">
                  We explore, narrow, then build. You see work in context, not
                  just isolated screens.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] text-gray-500 mb-1">03</p>
                <h3 className="font-semibold text-white mb-2">
                  Launch & support
                </h3>
                <p className="text-xs text-gray-300">
                  Implementation, QA and documentation, plus optional support
                  for future iterations.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WORK (simple, can be extended later) */}
        <section
          id="work"
          className="max-w-6xl mx-auto px-4 py-16 border-t border-white/10"
        >
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300 mb-2">
                  Work
                </p>
                <h2 className="text-xl md:text-2xl font-semibold">
                  Early examples & client collaborations.
                </h2>
              </div>
              <p className="text-xs text-gray-400 md:max-w-xs">
                This is where we&apos;ll highlight project stories—Open Word War,
                Jibhi Homestead Cabins, and future launches.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                <div className="p-5">
                  <p className="text-[11px] text-gray-500 mb-1">Concept</p>
                  <h3 className="font-semibold text-white">
                    Launch site for an AI product
                  </h3>
                  <p className="mt-2 text-xs text-gray-300">
                    A calm, focused marketing site with clear messaging, strong
                    hierarchy and a direct primary action.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
                <div className="p-5">
                  <p className="text-[11px] text-gray-500 mb-1">Client</p>
                  <h3 className="font-semibold text-white">
                    Visual system for a hospitality brand
                  </h3>
                  <p className="mt-2 text-xs text-gray-300">
                    Graphics, layout and web structure for a stay that feels
                    understated and welcoming.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER / CTA */}
        <footer className="border-t border-white/10 mt-6">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  Have something coming up?
                </h2>
                <p className="text-xs text-gray-400 max-w-md">
                  Share a rough outline—timeline, context, links. We&apos;ll
                  respond with fit and next steps, usually within a day or two.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 text-xs text-gray-300">
                <button
                  onClick={() => (window.location.href = "/start-project")}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-md shadow-slate-900/40"
                >
                  Start a project
                </button>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-300" />
                  <span>tvlstudioz@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-gray-500 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">T</span>
                </div>
                <span>© 2026 TVL Studios.</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/tvlstudios.xyz/"
                  className="flex items-center gap-1 hover:text-gray-300 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a
                  href="/privacy-policy"
                  className="hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="hover:text-gray-300 transition-colors"
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
