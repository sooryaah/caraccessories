import React from "react";
import part1 from "../assets/part1.png";
import part2 from "../assets/part2.png";
import part3 from "../assets/part3.png";
import part4 from "../assets/part4.png";
import part5 from "../assets/part5.png";
import part6 from "../assets/part6.png";
import part7 from "../assets/part7.png";
import part8 from "../assets/part8.png";
import part9 from "../assets/part9.png";
import part10 from "../assets/part10.png";
import Navbar from "./Navbar";
import Categories from "./Categories";
import WheelsPart from "./WheelsPart";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaTruck, FaMedal, FaHeadset } from "react-icons/fa";

const Products = () => {
  // group images into columns
  const columns = [
    [part1, part6],
    [part2, part7],
    [part3, part8],
    [part4, part9],
    [part5, part10],
  ];

  // custom vertical offsets for curve effect
  const offsets = ["mt-0", "mt-16", "mt-32", "mt-16", "mt-0"];

  return (
    <div className="bg-gradient-to-b from-slate-50 via-gray-50/50 to-white min-h-screen relative overflow-hidden">
      {/* Decorative Background Glow Blurs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-orange-500/10 via-[#071a3d]/5 to-sky-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Navbar */}
      <Navbar bgColor="bg-gradient-to-r from-[#0a1c3e] via-[#071a3d] to-[#023669]" />

      {/* Main Section */}
      <section className="max-w-7xl mx-auto pt-16 pb-20 px-6 text-center relative z-10">
        {/* Subtitle Badge */}
        <span className="inline-flex items-center gap-2 bg-orange-500/10 text-[#ff9200] border border-orange-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#ff9200] animate-pulse" />
          PREMIUM AUTOMOTIVE MARKETPLACE
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#071a3d] tracking-tight mb-4 leading-tight">
          EXPLORE WHAT WE OFFER
        </h1>
        <p className="text-gray-600 mx-auto mb-8 leading-relaxed max-w-2xl text-base sm:text-lg font-normal">
          Discover thousands of certified OEM and performance automotive parts on Carooa. Engineered for precision, performance, and durability.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          <Link
            to="/register"
            className="bg-gradient-to-r from-[#ff9200] to-[#e07f00] text-white font-bold text-base px-10 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Selling Today →
          </Link>
        </div>

        {/* Feature Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff9200] flex items-center justify-center shrink-0">
              <FaShieldAlt className="text-lg" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#071a3d] text-sm">100% Genuine</h4>
              <p className="text-xs text-gray-500">Certified Parts</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff9200] flex items-center justify-center shrink-0">
              <FaTruck className="text-lg" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#071a3d] text-sm">Express Shipping</h4>
              <p className="text-xs text-gray-500">Nationwide Delivery</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff9200] flex items-center justify-center shrink-0">
              <FaMedal className="text-lg" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#071a3d] text-sm">Top Quality</h4>
              <p className="text-xs text-gray-500">Verified Vendors</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff9200] flex items-center justify-center shrink-0">
              <FaHeadset className="text-lg" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#071a3d] text-sm">24/7 Support</h4>
              <p className="text-xs text-gray-500">Expert Assistance</p>
            </div>
          </div>
        </div>

        {/* Curve Layout */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-20">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className={`flex flex-col gap-3 sm:gap-4 ${offsets[colIndex]}`}>
              {col.map((src, imgIndex) => (
                <div
                  key={imgIndex}
                  className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-md hover:shadow-2xl hover:border-[#ff9200]/50 hover:scale-105 transition-all duration-500 bg-white group cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`car-item-${colIndex}-${imgIndex}`}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <Categories />

        {/* Products Grid Section */}
        <WheelsPart />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;
