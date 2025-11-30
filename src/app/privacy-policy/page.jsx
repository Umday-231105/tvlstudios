"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  Instagram as InstagramIcon,
} from "lucide-react";

const SMOOTH_TRANSITION = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ ...SMOOTH_TRANSITION, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ------- Navbar (same look as home) -------
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
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-emerald-400 to-teal-300 flex items-center justify-center shadow-sm shadow-sky-500/40">
            <span className="text-slate-900 font-semibold text-lg">T</span>
          </div>
          <span className="font-semibold text-sm tracking-[0.18em] uppercase text-slate-800 group-hover:text-slate-900">
            TVL Studios
          </span>
        </a>
        window.dispatchEvent(new Event("tvl-open-assistant"));

        <div className="hidden md:flex items-center gap-6 text-[13px] text-slate-600">
          <a href="/" className="hover:text-slate-900 transition-colors">
            Home
          </a>
          <a href="/#services" className="hover:text-slate-900 transition-colors">
            Services
          </a>
          <a href="/#work" className="hover:text-slate-900 transition-colors">
            Work
          </a>
          <button
            onClick={() => (window.location.href = "/start-project")}
            className="ml-2 px-4 py-2 rounded-full bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-all shadow-sm shadow-sky-500/40"
          >
            Start a project
          </button>
        </div>

        <button
          className="md:hidden text-slate-800"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-slate-800">
            <a href="/" onClick={() => setMobileOpen(false)} className="py-1">
              Home
            </a>
            <a
              href="/#services"
              onClick={() => setMobileOpen(false)}
              className="py-1"
            >
              Services
            </a>
            <a
              href="/#work"
              onClick={() => setMobileOpen(false)}
              className="py-1"
            >
              Work
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

// ------- Footer (same as home) -------
const Footer = () => (
  <footer className="w-full border-t border-slate-100 bg-slate-50 py-10 mt-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-900">
            Have something coming up?
          </h2>
          <p className="text-xs text-slate-600 max-w-md">
            Share a brief overview—timing, context, goals. We&apos;ll respond
            with fit, a rough shape of the work and clear next steps.
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
          <a href="/privacy-policy" className="hover:text-slate-700 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-slate-700 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ------- PAGE -------
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24 md:pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="rounded-3xl bg-white border border-slate-100 shadow-sm shadow-slate-200/60 px-6 md:px-10 py-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-slate-900">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-500 mb-6">
                Last updated: 2026
              </p>

              <div className="space-y-6 text-sm leading-relaxed text-slate-700">
                <p>
                  This Privacy Policy explains how <strong>TVL Studios</strong>{" "}
                  (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects,
                  uses and protects information when you interact with our
                  website, services and communication channels.
                </p>

                <p>
                  TVL Studios is founded by <strong>Uday Sood</strong> and{" "}
                  <strong>Vishal Baibhav Panda</strong>, with{" "}
                  <strong>Arnav Verma</strong> as co‑founder.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  1. Information we collect
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Contact details</span> – such
                    as name, email address and any information you choose to
                    share when you contact us or fill out a project enquiry
                    form.
                  </li>
                  <li>
                    <span className="font-medium">Project information</span> –
                    context about your company, product, timelines and goals
                    that you share so we can understand the work.
                  </li>
                  <li>
                    <span className="font-medium">Usage data</span> – basic
                    analytics about how visitors use our website (e.g. page
                    views, time on site). This is typically collected in an
                    aggregated, non‑identifying way.
                  </li>
                </ul>

                <h2 className="text-base font-semibold text-slate-900">
                  2. How we use information
                </h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Respond to enquiries and discuss potential projects.</li>
                  <li>
                    Provide proposals, scopes of work and related
                    documentation.
                  </li>
                  <li>
                    Improve our website, services and communication based on
                    high‑level analytics.
                  </li>
                  <li>
                    Maintain records for internal operations, such as client
                    management and accounting.
                  </li>
                </ul>

                <h2 className="text-base font-semibold text-slate-900">
                  3. Legal basis
                </h2>
                <p>
                  Where applicable, we rely on our{" "}
                  <span className="font-medium">legitimate interest</span> in
                  running and growing TVL Studios, and on{" "}
                  <span className="font-medium">consent</span> when you
                  voluntarily provide information through forms or email.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  4. How we share information
                </h2>
                <p>
                  We do <span className="font-medium">not sell</span> your
                  personal data.
                </p>
                <p>We may share limited information with:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Service providers we use to operate our business (for
                    example, email, analytics, project management tools), under
                    appropriate confidentiality and data‑protection terms.
                  </li>
                  <li>
                    Professional advisors (such as legal or accounting) where
                    necessary.
                  </li>
                  <li>
                    Authorities if required by law, regulation or legal process.
                  </li>
                </ul>

                <h2 className="text-base font-semibold text-slate-900">
                  5. Data retention
                </h2>
                <p>
                  We keep personal information only for as long as it is needed
                  for the purposes described above, or as required by applicable
                  law. Project‑related communication may be retained for
                  reference and record‑keeping.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  6. Your choices & rights
                </h2>
                <p>
                  Depending on your location, you may have certain rights over
                  your personal data, such as the right to access, update or
                  delete it.
                </p>
                <p>
                  To make a request, contact us at{" "}
                  <a
                    href="mailto:tvlstudioz@gmail.com"
                    className="text-sky-600 hover:underline"
                  >
                    tvlstudioz@gmail.com
                  </a>
                  . We may need to verify your identity before completing your
                  request.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  7. Security
                </h2>
                <p>
                  We take reasonable steps to protect information from
                  unauthorized access, alteration or disclosure. However, no
                  method of transmission or storage over the internet is 100%
                  secure, so we cannot guarantee absolute security.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  8. Third‑party links
                </h2>
                <p>
                  Our website may contain links to third‑party sites or services
                  (for example, social media or external tools). We are not
                  responsible for the privacy practices or content of those
                  sites, and encourage you to review their policies separately.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  9. Changes to this policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or for legal, operational or
                  regulatory reasons. When we make changes, we will update the
                  &quot;Last updated&quot; date at the top of this page.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  10. Contact
                </h2>
                <p>
                  For questions about this Privacy Policy or how we handle your
                  data, you can reach us at:
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:tvlstudioz@gmail.com"
                    className="text-sky-600 hover:underline"
                  >
                    tvlstudioz@gmail.com
                  </a>
                  <br />
                  <span className="font-medium">Studio:</span> TVL Studios
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
