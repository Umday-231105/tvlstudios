'use client';
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-400 mb-10">Last Updated: 28/11/2025 </p>

        <div className="space-y-6 text-gray-300 leading-relaxed">

          <p>
            At <strong>TVL Studios</strong>, we are committed to protecting your privacy and ensuring that your personal
            information is handled responsibly. This Privacy Policy explains how we collect, use, store, and protect your
            data when you interact with our website, services, or communication channels.
          </p>

          <p>
            TVL Studios is founded by <strong>Uday Sood</strong> and <strong>Vishal Baibhav Panda</strong>, with{" "}
            <strong>Arnav Verma</strong> serving as Co-Founder.
          </p>

          <h2 className="text-2xl font-semibold mt-10">1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Personal Information (name, email, phone number, company, project details)</li>
            <li>Usage Data (IP address, browser type, device info, pages viewed)</li>
            <li>Cookies & tracking technology data</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To communicate with you</li>
            <li>To understand your project needs</li>
            <li>To improve user experience</li>
            <li>To send notifications or updates (only if you opt-in)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10">3. Sharing of Information</h2>
          <p>
            We do <strong>not</strong> sell or rent your personal data. Information may only be shared with trusted
            third-party service providers or when required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-10">4. Data Security</h2>
          <p>
            We use industry-standard security measures to protect your information. However, no method of internet
            transmission is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-10">5. Your Rights</h2>
          <p>You may request access, update, or deletion of your data at any time by contacting us.</p>

          <h2 className="text-2xl font-semibold mt-10">6. Children’s Privacy</h2>
          <p>Our services are not intended for children under the age of 13.</p>

          <h2 className="text-2xl font-semibold mt-10">7. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy occasionally. Continued use of our website means you accept the updated
            policy.
          </p>

          <h2 className="text-2xl font-semibold mt-10">8. Contact Us</h2>
          <p>
            If you have questions or concerns, please reach out to us:
          </p>
          <p>
            <strong>Email:</strong> tvlstudioz@gmail.com <br />
            <strong>Founders:</strong> Uday Sood, Vishal Baibhav Panda <br />
            <strong>Co-Founder:</strong> Arnav Verma
          </p>

        </div>
      </div>
    </div>
  );
}

