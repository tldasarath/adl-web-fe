// components/FreezonesCarousel.jsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "../Common/Container";
import Link from "next/link";
import MainButton from "../button/MainButton";

const RAW_DATA = {
  "Dubai Freezones": {
    subtitle:
      "Dubai leads the UAE with world-renowned Freezones that cater to every business sector.",
    items: [
      {
        id: "jafza",
        title: "Jebel Ali Free Zone (JAFZA)",
        desc: "The UAE's largest logistics and trade hub.",
        img: "/assets/images/freezone/category/jafza-freezone-dubai.png",
        link: "/jafza-freezone-dubai",
      },
      {
        id: "dmcc",
        title: "Dubai Multi Commodities Centre (DMCC)",
        desc: "A premium free zone for digital entrepreneurs.",
        img: "/assets/images/freezone/category/dmcc-freezone-dubai.png",
        link: "/dmcc-freezone-dubai",
      },
      {
        id: "dafza",
        title: "Dubai Airport Freezone (DAFZA)",
        desc: "Premium option for aviation and international trade.",
        img: "/assets/images/freezone/category/dafza-freezone-dubai.png",
        link: "/dafza-freezone-dubai",
      },
      {
        id: "dwc",
        title: "Dubai South (DWC)",
        desc: "Perfect for logistics, eCommerce, and innovation-driven startups.",
        img: "/assets/images/freezone/category/dwc-freezone-dubai.png",
        link: "/dubai-south-freezone",
      },
      {
        id: "dic",
        title: "Dubai Internet City",
        desc: "Designed for tech, media, and creative sectors.",
        img: "/assets/images/freezone/category/dubai-internet-city.png",
        link: "/dubai-media-internet-d3-difc",
      },
      {
        id: "ifza",
        title: "IFZA (International Free Zone Authority)",
        desc: "Flexible and fast-growing with multi-activity options.",
        img: "/assets/images/freezone/category/ifza-freezone-dubai.png",
        link: "/ifza-freezone-dubai",
      },
      {
        id: "meydan",
        title: "Meydan Free Zone",
        desc: "Digital-first Freezone with affordable licensing.",
        img: "/assets/images/freezone/category/ifza-freezone-dubai.png",
        link: "/meydan-freezone-dubai",
      },
    ],
  },

  "Abu Dhabi Freezones": {
    subtitle:
      "Abu Dhabi hosts world-class industrial and media Freezones for strategic businesses.",
    items: [
      {
        id: "adgm",
        title: "Abu Dhabi Global Market (ADGM)",
        desc: "Leading financial hub located on Al Maryah Island.",
        img: "/assets/images/freezone/category/adgm-abu-dhabi.png",
        link: "/adgm-abu-dhabi",
      },
      {
        id: "kizad",
        title: "KIZAD",
        desc: "Strategic hub for industry and logistics.",
        img: "/assets/images/freezone/category/kizad-abu-dhabi.png",
        link: "/kizad-abu-dhabi",
      },
      {
        id: "masdar",
        title: "Masdar City Freezone",
        desc: "Dedicated to sustainability and renewable energy.",
        img: "/assets/images/freezone/category/masdar-city-freezone-abu-dhabi.png",
        link: "/masdar-city-freezone-abu-dhabi",
      },
      {
        id: "twofour54",
        title: "twofour54",
        desc: "A creative media and production powerhouse.",
        img: "/assets/images/freezone/category/twofour54-abu-dhabi.png",
        link: "/twofour54-abu-dhabi",
      },
    ],
  },

  "Sharjah Freezones": {
    subtitle: "Sharjah Freezones support light manufacturing and trading.",
    items: [
      {
        id: "saif",
        title: "Sharjah Airport International Free Zone (SAIF)",
        desc: "Known for efficient licensing and logistics.",
        img: "/assets/images/freezone/category/saif-freezone-dubai.png",
        link: "/saif-zone-sharjah",
      },
      {
        id: "hamriyah",
        title: "Hamriyah Free Zone",
        desc: "Industrial hub for manufacturing and storage.",
        img: "/assets/images/freezone/category/hamriyah-free-zone-sharjah.png",
        link: "/hamriyah-free-zone-sharjah",
      },
      {
        id: "shams",
        title: "Sharjah Media City (SHAMS)",
        desc: "Modern Freezone for creative industries.",
        img: "/assets/images/freezone/category/shams-sharjah.png",
        link: "/shams-sharjah",
      },
      {
        id: "spcfz",
        title: "Sharjah Publishing City (SPCFZ)",
        desc: "Specialized in printing and content distribution.",
        img: "/assets/images/freezone/category/spcfz-sharjah-publishing-city.png",
        link: "/spcfz-sharjah-publishing-city",
      },
    ],
  },

  "Ras Al Khaimah Freezones": {
    subtitle: "Ras Al Khaimah offers cost-effective industrial freezones.",
    items: [
      {
        id: "rakez",
        title: "Ras Al Khaimah Economic Zone (RAKEZ)",
        desc: "Multi-sector business ecosystem.",
        img: "/assets/images/freezone/category/rakez-ras-al-khaimah.png",
        link: "/rakez-ras-al-khaimah",
      },
      {
        id: "rakmc",
        title: "RAK Maritime City",
        desc: "Focused on shipping, trade, and marine logistics.",
        img: "/assets/images/freezone/category/rak-maritime-city.png",
        link: "/rak-maritime-city",
      },
    ],
  },

  "Ajman Freezones": {
    subtitle: "Ajman Freezones for small & medium enterprises.",
    items: [
      {
        id: "afz",
        title: "Ajman Free Zone (AFZ)",
        desc: "Budget-friendly with modern facilities.",
        img: "/assets/images/freezone/category/afz-ajman.png",
        link: "/afz-ajman",
      },
      {
        id: "amc",
        title: "Ajman Media City Free Zone (AMCFZ)",
        desc: "For digital and creative entrepreneurs.",
        img: "/assets/images/freezone/category/ajman-media-city.png",
        link: "/ajman-media-city",
      },
    ],
  },

  "Fujairah & Umm Al Quwain": {
    subtitle: "Coastal & logistics-focused Freezones.",
    items: [
      {
        id: "ffz",
        title: "Fujairah Free Zone",
        desc: "Industrial and manufacturing hub with port access.",
        img: "/assets/images/freezone/category/fujairah-free-zonne.png",
        link: "/fujairah-free-zone",
      },
      {
        id: "fcc",
        title: "Fujairah Creative City",
        desc: "Perfect for media, marketing, and consultancy.",
        img: "/assets/images/freezone/category/fujairah-creative-cityy.png",
        link: "/fujairah-creative-city",
      },
      {
        id: "uaq",
        title: "Umm Al Quwain Free Trade Zone (UAQFTZ)",
        desc: "Ideal for startups and freelancers at low cost.",
        img: "/assets/images/freezone/category/uaq-free-trade-zone.png",
        link: "/uaq-free-trade-zone",
      },
    ],
  },
};

