'use client';

import MainButton from '@/Components/button/MainButton';
import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Counter states
  const [experience, setExperience] = useState(0);
  const [transparency, setTransparency] = useState(0);
  const [clients, setClients] = useState(0);
  const [staff, setStaff] = useState(0);

  // Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const transparencyInterval = setInterval(() => {
        setTransparency(prev => {
          if (prev < 100) return prev + 5;
          clearInterval(transparencyInterval);
          return prev;
        });
      }, 20);
      const experienceInterval = setInterval(() => {
        setExperience(prev => {
          if (prev < 18) return prev + 1;
          clearInterval(experienceInterval);
          return prev;
        });
      }, 60);

      const clientsInterval = setInterval(() => {
        setClients(prev => {
          if (prev < 100) return prev + 5;
          clearInterval(clientsInterval);
          return prev;
        });
      }, 20);

      const staffInterval = setInterval(() => {
        setStaff(prev => {
          if (prev < 10) return prev + 1;
          clearInterval(staffInterval);
          return prev;
        });
      }, 80);

      return () => {
        clearInterval(experienceInterval);
        clearInterval(transparencyInterval);
        clearInterval(clientsInterval);
        clearInterval(staffInterval);
      };
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className=" relative py-8 md:py-14 h-auto lg:h-[800px] ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing Blob Left */}
        <div className="
      absolute w-[380px] h-[380px] 
      -left-24 bottom-40 
      bg-[#376CBC]
      opacity-30 blur-[100px] 
      rounded-[60%]
    "></div>


      </div>

      <div className="absolute left-[80%] top-40 md:top-96">
        <img src="/assets/images/bg/bubble.png" alt="" className="relative w-[500px] h-[400px] object-contain" />
      </div>

      <Container>
        <div className="space-y-12">

          {/* Main Content */}
          <div className="relative space-y-6 pt-4 text-center md:text-left">

            <h2 className="text-2xl md:text-3xl main-text font-bold text-white ">
              At a Glance
            </h2>

            <div className='md:w-3/4 w-full text-start'>
              <p className="text-md lg:text-xl font-light leading-relaxed">
At ADL Business Solutions, we simplify your business journey  from company formation and PRO services to visas, banking, compliance, and long-term business support. Our advisory experts analyze your business goals, recommend the right company structure, and handle all legal and government procedures on your behalf.              </p>
              <p className="text-md lg:text-xl font-light leading-relaxed">
With years of experience in UAE business consulting, we empower entrepreneurs, investors, and corporates to build strong and successful businesses with confidence, clarity, and transparency.</p>
            </div>

            <SecondaryButton text="Read more" />

            {/* Decorative Half Right Border */}
            {/* Horizontal line with rounded left-bottom corner */}
            {/* Curved top-right corner */}
            <div className="absolute top-0 right-0 w-30 md:w-50 h-10 border-t-4 border-r-4 border-[#E9C05F] rounded-tr-full"></div>

            {/* Vertical line with rounded top-left corner */}
            <div className="absolute right-0 top-9 h-15 md:h-20 w-1 bg-[#E9C05F] rounded-tr-full"></div>


          </div>

          {/* Counters / Stats Section */}
          <div className="flex justify-end">
            <div className="w-full lg:w-3/4 xl:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">

              {/* 100% Transparency */}
              <div className="relative text-center p-4 rounded-lg ">
                <div className="absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#E9C05F]"></div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{transparency}%</div>
                <div className="font-light text-sm lg:text-base text-white/70">Transparency</div>
              </div>

              {/* 18+ Years Experience */}
              <div className="relative text-center p-4 rounded-lg ">
                <div className="absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#E9C05F]"></div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{experience}+</div>
                <div className="ffont-light text-sm lg:text-base text-white/70">Years Experience</div>
              </div>

              {/* 100+ Trusted Clients */}
              <div className="relative text-center p-4 rounded-lg ">
                <div className="absolute right-0 top-1/4 h-1/2 w-[2px] bg-[#E9C05F]"></div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{clients}+</div>
                <div className="font-light text-sm lg:text-base text-white/70">Trusted Clients</div>
              </div>

              {/* 10+ Staff */}
              <div className="relative text-center p-4 rounded-lg ">
                <div className="absolute right-0 top-1/4 h-1/2 w-[2px]  bg-[#E9C05F]"></div>

                <div className="text-3xl lg:text-4xl font-bold mb-2">{staff}+</div>
                <div className="font-light text-sm lg:text-base text-white/70">Professional Staff</div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
