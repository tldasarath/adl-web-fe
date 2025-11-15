"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Maximize2 } from 'lucide-react';

const CollageImage = ({ image, index, delay, pattern }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const imageVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        delay: delay * 0.06,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
  };

  const getPatternClass = (pattern) => {
    const patterns = {
      lg: 'col-span-2 row-span-2',
      md: 'col-span-1 row-span-2 md:col-span-2 md:row-span-1',
      sm: 'col-span-1 row-span-1',
      tall: 'col-span-1 row-span-3 md:row-span-2',
      wide: 'col-span-2 row-span-1',
    };
    return patterns[pattern] || patterns.sm;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={imageVariants}
      whileHover="hover"
      className={`${getPatternClass(pattern)} relative overflow-hidden rounded-3xl group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        variants={hoverVariants}
        className="relative w-full h-full"
      >
        <img
          src={image}
          alt={`Gallery ${index}`}
          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-end justify-between p-4 md:p-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isHovered ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
          >
            <Maximize2 size={20} className="text-white" />
          </motion.div>
          
          <div className="text-white">
            <p className="text-xs md:text-sm font-semibold opacity-90">Image {index + 1}</p>
            <p className="text-xs opacity-70">Gallery Collection</p>
          </div>
        </motion.div>

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-3xl border-2 border-white/10 group-hover:border-white/30 transition-colors duration-300" />
      </motion.div>
    </motion.div>
  );
};

const SectionDivider = ({ delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scaleX: 0 },
        visible: {
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.8, delay },
        },
      }}
      className="flex items-center gap-4 my-16 md:my-20"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <ChevronRight className="text-purple-400" size={24} />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-purple-500 to-transparent" />
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="mb-12 md:mb-16"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay },
          },
        }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white mb-3"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: delay + 0.1 },
          },
        }}
        className="text-gray-400 text-sm md:text-base max-w-2xl"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default function GalleryCollage() {
  const images = Array.from({ length: 30 }, (_, i) =>
    `https://images.unsplash.com/photo-${1500000000 + i}?w=600&h=600&fit=crop`
  ).map((_, i) => `https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop&t=${i}`);

  const patterns1 = ['lg', 'sm', 'sm', 'md', 'sm', 'tall', 'sm', 'sm', 'wide'];
  const patterns2 = ['wide', 'sm', 'tall', 'sm', 'md', 'sm', 'lg', 'sm', 'sm'];
  const patterns3 = ['md', 'sm', 'sm', 'wide', 'sm', 'sm', 'tall', 'md', 'sm'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 md:px-6 lg:px-8 py-16 md:py-20">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm text-purple-300 font-medium">
              ✨ Creative Gallery Collection
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white mb-4"
          >
            Gallery Collage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Explore our stunning collection of images arranged in creative patterns with smooth animations and interactive hover effects
          </motion.p>
        </motion.div>

        {/* Collection 1 */}
        <SectionTitle
          title="Featured Collection"
          subtitle="Handpicked images showcasing our best work and creative vision"
          delay={0.1}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 auto-rows-max">
          {images.slice(0, 9).map((image, index) => (
            <CollageImage
              key={index}
              image={image}
              index={index}
              delay={index}
              pattern={patterns1[index]}
            />
          ))}
        </div>

        <SectionDivider delay={0.3} />

        {/* Collection 2 */}
        <SectionTitle
          title="Premium Selection"
          subtitle="Curated moments and professional photography from our archive"
          delay={0.1}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 auto-rows-max">
          {images.slice(9, 18).map((image, index) => (
            <CollageImage
              key={index + 9}
              image={image}
              index={index + 9}
              delay={index}
              pattern={patterns2[index]}
            />
          ))}
        </div>

        <SectionDivider delay={0.3} />

        {/* Collection 3 */}
        <SectionTitle
          title="Latest Moments"
          subtitle="Fresh and inspiring imagery from our most recent projects"
          delay={0.1}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-max">
          {images.slice(18, 27).map((image, index) => (
            <CollageImage
              key={index + 18}
              image={image}
              index={index + 18}
              delay={index}
              pattern={patterns3[index]}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: '-100px' }}
          className="mt-20 md:mt-32 text-center"
        >
          <button className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105">
            View More Gallery
          </button>
        </motion.div>
      </div>
    </div>
  );
}