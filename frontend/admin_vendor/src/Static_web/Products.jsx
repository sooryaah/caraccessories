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
    <div className="bg-slate-50/50 min-h-screen">
      {/* Navbar */}
      <Navbar bgColor="bg-gradient-to-r from-[#0a1c3e] to-[#023669]" />

      {/* Main Section */}
      <section className="max-w-7xl mx-auto pt-16 pb-20 px-6 text-center">
        {/* Subtitle Badge */}
        <span className="inline-block bg-orange-500/10 text-[#ff9200] border border-orange-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          AUTOMOTIVE MARKETPLACE
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#071a3d] tracking-tight mb-4">
          EXPLORE WHAT WE OFFER
        </h1>
        <p className="text-gray-600 mx-auto mb-8 leading-relaxed max-w-2xl text-base md:text-lg">
          Discover a wide range of premium automotive products on Carooa. From essential replacement parts to custom performance accessories, we connect buyers with trusted vendors.
        </p>

        <Link
          to="/register"
          className="bg-[#ff9200] hover:bg-[#e07f00] text-white font-bold text-base px-10 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 inline-block text-center mb-16"
        >
          Start Selling Today
        </Link>

        {/* Curve layout */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-16">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className={`flex flex-col gap-3 sm:gap-4 ${offsets[colIndex]}`}>
              {col.map((src, imgIndex) => (
                <div
                  key={imgIndex}
                  className="overflow-hidden rounded-2xl border border-gray-200/60 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500 bg-white"
                >
                  <img
                    src={src}
                    alt={`car-item-${colIndex}-${imgIndex}`}
                    className="w-full object-cover"
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
