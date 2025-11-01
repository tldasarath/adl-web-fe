'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const values = [
  { title: 'Integrity', desc: 'Fair, honest, transparent, ethical, and legitimate.' },
  { title: 'Trust', desc: 'Build collaborative relationships based on trust.' },
  { title: 'Innovation', desc: 'Creativity and new technologies for smart solutions.' },
  { title: 'Collaboration', desc: 'Fostering unity and teamwork for growth.' },
  { title: 'Accountability', desc: 'Transparent, dependable, and measurable responsibility.' },
  { title: 'Sustainability', desc: 'Environmentally responsible and future-oriented decisions.' },
  { title: 'Commitment', desc: 'Dedication to promises and long-term partnerships.' },
  { title: 'Excellence', desc: 'Continuous improvement and outstanding performance.' },
];

export default function ValuesSection() {
  return (
    <section className="relative  text-white py-20 flex flex-col items-center overflow-hidden">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        Our Values Define Us
      </h2>
      <p className="text-gray-400 mb-12 text-center max-w-xl">
        Gorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>

      {/* Container */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
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

        {/* Leaf Items */}
        {values.map((value, i) => {
  const angle = (i * 360) / values.length;
  const radius = 180;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
             <motion.div
      key={i}
      initial={{ x, y }}
      whileHover={{
        x: x * 1.15,
        y: y * 1.15,
        scale: 1.05,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
      className="absolute w-44 h-32 bg-gradient-to-br from-[#2b2f45] to-[#1a1e32]
                 text-center p-4 flex flex-col justify-center items-center
                 border border-gray-700/50 shadow-lg hover:shadow-yellow-400/30
                 hover:border-yellow-400 transition-all duration-300"
      style={{
        // Rotate each trapezoid so its top points inward
        transform: `translate(${x}px, ${y}px) rotate(${angle + 180}deg)`,
        // Inverted trapezoid: wide top, narrow bottom (so after rotation it's top-inward)
        clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
        borderRadius: '14px',
      }}
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{ transform: `rotate(-${angle + 180}deg)` }} // keep text upright
      >
        <h3 className="text-yellow-400 font-semibold mb-1">{value.title}</h3>
        <p className="text-xs text-gray-300 leading-snug">{value.desc}</p>
      </div>
    </motion.div>
          );
        })}
      </div>
    </section>
  );
}