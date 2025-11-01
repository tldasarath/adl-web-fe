"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Icon from lucide-react
import Container from "@/Components/Common/Container";
import { faqs } from "@/Datas/faqs";


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-8 md:py-14 relative overflow-hidden">
       <div className="absolute left-[80%] -top-10 -z-10">
  <img src="/assets/images/bg/bubble.png" alt="" className="relative w-[500px] h-[400px] object-contain" />
</div>
    <Container>
        <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-left mb-12">
                <h2 className="text-2xl mb-5 md:text-3xl  main-text font-bold text-white ">
            FAQ</h2>
                <p className="text-base max-w-2xl lg:text-lg mb-8 font-light leading-normal">
            Once ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.
            Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
            metus nec fringilla.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1c2334] to-[#0e1424] border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left p-5 hover:bg-white/5 transition"
              >
                <span className="font-medium text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-5 pb-4 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>

      {/* Optional background decorative bubbles */}
    </section>
  );
}
