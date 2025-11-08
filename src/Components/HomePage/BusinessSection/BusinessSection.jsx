'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';

const businessData = [
  {
    id: 1,
    title: "Freezone",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie...",
    image: "/assets/images/businessSection/freezone.png",
  },
  {
    id: 2,
    title: "Mainland",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie...",
    image: "/assets/images/businessSection/mainland.png",
  },
  {
    id: 3,
    title: "Offshore",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie...",
    image: "/assets/images/businessSection/offshore.png",
  },
];

export default function BusinessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const sectionRef = useRef(null);
  const scrollTimeout = useRef(null);

  // ✅ Detect when section is in view — no forced scroll, no overflow hidden
  useEffect(() => {
  let confirmTimeout = null;

  const handleVisibility = (entry) => {
    const MIN_RATIO = 0.7;
    const rectTop = Math.abs(entry.boundingClientRect.top);
    const ratio = entry.intersectionRatio;

    const shouldLock = entry.isIntersecting && ratio >= MIN_RATIO && rectTop < 150;

    clearTimeout(confirmTimeout);
    confirmTimeout = setTimeout(() => {
      setIsLocked(shouldLock);
    }, 80);
  };

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(handleVisibility),
    { threshold: [0.5, 0.7, 0.9] }
  );

  if (sectionRef.current) observer.observe(sectionRef.current);

  // ✅ Added safety scroll check
  const handleScroll = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;

    // If section covers most of viewport and is near center → ensure lock
    if (rect.top < viewHeight * 0.25 && rect.bottom > viewHeight * 0.75) {
      if (!isLocked) setIsLocked(true);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    clearTimeout(confirmTimeout);
    observer.disconnect();
    window.removeEventListener("scroll", handleScroll);
  };
}, [isLocked]);

  // 🌀 Smooth controlled scroll transitions
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

  const handleWheel = (e) => {
  if (!isLocked) return;
  e.preventDefault();

  if (scrollTimeout.current) return;

  if (e.deltaY > 0) {
    // Scroll Down
    if (activeIndex < businessData.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      // ✅ Allow scroll to next section
      setIsLocked(false);
      const sectionBottom =
        sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
      window.scrollTo({ top: sectionBottom, behavior: "smooth" });
    }
  } else {
    // Scroll Up
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else {
      // ✅ Allow scroll to previous section
      setIsLocked(false);
      const sectionTop = sectionRef.current.offsetTop;
      window.scrollTo({
        top: sectionTop - window.innerHeight,
        behavior: "smooth",
      });
    }
  }

  scrollTimeout.current = setTimeout(() => {
    scrollTimeout.current = null;
  }, 800);
};

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

   const handleTouchEnd = (e) => {
  if (!isLocked) return;

  touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (scrollTimeout.current) return;

  if (deltaY > 50) {
    // Swipe up (scroll down)
    if (activeIndex < businessData.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      // ✅ Allow scroll to next section
      setIsLocked(false);
      const sectionBottom =
        sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
      window.scrollTo({ top: sectionBottom, behavior: "smooth" });
    }
  } else if (deltaY < -50) {
    // Swipe down (scroll up)
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else {
      // ✅ Allow scroll to previous section
      setIsLocked(false);
      const sectionTop = sectionRef.current.offsetTop;
      window.scrollTo({
        top: sectionTop - window.innerHeight,
        behavior: "smooth",
      });
    }
  }

  scrollTimeout.current = setTimeout(() => {
    scrollTimeout.current = null;
  }, 800);
};


    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, isLocked]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      <Container>
        <div className="px-4 flex flex-col md:flex-row md:items-center gap-12">
          {/* ===== LEFT CONTENT ===== */}
          <div className="flex-1 flex gap-8 items-start relative">
            {/* Vertical 3-line Indicator */}
            <div className='h-[800px] flex items-center'>
              <div className="flex flex-col items-center gap-9 justify-between h-[600px] relative">
                {businessData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-50 rounded-full transition-all duration-500 ${activeIndex === index ? "bg-white" : "bg-[#E9C05F]"
                      }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1 relative h-[800px] flex items-center overflow-hidden">
              {businessData.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transform flex items-center transition-transform duration-[1300ms] ease-in-out ${index === activeIndex
                      ? "translate-y-0"
                      : index < activeIndex
                        ? "-translate-y-full"
                        : "translate-y-full"
                    }`}
                >
                  <div className='flex flex-col'>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 ">
                      {item.title}
                    </h3>
                    <p className="text-lg md:text-xl max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                    <div>
                      <SecondaryButton text='Explore Packages' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT IMAGE SECTION ===== */}
          <div className="hidden md:block flex-1 relative h-96 lg:h-[500px] rounded-3xl overflow-hidden glass-bg">
            {businessData.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${index === activeIndex
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                  }`}
              >
                <div className="w-full h-20 flex justify-center items-center ">
                  <h3 className="text-3xl font-semibold ">
                    {item.title}
                  </h3>
                </div>
                <div className="relative w-2/3 h-72">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
