'use client';

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
    // will be true for screens < 1024 (sm + md)
    const [isSmallOrMedium, setIsSmallOrMedium] = useState(false);


    const totalCards = services.length;

    // detect client screen size safely (no window usage during SSR)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setIsSmallOrMedium(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ✅ Detect when section is fully visible (not half)
    useEffect(() => {
        const handleViewportCheck = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
    const mostlyVisible =
  rect.top < window.innerHeight * 0.3 && rect.bottom > window.innerHeight * 0.3;

if (mostlyVisible && !isLocked) {
                setIsLocked(true);
                document.body.style.overflow = 'hidden';
                if (activeIndex === -1) setActiveIndex(0);
            } else if (!mostlyVisible && isLocked) {
                setIsLocked(false);
                document.body.style.overflow = 'auto';
            }
        };

        handleViewportCheck();
        window.addEventListener('scroll', handleViewportCheck);
        return () => {
            window.removeEventListener('scroll', handleViewportCheck);
            document.body.style.overflow = 'auto';
        };
    }, [isLocked, activeIndex]);

    // 🌀 Handle wheel scrolling
    // 🌀 Handle wheel scrolling (different for mobile vs desktop)
    useEffect(() => {
        if (!isLocked) return;

        let scrollTimeout = null;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (scrollTimeout) return;

            const direction = e.deltaY > 0 ? 1 : -1;

            setActiveIndex((prev) => {
                let next = prev + direction;

                if (next < 0) {
                    unlockAndScroll('up');
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

        // On sm + md (vertical behavior), attach to window when section is visible
        if (isSmallOrMedium) {
            window.addEventListener('wheel', handleWheel, { passive: false });
        } else {
            // keep same for desktop
            window.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => window.removeEventListener('wheel', handleWheel);
    }, [isLocked, totalCards, isSmallOrMedium]);


    // 🔓 Unlock scroll
    const unlockAndScroll = (direction) => {
        setIsLocked(false);
        document.body.style.overflow = 'auto';
        requestAnimationFrame(() => {
            if (direction === 'down') {
                sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                sectionRef.current?.previousElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-screen flex  py-8 md:py-14 flex-col justify-center items-center overflow-hidden"
        >
            {/* Decorative background */}
            <div className="absolute left-[-10%] md:left-[-10px]  -z-10 top-[25%] -translate-y-1/2 pointer-events-none select-none">
                <Image
                    src="/assets/images/bg/square4.png"
                    alt="Decorative shapes"
                    width={240}
                    height={320}
                    className="object-contain  md:w-60 w-30"
                />
            </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute w-[380px] h-[380px] -right-24 top-35 bg-[#376CBC] opacity-30 blur-[100px] rounded-[60%]" />
                </div>

            <Container>
                <div className="text-center mb-12">
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white ">
                        Our Services
                    </h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
                        Comprehensive business solutions to establish and grow your presence in the UAE
                    </p>
                </div>

                {/* 🪄 Cards */}
                <div className="relative w-full flex justify-center items-center h-[420px] overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-center items-center sm:-space-x-24 transition-all duration-700 ease-out">
                        {services.map((service, index) => {
                            // determine state
                            const isVisible = index <= activeIndex;
                            const isActive = index === activeIndex;
                            const isNextCard = index === activeIndex + 1;

                            // desktop transforms (lg+)
                            const rotation = isVisible ? -5 + (index - activeIndex) * 2 : 0;
                            const translateX = isVisible ? 0 : 200;

                            // sm/md vs lg+ logic
                            let transformValue;

                            if (isSmallOrMedium) {
                                // sm/md: show only one card at a time, vertical slide animation
                                if (index === activeIndex) {
                                    transformValue = 'translateY(0) scale(1)';
                                } else if (index > activeIndex) {
                                    // cards below come from bottom
                                    transformValue = 'translateY(100%) scale(0.95)';
                                } else {
                                    // cards above move up out of view
                                    transformValue = 'translateY(-100%) scale(0.95)';
                                }
                            } else {
                                // lg+ (keep original)
                                transformValue = `translateX(${translateX}px) rotate(${rotation}deg)`;
                            }

                            return (
                                <div
                                    key={service.id}
                                    className={`
                    absolute sm:relative transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                    ${isVisible || isNextCard ? 'opacity-100' : 'opacity-0'}
                    ${isNextCard ? 'opacity-50 scale-90 blur-[1px]' : ''}
                    w-[260px] sm:w-[300px] rounded-2xl shadow-xl p-6 glass origin-bottom-left flex flex-col justify-center
                  `}
                                    style={{
                                        transform: transformValue,
                                        zIndex: totalCards - index,
                                        transitionDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed mb-10">
                                        {service.description}
                                    </p>

                                    <button
                                        className="
                      absolute bottom-4 right-4
                      w-8 md:w-10 h-8 md:h-10 flex items-center justify-center
                      border border-[#E9C05F] rounded-full
                      transition-all duration-300 hover:bg-[#E9C05F]/10 hover:translate-x-1
                    "
                                    >
                                        <ArrowUpRight className="w-6 h-6 text-[#E9C05F]" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ✅ Show button only on last card */}
               
                    <div className="justify-center bottom-30 w-full flex gap-2 mt-8">
                        <SecondaryButton text="More Services" />
                    </div>
                        
            </Container>
        </section>
    );
};

export default ServicesSection;
