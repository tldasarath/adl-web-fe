'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from '../Common/Container';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(null);

  const pathname = usePathname();
  const glassRef = useRef(null);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: 'home', label: 'Home', path: '/' },
    { name: 'about', label: 'About', path: '/about-us' },
    { name: 'service', label: 'Service', path: '/services' },
    { name: 'freezone', label: 'Freezone', path: '/freezone' },
    { name: 'mainland', label: 'Mainland', path: '/mainland-company-formation-in-uae' },
    { name: 'visa', label: 'Visa', path: '/visa' },
    { name: 'license', label: 'License', path: '/license' },
    { name: 'gallery', label: 'Gallery', path: '/gallery' },
    { name: 'blog', label: 'Blog', path: '/blog' },
    { name: 'contact', label: 'Contact', path: '/contact' },
  ];

  const serviceItems = [
    'Business Setup',
    'Company Formation',
    'Golden Visa',
    'PRO Services',
    'Local Sponsorship',
    'Visa Services',
    'ISO Certification & Trademark Registration',
    'Virtual Office',
    'Company Liquidation',
    'Document Attestation',
    'Legal Translation',
    'Insurance & VAT Services',
    'Bank Account Opening',
    'Typing Services',
    'UAE Government Approvals',
    'Medical & Emirates ID Services',
    'FREEZONE',
    'Dubai Court Services',
    'Online MOA & POA Services',
  ];

  // detect active route
  useEffect(() => {
    const current = navItems.find((item) => item.path === pathname);
    if (current) setActiveSection(current.name);
  }, [pathname]);

  // match dropdown width to navbar glass div
  useEffect(() => {
    const updateWidth = () => {
      if (glassRef.current) setDropdownWidth(glassRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        glassRef.current &&
        !glassRef.current.contains(e.target)
      ) {
        setIsServiceOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className=" top-0 left-0 right-0 z-[1000] bg-transparent transition-all duration-500">
        <Container>
          <div
            ref={glassRef}
            className="flex glass-bg items-center justify-between px-6 py-2 rounded-3xl relative"
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/images/logos/logo.png"
                  alt="Logo"
                  width={130}
                  height={100}
                  className="rounded-lg w-24 sm:w-26 md:w-24 xl:w-32 h-auto"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex space-x-0">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.path}
                    onMouseEnter={() => item.name === 'service' && setIsServiceOpen(true)}
                    onClick={() => setActiveSection(item.name)}
                    className={`relative px-2 2xl:px-6 py-3 rounded-2xl 2xl:rounded-3xl font-normal transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      activeSection === item.name
                        ? 'glass-bg'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.name && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden switcher">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => {
                      setActiveSection(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === item.name
                        ? 'text-white bg-white/20 backdrop-blur-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </nav>

      {/* SERVICE DROPDOWN (below navbar) */}
      {isServiceOpen && (
        
        <div
          ref={dropdownRef}
          className="hidden lg:flex  justify-center absolute left-0 right-0 top-[95px] z-[9999]"
          onMouseEnter={() => setIsServiceOpen(true)}
          onMouseLeave={() => setIsServiceOpen(false)}
        >
          <div
            className="  glass-bg rounded-xl  overflow-hidden transition-all"
            style={{
              width: dropdownWidth ? `${dropdownWidth}px` : 'auto',
            }}
          >
            <div
              className="max-h-[230px] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
              style={{
                scrollbarWidth: 'thin', // Firefox
                scrollbarColor: 'rgba(255,255,255,0.3) transparent',
              }}
            >
              <style jsx>{`
                /* WebKit browsers (Chrome, Edge, Safari) */
                div::-webkit-scrollbar {
                  width: 4px;
                }
                div::-webkit-scrollbar-track {
                  background: transparent;
                }
                div::-webkit-scrollbar-thumb {
                  background-color: rgba(255, 255, 255, 0.3);
                  border-radius: 10px;
                }
              `}</style>

              <div className="grid grid-cols-4 gap-4 text-white items-center text-sm">
                {serviceItems.map((service, i) => (
                  <div
                    key={i}
                    className="glass-bg rounded-2xl w-[250px] p-3 text-center transition-all cursor-pointer"
                  >
                   <p className='font-normal text-white z-10'>{service}</p> 
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
