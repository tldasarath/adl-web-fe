'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from '../Common/Container';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'home', label: 'Home', path: '/' },
    { name: 'about', label: 'About', path: '/about' },
    { name: 'service', label: 'Service', path: '/services' },
    { name: 'freezone', label: 'Freezone', path: '/freezone' },
    { name: 'blog', label: 'Blog', path: '/blog' },
    { name: 'gallery', label: 'Gallery', path: '/gallery' },
    { name: 'visa', label: 'Visa', path: '/visa' },
    { name: 'license', label: 'License', path: '/license' },
    { name: 'contact', label: 'Contact', path: '/contact' },
  ];

  // Update active section based on route
  useEffect(() => {
    const current = navItems.find((item) => item.path === pathname);
    if (current) setActiveSection(current.name);
  }, [pathname]);

  // Detect Scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>

      <nav
        className={` bg-transparent  top-0 left-0  right-0 z-50 transition-all duration-500
        `}
      >
        <Container>
          <div className={`flex glass  items-center justify-between px-6 py-3 rounded-4xl          
`}>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center ">
                <Image
                  src="/assets/images/logos/logo.png"
                  alt="Logo"
                  width={130}
                  height={100}
                  className="rounded-lg w-24 sm:w-26 md:w-24 xl:w-32 h-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-0">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setActiveSection(item.name)}
                  className={`
                    relative px-2 lg:px-4 xl:px-6 py-3 rounded-xl font-medium transition-all duration-300
                    transform hover:scale-105 active:scale-95
                    ${
                      activeSection === item.name
                        ? 'text-white bg-white/10 backdrop-blur-md border border-white/30 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {item.label}
                  {activeSection === item.name && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </Link>
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden   glass">
              <div className="   space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => {
                      setActiveSection(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      block px-4 py-3 rounded-lg font-medium transition-all duration-200
                      ${
                        activeSection === item.name
                          ? 'text-white bg-white/20 backdrop-blur-sm'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </nav>

    </>
  );
};

export default Navbar;
