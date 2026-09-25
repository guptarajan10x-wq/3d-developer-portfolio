import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center fixed top-0 left-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className='w-full max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-10 lg:px-16'>
        <Link
          to='/'
          className='flex items-center gap-3 group'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className='relative flex items-center justify-center'>
            <img
              src={logo}
              alt='logo'
              className='w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-110'
            />
            <div className='absolute -inset-1 rounded-full bg-[#915EFF]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='text-white text-[16px] sm:text-[18px] font-bold tracking-tight'>
              Rajan
            </span>
            <span className='hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide bg-[#915EFF]/15 text-[#d8c5ff] border border-[#915EFF]/30 backdrop-blur-sm'>
              <span className='w-1.5 h-1.5 rounded-full bg-[#00cea8] animate-pulse' />
              Motion Designer &bull; Creative Technologist
            </span>
            <span className='hidden sm:inline-flex xl:hidden items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#915EFF]/10 text-[#d8c5ff] border border-[#915EFF]/20'>
              Motion &bull; AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className='list-none hidden md:flex flex-row items-center gap-5 lg:gap-8'>
          {navLinks.map((nav) => {
            const isActive = active === nav.title;
            return (
              <li
                key={nav.id}
                className='relative group py-1'
                onClick={() => setActive(nav.title)}
              >
                <a
                  href={`#${nav.id}`}
                  className={`text-[14px] lg:text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-secondary hover:text-white"
                  }`}
                >
                  {nav.title}
                </a>
                {isActive && (
                  <span className='absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#915EFF] to-[#00cea8] rounded-full shadow-sm shadow-[#915EFF]' />
                )}
              </li>
            );
          })}
          <li>
            <a
              href='#contact'
              className='ml-2 bg-gradient-to-r from-[#915EFF] to-[#7038e8] hover:from-[#7e47f0] hover:to-[#5d2ac9] text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 hidden lg:inline-flex items-center gap-1.5'
              onClick={() => setActive("Contact")}
            >
              Let's Talk
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className='md:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            onClick={() => setToggle(!toggle)}
            className='w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors hover:bg-white/10'
            aria-label='Toggle menu'
          >
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-5 h-5 object-contain'
            />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-16 right-0 mx-4 my-2 min-w-[220px] z-50 rounded-2xl bg-[#09031c]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-950/50 flex-col gap-4`}
          >
            <div className='flex items-center gap-2 pb-3 border-b border-white/10'>
              <span className='w-2 h-2 rounded-full bg-[#00cea8] animate-pulse' />
              <p className='text-[11px] font-semibold text-[#d8c5ff] uppercase tracking-wider'>
                Motion & AI Portfolio
              </p>
            </div>

            <ul className='list-none flex flex-col gap-3'>
              {navLinks.map((nav) => {
                const isActive = active === nav.title;
                return (
                  <li
                    key={nav.id}
                    className={`cursor-pointer text-[15px] font-medium transition-colors duration-200 flex items-center justify-between ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-secondary hover:text-white"
                    }`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    <a href={`#${nav.id}`} className='w-full py-1'>
                      {nav.title}
                    </a>
                    {isActive && (
                      <span className='w-1.5 h-1.5 rounded-full bg-[#915EFF]' />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
