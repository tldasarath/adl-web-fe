"use client";

import React, { useState } from 'react';
import Container from '@/Components/Common/Container';


const FAQSection = ({
   
    faqs 
   
}) => {
    const [openIndex, setOpenIndex] = useState(-1);

    const normalizedFaqs = Array.isArray(faqs)
        ? faqs.map((f, idx) => ({ id: f.id ?? idx, question: f.question, answer: f.answer }))
        : [];

    const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? -1 : idx));

    return (
        <section className={`py-8 md:py-14`}>
            <Container>
                {/* Header */}
                <div className=" mb-8 md:mb-12 flex justify-center flex-col">
                <div className="w-full flex items-center justify-center">
  <div className="flex items-center">
    <div className="w-3 h-3 rounded bg-[#376CBC] mr-2"></div>
    <p className="text-[#E9C05F] text:lg md:text-xl font-semibold tracking-wide">FAQ’s</p>
  </div>
</div>

          <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-center">
          Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ List */}
             <data className="flex justify-center   w-full">
                   <div className="space-y-3 w-full md:w-4/5 ">
                    {normalizedFaqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={item.id}
                                className="rounded-xl overflow-hidden   glass-bg "
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(idx)}
                                    className="w-full flex items-center justify-between text-left px-4 md:px-6 py-4 md:py-5"
                                >
                                    <span className="text-sm md:text-base font-medium text-white">
                                        {item.question}
                                    </span>
                                    <span
                                        className={`ml-4 inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/15 text-white transition-transform ${
                                            isOpen ? 'rotate-45' : ''
                                        }`}
                                        aria-hidden
                                    >
                                        {/* + icon (rotates to × when open) */}
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-4 md:px-6 pb-5 -mt-1 text-gray-300 text-sm leading-relaxed">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
             </data>
            </Container>
        </section>
    );
};

export default FAQSection;