const TABS = Object.keys(RAW_DATA);
const SPEED_PX_PER_SEC = 80;

export default function FreezonesCategories() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const carouselRef = useRef(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const baseItems = useMemo(() => RAW_DATA[activeTab].items || [], [activeTab]);
  const items = useMemo(
    () => (baseItems.length ? [...baseItems, ...baseItems, ...baseItems] : []),
    [baseItems]
  );

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const total = el.scrollWidth;
      const block = total / 3;
      if (Number.isFinite(block) && block > 0) el.scrollLeft = block;
    });
  }, [activeTab, items.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || items.length === 0) return;

    lastTimeRef.current = null;

    const step = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pausedRef.current && !draggingRef.current) {
        const px = (SPEED_PX_PER_SEC * dt) / 1000;
        el.scrollLeft += px;
      }

      const total = el.scrollWidth;
      const block = total / 3;
      if (block > 0) {
        if (el.scrollLeft >= block * 2) el.scrollLeft -= block;
        if (el.scrollLeft <= block * 0.5) el.scrollLeft += block;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const onResize = () => {
      const total = el.scrollWidth;
      const block = total / 3;
      if (block > 0) el.scrollLeft = block;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [items]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleEnter = () => (pausedRef.current = true);
    const handleLeave = () => (pausedRef.current = false);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onDown = (e) => {
      draggingRef.current = true;
      pausedRef.current = true;
      const clientX =
        e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0;
      startXRef.current = clientX;
      startScrollRef.current = el.scrollLeft;
      try {
        el.setPointerCapture?.(e.pointerId);
      } catch (err) {}
    };

    const onMove = (e) => {
      if (!draggingRef.current) return;
      const clientX =
        e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0;
      const dx = clientX - startXRef.current;
      el.scrollLeft = startScrollRef.current - dx;

      const total = el.scrollWidth;
      const block = total / 3;
      if (block > 0) {
        if (el.scrollLeft >= block * 2) el.scrollLeft -= block;
        if (el.scrollLeft <= block * 0.5) el.scrollLeft += block;
      }
    };

    const onUp = (e) => {
      draggingRef.current = false;
      pausedRef.current = false;
      try {
        el.releasePointerCapture?.(e.pointerId);
      } catch (err) {}
    };

    el.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [items]);

  const headingV = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };
  const subtitleV = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
  };
  const carouselHeadingV = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="py-8 md:py-16 lg:py-24 bg-[#0D1325]">
      <Container>
        <div className="max-w-7xl">
          <motion.h2
            initial="visible"
            animate="visible"
            variants={headingV}
            className="text-white text-2xl lg:text-3xl font-semibold text-center"
          >
            Freezones by Emirate
          </motion.h2>

          <div className="w-full flex justify-start mt-6">
            <nav className="w-full">
              {/* Outer wrapper creates the full-width white line */}
              <div className="w-full border-b border-white/80">
                {/* Inner wrapper holds buttons */}
                <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-2 md:px-0 text-sm md:text-base">
                  {TABS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`relative pb-3 whitespace-nowrap transition-colors duration-200
              ${
                t === activeTab
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
                    >
                      <span className="inline-block text-base lg:text-lg font-normal">
                        {t}
                      </span>

                      {/* gold underline for active tab */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200
                ${
                  t === activeTab ? "bg-[#E9C05F] w-full" : "bg-transparent w-0"
                }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <motion.h3
            key={activeTab + "-subtitle"}
            initial="visible"
            animate="visible"
            variants={subtitleV}
            className="text-white max-w-lg mx-auto lg:mx-0 my-6 text-center lg:text-left text-lg md:text-2xl font-semibold"
          >
            {RAW_DATA[activeTab].subtitle}
          </motion.h3>

          {/* <motion.h3 key={activeTab + "-carousel-heading"} initial="hidden" animate="visible" variants={carouselHeadingV} className="text-white text-xl md:text-2xl font-semibold mt-8 mb-4 text-center lg:text-left">
            {activeTab}
          </motion.h3> */}

          <div className="mt-2">
            <div
              ref={carouselRef}
              className="relative flex gap-6 overflow-x-auto no-scrollbar py-6 px-2"
              style={{
                scrollBehavior: "auto",
                WebkitOverflowScrolling: "auto",
              }}
              tabIndex={0}
              aria-label={`Freezones carousel for ${activeTab}`}
            >
              {items.map((it, idx) => (
                <Link
                  key={`${it.id}-${idx}`}
                  href={it.link}
                  className="shrink-0"
                >
                  <article
                    className="shrink-0 cursor-pointer"
                    aria-labelledby={`${it.id}-title`}
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/6 shadow-[0_20px_60px_rgba(2,6,23,0.6)] glass-bg w-[220px] h-[328px] sm:w-[260px] sm:h-[388px] lg:w-[294px] lg:h-[438px]">
                      <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[294px] lg:h-[294px]">
                        <img
                          src={it.img}
                          alt={it.title}
                          className="w-full h-full object-cover block"
                        />
                      </div>

                      <div className="py-4 px-4 border-t border-white/6 h-[108px] sm:h-[128px] lg:h-[144px] flex flex-col justify-between">
                        <div>
                          <h3
                            id={`${it.id}-title`}
                            className="text-white text-base md:text-lg font-normal leading-snug"
                          >
                            {it.title}
                          </h3>
                          <p className="text-slate-300 text-sm md:text-lg mt-2">
                            {it.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div aria-hidden="true" style={{ height: 8 }} />
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <MainButton
              text={"Explore Setup Packages"}
              url="#freezone-packages"
            />
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-120%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            transform: translateX(120%) skewX(-12deg);
            opacity: 0.6;
          }
          100% {
            transform: translateX(240%) skewX(-12deg);
            opacity: 0;
          }
        }
        .animate-\\[shine_2\\.2s_linear_infinite\\] {
          animation: shine 2.2s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
