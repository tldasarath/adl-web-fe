// components/BusinessSection.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';


const businessData = [
  {
    id: 1,
    title: "Mainland",
    description: "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, =  mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit ",
    image: "/assets/images/blogs/business-setup.png" // Replace with your actual image paths
  },
  {
    id: 2,
    title: "Freezone",
    description: "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, =  mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit ",
    image: "/assets/images/blogs/business-setup.png" // Replace with your actual image paths
  },
  {
    id: 3,
    title: "Offshore",
    description: "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, =  mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit ",
    image: "/assets/images/blogs/business-setup.png" // Replace with your actual image paths
  }
];

export default function BusinessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isScrolling = useRef(false);
  const isUserScrolling = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (isScrolling.current || isUserScrolling.current) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      const sectionStart = sectionTop - windowHeight * 0.3;
      const sectionEnd = sectionTop + sectionHeight - windowHeight * 0.7;

      if (scrollY >= sectionStart && scrollY < sectionEnd) {
        if (!isActive) {
          setIsActive(true);
          setActiveIndex(0);
          // Smooth scroll to the top of the section when entering
          isScrolling.current = true;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
          });
          setTimeout(() => {
            isScrolling.current = false;
          }, 600);
        }
      } else {
        if (isActive) {
          setIsActive(false);
        }
      }
    };

    const handleWheel = (e) => {
      if (!isActive) return;

      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      // If we're at the last item and scrolling down, exit the section
      if (e.deltaY > 0 && activeIndex === businessData.length - 1) {
        // Allow normal scrolling to continue past the section
        setIsActive(false);
        isUserScrolling.current = true;
        
        // Scroll to just below the section to continue normal scrolling
        window.scrollTo({
          top: sectionBottom - windowHeight * 0.3,
          behavior: 'smooth'
        });

        setTimeout(() => {
          isUserScrolling.current = false;
        }, 300);
        return;
      }

      // If we're at the first item and scrolling up, exit the section upward
      if (e.deltaY < 0 && activeIndex === 0 && currentScroll <= sectionTop + 100) {
        setIsActive(false);
        isUserScrolling.current = true;
        
        // Scroll to above the section
        window.scrollTo({
          top: sectionTop - windowHeight * 0.7,
          behavior: 'smooth'
        });

        setTimeout(() => {
          isUserScrolling.current = false;
        }, 300);
        return;
      }

      // Handle internal section navigation
      if (isActive) {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.deltaY > 0) {
          // Scroll down - next item
          if (activeIndex < businessData.length - 1) {
            isScrolling.current = true;
            setActiveIndex(prev => prev + 1);
            setTimeout(() => {
              isScrolling.current = false;
            }, 500);
          }
        } else if (e.deltaY < 0) {
          // Scroll up - previous item
          if (activeIndex > 0) {
            isScrolling.current = true;
            setActiveIndex(prev => prev - 1);
            setTimeout(() => {
              isScrolling.current = false;
            }, 500);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isActive, activeIndex]);

  // Reset to first item when section becomes inactive
  useEffect(() => {
    if (!isActive && activeIndex !== 0) {
      setActiveIndex(0);
    }
  }, [isActive, activeIndex]);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen py-20 transition-all duration-500 flex items-center`}
    >
      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Business
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how we can transform your business with our innovative solutions
          </p>
        </div> */}

        <div ref={contentRef} className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex gap-8">
              {/* Vertical Line Indicator */}
              <div className="flex flex-col items-center">
                <div className="w-1 h-80 bg-gray-200 rounded-full relative">
                  <div 
                    className="absolute top-0 left-0 w-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      height: `${((activeIndex + 1) / businessData.length) * 100}%` 
                    }}
                  />
                  
                  {/* Active point indicator */}
                  <div 
                    className="absolute left-1/2 w-4 h-4 bg-blue-600 border-4 border-white rounded-full shadow-lg transform -translate-x-1/2 transition-all duration-500 ease-out"
                    style={{ 
                      top: `${(activeIndex / (businessData.length - 1)) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="relative h-80">
                  {businessData.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-all duration-500 ${
                        index === activeIndex
                          ? 'opacity-100 translate-y-0'
                          : index < activeIndex
                          ? 'opacity-0 -translate-y-8'
                          : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <h3 className="text-3xl md:text-4xl font-bold mb-6">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl  leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Scroll Indicator */}
               
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {businessData.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  {/* Actual Image with fallback */}
                  <div className="w-full h-full relative">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                   />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Status Indicator */}
        
      </div>
    </section>
  );
}