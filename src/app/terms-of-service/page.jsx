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

// ------- Navbar (same as privacy) -------
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

// ------- Footer -------
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
export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24 md:pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="rounded-3xl bg-white border border-slate-100 shadow-sm shadow-slate-200/60 px-6 md:px-10 py-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-slate-900">
                Terms of Service
              </h1>
              <p className="text-xs text-slate-500 mb-6">
                Last updated: 2026
              </p>

              <div className="space-y-6 text-sm leading-relaxed text-slate-700">
                <p>
                  These Terms of Service (&quot;Terms&quot;) govern your use of
                  the website and services offered by{" "}
                  <strong>TVL Studios</strong> (&quot;we&quot;, &quot;our&quot;,
                  or &quot;us&quot;). By accessing or using our website, you
                  agree to be bound by these Terms.
                </p>

                <p>
                  TVL Studios is founded by <strong>Uday Sood</strong> and{" "}
                  <strong>Vishal Baibhav Panda</strong>, with{" "}
                  <strong>Arnav Verma</strong> as co‑founder.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  1. Studio services
                </h2>
                <p>
                  TVL Studios provides design, product, brand and web‑related
                  services, including but not limited to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Marketing and product websites.</li>
                  <li>Brand and visual identity systems.</li>
                  <li>Content and system design, including AI‑aware flows.</li>
                  <li>Related strategy, consulting and implementation work.</li>
                </ul>
                <p>
                  Specific scopes, timelines, deliverables and fees for
                  client projects are defined separately in proposals, scopes of
                  work or similar project documents (&quot;Project
                  Agreements&quot;). If there is a conflict between these Terms
                  and a signed Project Agreement, the Project Agreement will
                  usually prevail for that project.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  2. Use of the website
                </h2>
                <p>You agree that you will not:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Use the website for unlawful purposes or in violation of any
                    applicable law.
                  </li>
                  <li>
                    Attempt to interfere with or disrupt the website, servers or
                    networks.
                  </li>
                  <li>
                    Copy, scrape or reproduce substantial parts of the website
                    content without permission, except where clearly allowed.
                  </li>
                </ul>

                <h2 className="text-base font-semibold text-slate-900">
                  3. Intellectual property
                </h2>
                <p>
                  Unless otherwise stated, all content on this website—including
                  text, layout, graphics and visual design—is owned by TVL
                  Studios or used with permission.
                </p>
                <p>
                  Rights and ownership for project deliverables are defined in
                  the relevant Project Agreement. Typically:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Clients receive rights to use the final agreed deliverables
                    for their business.
                  </li>
                  <li>
                    TVL Studios retains ownership of underlying working files,
                    methods and reusable components, unless explicitly assigned
                    otherwise.
                  </li>
                  <li>
                    TVL Studios may reference non‑confidential work in its
                    portfolio, unless otherwise agreed.
                  </li>
                </ul>

                <h2 className="text-base font-semibold text-slate-900">
                  4. Confidentiality
                </h2>
                <p>
                  We treat client information and materials as confidential and
                  use them only for the purpose of delivering the agreed work,
                  except where disclosure is required by law or explicitly
                  permitted by the client.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  5. Disclaimers
                </h2>
                <p>
                  While we aim for high quality and reliability, the website and
                  any information on it are provided on an{" "}
                  <span className="font-medium">“as is”</span> and{" "}
                  <span className="font-medium">“as available”</span> basis.
                </p>
                <p>
                  We do not guarantee that the website will be uninterrupted,
                  secure or error‑free, or that any content will always be
                  accurate or up‑to‑date. Where our work touches legal,
                  financial or compliance topics, it should not be considered
                  formal advice. You should consult qualified professionals if
                  you need legal, financial or tax guidance.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  6. Limitation of liability
                </h2>
                <p>
                  To the maximum extent permitted by law, TVL Studios and its
                  founders will not be liable for any indirect, incidental,
                  special, consequential or punitive damages, or for loss of
                  profits or revenues, arising out of or related to your use of
                  the website or services.
                </p>
                <p>
                  Where liability cannot be excluded, it will be limited to the
                  amount you have paid to TVL Studios for the specific project
                  giving rise to the claim.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  7. Third‑party services
                </h2>
                <p>
                  We may use or link to third‑party tools and platforms (for
                  example, hosting, analytics, fonts, embeds). These services
                  are governed by the terms and policies of the respective
                  providers. We are not responsible for their behaviour or
                  availability.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  8. Termination
                </h2>
                <p>
                  We may modify, suspend or discontinue any part of the website
                  without notice. For project work, termination rights and
                  consequences are outlined in the relevant Project Agreement.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  9. Governing law
                </h2>
                <p>
                  These Terms are governed by the laws that apply in the
                  jurisdiction where TVL Studios is primarily established,
                  unless a different governing law is agreed in a specific
                  Project Agreement.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  10. Changes to these Terms
                </h2>
                <p>
                  We may update these Terms from time to time. When we make
                  changes, we will update the &quot;Last updated&quot; date at
                  the top of this page. Continued use of the website after
                  changes become effective will mean you accept the revised
                  Terms.
                </p>

                <h2 className="text-base font-semibold text-slate-900">
                  11. Contact
                </h2>
                <p>
                  If you have questions about these Terms or how they apply to a
                  specific project, you can contact us at:
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
