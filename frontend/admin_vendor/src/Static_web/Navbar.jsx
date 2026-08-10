import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/carooa_logo.jpg";

const Navbar = ({ bgColor = "bg-transparent" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/partner&category", label: "Products & Categories" },
    { path: "/parnterwithus", label: "Partner With Us" },
    { path: "/successstories", label: "Success Stories" },
    { path: "/contactsection", label: "Contact Us" },
  ];

  const activeBg = isScrolled ? "bg-[#071a3d]/90 backdrop-blur-md shadow-lg" : bgColor;

  return (
    <header
      className={`${activeBg} flex justify-between items-center py-3.5 px-4 md:px-6 lg:px-10 w-full fixed top-0 left-0 z-50 text-white select-none transition-all duration-300`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center shrink-0">
        <div className="bg-white rounded-full px-4 py-1.5 md:px-5 md:py-2 shadow-sm flex items-center justify-center">
          <img src={logo} alt="CAROOA INTERNATIONAL" className="h-7 md:h-9 w-auto object-contain" />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-3 lg:gap-6 xl:gap-8 text-white font-medium text-xs lg:text-sm xl:text-base items-center whitespace-nowrap">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-1 transition-colors duration-200 ${
                isActive
                  ? "text-[#ff9200] font-semibold"
                  : "text-white hover:text-[#ff9200]"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#ff9200] rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Download App Action Button */}
      <div className="hidden md:block shrink-0">
        <button className="bg-[#ff9200] hover:bg-[#e08200] px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl font-semibold text-xs lg:text-sm text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap">
          Download App
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none p-1"
          aria-label="Toggle Menu"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#071a3d]/95 backdrop-blur-lg border-t border-[#0a2352] shadow-xl md:hidden">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleClose}
                className={`text-base font-medium py-1 transition-colors ${
                  location.pathname === link.path
                    ? "text-[#ff9200] font-semibold"
                    : "text-white hover:text-[#ff9200]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button className="bg-[#ff9200] hover:bg-[#e08200] text-white px-5 py-3 rounded-xl font-semibold mt-2 shadow-md">
              Download App
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
