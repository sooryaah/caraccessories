import React from "react";
import bmblack from "../assets/bmblack.PNG";
const StatsSection = () => {
  const stats = [
    { value: "688+", label: "Active Users" },
    { value: "24+", label: "Active Vendors" },
    { value: "243+", label: "Happy Customers" },
    { value: "5+", label: "Years of Excellence" },
  ];

  return (
    <section className="relative w-full min-h-[450px] md:min-h-[450px] lg:min-h-[500px] overflow-hidden group flex items-center justify-center py-12">
      {/* Background Image with subtle zoom on hover */}
      <img
        src={bmblack}
        alt="Car Background"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
      />

      {/* Dark gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex items-center justify-center text-white p-4">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 py-12 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] grid grid-cols-1 md:grid-cols-5 gap-10 items-center transform transition-all duration-500 hover:bg-white/10">
          
          {/* Left Column: Heading */}
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0 pr-0 md:pr-6 text-center md:text-left relative">
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-orange-500/20 rounded-full blur-2xl animate-pulse" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tighter uppercase relative z-10">
              ITS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#ff9200]">OUR</span> <br /> 
              JOURNEY
            </h2>
          </div>

          {/* Right Column: Stats */}
          <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center md:items-start p-4 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_25px_-5px_rgba(255,146,0,0.3)] hover:bg-white/5 cursor-default relative overflow-hidden"
              >
                {/* Decorative glow on hover */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-transparent via-[#ff9200]/0 to-[#ff9200]/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-md rounded-2xl" />
                
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-baseline">
                  {item.value.replace('+', '')}
                  <span className="text-[#ff9200] ml-1 text-2xl sm:text-3xl">+</span>
                </h3>
                <p className="mt-2 text-gray-300 text-sm sm:text-base font-semibold tracking-wide uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
