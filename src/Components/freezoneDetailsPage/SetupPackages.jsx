"use client";

import { motion } from "framer-motion";
import { Monitor, Building2, Warehouse, Briefcase } from "lucide-react"; // icon examples
import Container from "../Common/Container";

export default function SetupPackages({
  title = "Setup Cost & Packages",
  note = "Prices are indicative; final cost depends on business activity & visa requirements.",
  packages = [
    {
      id: 1,
      name: "Flexi Desk Package",
      items: ["License", "flexi-desk office"],
      price: "AED 11,500",
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
    },
    {
      id: 2,
      name: "Small Office Package",
      items: ["License", "serviced office"],
      price: "AED 17,500",
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
    },
    {
      id: 3,
      name: "Warehouse / Industrial",
      items: ["License", "warehouse unit"],
      price: "AED 35,000",
      icon: <Warehouse className="w-6 h-6 text-blue-400" />,
    },
    {
      id: 4,
      name: "Premium Package",
      items: ["License", "executive office", "visas"],
      price: "AED 45,000",
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
    },
  ],
}) {
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="setup-packages"
      className="relative py-16 md:py-24 bg-[linear-gradient(90deg,rgba(20,25,45,1)_0%,rgba(10,14,29,1)_48%)] text-white"
    >
      <Container>
        {/* Header */}
        <motion.div
          className="text-center md:text-left mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariant}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            {title}
          </h2>
          <p className="text-slate-400 max-w-2xl">{note}</p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={containerVariant}
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              variants={cardVariant}
              whileHover="hover"
              className="relative bg-[#1b2238]/60 border border-[#2b3a5b] rounded-2xl p-6 flex flex-col justify-between shadow-lg backdrop-blur-sm transition"
            >
              {/* Golden corner lines */}
              <div className="absolute top-0 left-0 w-10 h-[2px] bg-yellow-500 rounded-tr-xl"></div>
              <div className="absolute top-0 right-0 w-10 h-[2px] bg-yellow-500 rounded-tl-xl"></div>

              {/* Icon */}
              <div className="flex items-center justify-center mb-5">
                <div className="bg-[#222c4d] w-12 h-12 flex items-center justify-center rounded-full shadow-inner border border-[#2b3a5b]">
                  {pkg.icon}
                </div>
              </div>

              {/* Package Content */}
              <h3 className="text-lg md:text-xl font-semibold text-center mb-3">
                {pkg.name}
              </h3>

              <ul className="text-slate-300 text-sm md:text-base mb-6 space-y-1">
                {pkg.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center gap-2 text-center"
                  >
                    <span className="text-yellow-400">↠</span> {item}
                  </li>
                ))}
              </ul>

              {/* Price Tag */}
              <div className="flex justify-center">
                <span className="bg-[#2d3a5f]/60 border border-[#3c4f77] text-white text-sm md:text-base font-medium rounded-lg px-4 py-2 shadow-sm">
                  {pkg.price}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
