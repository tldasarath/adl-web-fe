'use client';
import Container from '@/Components/Common/Container';
import { values } from '@/Datas/values';
import { motion } from 'framer-motion';
import Image from 'next/image';



export default function ValuesSection() {
  return (
    <section className="relative  py-8 md:py-14 flex flex-col items-start overflow-hidden">
             <div className="absolute left-[-10px] bottom-0  pointer-events-none select-none ">
         <Image
           src="/assets/images/bg/squares2.png"
           alt="Decorative shapes"
           width={240}
           height={320}
           className="object-contain md:w-60 w-36"
         />
       </div>
      {/* Header */}
      <Container>
        <div className="mb-12">
          <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
            Our Values Define Us
          </h2>
          <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Gorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>

        {/* Circular container */}
        <div className="relative w-full flex flex-col items-center p-0 md:p-20 justify-center">
          <div className="hidden md:flex relative w-[540px] h-[540px] items-center justify-center">
            {/* Center Logo */}
            <div className="absolute z-10">
              <Image
                src="/assets/images/logos/logo.png"
                alt="Company Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            {/* Value leaves */}
            {values.map((value, i) => {
              const angle = (i * 360) / values.length;
              const radius = 235;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              // Movement distance on hover
              const hoverDistance = 30;
              const hoverX = Math.cos((angle * Math.PI) / 180) * (radius + hoverDistance);
              const hoverY = Math.sin((angle * Math.PI) / 180) * (radius + hoverDistance);

              return (
                <motion.div
                  key={i}
                  initial={{
                    x,
                    y,
                    rotate: angle - 90,
                    borderColor: 'rgba(107, 114, 128, 0.5)', // Tailwind's border-gray-700/50
                  }}
                  whileHover={{
                    x: hoverX,
                    y: hoverY,
                    borderColor: '#E9C05F', // Tailwind's yellow-400
                    transition: {
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      borderColor: { duration: 0.3 }, // smooth border color transition
                    },
                  }}
                  className="absolute w-56 h-42 glass-bg
                 text-center px-4 py-3 flex flex-col justify-start items-center
                 border-2 shadow-md rounded-2xl"
                  style={{
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                  }}
                >
                  <div
                    className="flex flex-col items-center justify-center p-2"
                    style={{ transform: `rotate(-${angle + 270}deg)` }}
                  >
                    <h3 className="text-yellow-400 font-semibold text-sm mb-1 leading-tight">
                      {value.title}
                    </h3>
                    <p className="text-[14px] p-2 leading-normal max-w-[130px]">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}


          </div>

          {/* Mobile stacked layout */}
          <div className="flex flex-col md:hidden space-y-4 w-full mt-6 ">
            {values.map((value, i) => (
              <div
                key={i}
                className="glass-button rounded-2xl p-4 w-full 
                         border border-gray-700/50 shadow-md flex-col   "
              >
                <h3 className="text-[#E9C05F] font-semibold mb-1">{value.title}</h3>
                <p className="text-sm text-gray-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
