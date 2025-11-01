"use client";
import { service } from "@/Datas/services";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Container from "../Common/Container";

const Services = () => {
    const slider1Ref = useRef(null);
    const slider2Ref = useRef(null);
    const animationRef1 = useRef(null);
    const animationRef2 = useRef(null);
    const paused1 = useRef(false);
    const paused2 = useRef(false);



    const firstSliderServices = service.slice(0, 9);
    const secondSliderServices = service.slice(9);
    const duplicatedFirst = [...firstSliderServices, ...firstSliderServices];
    const duplicatedSecond = [...secondSliderServices, ...secondSliderServices];

    // Animation functions
    const animateSlider1 = () => {
        const slider = slider1Ref.current;
        if (!slider || paused1.current) return;
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth / 2) slider.scrollLeft = 0;
        animationRef1.current = requestAnimationFrame(animateSlider1);
    };

    const animateSlider2 = () => {
        const slider = slider2Ref.current;
        if (!slider || paused2.current) return;
        slider.scrollLeft -= 1;
        if (slider.scrollLeft <= 0) slider.scrollLeft = slider.scrollWidth / 2;
        animationRef2.current = requestAnimationFrame(animateSlider2);
    };

    useEffect(() => {
        animationRef1.current = requestAnimationFrame(animateSlider1);
        animationRef2.current = requestAnimationFrame(animateSlider2);

        return () => {
            cancelAnimationFrame(animationRef1.current);
            cancelAnimationFrame(animationRef2.current);
        };
    }, []);

    const handleMouseEnter = (sliderNumber) => {
        if (sliderNumber === 1) {
            paused1.current = true;
            cancelAnimationFrame(animationRef1.current);
        } else {
            paused2.current = true;
            cancelAnimationFrame(animationRef2.current);
        }
    };

    const handleMouseLeave = (sliderNumber) => {
        if (sliderNumber === 1) {
            paused1.current = false;
            animationRef1.current = requestAnimationFrame(animateSlider1);
        } else {
            paused2.current = false;
            animationRef2.current = requestAnimationFrame(animateSlider2);
        }
    };

    return (
        <div className="min-h-screen py-8 md:py-14">
            <div className="w-full">
                {/* Heading Section */}
             <Container>
                   <div className=" mb-16">
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold  ">
                        Our Services
                    </h2>
              <div className=" flex justify-end">
                  <p className="text-base lg:text-lg mb-8 max-w-lg font-light leading-normal">
                        Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>
              </div>
                </div>
             </Container>

                {/* First Slider */}
                <div className="mb-16 relative overflow-hidden">
                    <div
                        ref={slider1Ref}
                        className="flex space-x-6 py-4 overflow-x-hidden"
                        style={{ scrollBehavior: "auto" }}
                    >
                        {duplicatedFirst.map((service, index) => (
                            <div
                                key={`slider1-${service.id}-${index}`}
                                onMouseEnter={() => handleMouseEnter(1)}
                                onMouseLeave={() => handleMouseLeave(1)}
                                className="flex-shrink-0 w-80 h-96 rounded-xl shadow-lg p-6 
                  hover:shadow-2xl hover:scale-105 transition-transform duration-300 
                  glass backdrop-blur-md border border-transparent hover:border-blue-400"
                            >
                                <div className="flex flex-col h-full">
                                    <Image
                                        src={service.logo}
                                        alt={service.title}
                                        width={64}
                                        height={64}
                                        className="mb-4 h-20 w-20 object-contain"
                                    />
                                    <h3 className="text-xl font-semibold mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="flex-grow">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

                {/* Second Slider */}
                <div className="relative overflow-hidden">
                    <div
                        ref={slider2Ref}
                        className="flex space-x-6 py-4 overflow-x-hidden"
                        style={{ scrollBehavior: "auto" }}
                    >
                        {duplicatedSecond.map((service, index) => (
                            <div
                                key={`slider2-${service.id}-${index}`}
                                onMouseEnter={() => handleMouseEnter(2)}
                                onMouseLeave={() => handleMouseLeave(2)}
                                className="flex-shrink-0 w-80 h-96 rounded-xl shadow-lg p-6 
                  hover:shadow-2xl hover:scale-105 transition-transform duration-300 
                  glass backdrop-blur-md border border-transparent hover:border-blue-400"
                            >
                                <div className="flex flex-col h-full">
                                    <Image
                                        src={service.logo}
                                        alt={service.title}
                                        width={64}
                                        height={64}
                                        className="mb-4 h-20 w-20 object-contain"
                                    />
                                    <h3 className="text-xl font-semibold mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="flex-grow">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient edges */}
                    {/* <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div> */}
                </div>
            </div>
        </div>
    );
};

export default Services;
