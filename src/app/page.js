'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  InstagramIcon,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare
} from 'lucide-react';

// --- Constants & Utils ---
const SMOOTH_TRANSITION = { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }; // "Luxury" ease curve

// --- Components ---

// 1. Interactive 3D Background (Three.js)
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x020312, 18, 60);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x7b8cff, 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x818cf8, 1.2);
    keyLight.position.set(6, 10, 10);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xa855f7, 1.4, 50);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    // Group to hold main objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // AI Core - TorusKnot
    const aiGeo = new THREE.TorusKnotGeometry(3, 0.7, 220, 32);
    const aiMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x1d214f,
      emissiveIntensity: 0.8,
    });
    const aiMesh = new THREE.Mesh(aiGeo, aiMat);
    aiMesh.position.set(-2, 1, 0);
    mainGroup.add(aiMesh);

    // Web Dev - Layered Cubes
    const webGroup = new THREE.Group();
    const webMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      metalness: 0.6,
      roughness: 0.35,
      emissive: 0x052e16,
      emissiveIntensity: 0.5,
    });
    const boxGeo = new THREE.BoxGeometry(1.4, 1, 0.3);
    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(boxGeo, webMat);
      cube.position.set(
        3 + i * 0.2,
        -1.2 + i * 0.35,
        -1 - i * 0.3
      );
      cube.scale.set(1, 1 + i * 0.08, 1);
      webGroup.add(cube);
    }
    mainGroup.add(webGroup);

    // Graphics - Floating Icosahedrons
    const graphicMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x451a03,
      emissiveIntensity: 0.7,
      wireframe: false,
    });

    const graphicsGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.IcosahedronGeometry(0.7, 0);
      const mesh = new THREE.Mesh(geo, graphicMat);
      const radius = 7 + Math.random() * 3;
      const angle = (i / 6) * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * 1.8,
        -4 - Math.random() * 4
      );
      mesh.userData = {
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.4,
      };
      graphicsGroup.add(mesh);
    }
    mainGroup.add(graphicsGroup);

    // Particle field (digital dust)
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 700;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 30;
      const z = -Math.random() * 60;

      posArray[i] = x;
      posArray[i + 1] = y;
      posArray[i + 2] = z;

      const tint = 0.6 + Math.random() * 0.4;
      colorArray[i] = 0.55 * tint;
      colorArray[i + 1] = 0.62 * tint;
      colorArray[i + 2] = 0.98 * tint;
    }

    particlesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeo.setAttribute(
      'color',
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow rotation for main group
      mainGroup.rotation.y = t * 0.06;
      mainGroup.rotation.x = Math.sin(t * 0.15) * 0.12;

      // Extra motion for AI core
      aiMesh.rotation.x += 0.004;
      aiMesh.rotation.y += 0.007;

      // WebDev group subtle motion
      webGroup.rotation.y = Math.sin(t * 0.4) * 0.2;

      // Graphics floating
      graphicsGroup.children.forEach((mesh) => {
        const { floatOffset, floatSpeed } = mesh.userData;
        mesh.position.y += Math.sin(t * floatSpeed + floatOffset) * 0.004;
        mesh.rotation.y += 0.01;
      });

      // Camera parallax
      const targetX = mouseX * 2.2;
      const targetY = mouseY * 1.4;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Slow drift of particles
      particles.rotation.z = t * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      aiGeo.dispose();
      aiMat.dispose();
      boxGeo.dispose();
      graphicMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

// 1. Slow Animated Background (Starfield/Particles)
const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId;
    
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 80; 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 255, ${particle.opacity})`;
        ctx.fill();
      });

      // Subtle nebula overlay
      const gradient = ctx.createRadialGradient(
        width * 0.3, height * 0.3, 0,
        width * 0.3, height * 0.3, width * 0.8
      );
      gradient.addColorStop(0, 'rgba(79, 70, 229, 0.12)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ background: 'radial-gradient(circle at center, #020617 0%, #020617 40%, #020617 100%)' }}
    />
  );
};

// 2. Dynamic Glowing Orbs Background
const BackgroundOrbs = () => {
  // Generate random orbs with varying properties only once on mount
  const orbs = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      // Random position percentages
      top: Math.random() * 80 + 10 + '%', 
      left: Math.random() * 80 + 10 + '%',
      // Random size
      width: Math.random() * 400 + 200, 
      // Random colors (Indigo, Purple, Blue mix)
      color: ['bg-indigo-600/20', 'bg-purple-600/20', 'bg-blue-600/10'][Math.floor(Math.random() * 3)],
      // Random animation duration for independent pulsing
      duration: Math.random() * 5 + 5, 
      // Random delay
      delay: Math.random() * 2,
      // Random max opacity for "some glow more, some less"
      maxOpacity: Math.random() * 0.3 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          style={{ 
            top: orb.top, 
            left: orb.left, 
            width: orb.width, 
            height: orb.width, // Make it a circle
          }}
          className={`absolute rounded-full blur-[100px] ${orb.color}`}
          animate={{ 
            opacity: [0, orb.maxOpacity, 0.05], 
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            duration: orb.duration, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
};

// 3. Navbar
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' 
        : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/40 transition-all duration-500">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-500">TVL STUDIOS</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Process', 'Work'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => window.location.href = "/start-project"}
            className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-semibold tracking-wide hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            Start a Project
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full border border-white/10 bg-white/5" 
          onClick={() => setMobileMenuOpen(prev => !prev)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-6 pb-4">
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            {['About', 'Services', 'Process', 'Work'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => {
                window.location.href = "/start-project";
                setMobileMenuOpen(false);
              }}
              className="mt-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition-all duration-200"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// 4. Reveal Wrapper for smooth scroll-in animations
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
  >
    {children}
  </motion.div>
);

// 5. Hook for parallax scroll effects (hero + cards)
const useParallax = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return { ref, y, opacity };
};

// 6. Service Card Component
const ServiceCard = ({ Icon, title, desc, badge }) => {
  return (
    <Reveal>
      <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden hover:border-indigo-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(79,70,229,0.35)]">
        {/* Glow behind */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-400/40 flex items-center justify-center group-hover:bg-indigo-500/30 transition-all duration-300">
              <Icon className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors duration-300" />
            </div>
            {badge && (
              <span className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 bg-indigo-500/10 border border-indigo-500/40 rounded-full px-3 py-1">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
            {title}
          </h3>
          <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Reveal>
  );
};

// 7. Main App Layout
export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <ThreeBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-gray-300 font-medium tracking-wide">Accepting New Clients for 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block mb-2">Designing the</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-200 to-indigo-400">
                next digital era.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              TVL Studios blends{" "}
              <span className="text-indigo-300 font-medium">AI</span>,{" "}
              <span className="text-indigo-300 font-medium">cinematic visuals</span>, and{" "}
              <span className="text-indigo-300 font-medium">purpose-built web experiences</span>{" "}
              to help future-focused brands stand out in a noisy world.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
              <button
                onClick={() => window.location.href = "/start-project"}
                className="px-7 py-3 md:px-8 md:py-3.5 rounded-full bg-white text-black font-medium text-sm md:text-[15px] flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('work');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-7 py-3 md:px-8 md:py-3.5 rounded-full border border-white/20 bg-black/30 text-sm md:text-[15px] text-gray-100 flex items-center gap-2 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              >
                View Our Work
                <Play className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-[13px] text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AI-first creative studio</span>
              </div>
              <span className="h-4 w-px bg-white/15 hidden md:inline-block" />
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-300" />
                <span>Neural-powered motion, web & branding</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About / Studio Section */}
      <section id="about" className="relative py-20 md:py-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300 mb-3 uppercase">
                  STUDIO
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  A small, focused team crafting{" "}
                  <span className="text-indigo-300">future-ready experiences.</span>
                </h2>
                <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed mb-4">
                  TVL Studios was built on one idea:{" "}
                  <span className="text-white font-medium">
                    every interaction should feel designed
                  </span>{" "}
                  — from the first pixel to the last scroll.
                </p>
                <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed">
                  We combine AI workflows, cinematic visuals, and engineering-grade web builds
                  to help brands move faster, launch sharper, and look unforgettable.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Capabilities</p>
                  <p className="text-sm text-white font-medium">
                    AI brand systems, web design, full-stack builds, content systems.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">For teams who</p>
                  <p className="text-sm text-white font-medium">
                    Want to move like a startup, look like a film studio, and scale like a product team.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Based in</p>
                  <p className="text-sm text-white font-medium">
                    Built remote-first, working with clients across time zones.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Approach</p>
                  <p className="text-sm text-white font-medium">
                    Strategy → Systems → Launch → Iterate. No fluff, just momentum.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 md:py-24">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300 mb-3 uppercase">
                  SERVICES
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Built for AI-native brands & ambitious teams.
                </h2>
              </div>
              <p className="hidden md:block text-xs text-gray-400 max-w-xs text-right">
                We plug into your stack as your design, dev, and motion partner — or help you launch something entirely new.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard 
              Icon={Cpu}
              title="AI-Powered Brand & Systems"
              desc="Naming, identity, guidelines, and content systems designed with AI workflows that keep you consistent and fast."
              badge="BRAND"
            />
            <ServiceCard 
              Icon={MonitorPlay}
              title="Web Experiences & Product Sites"
              desc="Launch-ready marketing sites, product pages, and microsites with motion, responsiveness, and performance baked in."
              badge="WEB"
            />
            <ServiceCard 
              Icon={Aperture}
              title="Graphics, Motion & Content"
              desc="Art direction, graphics, social kits, and micro-animations tailored for launches, campaigns, and always-on storytelling."
              badge="CONTENT"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative py-20 md:py-24">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300 mb-3 uppercase">
              PROCESS
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              A clear, calm process from brief to launch.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                step: '01',
                title: 'Discovery',
                body: 'We align on goals, audience, constraints, and opportunities.'
              },
              {
                step: '02',
                title: 'Concept & Direction',
                body: 'Moodboards, directions, and initial structures explored collaboratively.'
              },
              {
                step: '03',
                title: 'Build & Refine',
                body: 'Design, development, and content build-out with tight feedback loops.'
              },
              {
                step: '04',
                title: 'Launch & Support',
                body: 'Hand-off, documentation, and support so you can run with confidence.'
              }
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-[11px] text-indigo-300 mb-2">Step {item.step}</p>
                    <h3 className="text-sm md:text-base font-medium text-white mb-2">{item.title}</h3>
                    <p className="text-xs md:text-[13px] text-gray-400 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work / Projects Section */}
      <section id="work" className="relative py-20 md:py-24">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300 mb-3 uppercase">
                  WORK
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Recent explorations & builds.
                </h2>
              </div>
              <p className="text-xs text-gray-400 max-w-sm">
                We work across SaaS, creators, and AI-native products. Real client work will live here — until then, a preview of the kind of quality we aim for.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Project Cards (placeholder content) */}
            <Reveal>
              <div className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(79,70,229,0.4)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500/40 via-slate-900 to-purple-500/30 relative overflow-hidden">
                  <div className="absolute inset-6 rounded-3xl border border-white/20 bg-black/40 backdrop-blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-10 h-10 text-indigo-200" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-indigo-300 mb-1">Concept</p>
                  <h3 className="text-sm md:text-base font-medium text-white mb-1">
                    AI Launch Microsite
                  </h3>
                  <p className="text-xs text-gray-400">
                    A tight, cinematic product story for an AI-first tool.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(79,70,229,0.4)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-500/30 via-slate-900 to-blue-500/30 relative overflow-hidden">
                  <div className="absolute inset-6 rounded-3xl border border-white/20 bg-black/40 backdrop-blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-emerald-200" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-emerald-300 mb-1">Concept</p>
                  <h3 className="text-sm md:text-base font-medium text-white mb-1">
                    Product Marketing Site
                  </h3>
                  <p className="text-xs text-gray-400">
                    A responsive, conversion-minded home for a SaaS launch.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(79,70,229,0.4)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-fuchsia-500/30 via-slate-900 to-indigo-500/30 relative overflow-hidden">
                  <div className="absolute inset-6 rounded-3xl border border-white/20 bg-black/40 backdrop-blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Aperture className="w-10 h-10 text-fuchsia-200" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-fuchsia-300 mb-1">Concept</p>
                  <h3 className="text-sm md:text-base font-medium text-white mb-1">
                    Visual Identity System
                  </h3>
                  <p className="text-xs text-gray-400">
                    Graphic language for a creator-led AI content brand.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="relative py-20 md:py-24">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="bg-white/5 border border-white/10 rounded-3xl px-6 py-8 md:px-10 md:py-10 max-w-3xl mx-auto backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300 mb-2 uppercase">
                    GET IN TOUCH
                  </p>
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-1">
                    Have a launch, product, or idea in mind?
                  </h2>
                  <p className="text-xs md:text-[13px] text-gray-400">
                    Tell us a bit about what you&apos;re building — we&apos;ll follow up with timelines, ideas, and fit.
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-300" />
                    <span>contact@tvlstudios.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-300" />
                    <span>Project calls via email</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => window.location.href = "/start-project"}
                  className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition-all duration-200"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('about');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 py-3 rounded-full border border-white/20 bg-black/20 text-sm text-gray-100 hover:bg-white/10 transition-all duration-200"
                >
                  Learn more about the studio
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-16 pb-10 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-t from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-sm font-semibold tracking-tight text-white">TVL STUDIOS</span>
              </div>
              <p className="text-xs text-gray-400 max-w-xs">
                A small studio for teams who care about details — combining AI, design, and dev into one tight crew.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-300 mb-3">Navigation</p>
              <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                <a href="#about" className="hover:text-white transition-colors">Studio</a>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
                <a href="#work" className="hover:text-white transition-colors">Work</a>
                <a href="/start-project" className="hover:text-white transition-colors">Start a Project</a>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-300 mb-3">Elsewhere</p>
              <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-white/10 text-[11px] text-gray-500 gap-3">
            <p>&copy; 2026 TVL Studios. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
