import React from 'react';
import Image from 'next/image';
import Container from '@/Components/Common/Container';
import MainButton from '@/Components/button/MainButton';

const VisaTypesSection = () => {
  const visaTypes = [
    {
      id: 1,
      name: "Golden Visa",
      image: "/assets/images/visas/golden-visa.png",
      description: "Perfect for vacation and sightseeing"
    },
    {
      id: 2,
      name: "Green Visa",
      image: "/assets/images/visas/green-visa.png",
      description: "For business meetings and conferences"
    },
    {
      id: 3,
      name: "Employment Visa",
      image: "/assets/images/visas/employment-visa.png",
      description: "Study abroad opportunities"
    },
    {
      id: 4,
      name: "Family Visa",
      image: "/assets/images/visas/family-visa.png",
      description: "Employment and career opportunities"
    },
    {
      id: 5,
      name: "Investor Visa",
      image: "/assets/images/visas/investor-visa.png",
      description: "Reunite with family members"
    }
  ];

  return (
    <section className="py-16 ">
      <div className=" ">
        {/* Header Section */}
       <Container>
         <div className=" max-w-3xl mb-16">
                         <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white ">

            Types of Visa
          </h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Explore our comprehensive visa services tailored to meet your specific travel needs. 
            Whether you're traveling for leisure, business, education, or to reunite with family, 
            we've got you covered with expert guidance.
          </p>
        </div>
       </Container>

        {/* Visa Types Grid */}
    <div className="relative glass flex flex-col items-center justify-center py-16  mx-3 rounded-3xl overflow-hidden">

  {/* Decorative shapes — Left Side (Rotated / Mirrored) */}


 <Container>
  {/* Card Grid */}
  <div className="relative max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-10 mb-12 mt-8">
    
 <div className="absolute -top-10 left-0 w-24 md:w-[124px] h-10 border-b-6 border-r-6 border-[#E9C05F] rounded-br-full rotate-180"></div>
  <div className="absolute left-0 top-0 h-16 md:h-[100px] w-1.5 bg-[#E9C05F]  rotate-180"></div>

  {/* Decorative shapes — Right Side */}
  <div className="absolute -bottom-10 -right-1 md:-right-4 w-24 md:w-[124px] h-10 border-b-6 border-r-6 border-[#E9C05F] rounded-br-full"></div>
  <div className="absolute -right-1 md:-right-4  bottom-0 h-16 md:h-[100px] w-1.5 bg-[#E9C05F] "></div>

    {visaTypes.map((visa) => (
      <div 
        key={visa.id}
        className="group md:w-[220px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
      >
        {/* Image Container */}
        <div className="relative h-[220px] sm:h-56 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <Image 
              src={visa.image} 
              alt={visa.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Card Content */}
        
      </div>
    ))}
  </div>
 </Container>

  {/* CTA Button */}
  <div className="flex justify-center mb-4">
    <MainButton />
  </div>

</div>

      </div>
    </section>
  );
};

export default VisaTypesSection;