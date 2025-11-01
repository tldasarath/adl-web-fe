import React from 'react';
import Container from './Container';
import MainButton from '../button/MainButton';

const InnerBanner = () => {
  return (
  <Container>
      <section 
      className=" flex items-center justify-center py-8 md:py-14 "
     
    >
      <div className=" rounded-4xl p-4" style={{
        backgroundImage: 'linear-gradient(180deg, rgba(73,85,111,1.00) 0%, rgba(13,19,37,1.00) 100%)',
        backgroundPosition: 'center center'
      }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="p-3">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Ready to Launch Your 
Business in Dubai
            </h3>
                    <p className="text-base md:text-lg  font-light leading-normal ">
             Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable.
            </p>
            
            {/* Mobile Center Button */}
            <div className="lg:hidden flex justify-center mt-8">
                       <MainButton text='Start Your Business Now'/>

            </div>
          </div>

          {/* Right Side - Button (Desktop) */}
          <div className="hidden lg:flex items-center justify-center">
            <MainButton text='Start Your Business Now'/>
          </div>
        </div>
      </div>
    </section>
  </Container>
  );
};

export default InnerBanner;