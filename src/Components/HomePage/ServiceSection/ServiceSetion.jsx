'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { services } from '@/Datas/services';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('down');
  const totalCards = services.length;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollDirection.current = currentY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Handle resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
      setIsSmallOrMedium(window.innerWidth < 1024);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // ✅ Intersection Observer to enable scroll lock only in view
  useEffect(() => {
    // make observer slightly more permissive on desktop so it can lock before the section is 100% visible
    const options = isSmallOrMedium
      ? { threshold: 0.9 } // mobile/tablet: only lock when section is largely visible
      : { threshold: 0.35 }; // desktop: lock earlier so the effect works before fully in view

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
        }
      },
      options
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      setIsLocked(false);
    };
  }, [isSmallOrMedium]);

  // ✅ Handle scroll (Desktop or Mobile)
  useEffect(() => {
    if (!isLocked) return;

    let throttle = false;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleScrollChange = (direction) => {
      setActiveIndex((prev) => {
        let next = prev + direction;
        const lastIndex = totalCards - 1;

        // Lock bounds
        if (next < 0) {
          unlockAndScroll('up');
          return 0;
        }
        if (next > lastIndex) {
          unlockAndScroll('down');
          return lastIndex;
        }
        return next;
      });
    };

    // 🖱️ Wheel scroll (desktop + tablets)
    const handleWheel = (e) => {
      e.preventDefault();
      if (throttle) return;
      throttle = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      requestAnimationFrame(() => handleScrollChange(direction));
      setTimeout(() => (throttle = false), 400);
    };

    // 📱 Touch swipe (mobile)
    const handleTouchStart = (e) => (touchStartY = e.touches[0].clientY);
    const handleTouchMove = (e) => (touchEndY = e.touches[0].clientY);
    const handleTouchEnd = () => {
      const delta = touchStartY - touchEndY;
      if (Math.abs(delta) < 40) return;
      const direction = delta > 0 ? 1 : -1;
      handleScrollChange(direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLocked, totalCards, isSmallOrMedium]);

  // ✅ Unlock and scroll to next/prev section smoothly
  const unlockAndScroll = (direction) => {
    setIsLocked(false);
    const nextSection =
      direction === 'down'
        ? sectionRef.current?.nextElementSibling
        : sectionRef.current?.previousElementSibling;

    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // ---------- NEW: motion variants for card animation ----------
  const cardVariants = {
    enter: (custom) => ({
      x: 0,
      rotate: custom.rotation,
      opacity: custom.opacity,
      scale: custom.scale,
      transition: {
      type: 'tween',
      ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier (no bounce)
      duration: 0.6,
    },
    }),
    hidden: (custom) => ({
      x: custom.x,
      rotate: 0,
      opacity: custom.opacityHidden,
      scale: custom.scaleHidden,
      transition: {
        type: 'tween',
        ease: [0.22, 1, 0.36, 1],
        duration: 0.45,
      },
    }),
  };

  // ✅ Render card content (shared between mobile & desktop) - now motion-based
  const Card = ({ service, index, custom }) => (
    <motion.div
      custom={custom}
      variants={cardVariants}
      initial="hidden"
      animate={custom.isVisible ? 'enter' : 'hidden'}
      className={`absolute sm:relative rounded-2xl shadow-xl p-6 glass-bg h-[232px] w-[260px] sm:w-[232px] flex flex-col justify-center transition-all`}
      style={{
        zIndex: 1000 - index, // keep stacking order
      }}
    >
      <h3 className="xl:text-xl text-lg font-bold mb-2 text-center">
        {service.title}
      </h3>
      <p className="text-center text-sm leading-relaxed mb-10">
        {service.description}
      </p>
      <button className="absolute bottom-4 right-4 w-8 md:w-10 h-8 md:h-10 flex items-center justify-center border border-[#E9C05F] rounded-full hover:translate-x-1 transition-all duration-300">
        <ArrowUpRight className="w-6 h-6 text-[#E9C05F]" />
      </button>
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-auto lg:h-screen flex flex-col justify-center items-center overflow-hidden py-10 md:py-16"
    >
      {/* Decorative Background */}
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

      {/* Header */}
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
            Our Services
          </h2>
          <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Comprehensive business solutions to establish and grow your presence in the UAE
          </p>
        </div>
      </Container>

      {/* Cards Area */}
      <div className="relative w-full flex justify-center items-center h-[420px]">
        {/* Mobile/Tablets use AnimatePresence for single-card transitions */}
        {isSmallOrMedium ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={services[activeIndex].id}
              className="absolute w-full max-w-sm rounded-2xl shadow-xl p-6 glass-bg flex flex-col justify-center items-center text-center"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {services[activeIndex].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {services[activeIndex].description}
              </p>
              <button className="w-10 h-10 flex items-center justify-center border border-[#E9C05F] rounded-full hover:bg-[#E9C05F]/10 hover:translate-x-1 transition-all duration-300">
                <ArrowUpRight className="w-6 h-6 text-[#E9C05F]" />
              </button>
            </motion.div>
          </AnimatePresence>
        ) : (
          // Desktop stacked cards animation
          <div className="flex sm:flex-row sm:-space-x-2 lg:pl-16 xl:pl-[6rem] w-full justify-center items-center">
            {services.map((service, index) => {
              // Visible logic
              const isVisible = index <= activeIndex;
              const isNextOne = index === activeIndex + 1;
              const isNextTwo = index === activeIndex + 2;

              // compute rotation and x offsets
              const rotation = isVisible ? -5 + (index - activeIndex) * 2 : 0;

              // smaller offsets than before for smoother, subtler motion
              const baseOffset = Math.max(160, windowWidth * 0.14); // px
              const nextOffset1 = Math.max(230, windowWidth * 0.18);
              const nextOffset2 = Math.max(300, windowWidth * 0.22);

              const x = isVisible
                ? 0
                : isNextOne
                  ? nextOffset1
                  : isNextTwo
                    ? nextOffset2
                    : baseOffset * 3; // far off-screen for distant cards

              // opacity/scale tiers
              const opacity = isVisible ? 1 : isNextOne ? 0.75 : 0.45;
              const opacityHidden = isVisible ? 1 : 0.1;
              const scale = isVisible ? 1 : isNextOne ? 0.96 : 0.9;
              const scaleHidden = isVisible ? 1 : 0.9;

              // custom props for framer-motion variants
              const custom = {
                isVisible,
                x, // initial x for hidden state
                rotation,
                opacity,
                opacityHidden,
                scale,
                scaleHidden,
              };

              // guard (keeps behavior same as original)
              if (activeIndex === -1 && index > 0) return null;

              return (
                <Card
                  key={service.id}
                  service={service}
                  index={index}
                  custom={custom}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="justify-center bottom-30 w-full flex gap-2 mt-8">
        <SecondaryButton text="More Services" url={"/services"}/>
      </div>
    </section>
  );
};

export default ServicesSection;
