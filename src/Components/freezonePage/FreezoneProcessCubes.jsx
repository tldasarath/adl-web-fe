'use client'
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const cubes = [
  {
    id: "consult",
    title: "Consultation & Planning",
    desc: "Identify the right Freezone and license category",
  },
  {
    id: "gov",
    title: "Government Coordination",
    desc: "ADL liaises directly with Freezone authorities",
  },
  {
    id: "visa",
    title: "Visa & Bank\nAccount Support",
    desc: "Hassle-free processing for all company essentials.",
  },
  {
    id: "doc",
    title: "Documentation &\nApplication",
    desc: "We prepare and submit all legal paperwork.",
  },
  {
    id: "license",
    title: "License Issuance",
    desc: "Receive your license within days.",
  },
];

const cardPositions = [
  { x: 0, y: 0, z: 0, opacity: 1, rotation: 0 }, // center (initial stack)
  { x: -100, y: -80, z: -50, opacity: 0.9, rotation: -5 }, // left-top
  { x: 100, y: -80, z: -40, opacity: 0.8, rotation: 5 }, // right-top
  { x: -100, y: 80, z: -30, opacity: 0.7, rotation: -3 }, // left-bottom
  { x: 100, y: 80, z: -20, opacity: 0.6, rotation: 3 }, // right-bottom
];

export default function FreezoneProcessCubes() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isLocked || isMobile) return;

      e.preventDefault();
      const scrollAmount = e.deltaY;
      const maxScroll = (cubes.length - 1) * 100;

      setScrollProgress((prev) => {
        const newProgress = Math.max(0, Math.min(prev + scrollAmount, maxScroll));
        return newProgress;
      });
    };

    const handleScroll = () => {
      if (isMobile || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;

      // Check if section is in view
      const isInView = rect.top < windowHeight && rect.bottom > 0;

      if (isInView && rect.top < windowHeight * 0.3) {
        setIsLocked(true);
      } else if (rect.bottom < 0) {
        setIsLocked(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (isLocked) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isLocked, isMobile]);

  const getCardTransform = (index) => {
    const maxScroll = (cubes.length - 1) * 100;
    const scrollPerCard = 100;
    const cardStartScroll = index * scrollPerCard;
    const cardEndScroll = (index + 1) * scrollPerCard;

    let progress = 0;

    if (scrollProgress >= cardStartScroll && scrollProgress <= cardEndScroll) {
      progress = (scrollProgress - cardStartScroll) / scrollPerCard;
    } else if (scrollProgress > cardEndScroll) {
      progress = 1;
    }

    // Interpolate between center and final position
    const startPos = cardPositions[0];
    const endPos = cardPositions[index];

    const currentX = startPos.x + (endPos.x - startPos.x) * progress;
    const currentY = startPos.y + (endPos.y - startPos.y) * progress;
    const currentZ = startPos.z + (endPos.z - startPos.z) * progress;
    const currentOpacity = startPos.opacity + (endPos.opacity - startPos.opacity) * progress;
    const currentRotation = startPos.rotation + (endPos.rotation - startPos.rotation) * progress;

    return {
      transform: `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) rotateY(${currentRotation}deg) scale(${1 - progress * 0.05})`,
      opacity: currentOpacity,
      zIndex: cubes.length - index,
    };
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-12 md:py-16 lg:py-24 overflow-hidden transition-all ${
        isLocked ? "h-screen lg:h-auto" : "h-auto"
      }`}
      style={{ overflowY: isLocked && !isMobile ? "hidden" : "auto" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Text Section */}
          <div className="lg:col-span-2 flex flex-col justify-center lg:sticky lg:top-20">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-4 md:mb-6">
              From Idea to
              <br className="hidden sm:block" />
              Incorporation
              <br className="hidden sm:block" />
              We Handle Everything
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg">
              ADL Business Solutions provides end-to-end guidance throughout your Freezone
              setup journey. We help you choose the right jurisdiction, prepare legal
              documents, acquire your license, open a bank account, and manage visa
              processing — ensuring a stress-free setup experience.
            </p>
          </div>

          {/* Right Cards Section */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <div className="relative w-full h-80 sm:h-96 lg:h-screen lg:max-h-[600px] perspective">
              <div
                ref={cardsContainerRef}
                className="relative w-full h-full"
                style={{ perspective: "1000px" }}
              >
                {cubes.map((cube, index) => (
                  <motion.div
                    key={cube.id}
                    className="absolute inset-0 flex items-center justify-center"
                    style={getCardTransform(index)}
                  >
                    <div
                      className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-xl border border-white/10 shadow-2xl p-5 sm:p-6 overflow-hidden group cursor-pointer transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {/* Top glossy stripe */}
                      <div
                        className="absolute inset-x-0 top-0 h-2 sm:h-3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        style={{ mixBlendMode: "overlay" }}
                      />

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-start">
                        <h4 className="text-white font-semibold text-sm sm:text-base lg:text-lg leading-tight whitespace-pre-line">
                          {cube.title}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed">
                          {cube.desc}
                        </p>
                      </div>

                      {/* Right edge highlight */}
                      <div className="absolute right-0 top-0 w-1.5 h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-40" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile scroll indicator */}
              {isMobile && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs animate-pulse">
                  Scroll to reveal →
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress bar (desktop only) */}
      {!isMobile && isLocked && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-100"
            style={{ width: `${(scrollProgress / ((cubes.length - 1) * 100)) * 100}%` }}
          />
        </div>
      )}
    </section>
  );
}