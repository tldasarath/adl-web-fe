"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../Common/Container";
import { ArrowUpRight } from "lucide-react";

const  BusinessJourney = ({
  heading,
  imageSrc,
  paragraph1,
  paragraph2,
  button1Text,
  button2Text,
  button1Url,
  button2Url,
}) => {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [imageWidth, setImageWidth] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    const imageContainer = imageContainerRef.current;

    if (!section || !textContainer || !imageContainer) return;

    if (!isLargeScreen) {
      setScrollOffset(0);
      setImageWidth(100);
      setIsFullscreen(false);
      return;
    }

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const textRect = textContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const isSectionInView =
        sectionRect.top < windowHeight && sectionRect.bottom > 0;

      if (!isSectionInView) {
        if (sectionRect.top > windowHeight) {
          setScrollOffset(0);
          setImageWidth(100);
          setIsFullscreen(false);
        }
        return;
      }

      const textTop = textRect.top;
      const textBottom = textRect.bottom;
      const textHeight = textRect.height;

      const threshold = 100;
      const isTextAtEnd = textBottom <= windowHeight + threshold;

      const maxMovement = Math.min(textHeight * 0.5, windowHeight * 0.6);
      const maxWidth = 120;
      const minWidth = 80;

      if (isTextAtEnd) {
        setIsFullscreen(true);
        setScrollOffset(maxMovement);
        setImageWidth(100);
        return;
      } else {
        setIsFullscreen(false);
      }

      const textStartPosition = windowHeight;
      const scrolledDistance = Math.max(0, textStartPosition - textTop);
      const scrollProgress = Math.max(
        0,
        Math.min(1, scrolledDistance / (textHeight * 1.2))
      );

      const movement = scrollProgress * maxMovement;
      const width = minWidth + scrollProgress * (maxWidth - minWidth);

      setScrollOffset(movement);
      setImageWidth(width);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLargeScreen]);

  return (
    <section ref={sectionRef} className="py-8 md:py-14">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side */}
          <div className="flex flex-col justify-start">
            <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
              {heading}
            </h2>

            <div
              ref={imageContainerRef}
              className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden"
              style={{
                transform: `translateY(${scrollOffset}px) scaleX(${
                  imageWidth / 100
                })`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <Image
                src={imageSrc}
                alt="Business Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Side */}
          <div
            ref={textContainerRef}
            className="space-y-8 flex flex-col items-center mt-2 lg:mt-50 w-full"
          >
            <p className="text-base md:text-xl max-w-sm">{paragraph1}</p>

            <p className="text-base md:text-xl max-w-sm">{paragraph2}</p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center w-full gap-8 pt-4">
              
              {/* Button 1 */}
              <Link href={button1Url} className="w-1/2 md:w-40">
                <button className="group flex items-center justify-center gap-2 px-0 py-4 text-white font-medium transition-all duration-300  hover:translate-x-1 w-full">
                  {button1Text}
                  <ArrowUpRight className="w-11 h-9 text-[#E9C05F] border border-[#E9C05F] rounded-full  border-2 hover:translate-x-1 group-hover:text-white group-hover:bg-[#E9C05F] group-hover:translate-x-1" />
                </button>
              </Link>

              {/* Button 2 */}
            <Link href={button2Url} className="w-1/2 md:w-50">
  <button className="group flex items-center justify-center gap-0 px-2 md:px-6 py-3 glass-bg rounded-3xl text-white font-medium transition-all duration-300 hover:translate-x-1 w-full">
    {button2Text}
    <ArrowUpRight 
      className="w-11 h-9 text-[#E9C05F] border border-[#E9C05F] rounded-full border-2 transition-all duration-300
                 group-hover:text-white group-hover:bg-[#E9C05F] group-hover:translate-x-1"
    />
  </button>
</Link>


            </div>  
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BusinessJourney;
