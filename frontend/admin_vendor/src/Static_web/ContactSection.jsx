import React, { useState, useEffect } from "react";
import interior from "../assets/interior.png";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpzqerk";

const ContactSection = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  // Auto-dismiss success/error banner after 30 seconds
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 30000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\+?[0-9]{7,15}$/.test(form.mobile.trim())) {
      newErrors.mobile = "Enter a valid mobile number.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          mobile: form.mobile,
          email: form.email,
          message: form.message,
          _subject: `New Contact Inquiry from ${form.firstName} ${form.lastName}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", mobile: "", email: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-300 focus:ring-[#ff9200]"
    }`;

  return (
    <div className="w-full">
      <section className="container mx-auto px-4 sm:px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Form */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">GET IN TOUCH</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Questions, feedback, or partnership inquiries? We'd love to hear from you.
          </p>

          {/* Success Banner */}
          {status === "success" && (
            <div className="mb-5 p-4 bg-green-50 border border-green-300 text-green-700 rounded-md text-sm flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span>
                Thank you! Your message has been sent. We'll get back to you soon.
              </span>
            </div>
          )}

          {/* Error Banner */}
          {status === "error" && (
            <div className="mb-5 p-4 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm flex items-center gap-2">
              <span className="text-lg">❌</span>
              <span>
                Something went wrong. Please try again or email us at{" "}
                <a href="mailto:info@carooa.com" className="underline font-semibold">
                  info@carooa.com
                </a>
                .
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputClass("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputClass("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Mobile */}
            <div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                className={inputClass("mobile")}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                rows="4"
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className={inputClass("message")}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className={`w-full sm:w-auto px-10 sm:px-16 py-2.5 rounded-md text-white font-semibold transition ${
                status === "submitting"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#ff9200] hover:bg-[#e07f00] active:scale-95"
              }`}
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={interior}
            alt="Car Interior"
            className="rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
