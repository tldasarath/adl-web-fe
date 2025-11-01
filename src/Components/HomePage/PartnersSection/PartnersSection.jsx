"use client"
import React from 'react';
import Image from 'next/image';
import Container from '@/Components/Common/Container';

const PartnersSection = () => {
  const partners = [
    { id: 1, name: "Microsoft", logo: "/assets/images/partners/adafz.png" },
    { id: 2, name: "Google", logo: "/assets/images/partners/dhc.png" },
    { id: 3, name: "Amazon", logo: "/assets/images/partners/difc.png" },
    { id: 4, name: "Apple", logo: "/assets/images/partners/dmcc.png" },
    { id: 5, name: "Facebook", logo: "/assets/images/partners/hamriyan.png" },
    { id: 6, name: "Netflix", logo: "/assets/images/partners/jafza.png" },
    { id: 7, name: "Spotify", logo: "/assets/images/partners/adafz.png" },
    { id: 8, name: "Adobe", logo: "/assets/images/partners/adafz.png" }
  ];

  // Duplicate the partners array to create seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className=" relative py-8 md:py-14  overflow-hidden">
            <div className="absolute left-[80%] -top-10 -z-10">
  <img src="/assets/images/bg/bubble.png" alt="" className="relative w-[500px] h-[400px] object-contain" />
</div>
      <div className="">
        {/* Header Section */}
        <Container><div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold  mb-6">
            Our Trusted Partners
          </h2>
          <p className="text-lg  leading-relaxed">
            We collaborate with industry leaders and innovative companies worldwide 
            to deliver exceptional solutions and services to our clients.
          </p>
        </div>
</Container>
        {/* Logo Slider Container */}
        <div className="relative">
          {/* Gradient Overlays */}
      

          {/* Slider */}
          <div className="flex space-x-12 animate-slide">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 w-32 h-32 flex items-center justify-center glass rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
               
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={80}
                  className="object-contain   transition-opacity duration-300"
                />
               
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * ${partners.length}));
          }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;