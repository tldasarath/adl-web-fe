// components/ProcessCubesExact.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../Common/Container";

/**
 * ProcessCubesExact.jsx
 *
 * - Exact-looking arrangement of 5 glass cubes (absolute positioned for precise layout)
 * - Text clipped/contained inside cubes (won't overflow)
 * - Responsive: scales & repositions for mobile / tablet / desktop
 * - Framer Motion scroll animations run every time cube enters view (viewport.once = false)
 *
 * Sizes/positions tuned to match the provided reference image.
 */

const cubes = [
  {
    id: "consult",
    title: "Consultation & Planning",
    desc: "Identify the right Freezone and license category",
    // desktop absolute offsets (left, top as percentage of the cube-area)
    leftDesktop: "6%",
    topDesktop: "38%",
  },
  {
    id: "gov",
    title: "Government Coordination",
    desc: "ADL liaises directly with Freezone authorities",
    leftDesktop: "38%",
    topDesktop: "30%",
  },
  {
    id: "visa",
    title: "Visa & Bank\nAccount Support",
    desc: "Hassle-free processing for all company essentials.",
    leftDesktop: "72%",
    topDesktop: "30%",
  },
  {
    id: "doc",
    title: "Documentation &\nApplication",
    desc: "We prepare and submit all legal paperwork.",
    leftDesktop: "26%",
    topDesktop: "61%",
  },
  {
    id: "license",
    title: "License Issuance",
    desc: "Receive your license within days.",
    leftDesktop: "54%",
    topDesktop: "61%",
  },
];

const cubeVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98, rotateX: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
  hover: { y: -8, scale: 1.02, transition: { duration: 0.24 } },
};

export default function FreezoneProcessCubes() {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-visible">
      <Container>
        <div className="max-w-7xl mx-auto relative">
          {/* Left text column */}
          <div className="lg:flex lg:items-start lg:gap-10">
            <div className="lg:w-5/12">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4">
                From Idea to Incorporation
                <br />
                We Handle Everything
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-xl">
                ADL Business Solutions provides end-to-end guidance throughout your Freezone
                setup journey. We help you choose the right jurisdiction, prepare legal
                documents, acquire your license, open a bank account, and manage visa
                processing — ensuring a stress-free setup experience.
              </p>
            </div>

            {/* Right artwork area — absolute positioned cubes inside this block */}
            <div className="relative lg:w-7/12 mt-8 lg:mt-0">
              {/* Decorative top-right shapes (like reference) */}
              <div className="hidden lg:block absolute right-6 top-0 transform translate-y-[-6%] pointer-events-none opacity-60">
                <div className="w-16 h-16 bg-slate-800/40 rounded-sm rotate-12 shadow-lg" />
              </div>

              {/* Canvas area — relative container that holds absolutely-positioned cubes */}
              <div className="relative w-full h-[420px] md:h-[520px] lg:h-[420px]">
                {cubes.map((c, i) => (
                  <motion.div
                    key={c.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    variants={cubeVariants}
                    whileHover="hover"
                    className="absolute"
                    style={{
                      // Desktop positions use leftDesktop/topDesktop percentages.
                      // We set default positions for mobile via Tailwind classes below.
                      left: c.leftDesktop,
                      top: c.topDesktop,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Cube outer — the "glass" block */}
                    <div
                      className="relative box-cube w-[180px] sm:w-[200px] md:w-[220px] lg:w-[260px] xl:w-[294px] h-[180px] sm:h-[200px] md:h-[220px] lg:h-[260px] xl:h-[294px] rounded-lg overflow-hidden border border-[#cecfcf20] shadow-[0_18px_60px_rgba(2,6,23,0.6)]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                        WebkitBackdropFilter: "blur(6px)",
                        backdropFilter: "blur(6px)",
                        perspective: 900,
                      }}
                    >
                      {/* inner top highlight */}
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-transparent via-white/7 to-transparent opacity-60"
                        style={{ mixBlendMode: "overlay" }}
                      />

                      {/* cube content area */}
                      <div className="p-4 md:p-5 h-full flex flex-col justify-start">
                        <h4 className="text-white font-semibold text-sm md:text-base leading-tight whitespace-pre-line">
                          {c.title}
                        </h4>

                        <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed max-h-[6.9rem] overflow-hidden">
                          {c.desc}
                        </p>
                      </div>

                      {/* subtle right edge highlight */}
                      <div
                        aria-hidden
                        className="absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-transparent via-white/6 to-transparent opacity-30"
                      />
                    </div>

                    {/* small shadow/pill below cube to match reference */}
                    <div
                      aria-hidden
                      className="absolute left-1/2 transform -translate-x-1/2 translate-y-[10px] w-[68%] h-4 rounded-b-xl bg-[rgba(255,255,255,0.02)] border border-white/6 blur-sm"
                      style={{ zIndex: -1 }}
                    />
                  </motion.div>
                ))}

                {/* Responsive adjustments: move cubes for smaller screens using inline CSS + media queries */}
                <style jsx>{`
                  /* Mobile: stacked layout - override absolute desktop positions */
                  @media (max-width: 1023px) {
                    .relative > .absolute {
                      position: relative !important;
                      left: auto !important;
                      top: auto !important;
                      transform: none !important;
                      margin: 12px auto;
                    }
                  }

                  /* Precise desktop offsets (tweak if you want slight shifts) */
                  @media (min-width: 1024px) {
                    /* We supplied percentages via style attr for desktop; add minor nudges if needed */
                  }

                  /* Ensure text does not overflow cube on very small screens */
                  .box-cube h4, .box-cube p {
                    word-break: break-word;
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
