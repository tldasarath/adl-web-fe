"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/Components/Common/Container";
import MainButton from "@/Components/button/MainButton";

const VisaTypesSection = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [autoFlipDone, setAutoFlipDone] = useState(false);
  const sectionRef = useRef(null);

  const visaTypes = [
    {
      id: 1,
      name: "Golden Visa",
      image: "/assets/images/visas/golden-visa.png",
      description:
        "Long-term residency for investors, entrepreneurs, highly skilled professionals & outstanding talent.",
    },
    {
      id: 2,
      name: "Green Visa",
      image: "/assets/images/visas/green-visa.png",
      description:
        "5-year residency for freelancers, skilled professionals, and investors — no sponsor required.",
    },
    {
      id: 3,
      name: "Employment Visa",
      image: "/assets/images/visas/employment-visa.png",
      description:
        "Work legally in the UAE with fast, company-sponsored employment visa processing.",
    },
    {
      id: 4,
      name: "Family Visa",
      image: "/assets/images/visas/family-visa.png",
      description:
        "Bring your family to the UAE with complete support for spouse, child & parent residency visas.",
    },
    {
      id: 5,
      name: "Investor Visa",
      image: "/assets/images/visas/investor-visa.png",
      description:
        "Secure your UAE residency by investing in a business or establishing a new company.",
    },
  ];

  // Handle card click (for mobile)
  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  // Auto-flip first card when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoFlipDone) {
          setFlippedCard(visaTypes[0].id);
          setAutoFlipDone(true);

          // revert back after 2s
          setTimeout(() => {
            setFlippedCard(null);
          }, 2000);
        }
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [autoFlipDone]);

  return (
    <section ref={sectionRef} className="py-8 md:py-14">
      <div>
        {/* Header Section */}
        <Container>
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
              Types of Visa
            </h2>
            <p className="text-base lg:text-lg mb-8 font-light leading-normal">
              Explore our comprehensive visa services tailored to meet your
              specific travel needs. Whether you're traveling for leisure,
              business, education, or to reunite with family, we've got you
              covered with expert guidance.
            </p>
          </div>
        </Container>

        {/* Visa Types Grid */}
        <div className="px-5 md:px-15">
          <div className="relative glass-bg flex flex-col items-center justify-center py-16 rounded-3xl overflow-hidden">
            <Container>
              <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-10 mb-12 mt-8">
                {/* Left Decorative Lines */}
                <div className="absolute -top-10 left-0 w-24 md:w-[124px] h-10 border-b-6 border-r-6 border-[#E9C05F] rounded-br-full rotate-180"></div>
                <div className="absolute left-0 top-0 h-16 md:h-[100px] w-1.5 bg-[#E9C05F] rotate-180"></div>

                {/* Right Decorative Lines */}
                <div className="absolute -bottom-10 -right-1 md:-right-4 w-24 md:w-[124px] h-10 border-b-6 border-r-6 border-[#E9C05F] rounded-br-full"></div>
                <div className="absolute -right-1 md:-right-4 bottom-0 h-16 md:h-[100px] w-1.5 bg-[#E9C05F]"></div>

                {visaTypes.map((visa) => (
                  <div
                    key={visa.id}
                    onClick={() => handleCardClick(visa.id)} // allow flip on click
                    className="group md:w-[200px] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden perspective-[1000px] cursor-pointer"
                  >
                    <div
                      className={`relative w-full h-[180px] sm:h-56 transition-transform duration-700 transform-style-preserve-3d 
                        ${
                          flippedCard === visa.id
                            ? "rotate-y-180"
                            : "group-hover:rotate-y-180"
                        }`}
                    >
                      {/* Front Side */}
                      <div className="absolute inset-0 backface-hidden">
                        <Image
                          src={visa.image}
                          alt={visa.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Back Side */}
                      <div className="absolute inset-0 glass-bg rounded-xl w-full text-white flex flex-col items-center justify-center text-center px-3 rotate-y-180 backface-hidden">
                        <h3 className="font-semibold text-lg mb-2">
                          {visa.name}
                        </h3>
                        <p className="text-sm">{visa.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>

            {/* CTA Button */}
            {/* <div className="flex justify-center mb-4">
              <MainButton />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaTypesSection;
