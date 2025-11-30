"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Sun,
  Moon,
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
// Theme hook (light / dark + localStorage)
// ----------------------
function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("tvl-theme")
        : null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tvl-theme", next);
    }
  };

  return { theme, toggleTheme };
}

// ----------------------
// Subtle, neutral 3D background (kept minimal)
// ----------------------
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 40);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // soft lights – more "Scaler" style (cooler)
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xcbd5f5, 0.7);
    keyLight.position.set(6, 10, 12);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    fillLight.position.set(-10, -6, 8);
    scene.add(fillLight);

    const root = new THREE.Group();
    scene.add(root);

    // floating panels – neutral / bluish
    const panelMatBase = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.25,
      roughness: 0.9,
    });

    const panels = [];
    const panelConfigs = [
      { x: -8, y: 6, z: -20, w: 10, h: 0.3, d: 6, tilt: 0.12 },
      { x: 9, y: -2, z: -22, w: 11, h: 0.3, d: 7, tilt: -0.08 },
      { x: -5, y: -7, z: -25, w: 14, h: 0.3, d: 5, tilt: 0.06 },
    ];

    panelConfigs.forEach((cfg, idx) => {
      const geo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d);
      const mat = panelMatBase.clone();
      if (idx === 1) mat.color = new THREE.Color("#0f172a");
      if (idx === 2) mat.color = new THREE.Color("#1d283a");
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.rotation.x = cfg.tilt;
      mesh.userData = {
        baseY: cfg.y,
        floatOffset: Math.random() * Math.PI * 2,
      };
      root.add(mesh);
      panels.push(mesh);
    });

    // columns
    const columnGeo = new THREE.CylinderGeometry(0.25, 0.25, 6, 24);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x1f2933,
      metalness: 0.15,
      roughness: 0.85,
    });

    const columns = [];
    [-10, -3, 4, 11].forEach((x) => {
      const col = new THREE.Mesh(columnGeo, columnMat);
      col.position.set(x, -1, -18 - Math.random() * 4);
      root.add(col);
      columns.push(col);
    });

    // subtle grid
    const gridHelper = new THREE.GridHelper(120, 40, 0x1f2933, 0x111827);
    gridHelper.position.y = -10;
    gridHelper.position.z = -30;
    gridHelper.rotation.x = -Math.PI / 2;
    gridHelper.material.opacity = 0.12;
    gridHelper.material.transparent = true;
    root.add(gridHelper);

    // mouse parallax
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

      root.rotation.y = Math.sin(t * 0.02) * 0.03;
      root.rotation.x = Math.sin(t * 0.015) * 0.02;

      panels.forEach((panel) => {
        const { baseY, floatOffset } = panel.userData;
        panel.position.y = baseY + Math.sin(t * 0.25 + floatOffset) * 0.3;
      });

      columns.forEach((col, idx) => {
        col.rotation.y = Math.sin(t * 0.15 + idx) * 0.05;
      });

      const targetX = mouseX * 2.0;
      const targetY = mouseY * 1.2;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -20);

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
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.22 }}
    transition={{ ...SMOOTH_TRANSITION, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// --------- Navbar ----------
const Navbar = ({ theme, toggleTheme }) => {
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
          ? "bg-slate-950/90 border-b border-slate-800 backdrop-blur-xl"
          : "bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500 via-emerald-400 to-teal-300 flex items-center justify-center shadow-md shadow-sky-500/30 border border-slate-900">
            <span className="text-slate-950 font-semibold text-lg">T</span>
          </div>
          <span className="font-medium text-sm tracking-[0.18em] uppercase text-slate-300 group-hover:text-white">
            TVL Studios
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-4 text-xs text-slate-300">
          <a
            href="#about"
            className="hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-white transition-colors"
          >
            Services
          </a>
          <a
            href="#process"
            className="hover:text-white transition-colors"
          >
            Process
          </a>
          <a
            href="#work"
            className="hover:text-white transition-colors"
          >
            Work
          </a>

          <button
            onClick={() => (window.location.href = "/start-project")}
            className="ml-2 px-4 py-2 rounded-full bg-sky-500 text-slate-950 text-xs font-semibold hover:bg-sky-400 transition-all shadow-sm shadow-sky-500/60"
          >
            Start a project
          </button>

          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-600 hover:bg-slate-800 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-slate-200" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>
        </div>

        {/* mobile theme + menu buttons */}
        <div className="md:hidden flex items-center gap-2 text-slate-100">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-600 hover:bg-slate-800 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-slate-200" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>

          <button onClick={() => setMobileMenuOpen((v) => !v)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
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
              className="mt-2 px-4 py-2 rounded-full bg-sky-500 text-slate-950 text-xs font-semibold"
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
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden transition-colors duration-500">
        <ThreeBackground />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* HERO */}
          <main className="w-full pt-24 md:pt-28 pb-16 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
            <section className="max-w-6xl mx-auto px-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-2xl px-6 md:px-10 py-10 md:py-14 shadow-[0_20px_80px_rgba(15,23,42,0.70)]">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  {/* Left text */}
                  <div className="flex-1">
                    <Reveal delay={0.05}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/40 text-[11px] uppercase tracking-[0.2em] text-sky-200 mb-5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Design, product & web for modern teams</span>
                      </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                        Build serious
                        <span className="block text-sky-400 mt-1">
                          software stories.
                        </span>
                      </h1>
                    </Reveal>

                    <Reveal delay={0.16}>
                      <p className="text-sm md:text-base text-slate-200/80 max-w-xl mb-6">
                        TVL Studios partners with teams to design and ship
                        product pages, marketing sites and brand systems with
                        the same polish you expect from top tech companies.
                      </p>
                    </Reveal>

                    <Reveal delay={0.22}>
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <button
                          onClick={() =>
                            (window.location.href = "/start-project")
                          }
                          className="px-5 py-2.5 rounded-full bg-sky-500 text-slate-950 text-xs md:text-sm font-semibold flex items-center gap-1.5 hover:bg-sky-400 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm shadow-sky-500/60"
                        >
                          Start a project
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const el = document.getElementById("work");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/70 text-xs md:text-sm text-slate-50 flex items-center gap-1.5 hover:bg-slate-800 transition-all"
                        >
                          View work
                          <Play className="w-3 h-3" />
                        </button>
                      </div>
                    </Reveal>

                    <Reveal delay={0.28}>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-300/80">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Product & marketing sites</span>
                        </div>
                        <span className="w-px h-3 bg-slate-600 hidden sm:inline-block" />
                        <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-sky-400" />
                          <span>Remote, async-friendly collaboration</span>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* Right card */}
                  <div className="flex-1 max-w-md w-full">
                    <Reveal delay={0.18}>
                      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-2xl px-5 py-6 shadow-[0_20px_70px_rgba(15,23,42,0.65)] hover:-translate-y-1 transition-transform duration-500">
                        <div className="mb-4">
                          <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em] mb-1">
                            Engagements
                          </p>
                          <h2 className="text-sm font-medium text-slate-50">
                            One studio for design, build and content.
                          </h2>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="flex items-center justify-between rounded-2xl bg-slate-900 border border-slate-700 px-4 py-3 hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-xl bg-sky-500/15 flex items-center justify-center">
                                <MonitorPlay className="w-4 h-4 text-sky-300" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-50 text-xs">
                                  Websites & product pages
                                </p>
                                <p className="text-[11px] text-slate-300">
                                  Launch and marketing sites with strong story,
                                  hierarchy and performance.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between rounded-2xl bg-slate-900 border border-emerald-500/40 px-4 py-3 hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                                <Cpu className="w-4 h-4 text-emerald-300" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-50 text-xs">
                                  AI-aware content systems
                                </p>
                                <p className="text-[11px] text-slate-300">
                                  Structures, prompts and templates to keep
                                  content on-brand at speed.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between rounded-2xl bg-slate-900 border border-amber-400/50 px-4 py-3 hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-xl bg-amber-500/15 flex items-center justify-center">
                                <Aperture className="w-4 h-4 text-amber-300" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-50 text-xs">
                                  Visual identity
                                </p>
                                <p className="text-[11px] text-slate-300">
                                  Type, color and component systems for product
                                  UI, web and decks.
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

          {/* ABOUT */}
          <section
            id="about"
            className="w-full border-t border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-14"
          >
            <div className="max-w-6xl mx-auto px-4">
              <Reveal>
                <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl px-6 md:px-10 py-10">
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="md:w-1/2">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-sky-300 mb-3">
                        Studio
                      </p>
                      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-slate-50">
                        A small team focused on long-term quality.
                      </h2>
                      <p className="text-sm text-slate-200/80">
                        We work like an embedded product and brand team:
                        strategy, UX, UI, build and content sit together so the
                        work feels coherent and keeps moving forward.
                      </p>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4 text-xs text-slate-50">
                      <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-4">
                        <p className="text-[11px] text-sky-300 mb-1">
                          Focus areas
                        </p>
                        <p>Product, marketing, brand and simple internal tools.</p>
                      </div>
                      <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-4">
                        <p className="text-[11px] text-sky-300 mb-1">
                          Ideal projects
                        </p>
                        <p>Launches, redesigns, repositioning and new bets.</p>
                      </div>
                      <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-4">
                        <p className="text-[11px] text-slate-400 mb-1">
                          Collaboration
                        </p>
                        <p>Clear owners, regular check-ins, async-friendly.</p>
                      </div>
                      <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-4">
                        <p className="text-[11px] text-slate-400 mb-1">
                          Stack
                        </p>
                        <p>Figma, Next.js, Tailwind, motion tools and AI support.</p>
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
            className="w-full border-t border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16"
          >
            <div className="max-w-6xl mx-auto px-4">
              <Reveal>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-sky-300 mb-2">
                      Services
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                      From first launch to steady iteration.
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 md:max-w-xs">
                    We can own the full journey—structure, design, build and
                    content—or work next to your in-house team.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <Reveal delay={0.05}>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-slate-900/80">
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3">
                        <MonitorPlay className="w-4 h-4 text-sky-300" />
                      </div>
                      <h3 className="font-semibold mb-2 text-slate-50">
                        Websites & product pages
                      </h3>
                      <p className="text-slate-200/80 text-xs">
                        Marketing sites, launch pages and multi-section
                        experiences with clear narrative and measured motion.
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-4">
                      Tech: Next.js, React, Tailwind, motion
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-emerald-500/30">
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                        <Cpu className="w-4 h-4 text-emerald-200" />
                      </div>
                      <h3 className="font-semibold mb-2 text-slate-50">
                        AI-aware content & systems
                      </h3>
                      <p className="text-slate-100 text-xs">
                        Content structures, prompts and templates that help your
                        team move faster without losing voice.
                      </p>
                    </div>
                    <p className="text-[11px] text-emerald-100 mt-4">
                      Output: docs, templates, messaging frameworks
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="rounded-2xl border border-amber-400/50 bg-amber-500/10 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-amber-500/30">
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                        <Aperture className="w-4 h-4 text-amber-200" />
                      </div>
                      <h3 className="font-semibold mb-2 text-slate-50">
                        Visual identity & graphics
                      </h3>
                      <p className="text-slate-100 text-xs">
                        Identity foundations and key visuals that scale across
                        product UI, web, decks and social.
                      </p>
                    </div>
                    <p className="text-[11px] text-amber-100 mt-4">
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
            className="w-full border-t border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16"
          >
            <div className="max-w-6xl mx-auto px-4">
              <Reveal>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Process
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                      Simple phases, clear checkpoints.
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 md:max-w-sm">
                    Work moves in clear stages with room for feedback, without
                    endless loops or ambiguity.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                {[
                  {
                    num: "01",
                    title: "Discover & define",
                    desc: "Intake, a short call if useful, and a concise spec that captures goals, constraints, audience and scope.",
                  },
                  {
                    num: "02",
                    title: "Design, iterate & build",
                    desc: "From structure to visuals to implementation, with focused feedback rounds in real context—not just static screens.",
                  },
                  {
                    num: "03",
                    title: "Launch & support",
                    desc: "QA, documentation and handoff. Optional support for future iterations, new pages or additional product flows.",
                  },
                ].map((step, i) => (
                  <Reveal key={step.num} delay={0.05 * (i + 1)}>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/85 backdrop-blur-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                      <p className="text-[11px] text-slate-400 mb-1">
                        {step.num}
                      </p>
                      <h3 className="font-semibold text-slate-50 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-200/80">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* WORK */}
          <section
            id="work"
            className="w-full border-t border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16"
          >
            <div className="max-w-6xl mx-auto px-4">
              <Reveal>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Work
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                      Early examples & collaborations.
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 md:max-w-xs">
                    This is where deeper case studies will live: Open Word War,
                    Jibhi Homestead Cabins and future launches.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <Reveal delay={0.05}>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/85 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-black/60">
                    <div className="h-40 bg-gradient-to-br from-sky-500/30 via-slate-900 to-emerald-500/30" />
                    <div className="p-5">
                      <p className="text-[11px] text-slate-400 mb-1">
                        Concept
                      </p>
                      <h3 className="font-semibold text-slate-50">
                        Launch site for an AI product
                      </h3>
                      <p className="mt-2 text-xs text-slate-200/80">
                        A calm, conversion-focused marketing site for a new
                        tool with a strong story and a single main action.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/85 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-black/60">
                    <div className="h-40 bg-gradient-to-br from-emerald-500/30 via-slate-900 to-amber-500/30" />
                    <div className="p-5">
                      <p className="text-[11px] text-slate-400 mb-1">
                        Client
                      </p>
                      <h3 className="font-semibold text-slate-50">
                        Visual system for a hospitality brand
                      </h3>
                      <p className="mt-2 text-xs text-slate-200/80">
                        Layout, visuals and site structure for a stay that
                        feels warm and understated instead of loud and busy.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="w-full border-t border-slate-800 bg-slate-950 py-10">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-50">
                    Have something coming up?
                  </h2>
                  <p className="text-xs text-slate-300 max-w-md">
                    Share a brief overview—timing, context, goals. We&apos;ll
                    respond with fit, a rough shape of the work and next steps.
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 text-xs text-slate-200">
                  <button
                    onClick={() => (window.location.href = "/start-project")}
                    className="px-5 py-2.5 rounded-full bg-sky-500 text-slate-950 font-semibold hover:bg-sky-400 transition-all shadow-sm shadow-sky-500/50"
                  >
                    Start a project
                  </button>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>tvlstudioz@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-slate-400 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-sky-500 via-emerald-400 to-teal-300 flex items-center justify-center border border-slate-900">
                    <span className="text-slate-950 text-sm font-semibold">
                      T
                    </span>
                  </div>
                  <span>© 2026 TVL Studios.</span>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/tvlstudios.xyz/"
                    className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    Instagram
                  </a>
                  <a
                    href="/privacy-policy"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-of-service"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
