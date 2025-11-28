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
  Linkedin,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
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
// AI / Tech Three.js BG
// ----------------------
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x020617, 25, 90);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    camera.position.set(0, 0, 24);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Lights – AI data-center vibe
    const ambient = new THREE.AmbientLight(0x4b5563, 0.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x4f46e5, 1.5);
    keyLight.position.set(8, 10, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22d3ee, 1.0);
    rimLight.position.set(-10, -6, -8);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xa855f7, 1.2, 80);
    accentLight.position.set(0, 6, 10);
    scene.add(accentLight);

    // Root group
    const root = new THREE.Group();
    scene.add(root);

    // ----- AI Core (neural sphere) -----
    const coreGeo = new THREE.SphereGeometry(3.5, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x1d1b4b,
      emissiveIntensity: 1.0,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreWire = new THREE.Mesh(coreGeo, coreWireMat);
    root.add(coreWire);

    // ----- Data rings (orbits) -----
    const ringsGroup = new THREE.Group();
    root.add(ringsGroup);

    const ringConfigs = [
      { radius: 5.5, color: 0x22d3ee, tiltX: 0.4, tiltY: 0.1, speed: 0.12 },
      { radius: 6.8, color: 0xa855f7, tiltX: -0.25, tiltY: 0.6, speed: -0.08 },
      { radius: 8.0, color: 0x38bdf8, tiltX: 0.1, tiltY: -0.4, speed: 0.18 },
    ];

    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, 0.07, 16, 220);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = cfg.tiltX;
      ring.rotation.y = cfg.tiltY;
      ring.userData.speed = cfg.speed;
      ringsGroup.add(ring);
    });

    // ----- Nodes + Links (AI network) -----
    const nodesGroup = new THREE.Group();
    root.add(nodesGroup);

    const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.95,
    });

    const nodes = [];
    const linkPositions = [];

    for (let i = 0; i < 32; i++) {
      const r = 6 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.7;
      const z = r * Math.sin(phi) * Math.sin(theta);

      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      node.userData = {
        baseY: y,
        floatOffset: Math.random() * Math.PI * 2,
      };
      nodesGroup.add(node);
      nodes.push(node);
    }

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i].position;
      const b = nodes[(i + 4) % nodes.length].position;
      linkPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linkPositions, 3)
    );
    const linkMat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.35,
    });
    const links = new THREE.LineSegments(linkGeo, linkMat);
    nodesGroup.add(links);

    // ----- Particle field (data dust) -----
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 1000;
    const particlePos = new Float32Array(particleCount * 3);
    const particleCol = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 70;
      const y = (Math.random() - 0.5) * 40;
      const z = -Math.random() * 90;

      particlePos[i3] = x;
      particlePos[i3 + 1] = y;
      particlePos[i3 + 2] = z;

      const tint = 0.7 + Math.random() * 0.3;
      particleCol[i3] = 0.35 * tint;
      particleCol[i3 + 1] = 0.75 * tint;
      particleCol[i3 + 2] = 1.0 * tint;
    }

    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3)
    );
    particlesGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleCol, 3)
    );

    const particlesMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

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

    // Loop
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // System rotation
      root.rotation.y = t * 0.06;
      root.rotation.x = Math.sin(t * 0.12) * 0.08;

      core.rotation.y += 0.004;
      core.rotation.x += 0.002;
      coreWire.rotation.y -= 0.002;

      // Rings
      ringsGroup.children.forEach((ring) => {
        const speed = ring.userData.speed || 0.1;
        ring.rotation.z += speed * 0.01;
      });

      // Nodes float
      nodes.forEach((node) => {
        const { baseY, floatOffset } = node.userData;
        node.position.y = baseY + Math.sin(t * 1.2 + floatOffset) * 0.25;
      });

      // Camera parallax
      const targetX = mouseX * 2.4;
      const targetY = mouseY * 1.6;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      particles.rotation.z = t * 0.02;

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

      coreGeo.dispose();
      coreMat.dispose();
      coreWireMat.dispose();
      linkGeo.dispose();
      linkMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};

