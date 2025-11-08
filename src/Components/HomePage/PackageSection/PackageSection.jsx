import React from 'react';
import Image from 'next/image';
import Container from '@/Components/Common/Container';
import MainButton from '@/Components/button/MainButton';
import { packages } from '@/Datas/packages';

const PackageSection = () => {
 
  return (
    <section className=" relative   py-8 md:py-14 ">
         <div className="absolute left-[-10%] md:left-[-10px]  -z-10 bottom-0 pointer-events-none select-none">
                        <Image
                            src="/assets/images/bg/square4.png"
                            alt="Decorative shapes"
                            width={240}
                            height={320}
                            className="object-contain  md:w-40 w-30"
                        />
                    </div>
                      <div className="absolute overflow-hidden right-0 top-0 pointer-events-none select-none  -z-10">
                        <Image
                          src="/assets/images/bg/square3.png"
                          alt="Decorative shapes"
                          width={240}
                          height={320}
                          className="object-contain md:w-40 w-30"
                        />
                      </div>
   <Container>
       <div className="">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white ">
            Our Pricing Packages
          </h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Choose the perfect package for your business needs. All packages include 
            high-quality development and dedicated support to ensure your success.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className="glass rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Side - Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg  flex items-center justify-center">
                      {/* Replace with actual image */}
                     
                      <Image 
                        src={pkg.image} 
                        alt={pkg.title}
                        width={96}
                        height={96}
                        className="rounded-lg object-cover"
                      />
                     
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex-1">
                    {/* Heading */}
                    <h3 className="text-xl md:text-2xl font-semibold  mb-3">
                      {pkg.title}
                    </h3>

                    {/* Description */}
                    <p className=" md:text-base text-sm font-light mb-4 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Underline */}
                    <div className="w-full h-1 bg-white mb-4"></div>

                    {/* Key Points */}
                    <ul className="space-y-2 mb-6">
                      {pkg.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <svg 
                            className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                          <span className="">{point}</span>
                        </li>
                      ))}
                    </ul>

                   
                   
                  </div>
                </div>

                {/* CTA Button */}
                <div className='flex justify-center'>
                    <button className="w-1/2  mt-6 glass rounded-4xl text-white font-semibold py-3 px-6  transition-colors duration-300">
                 AED {pkg.price}
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
                            <div className="justify-center bottom-30 w-full flex gap-2 mt-8">

        <MainButton text='View more'/>
        </div>
      </div> 
   </Container>
    </section>
  );
};

export default PackageSection;