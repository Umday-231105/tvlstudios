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
} from "lucide-react";
import * as THREE from "three";
import { Sun, Moon } from "lucide-react";

// ======= THEME HOOK (ADD THIS EXACTLY HERE) =======
function useTheme() {
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    const saved = localStorage.getItem("tvl-theme");
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("tvl-theme", next);
  };

  return { theme, toggleTheme };
}


// ----------------------
// Smooth animation curve
// ----------------------
const SMOOTH_TRANSITION = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

// ----------------------
// Subtle, neutral 3D background
// ----------------------
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    // No solid background: keep transparent so UI controls color

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
    renderer.setClearColor(0x000000, 0); // fully transparent
    container.appendChild(renderer.domElement);

    // Soft, neutral lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf3f4f6, 0.5);
    keyLight.position.set(6, 10, 12);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe5e7eb, 0.4);
    fillLight.position.set(-10, -6, 8);
    scene.add(fillLight);

    const root = new THREE.Group();
    scene.add(root);

    // Neutral "panels" floating in the back (like abstract cards)
    const panelMatBase = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      metalness: 0.1,
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
      if (idx === 1) {
        mat.color = new THREE.Color("#f4f4f5"); // slightly warmer panel
      }
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

    // Cylinders as vertical "columns"
    const columnGeo = new THREE.CylinderGeometry(0.25, 0.25, 6, 24);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.1,
      roughness: 0.85,
    });

    const columns = [];
    [-10, -3, 4, 11].forEach((x) => {
      const col = new THREE.Mesh(columnGeo, columnMat);
      col.position.set(x, -1, -18 - Math.random() * 4);
      root.add(col);
      columns.push(col);
    });

    // Very soft grid plane
    const gridHelper = new THREE.GridHelper(120, 40, 0xdddddf, 0xededed);
    gridHelper.position.y = -10;
    gridHelper.position.z = -30;
    gridHelper.rotation.x = -Math.PI / 2;
    gridHelper.material.opacity = 0.12;
    gridHelper.material.transparent = true;
    root.add(gridHelper);

    // Mouse parallax
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

      // Gentle, slow movement
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
          ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200"
          : "bg-gradient-to-b from-white/90 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-200 via-amber-100 to-lime-100 flex items-center justify-center shadow-md shadow-neutral-300/70 border border-white">
            <span className="text-neutral-900 font-semibold text-lg">T</span>
          </div>
          <span className="font-medium text-sm tracking-[0.18em] uppercase text-neutral-700 group-hover:text-neutral-900">
            TVL Studios
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-600">
          <a href="#about" className="hover:text-neutral-900 transition-colors">
            About
          </a>
          <a
            href="#services"
            className="hover:text-neutral-900 transition-colors"
          >
            Services
          </a>
          <a
            href="#process"
            className="hover:text-neutral-900 transition-colors"
          >
            Process
          </a>
          <a href="#work" className="hover:text-neutral-900 transition-colors">
            Work
          </a>
          <button
            onClick={() => (window.location.href = "/start-project")}
            className="ml-4 px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 text-xs font-semibold hover:bg-neutral-800 transition-all shadow-sm shadow-neutral-400/60"
          >
            Start a project
          </button>
        </div>

        <button
          className="md:hidden text-neutral-800"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-neutral-800">
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
              className="mt-2 px-4 py-2 rounded-full bg-neutral-900 text-neutral-50 text-xs font-semibold"
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

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 relative overflow-hidden">
      <ThreeBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* HERO – light with warm gradient */}
        <main className="w-full pt-24 md:pt-28 pb-16 bg-gradient-to-b from-emerald-50/60 via-neutral-50 to-amber-50/40">
          <section className="max-w-6xl mx-auto px-4">
            <div className="rounded-3xl border border-neutral-200 bg-white/70 backdrop-blur-2xl px-6 md:px-10 py-10 md:py-14 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Left: text */}
                <div className="flex-1">
                  <Reveal delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100/80 border border-neutral-200 text-[11px] uppercase tracking-[0.2em] text-neutral-600 mb-5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Design, product & web for modern teams</span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                      Calm, reliable digital
                      <span className="block text-emerald-700 mt-1">
                        experiences that scale.
                      </span>
                    </h1>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <p className="text-sm md:text-base text-neutral-700 max-w-xl mb-6">
                      TVL Studios works with teams to design and build product
                      pages, marketing sites and brand systems that feel clear,
                      modern and durable—without overcomplication.
                    </p>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <button
                        onClick={() =>
                          (window.location.href = "/start-project")
                        }
                        className="px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-50 text-xs md:text-sm font-semibold flex items-center gap-1.5 hover:bg-neutral-800 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm shadow-neutral-400/70"
                      >
                        Start a project
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById("work");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-4 py-2 rounded-full border border-neutral-300 bg-white/70 text-xs md:text-sm text-neutral-800 flex items-center gap-1.5 hover:bg-neutral-100 transition-all"
                      >
                        View work
                        <Play className="w-3 h-3" />
                      </button>
                    </div>
                  </Reveal>

                  <Reveal delay={0.28}>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Product & marketing sites</span>
                      </div>
                      <span className="w-px h-3 bg-neutral-300 hidden sm:inline-block" />
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-amber-500" />
                        <span>Remote, async-friendly collaboration</span>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Right: glassy “stack” card */}
                <div className="flex-1 max-w-md w-full">
                  <Reveal delay={0.18}>
                    <div className="rounded-3xl border border-neutral-200 bg-white/60 backdrop-blur-2xl px-5 py-6 shadow-[0_12px_40px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-transform duration-500">
                      <div className="mb-4">
                        <p className="text-[11px] text-neutral-500 uppercase tracking-[0.2em] mb-1">
                          Engagements
                        </p>
                        <h2 className="text-sm font-medium text-neutral-900">
                          One studio for design, build and content.
                        </h2>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between rounded-2xl bg-neutral-50/90 border border-neutral-200 px-4 py-3 hover:bg-neutral-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center">
                              <MonitorPlay className="w-4 h-4 text-emerald-700" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900 text-xs">
                                Websites & product pages
                              </p>
                              <p className="text-[11px] text-neutral-600">
                                Launch sites, product detail pages and
                                conversion-focused flows.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-neutral-50/90 border border-emerald-200 px-4 py-3 hover:bg-emerald-50/70 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center">
                              <Cpu className="w-4 h-4 text-emerald-700" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900 text-xs">
                                AI-aware content systems
                              </p>
                              <p className="text-[11px] text-neutral-600">
                                Structures, prompts and templates that keep
                                content on-brand.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl bg-neutral-50/90 border border-amber-200 px-4 py-3 hover:bg-amber-50/70 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center">
                              <Aperture className="w-4 h-4 text-amber-700" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900 text-xs">
                                Visual identity
                              </p>
                              <p className="text-[11px] text-neutral-600">
                                Type, color and component systems suited for
                                product and web.
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

        {/* ABOUT – light neutral with emerald accent */}
        <section
          id="about"
          className="w-full border-t border-neutral-200 bg-gradient-to-b from-amber-50/40 via-neutral-50 to-emerald-50/30 py-14"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="rounded-3xl bg-white/70 border border-neutral-200 backdrop-blur-xl px-6 md:px-10 py-10">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="md:w-1/2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700 mb-3">
                      Studio
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3 text-neutral-900">
                      A focused team with a broad toolset.
                    </h2>
                    <p className="text-sm text-neutral-700">
                      We operate like an embedded product and brand team for a
                      limited number of clients. Strategy, UX, UI, build and
                      content sit together so the work feels coherent and moves
                      forward predictably.
                    </p>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-2 gap-4 text-xs text-neutral-800">
                    <div className="rounded-2xl border border-neutral-200 bg-emerald-50/60 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-emerald-700 mb-1">
                        Focus areas
                      </p>
                      <p>Product, marketing, brand and simple internal tools.</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-emerald-50/60 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-emerald-700 mb-1">
                        Ideal projects
                      </p>
                      <p>First launches, redesigns, repositioning and new bets.</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-neutral-500 mb-1">
                        Collaboration
                      </p>
                      <p>Clear owners, regular check-ins, async-friendly.</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-4">
                      <p className="text-[11px] text-neutral-500 mb-1">
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

        {/* SERVICES – neutral with emerald + amber columns */}
        <section
          id="services"
          className="w-full border-t border-neutral-200 bg-gradient-to-b from-neutral-50 via-emerald-50/30 to-amber-50/20 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700 mb-2">
                    Services
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
                    From idea to shipped, or in-between.
                  </h2>
                </div>
                <p className="text-xs text-neutral-600 md:max-w-xs">
                  We can own the full journey—structure, design, implementation
                  and content—or collaborate closely with your in-house
                  designers and engineers.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-neutral-200/80">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                      <MonitorPlay className="w-4 h-4 text-emerald-700" />
                    </div>
                    <h3 className="font-semibold mb-2 text-neutral-900">
                      Websites & product pages
                    </h3>
                    <p className="text-neutral-700 text-xs">
                      Marketing sites, launch pages and multi-section
                      experiences with strong hierarchy and measured motion.
                    </p>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-4">
                    Tech: Next.js, React, Tailwind, motion
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-emerald-100/80">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                      <Cpu className="w-4 h-4 text-emerald-700" />
                    </div>
                    <h3 className="font-semibold mb-2 text-neutral-900">
                      AI-aware content & systems
                    </h3>
                    <p className="text-neutral-700 text-xs">
                      Content structures, prompts and templates that help your
                      team produce on-brand work faster across pages, decks and
                      campaigns.
                    </p>
                  </div>
                  <p className="text-[11px] text-neutral-600 mt-4">
                    Output: docs, templates, messaging frameworks
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 backdrop-blur-xl p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-amber-100/80">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                      <Aperture className="w-4 h-4 text-amber-700" />
                    </div>
                    <h3 className="font-semibold mb-2 text-neutral-900">
                      Visual identity & graphics
                    </h3>
                    <p className="text-neutral-700 text-xs">
                      Identity foundations, key visuals and simple systems that
                      scale across product UI, web, decks and social.
                    </p>
                  </div>
                  <p className="text-[11px] text-neutral-600 mt-4">
                    Tools: Figma, Adobe, motion tools
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS – very light neutral band */}
        <section
          id="process"
          className="w-full border-t border-neutral-200 bg-gradient-to-b from-amber-50/40 via-neutral-50 to-emerald-50/25 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Process
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
                    Simple phases, so you always know where we are.
                  </h2>
                </div>
                <p className="text-xs text-neutral-600 md:max-w-sm">
                  We focus on clarity and momentum. Work moves forward in clear
                  stages, with room for feedback without endless loops.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-[11px] text-neutral-500 mb-1">01</p>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Discover & define
                  </h3>
                  <p className="text-xs text-neutral-700">
                    Intake, a short call if useful, and a structured doc that
                    captures goals, constraints, audience and scope.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-[11px] text-neutral-500 mb-1">02</p>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Design, iterate & build
                  </h3>
                  <p className="text-xs text-neutral-700">
                    We move from structure to visuals to implementation, with a
                    few focused rounds of feedback in context—not just static
                    screens.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-[11px] text-neutral-500 mb-1">03</p>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Launch & support
                  </h3>
                  <p className="text-xs text-neutral-700">
                    QA, documentation and handoff. Optional support for future
                    iterations, new pages or additional product flows.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WORK – neutral with slight green/amber backgrounds */}
        <section
          id="work"
          className="w-full border-t border-neutral-200 bg-gradient-to-b from-emerald-50/30 via-neutral-50 to-amber-50/30 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Work
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
                    Early examples & collaborations.
                  </h2>
                </div>
                <p className="text-xs text-neutral-600 md:max-w-xs">
                  This is where we&apos;ll go deeper on case studies—Open Word War,
                  Jibhi Homestead Cabins and future launches.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-neutral-200 bg-white/85 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-neutral-200/80">
                  <div className="h-40 bg-gradient-to-br from-emerald-100 via-neutral-50 to-amber-100" />
                  <div className="p-5">
                    <p className="text-[11px] text-neutral-500 mb-1">Concept</p>
                    <h3 className="font-semibold text-neutral-900">
                      Launch site for an AI product
                    </h3>
                    <p className="mt-2 text-xs text-neutral-700">
                      A focused, calm marketing site for a new tool with clear
                      narrative, structure and a single primary action.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-neutral-200 bg-white/85 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm shadow-neutral-200/80">
                  <div className="h-40 bg-gradient-to-br from-amber-100 via-neutral-50 to-emerald-100" />
                  <div className="p-5">
                    <p className="text-[11px] text-neutral-500 mb-1">Client</p>
                    <h3 className="font-semibold text-neutral-900">
                      Visual system for a hospitality brand
                    </h3>
                    <p className="mt-2 text-xs text-neutral-700">
                      Layout, visuals and site structure for a stay that feels
                      warm and understated instead of loud and busy.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOOTER – clean neutral base */}
        <footer className="w-full border-t border-neutral-200 bg-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2 text-neutral-900">
                  Have something coming up?
                </h2>
                <p className="text-xs text-neutral-600 max-w-md">
                  Share a brief overview—timing, context, goals. We&apos;ll
                  respond with fit, a rough shape of the work and clear next
                  steps.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 text-xs text-neutral-700">
                <button
                  onClick={() => (window.location.href = "/start-project")}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-50 font-semibold hover:bg-neutral-800 transition-all shadow-sm shadow-neutral-400/50"
                >
                  Start a project
                </button>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>tvlstudioz@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-neutral-500 border-t border-neutral-200 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-200 via-amber-100 to-lime-100 flex items-center justify-center border border-white">
                  <span className="text-neutral-900 text-sm font-semibold">
                    T
                  </span>
                </div>
                <span>© 2026 TVL Studios.</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/tvlstudios.xyz/"
                  className="flex items-center gap-1 hover:text-neutral-800 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a
                  href="/privacy-policy"
                  className="hover:text-neutral-800 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="hover:text-neutral-800 transition-colors"
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