// -------------
// Small helpers
// -------------
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
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
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-semibold text-sm tracking-[0.18em] uppercase text-gray-200 group-hover:text-white">
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
            className="ml-4 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-all shadow-md shadow-indigo-500/20"
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
      {/* 3D AI background */}
      <ThreeBackground />

      {/* Subtle dark overlay so content is readable */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0" />

      {/* Foreground content */}
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
                  <span>AI-native creative studio</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                  Design, web, and content
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300 mt-1">
                    built around intelligent systems.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="text-sm md:text-base text-gray-300 max-w-xl mb-6">
                  TVL Studios blends product design, AI workflows, and motion
                  visuals to help brands ship sharper websites, campaigns, and
                  digital experiences—without feeling like templates.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    onClick={() => (window.location.href = "/start-project")}
                    className="px-5 py-2.5 rounded-full bg-white text-black text-xs md:text-sm font-semibold flex items-center gap-1.5 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-indigo-500/30"
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
                    <span>AI-first workflows</span>
                  </div>
                  <span className="w-px h-3 bg-white/20 hidden sm:inline-block" />
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Remote, web-native delivery</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: “stack” card like AGPT style */}
            <div className="flex-1 max-w-md w-full">
              <Reveal delay={0.18}>
                <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
                  <div className="absolute -top-8 right-6 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-[11px] text-emerald-300 uppercase tracking-[0.18em]">
                    In beta with early teams
                  </div>

                  <div className="mb-5">
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mb-1">
                      Output preview
                    </p>
                    <h2 className="text-sm font-medium text-white">
                      A unified layer for brand, product and content.
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between rounded-2xl bg-black/50 border border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                          <MonitorPlay className="w-4 h-4 text-indigo-200" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            Launch-ready websites
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Built in Next.js with motion baked in.
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-400">
                        Live
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-sky-500/15 flex items-center justify-center">
                          <Aperture className="w-4 h-4 text-sky-200" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            AI-assisted creative
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Concepts, variations, copy, and visuals.
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        Studio layer
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-purple-500/15 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-purple-200" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            Systems & automation
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Reusable components, tokens and flows.
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        Optional
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        {/* ABOUT / STUDIO */}
        <section
          id="about"
          className="max-w-6xl mx-auto px-4 py-14 border-t border-white/10"
        >
          <Reveal>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="md:w-1/2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 mb-3">
                  Studio
                </p>
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  A small team building for the AI era of the web.
                </h2>
                <p className="text-sm text-gray-300">
                  TVL Studios sits somewhere between a design studio, a dev
                  shop, and a content team. We help founders and teams launch
                  products, campaigns and brands that feel considered, not
                  generic.
                </p>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4 text-xs text-gray-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">
                    What we combine
                  </p>
                  <p>Product design, web development, brand, motion and AI.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">
                    Who we&apos;re for
                  </p>
                  <p>Early teams, solo founders and creative businesses.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">
                    How we work
                  </p>
                  <p>Clear timelines, async updates and one shared workspace.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] text-gray-400 mb-1">
                    Locations
                  </p>
                  <p>Remote-first, collaborating with clients across time zones.</p>
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
                <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 mb-2">
                  Services
                </p>
                <h2 className="text-xl md:text-2xl font-semibold">
                  Everything you need to launch or refresh.
                </h2>
              </div>
              <p className="text-xs text-gray-400 md:max-w-xs">
                We plug in as your design and build team, or collaborate with
                in-house teams that need a focused push.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
                    <MonitorPlay className="w-4 h-4 text-indigo-300" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">
                    Websites & product pages
                  </h3>
                  <p className="text-gray-300 text-xs">
                    Marketing sites, launch pages and multi-section experiences
                    with motion and responsiveness baked in.
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-4">
                  Tech: Next.js, Tailwind, Framer Motion
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
                    <Cpu className="w-4 h-4 text-purple-200" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">
                    AI-assisted creative systems
                  </h3>
                  <p className="text-gray-300 text-xs">
                    Content templates, prompts, and structures that let you
                    ship consistently across platforms without starting from
                    zero every time.
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-4">
                  Output: decks, docs, social kits, landing flows
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3">
                    <Aperture className="w-4 h-4 text-sky-200" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">
                    Visual identity & graphics
                  </h3>
                  <p className="text-gray-300 text-xs">
                    Logo directions, typography, color, and on-brand visuals
                    for sites, decks, campaigns and social.
                  </p>
                </div>
                <p className="text-[11px] text-gray-500 mt-4">
                  Tools: Figma, Adobe, motion toolchain
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
                <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 mb-2">
                  Process
                </p>
                <h2 className="text-xl md:text-2xl font-semibold">
                  Clear steps, no mystery.
                </h2>
              </div>
              <p className="text-xs text-gray-400 md:max-w-sm">
                We keep the number of things happening at once low so projects
                move forward quickly and calmly.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] text-gray-500 mb-1">01</p>
                <h3 className="font-semibold text-white mb-2">
                  Discovery & alignment
                </h3>
                <p className="text-xs text-gray-300">
                  A short call + shared doc to define scope, constraints,
                  priorities and success metrics.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] text-gray-500 mb-1">02</p>
                <h3 className="font-semibold text-white mb-2">
                  Design, build & refine
                </h3>
                <p className="text-xs text-gray-300">
                  We ship in small chunks: structure, visuals, content, then
                  polish with async feedback.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] text-gray-500 mb-1">03</p>
                <h3 className="font-semibold text-white mb-2">
                  Launch & handoff
                </h3>
                <p className="text-xs text-gray-300">
                  Final implementation, documentation, and a clear way to
                  extend or return for follow-on work.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WORK (placeholder style, you can plug your real cases) */}
        <section
          id="work"
          className="max-w-6xl mx-auto px-4 py-16 border-t border-white/10"
        >
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 mb-2">
                  Work
                </p>
                <h2 className="text-xl md:text-2xl font-semibold">
                  Early explorations & client work.
                </h2>
              </div>
              <p className="text-xs text-gray-400 md:max-w-xs">
                This section can highlight Open Word War, Jibhi Homestead
                Cabins, or any new projects you launch.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-indigo-500/40 via-slate-900 to-purple-500/40" />
                <div className="p-5">
                  <p className="text-[11px] text-gray-500 mb-1">Concept</p>
                  <h3 className="font-semibold text-white">
                    Launch microsite for an AI product
                  </h3>
                  <p className="mt-2 text-xs text-gray-300">
                    A focused story for a new AI tool with a clear scroll, CTA
                    and motion that feels alive.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col">
                <div className="h-40 bg-gradient-to-br from-emerald-500/40 via-slate-900 to-sky-500/40" />
                <div className="p-5">
                  <p className="text-[11px] text-gray-500 mb-1">Client</p>
                  <h3 className="font-semibold text-white">
                    Visual system for a homestay brand
                  </h3>
                  <p className="mt-2 text-xs text-gray-300">
                    Graphics, layouts and site structure for a stay that feels
                    calm, not noisy.
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
                  Have a launch, site or idea in mind?
                </h2>
                <p className="text-xs text-gray-400 max-w-md">
                  Share a short brief—links, goals, timing—and we&apos;ll come back
                  with fit, next steps and questions.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 text-xs text-gray-300">
                <button
                  onClick={() => (window.location.href = "/start-project")}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all shadow-md shadow-indigo-500/30"
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
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">T</span>
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
