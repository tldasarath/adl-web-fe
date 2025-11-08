"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Container from "../Common/Container";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  // ✅ Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field error as user types
  };

  // ✅ Handle submit (with WhatsApp integration)
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Format WhatsApp message
    const message = `
🌟 *New Contact Form Message* 🌟
---------------------------------
👤 *Name:* ${formData.firstName} ${formData.lastName}
📧 *Email:* ${formData.email}
📞 *Phone:* ${formData.phone}
💬 *Message:* ${formData.message}
---------------------------------
`;

    // Replace with your WhatsApp number (with country code, no spaces)
    const phoneNumber = "1234567890";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="relative py-8 md:pb-14 md:pt-48 flex items-center justify-center ">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="-z-10 absolute w-[380px] h-[180px] -right-24 top-50 bg-[#376CBC] opacity-30 blur-[100px] rounded-[60%]" />
            </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-[380px] h-[180px] -left-24 top-50 bg-[#376CBC] opacity-30 blur-[100px] rounded-[60%]" />
            </div>
        <Container>
        <div className=" w-full grid md:grid-cols-2 gap-12">
          {/* Left Side */}
          <div>
            <h2 className="text-2xl mb-5 md:text-3xl font-bold text-white">
              Say Hello,<br />Let’s Start Business
            </h2>
            <p className="text-sm md:text-base mb-8 font-light leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>

            <div>
              <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
              <div className="flex gap-3 flex-wrap">
                {["Instagram", "LinkedIn", "Facebook", "Youtube"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="border glass-bg text-[#E9C05F] px-4 py-2 rounded-2xl transition"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side (Form) */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl shadow-lg backdrop-blur-md"
          >
            {/* First Name + Last Name */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm text-gray-300 mb-1 font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`glass-bg rounded-2xl p-5 text-sm mb-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.firstName ? "focus:ring-red-500" : "focus:ring-[#E9C05F]"
                  }`}
                />
                {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm text-gray-300 mb-1 font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`glass-bg rounded-2xl p-5 text-sm mb-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.lastName ? "focus:ring-red-500" : "focus:ring-[#E9C05F]"
                  }`}
                />
                {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-gray-300 mb-1 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`glass-bg rounded-2xl p-5 text-sm mb-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500" : "focus:ring-[#E9C05F]"
                  }`}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm text-gray-300 mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`glass-bg rounded-2xl p-5 text-sm mb-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.phone ? "focus:ring-red-500" : "focus:ring-[#E9C05F]"
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col mb-6">
              <label htmlFor="message" className="text-sm text-gray-300 mb-1 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className={`glass-bg rounded-2xl p-5 text-sm mb-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.message ? "focus:ring-red-500" : "focus:ring-[#E9C05F]"
                }`}
              />
              {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex justify-center items-center gap-3 py-4 text-lg font-light rounded-3xl text-white/80 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer group"
              >
                Send Message
                <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border border-[#E9C05F] rounded-full transition-all duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#E9C05F]" />
                </span>
              </button>
            </div>
          </form>
        </div>
    </Container>
      </div>
  );
}
