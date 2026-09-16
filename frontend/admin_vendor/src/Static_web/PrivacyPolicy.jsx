import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FaShieldAlt,
  FaDatabase,
  FaCogs,
  FaLock,
  FaUserCheck,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const sections = [
  {
    id: 1,
    icon: <FaUserCheck className="text-[#ff9200] text-2xl" />,
    title: "1. Introduction",
    content: (
      <p className="text-gray-300 leading-relaxed">
        Welcome to <span className="text-white font-semibold">CAROOA INTERNATIONAL</span>. We respect your privacy and
        are committed to protecting your personal data. This privacy policy will inform you as to how we look after your
        personal data when you visit our website and tell you about your privacy rights and how the law protects you.
      </p>
    ),
  },
  {
    id: 2,
    icon: <FaDatabase className="text-[#ff9200] text-2xl" />,
    title: "2. Data We Collect",
    content: (
      <div className="space-y-3">
        <p className="text-gray-300 leading-relaxed">
          We may collect, use, store and transfer different kinds of personal data about you:
        </p>
        <ul className="space-y-3 mt-3">
          {[
            { label: "Identity Data", desc: "First name, last name, username or similar identifier." },
            { label: "Contact Data", desc: "Billing address, delivery address, email address and telephone numbers." },
            { label: "Technical Data", desc: "IP address, login data, browser type and version, time zone setting." },
            { label: "Usage Data", desc: "Information about how you use our website, products and services." },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 bg-[#0a2352]/50 rounded-xl p-3 border border-[#0f2e6b]">
              <span className="w-2 h-2 rounded-full bg-[#ff9200] mt-2 shrink-0" />
              <p className="text-gray-300 text-sm">
                <span className="text-white font-semibold">{item.label}:</span> {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    icon: <FaCogs className="text-[#ff9200] text-2xl" />,
    title: "3. How We Use Your Data",
    content: (
      <div className="space-y-3">
        <p className="text-gray-300 leading-relaxed">
          We will only use your personal data when the law allows us to. Most commonly, we use it for:
        </p>
        <ul className="space-y-2 mt-2">
          {[
            "Performing the contract we are about to enter into or have entered into with you.",
            "Our legitimate interests (or those of a third party) that do not override your fundamental rights.",
            "Complying with a legal or regulatory obligation.",
            "Improving our platform, personalizing your experience, and sending service-related communications.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#ff9200]/20 border border-[#ff9200]/40 flex items-center justify-center shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff9200]" />
              </span>
              <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    icon: <FaLock className="text-[#ff9200] text-2xl" />,
    title: "4. Data Security",
    content: (
      <p className="text-gray-300 leading-relaxed">
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
        used or accessed in an unauthorised way, altered or disclosed. We limit access to your personal data to those
        employees, agents, contractors and other third parties who have a business need to know. They will only process
        your personal data on our instructions and they are subject to a duty of confidentiality.
      </p>
    ),
  },
  {
    id: 5,
    icon: <FaShieldAlt className="text-[#ff9200] text-2xl" />,
    title: "5. Your Legal Rights",
    content: (
      <div className="space-y-3">
        <p className="text-gray-300 leading-relaxed">
          Under certain circumstances, you have rights under data protection laws in relation to your personal data:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {[
            "Request access to your personal data",
            "Request correction of your personal data",
            "Request erasure of your personal data",
            "Object to processing of your personal data",
            "Request restriction of processing",
            "Request transfer of your personal data",
          ].map((right, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#0a2352]/50 rounded-lg px-3 py-2 border border-[#0f2e6b]">
              <FaShieldAlt className="text-[#ff9200] text-xs shrink-0" />
              <span className="text-gray-300 text-sm">{right}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 6,
    icon: <FaEnvelope className="text-[#ff9200] text-2xl" />,
    title: "6. Contact Us",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          If you have any questions about this privacy policy or our privacy practices, please reach out to us:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {["info@carooa.com", "carooa@gmail.com", "carooainternational@gmail.com"].map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="flex items-center gap-2 bg-[#ff9200]/10 border border-[#ff9200]/30 px-4 py-2.5 rounded-xl text-[#ff9200] text-sm font-medium hover:bg-[#ff9200]/20 transition-all duration-200"
            >
              <FaEnvelope className="shrink-0" />
              {email}
            </a>
          ))}
        </div>
      </div>
    ),
  },
];

const AccordionSection = ({ section }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-[#071a3d] border border-[#0a2352] rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#0a2352]/40 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0a2352] flex items-center justify-center shrink-0">
            {section.icon}
          </div>
          <h2 className="text-white font-semibold text-base md:text-lg">{section.title}</h2>
        </div>
        <span className="text-[#ff9200] shrink-0 ml-4">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-[#0a2352]">
          <div className="pt-4">{section.content}</div>
        </div>
      )}
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#05102a]">
      <Navbar bgColor="bg-gradient-to-r from-[#0a1c3e] to-[#023669]" />

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0a1c3e] via-[#071a3d] to-[#05102a] pt-28 pb-16 px-6 text-center relative overflow-hidden">
        {/* Decorative background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-[#ff9200]/5" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] rounded-full border border-[#ff9200]/8" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#ff9200]/10 border border-[#ff9200]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#ff9200] uppercase tracking-wider mb-6">
            <FaShieldAlt />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Privacy <span className="text-[#ff9200]">Policy</span>
          </h1>
          <div className="w-16 h-1 bg-[#ff9200] rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Your privacy matters to us. Learn how CAROOA INTERNATIONAL collects, uses, and protects your personal information.
          </p>
          <p className="text-gray-500 text-sm mt-4">Last updated: September 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow px-6 sm:px-8 md:px-16 lg:px-24 py-12 max-w-5xl mx-auto w-full">
        <div className="space-y-4">
          {sections.map((section) => (
            <AccordionSection key={section.id} section={section} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
