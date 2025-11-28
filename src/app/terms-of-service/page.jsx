'use client';
import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

/* -------------------- NAVBAR -------------------- */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight group-hover:text-indigo-300 transition-colors duration-300">
            TVL STUDIOS
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/start-project"
            className="text-sm text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full border border-white/10 bg-white/5"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-6">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <a
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/start-project"
              className="text-sm text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

/* -------------------- FOOTER -------------------- */
const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10 relative overflow-hidden mt-24">
      {/* Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-t from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to start <br /> your project?
            </h2>
            <p className="text-lg text-gray-400 max-w-md">
              Tell us about your website, brand, or idea. We&apos;ll review it and
              get back to you with the next steps.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <button
              onClick={() => (window.location.href = "/start-project")}
              className="px-8 py-3 bg-white text-black rounded-full text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Start a project
              <ArrowRight size={18} />
            </button>
            <p className="text-xs text-gray-500">
              Share a few details and we&apos;ll usually respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 text-sm text-gray-600">
          <p>&copy; 2026 TVL Studios. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="/privacy-policy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* -------------------- TERMS OF SERVICE PAGE -------------------- */
export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 blur-[90px]" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-10">Last Updated: [Insert Date]</p>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the website,
              services, and content provided by <strong>TVL Studios</strong>
              (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our website or
              services, you agree to be bound by these Terms.
            </p>

            <p>
              TVL Studios is founded by <strong>Uday Sood</strong> and{" "}
              <strong>Vishal Baibhav Panda</strong>, with{" "}
              <strong>Arnav Verma</strong> as Co-Founder.
            </p>

            <h2 className="text-2xl font-semibold mt-10">1. Use of Our Services</h2>
            <p>
              You agree to use our website and services only for lawful purposes and in
              accordance with these Terms. You must not:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Use the services in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Use our content or brand in a misleading or harmful way</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10">2. Project Inquiries and Communication</h2>
            <p>
              When you submit a project request or contact us through our forms or email,
              you agree to provide accurate and complete information. We may contact you
              using the details you provide to discuss your project, share proposals,
              or provide service-related information.
            </p>

            <h2 className="text-2xl font-semibold mt-10">3. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics,
              logos, designs, and layouts, is owned by or licensed to TVL Studios and is
              protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not copy, reproduce, distribute, or create derivative works from
              our content without our prior written permission.
            </p>

            <h2 className="text-2xl font-semibold mt-10">4. Third-Party Tools and Links</h2>
            <p>
              Our website may use third-party tools (such as analytics, forms, or embeds)
              or contain links to third-party websites. We do not control these third
              parties and are not responsible for their content or practices. Your use of
              third-party services is subject to their own terms and policies.
            </p>

            <h2 className="text-2xl font-semibold mt-10">5. Payments and Proposals</h2>
            <p>
              If you engage TVL Studios for paid services, specific terms (such as scope,
              pricing, timelines, and payment terms) will be defined in separate proposals,
              invoices, or agreements. Those specific terms will apply in addition to these
              general Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-10">6. Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided on an &quot;as-is&quot; and &quot;as-available&quot;
              basis. While we aim to keep our content accurate and up to date, we make
              no warranties or representations of any kind, express or implied, about:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>The completeness, accuracy, or reliability of any content</li>
              <li>The availability or uninterrupted operation of the website</li>
              <li>The suitability of our services for your specific needs</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, TVL Studios and its founders shall
              not be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of our website or
              services.
            </p>

            <h2 className="text-2xl font-semibold mt-10">8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless TVL Studios, its founders, and
              team members from any claims, damages, or losses arising out of your use of
              the website, your violation of these Terms, or your infringement of any
              rights of a third party.
            </p>

            <h2 className="text-2xl font-semibold mt-10">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our website or
              services at any time, without notice, if we believe you have violated these
              Terms or engaged in harmful or unlawful activity.
            </p>

            <h2 className="text-2xl font-semibold mt-10">10. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Any changes will be
              posted on this page with an updated &quot;Last Updated&quot; date. Your continued
              use of the website or services after changes are posted constitutes your
              acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-10">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, you can contact us at:
            </p>
            <p>
              <strong>Email:</strong> [Add your contact email here] <br />
              <strong>Company:</strong> TVL Studios <br />
              <strong>Founders:</strong> Uday Sood, Vishal Baibhav Panda <br />
              <strong>Co-Founder:</strong> Arnav Verma
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

