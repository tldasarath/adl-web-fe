import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { businessServices } from '@/Datas/services';
import React from 'react';

const BusinessServices = () => {

  return (
    <section className=" relative h-auto xl:h-[900px]  py-8 md:py-14 w-full ">


      {/* <div className="absolute left-[80%] -top-30 -z-10">
        <img src="/assets/images/bg/bubble.png" alt="" className="relative w-[500px] h-[400px] object-contain" />
      </div> */}
      <Container>
        <div className="">
          <div className="grid grid-cols-1 gap-12">
            {/* Left Side - Heading and Description */}
            <div className="flex flex-col justify-center">
              <div className='w-full md:w-2/3'>
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white ">
                  Instant Solutions for All Business Needs
                </h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
                  ADL provides end-to-end business setup services in the UAE, offering tailored solutions
                  to help you establish and grow your company seamlessly. From legal documentation to
                  government approvals — we handle it all so you can focus on your business success.


                </p>
              </div>
            </div>

            {/* Right Side - Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessServices.map((service) => (
                <div
                  key={service.id}
                  className=" rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
                >
                  <h3 className="text-lg md:text-xl font-light  mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="justify-center bottom-30 w-full flex gap-2 mt-8">
            <SecondaryButton text="More Services" url={"/services"} />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default BusinessServices;