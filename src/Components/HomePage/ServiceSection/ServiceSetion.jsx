'use client';

import { motion, AnimatePresence } from "framer-motion";

const ServicesMobile = ({ services }) => {
  const containerRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lock scroll when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLocked(true);
          setCurrentIndex(0);
          document.body.style.overflow = "hidden";
        } else {
          setIsLocked(false);
          document.body.style.overflow = "auto";
        }
      },
      { threshold: 0.7 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle wheel scroll for card navigation
  // Handle wheel scroll (desktop) + swipe (mobile)
  useEffect(() => {
    if (!isLocked) return;

    let scrollTimeout = null;
    let touchStartY = 0;
    let touchEndY = 0;

const handleScrollChange = (direction) => {
  setCurrentIndex((prev) => {
    const lastIndex = services.length - 1;
    let next = prev + direction;

    // Clamp within range
    if (next < 0) next = 0;
    if (next > lastIndex) next = lastIndex;

    const rect = containerRef.current?.getBoundingClientRect();
    const isMostlyVisible =
      rect && rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;

    // 🆙 User is on the first card and scrolls UP → unlock and go to previous section
    if (direction < 0 && prev === 0) {
      if (isMostlyVisible) {
        setIsLocked(false);
        document.body.style.overflow = "auto";
        setTimeout(() => {
          containerRef.current?.previousElementSibling?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 150);
      }
      return prev; // stay on first card
    }

    // ⬇️ User is on the last card and scrolls DOWN → unlock and go to next section
    if (direction > 0 && prev === lastIndex) {
      if (isMostlyVisible) {
        setIsLocked(false);
        document.body.style.overflow = "auto";
        setTimeout(() => {
          containerRef.current?.nextElementSibling?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 150);
      }
      return prev; // stay on last card
    }

    // ✅ Otherwise: normal step navigation
    return next;
  });
};


        // Scroll DOWN past last card → unlock and move to next section
      

    // 🖱️ Desktop scroll
    const handleWheel = (e) => {
      e.preventDefault();
      if (scrollTimeout) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      handleScrollChange(direction);
      scrollTimeout = setTimeout(() => (scrollTimeout = null), 700);
    };

    // 📱 Mobile swipe
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const delta = touchStartY - touchEndY;
      if (Math.abs(delta) < 40) return; // ignore small moves
      const direction = delta > 0 ? 1 : -1; // swipe up → next, swipe down → prev
      handleScrollChange(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isLocked, services.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen  flex flex-col justify-center items-center overflow-hidden"
    >
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
            Our Services
          </h2>
          <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Comprehensive business solutions to establish and grow your presence in the UAE
          </p>
        </div>
      </Container>
      
      {/* AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={services[currentIndex].id}
          className="absolute w-full max-w-sm rounded-2xl shadow-xl p-6 glass flex flex-col justify-center items-center text-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {services[currentIndex].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
            {services[currentIndex].description}
          </p>
          <button className="w-10 h-10 flex items-center justify-center border border-[#E9C05F] rounded-full transition-all duration-300 hover:bg-[#E9C05F]/10 hover:translate-x-1">
            <ArrowUpRight className="w-6 h-6 text-[#E9C05F]" />
          </button>
        </motion.div>
      </AnimatePresence>

 <div className="justify-center bottom-30 w-full flex gap-2 mt-8">
        <SecondaryButton text="More Services" />
      </div>

    </div>
  );
};


import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { services } from '@/Datas/services';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLocked, setIsLocked] = useState(false);
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(false);

  const totalCards = services.length;

  // ✅ Detect screen size
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsSmallOrMedium(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Desktop-only: lock section in view
  useEffect(() => {
    if (isSmallOrMedium) return; // Skip for sm/md

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLocked(true);
          setActiveIndex(0);
          document.body.style.overflow = 'hidden';
          window.scrollTo({
            top: entry.target.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth',
          });
        } else {
          setIsLocked(false);
          document.body.style.overflow = 'auto';
        }
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      document.body.style.overflow = 'auto';
    };
  }, [isSmallOrMedium]);

  // ✅ Desktop-only: wheel scroll animation
  useEffect(() => {
    if (!isLocked || isSmallOrMedium) return;

    let scrollTimeout = null;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (scrollTimeout) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      setActiveIndex((prev) => {
        let next = prev + direction;

        if (next < 0) {
          setActiveIndex(-1);
          setTimeout(() => {
            unlockAndScroll('up');
          }, 500);
          return 0;
        }
        if (next >= totalCards) {
          unlockAndScroll('down');
          return totalCards - 1;
        }
        return next;
      });

      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 700);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLocked, totalCards, isSmallOrMedium]);

  // 🔓 Unlock and resume normal scrolling
  const unlockAndScroll = (direction) => {
    setIsLocked(false);
    document.body.style.overflow = 'auto';
    requestAnimationFrame(() => {
      if (direction === 'down') {
        sectionRef.current?.nextElementSibling?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        sectionRef.current?.previousElementSibling?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-auto lg:h-screen flex py-8 md:py-14 flex-col justify-center items-center overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute left-[-10%] md:left-[-10px] -z-10 top-[25%] -translate-y-1/2 pointer-events-none select-none">
        <Image
          src="/assets/images/bg/square4.png"
          alt="Decorative shapes"
          width={240}
          height={320}
          className="object-contain md:w-60 w-30"
        />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[380px] h-[380px] -right-24 top-35 bg-[#376CBC] opacity-30 blur-[100px] rounded-[60%]" />
      </div>

     {!isSmallOrMedium&& <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
            Our Services
          </h2>
          <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Comprehensive business solutions to establish and grow your presence in the UAE
          </p>
        </div>
      </Container>}

      {/* 🪄 Cards */}
      <div
        className={`relative w-full flex justify-center items-center ${
          isSmallOrMedium ? 'flex-col space-y-6' : 'h-[420px] overflow-hidden'
        }`}
      >
        {isSmallOrMedium ? (
          // ✅ Render the separated mobile/tablet layout
          <ServicesMobile services={services} />
        ) : (
          // ✅ Keep desktop animation logic untouched
          <div
            className={`flex sm:flex-row sm:-space-x-2 lg:pl-16 xl:pl-[6rem] w-full justify-center items-center transition-all duration-700 ease-out`}
          >
            {services.map((service, index) => {
              const isVisible = index <= activeIndex;
              const isNextOne = index === activeIndex + 1;
              const isNextTwo = index === activeIndex + 2;

              const rotation = isVisible ? -5 + (index - activeIndex) * 2 : 0;

              let translateX = isVisible
                ? 0
                : isNextOne
                ? window.innerWidth * 0.18
                : isNextTwo
                ? window.innerWidth * 0.22
                : window.innerWidth * 0.6;

              if (activeIndex === -1 && index === 0) {
                translateX = window.innerWidth * 0.2;
              }

              if (activeIndex === -1 && index > 0) return null;

              return (
                <div
                  key={service.id}
                  className={`
                    absolute sm:relative 
                    transition-all duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)]
                    ${
                      isVisible
                        ? 'opacity-100 scale-100'
                        : isNextOne
                        ? 'opacity-60 scale-90 blur-[0.5px]'
                        : isNextTwo
                        ? 'opacity-40 scale-85 blur-[1px]'
                        : 'opacity-0'
                    }
                    w-[260px] sm:w-[232px] rounded-2xl shadow-xl p-6 glass h-[232px] 
                    origin-bottom-left flex flex-col justify-center
                  `}
                  style={{
                    transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
                    zIndex: totalCards - index,
                    transitionDelay: `${index * 0.1}s`,
                  }}
                >
                  <h3 className="xl:text-xl text-lg font-bold  mb-2 text-center">
                    {service.title}
                  </h3>
                  <p className="text-center text-sm leading-relaxed mb-10">
                    {service.description}
                  </p>
                  <button
                    className="
                      absolute bottom-4 right-4
                      w-8 md:w-10 h-8 md:h-10 flex items-center justify-center
                      border border-[#E9C05F] rounded-full
                      transition-all duration-300  hover:translate-x-1
                    "
                  >
                    <ArrowUpRight className="w-6 h-6 text-[#E9C05F]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Button */}
     {!isSmallOrMedium && <div className="justify-center bottom-30 w-full flex gap-2 mt-8">
        <SecondaryButton text="More Services" />
      </div>}
    </section>
  );
};

export default ServicesSection;
