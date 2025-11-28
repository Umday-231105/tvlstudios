"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
  MessageSquare
} from "lucide-react";

// --- Three.js / R3F imports for the background
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// --- Constants & Utils ---
const SMOOTH_TRANSITION = { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }; // "Luxury" ease curve

// ---------------------------
// Interactive 3D Background
// ---------------------------
function InteractiveBlob() {
  const ref = useRef();
  const group = useRef();
  const { mouse, viewport } = useThree();

  useFrame(() => {
    const x = (mouse.x * viewport.width) / 8;
    const y = (mouse.y * viewport.height) / 10;

    if (group.current) {
      group.current.position.x += (x - group.current.position.x) * 0.05;
      group.current.position.y += (y - group.current.position.y) * 0.05;
      group.current.rotation.y += 0.002;
      group.current.rotation.x += 0.0015;
    }

    if (ref.current) {
      // small time property for the material if needed
      if (ref.current.material && typeof ref.current.material.time !== "number") {
        ref.current.material.time = 0;
      }
      if (ref.current.material) ref.current.material.time += 0.01;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh ref={ref} scale={3} castShadow>
          <icosahedronGeometry args={[1, 6]} />
          <MeshDistortMaterial
            distort={0.5}
            speed={1.2}
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.2}
            emissive={new THREE.Color("#4338ca")}
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
      </Float>

      {/* subtle sparkles around the blob */}
      <Sparkles count={120} size={1.2} scale={[8, 4, 6]} speed={0.3} />
    </group>
  );
}

function InteractiveThreeBackground({ pixelRatio = typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio) : 1 }) {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={pixelRatio}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-5, -2, -5]} intensity={0.15} />

        {/* inverted sphere as background color */}
        <mesh scale={50}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial side={THREE.BackSide} color={new THREE.Color("#05060a")} />
        </mesh>

        <InteractiveBlob />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

// ---------------------------
// Original site components
// ---------------------------

// Reusable Reveal wrapper
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ ...SMOOTH_TRANSITION, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Process step
const ProcessStep = ({ number, title, desc }) => (
  <div className="relative pl-10 md:pl-0">
    <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/10">
      <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-indigo-500"></div>
    </div>
    <div className="mb-4 text-5xl font-bold text-white/30">{number}</div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

// Feature card
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <Reveal delay={delay} className="h-full">
    <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-500 group cursor-default">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-500">
        <Icon className="w-7 h-7 text-indigo-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </Reveal>
);

