'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../Common/Container';

export default function CommercialLicenseSection() {
  // Default active tab
  const [activeTab, setActiveTab] = useState('business');

  const businessActivities = [
    'General Trading',
    'Retail & Wholesale Trading',
    'Import & Export Services',
    'E-Commerce & Marketplace Selling',
    'Real Estate Brokerage',
    'Foods & Beverage Trading',
    'Cars & Auto Spare Parts Trading',
    'Electronics Trading',
  ];

  const benefits = [
    '100% foreign ownership eligibility',
    'Low tax structure (0% corporate tax for many Free Zone companies)',
    'Access to global logistics hubs — Ports, Airports, Freezones',
    'Ability to sponsor employees and dependents',
    'Open corporate bank accounts',
    'Global market expansion opportunities',
  ];

  // Choose which list to show
  const listToShow = activeTab === 'business' ? businessActivities : benefits;

  // Animation variant
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
   <section className='py-8 md:py-16'>
     <Container>
      <div className="flex flex-col md:flex-row justify-between items-stretch glass-bg bg-white/5 rounded-2xl p-6 md:p-8 w-full max-w-5xl mx-auto shadow-lg border border-white/10 transition-all duration-300">
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        variants={textVariant}
        className="flex flex-col items-center justify-center gap-6 w-full md:w-1/3"
      >
        {/* Button 1 */}
        <button
          onClick={() => setActiveTab('business')}
          className={`px-5 py-3 text-center rounded-xl border border-white/20 transition-all duration-300 w-[230px] ${
            activeTab === 'business'
              ? 'glass-bg text-white font-medium'
              : 'text-white bg-white/10 hover:bg-white/20'
          }`}
        >
          Types of Commercial <br /> Business Activities
        </button>

        {/* Button 2 */}
        <button
          onClick={() => setActiveTab('benefits')}
          className={`px-5 py-3 text-center rounded-xl border border-white/20 transition-all duration-300 w-[230px] ${
            activeTab === 'benefits'
              ? 'glass-bg text-white font-medium'
              : 'text-white bg-white/10 hover:bg-white/20'
          }`}
        >
          Benefits of UAE <br /> Commercial License
        </button>
      </motion.div>

      {/* RIGHT SIDE LIST */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        variants={textVariant}
        className="flex flex-col justify-center w-full md:w-2/3 mt-8 md:mt-0"
      >
        <div className="flex flex-col divide-y divide-[#376CBC]">
          {listToShow.map((item, index) => (
            <motion.div
              key={index}
              variants={textVariant}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="py-3 text-white text-sm md:text-base text-center hover:text-yellow-400 transition-colors duration-200"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </Container>
   </section>
  );
}
