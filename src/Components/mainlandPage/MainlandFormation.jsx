'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const services = [
  { key: 'activity', title: 'Business activity &\nlegal structure consultation', icon: '/icons/activity.svg' },
  { key: 'trade', title: 'Trade name reservation &\ninitial approval', icon: '/icons/trade.svg' },
  { key: 'moa', title: 'MOA / LSA\npreparation & approvals', icon: '/icons/moa.svg' },
  { key: 'econ', title: 'Economic Department\nlicense issuance', icon: '/icons/econ.svg' },
  { key: 'office', title: 'Office space / Ejari /\nvirtual office assistance', icon: '/icons/office.svg' },
  { key: 'visa', title: 'Investor & employee\nvisa process', icon: '/icons/visa.svg' },
  { key: 'bank', title: 'Corporate bank\naccount opening', icon: '/icons/bank.svg' },
  { key: 'pro', title: 'PRO & document\nclearing services', icon: '/icons/pro.svg' }
]

const itemVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1 }
}

export default function MainlandFormationCard () {
  return (
    <section className="relative overflow-visible py-16 lg:py-28 bg-[linear-gradient(90deg,#252a3a_0%,#0a0f1a_48%)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* CENTERED TRANSPARENT CARD */}
        <div className="relative mx-auto w-full max-w-[1200px]">
          {/* inner card: transparent background, still allows backdrop blur if you want */}
          <div className="relative inner-card rounded-2xl bg-transparent backdrop-blur-sm p-6 md:p-10 lg:p-14">
            {/* --- Corner SVGs attached to the card (positioned inside the relative card) --- */}
            {/* Top-left */}
            <svg
              className="pointer-events-none absolute -left-6 -bottom-6 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40"
              viewBox="0 0 200 140"
              fill="none"
              aria-hidden
            >
              <path d="M18 20 v36 a18 18 0 0 0 18 18 h80" stroke="#F4B93B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Top-right */}
            <svg
              className="pointer-events-none absolute -right-6 -top-6 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40 rotate-90"
              viewBox="0 0 200 140"
              fill="none"
              aria-hidden
            >
              <path d="M18 20 v36 a18 18 0 0 0 18 18 h80" stroke="#F4B93B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Bottom-left */}
            <svg
              className="pointer-events-none absolute -left-6 -bottom-6 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40 -rotate-90"
              viewBox="0 0 200 140"
              fill="none"
              aria-hidden
            >
              <path d="M18 20 v36 a18 18 0 0 0 18 18 h80" stroke="#F4B93B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Bottom-right */}
            <svg
              className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-28 sm:w-44 sm:h-32 md:w-56 md:h-40 rotate-180"
              viewBox="0 0 200 140"
              fill="none"
              aria-hidden
            >
              <path d="M18 20 v36 a18 18 0 0 0 18 18 h80" stroke="#F4B93B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* ---------- Card CONTENT ---------- */}
            <motion.h2
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-white text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12"
            >
              Mainland Formation Solutions
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 items-start">
              {services.map((s, idx) => (
                <motion.div
                  key={s.key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={itemVariant}
                  transition={{ duration: 0.55, delay: idx * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="flex flex-col items-center text-center px-3 md:px-4"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/6 border border-white/8 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    {s.icon ? (
                      <Image
                        src={s.icon}
                        alt={s.key}
                        width={36}
                        height={36}
                        sizes="(max-width: 640px) 36px, (max-width: 1024px) 40px, 48px"
                        className="object-contain"
                      />
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-80">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                        <path d="M8 12h8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>

                  <div className="mt-4 text-slate-200 text-[13px] md:text-sm leading-snug max-w-[220px]">
                    {s.title.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* ---------- end content ---------- */}
          </div>
        </div>
      </div>
    </section>
  )
}