// Navbar
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-500">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-500">TVL STUDIOS</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Services", "Process", "Work"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
          <button 
            onClick={() => (window.location.href = "/start-project")}
            className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Start Project
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden backdrop-blur-xl">
          {["Work", "Services", "Process", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-xl text-gray-300 hover:text-white">
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

// ---------------------------
// Main App
// ---------------------------
export default function App() {
  return (
    <div className="min-h-screen text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      {/* Replaced old canvas components with the new Three.js background */}
      <InteractiveThreeBackground />

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

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">We Craft Digital</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">Experiences.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              TVL Studios is a next-generation creative agency. We blend high-fidelity design with cutting-edge technology to build brands that define the future.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => {
                  document.getElementById("work").scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2 group hover:scale-105 active:scale-95"
              >
                View Our Work
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95">
                Contact Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trusted By Section (Logos) */}
      <section className="py-16 border-y border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-bold text-gray-600 mb-10 uppercase tracking-[0.2em]">Trusted by innovators</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60">
            {["Open Word War", "Jibhi Homestead Cabins"].map((name, i) => (
              <div key={i} className="flex items-center gap-2 group cursor-default hover:opacity-100 transition-opacity duration-500">
                <div className="w-6 h-6 rounded bg-white/20 group-hover:bg-indigo-500 transition-colors duration-500"></div>
                <span className="text-lg font-bold text-white/80 font-mono">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We don't just build websites. We build ecosystems that scale with your vision.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={MonitorPlay}
              title="Web Design & WebGL"
              desc="Immersive 3D web experiences that capture attention and drive engagement using Three.js and React."
              delay={0.1}
            />
            <FeatureCard 
              icon={Cpu}
              title="AI Integration"
              desc="Smart automation and AI-driven interfaces that make your digital product feel alive and responsive."
              delay={0.2}
            />
            <FeatureCard 
              icon={Aperture}
              title="Brand Identity"
              desc="Future-proof visual systems including motion graphics, typography, and comprehensive design languages."
              delay={0.3}
            />
            <FeatureCard 
              icon={Globe}
              title="Global Scaling"
              desc="Infrastructure designed to handle millions of users with edge-computing and global CDNs."
              delay={0.4}
            />
            <FeatureCard 
              icon={Zap}
              title="Performance Optimization"
              desc="Lightning fast load times and SEO-perfected structures to ensure you rank #1."
              delay={0.5}
            />
            <FeatureCard 
              icon={Play}
              title="Motion & Video"
              desc="High-end video production and motion graphics to tell your story with cinematic quality."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="py-32 bg-black/40 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Work</h2>
              <p className="text-gray-400 text-lg mb-8">
                Our methodology is built on transparency and velocity. We move from concept to code in record time without sacrificing quality.
              </p>
            </Reveal>

            <div className="space-y-12">
              <Reveal delay={0.2}>
                <ProcessStep number="01" title="Discovery & Strategy" desc="We dive deep into your business goals, analyzing market gaps and user needs to build a rock-solid foundation." />
              </Reveal>
              <Reveal delay={0.3}>
                <ProcessStep number="02" title="Design & Prototyping" desc="We craft high-fidelity visuals and interactive prototypes, ensuring the look and feel aligns perfectly with your brand voice." />
              </Reveal>
              <Reveal delay={0.4}>
                <ProcessStep number="03" title="Development & Scale" desc="We write clean, performant code using the modern stack (Next.js, React) and deploy on edge networks for global speed." />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work (Parallax & Enhanced Visuals) */}
      <section id="work" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">Selected Works</h2>
              <p className="text-gray-400">Recent projects from our studio</p>
            </Reveal>
            <Reveal delay={0.2}>
              <button className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-white transition-colors font-medium">
                View all projects <ChevronRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          <div className="space-y-32">
            {/* Project 1 */}
            <div className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <Reveal className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-gray-900 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:opacity-0 transition-opacity duration-700 z-10"></div>
                <div className="w-full h-full bg-gray-900 relative p-8 group-hover:scale-105 transition-transform duration-1000 ease-[0.25,0.1,0.25,1]">
                  <div className="w-full h-full bg-gray-800 rounded-xl border border-white/5 shadow-2xl overflow-hidden flex flex-col">
                    <div className="h-8 border-b border-white/5 flex items-center px-4 gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-gray-900 to-black relative p-6">
                      <div className="w-1/2 h-8 bg-white/10 rounded mb-4"></div>
                      <div className="w-full h-32 bg-indigo-500/10 border border-indigo-500/20 rounded-lg mb-4"></div>
                      <div className="flex gap-4">
                        <div className="w-1/3 h-24 bg-white/5 rounded-lg"></div>
                        <div className="w-1/3 h-24 bg-white/5 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase border border-indigo-400/30 px-3 py-1 rounded-full bg-indigo-500/10">Youth Leadership & Debate Forum</span>
                    <span className="text-gray-500 text-sm font-mono">2025</span>
                  </div>
                  <h3 className="text-4xl font-bold group-hover:text-indigo-400 transition-colors duration-300">Open Word War</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    A complete redesign of their visual identity, delivering polished and professional graphic design materials for both digital and print.
                  </p>
                  <ul className="flex flex-wrap gap-3">
                    {["Graphic Design", "Adobe Suite", "Branding", "Canva"].map((tag) => (
                      <span key={tag} className="text-sm text-gray-400 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <button className="text-white font-bold border-b border-white hover:border-indigo-400 hover:text-indigo-400 pb-1 transition-all">Case Study</button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Project 2 */}
            <div className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <Reveal className="order-2 md:order-1 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase border border-indigo-400/30 px-3 py-1 rounded-full bg-indigo-500/10">Homestay & Cabin Rentals</span>
                  <span className="text-gray-500 text-sm font-mono">2025</span>
                </div>
                <h3 className="text-4xl font-bold group-hover:text-indigo-400 transition-colors duration-300">Jibhi Homestead Cabins</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Developed a fresh visual identity for Jibhi Homestead Cabins, creating nature-inspired graphic design assets that reflect their rustic, homely stay experience.
                </p>
                <ul className="flex flex-wrap gap-3">
                  {["Product Design", "Graphic Design", "Strategy", "Dashboard"].map((tag) => (
                    <span key={tag} className="text-sm text-gray-400 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </ul>
                <div className="pt-4">
                  <button className="text-white font-bold border-b border-white hover:border-indigo-400 hover:text-indigo-400 pb-1 transition-all">Case Study</button>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="order-1 md:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-gray-900 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-indigo-500/10 group-hover:opacity-0 transition-opacity duration-700 z-10"></div>
                <div className="w-full h-full bg-black relative p-8 group-hover:scale-105 transition-transform duration-1000 ease-[0.25,0.1,0.25,1] flex items-center justify-center">
                  <div className="w-[80%] h-[80%] rounded-full bg-indigo-500/20 blur-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="relative z-10 border border-white/10 bg-white/5 backdrop-blur-xl p-8 rounded-2xl w-full max-w-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-indigo-500"></div>
                      <div className="h-2 w-24 bg-white/20 rounded"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/10 rounded"></div>
                      <div className="h-2 w-full bg-white/10 rounded"></div>
                      <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <div className="h-8 w-20 bg-indigo-600 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Client Stories</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "TVL Studios transformed our vague ideas into a world-class digital product. The attention to detail is unmatched.",
                author: "Sarah Jenkins",
              },
              {
                quote: "The team moves fast but never breaks things. They are the perfect partner for high-growth startups.",
                author: "David Chen",
              },
              {
                quote: "We've worked with many agencies, but TVL is in a league of its own. Truly futuristic design work.",
                author: "Elena Rodriguez",
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm relative flex flex-col h-full">
                  <MessageSquare className="absolute top-6 right-6 text-white/10 w-8 h-8" />
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">"{item.quote}"</p>
                  <div className="flex-grow"></div>
                  <div className="mt-4">
                    <div className="text-white font-bold">{item.author}</div>
                    <div className="text-indigo-400 text-sm">{item.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer className="bg-black pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Let's build the <br/> future.</h2>
                <p className="text-xl text-gray-400 max-w-md mb-10">
                  Ready to elevate your brand? We are currently accepting new partnerships for Q1 2026.
                </p>
                <button 
                  onClick={() => (window.location.href = "/start-project")}
                  className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Start a Project
                </button>
              </div>
              <div className="grid grid-cols-2 gap-12 md:pl-20">
                <div>
                  <h4 className="text-white font-bold mb-8 text-lg">Studio</h4>
                  <ul className="space-y-6 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                    <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
                    <li><a href="#work" className="hover:text-white transition-colors">Our Work</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-8 text-lg">Connect</h4>
                  <ul className="space-y-6 text-gray-400">
                    <li>
                      <a href="https://www.instagram.com/tvlstudios.xyz/" className="hover:text-white transition-colors flex items-center gap-3">
                        <InstagramIcon size={20} />
                        <span>Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:tvlstudioz@gmail.com" className="hover:text-white transition-colors flex items-center gap-3">
                        <Mail size={20} />
                        <span>tvlstudioz@gmail.com</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-gray-600">
            <p>&copy; 2026 TVL Studios. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
