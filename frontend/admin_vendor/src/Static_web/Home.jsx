import React from "react";
import blueCar from "../assets/blue.PNG";
import star from "../assets/star.png";
import circle from "../assets/Circle.png";
import lock from "../assets/lock.png";
import Navbar from "./Navbar";
import MobileExperience from "./MobileExperience";
import Partner from "./Partner";
import WhyChooseUs from "./WhyChooseUs";
import HeroSection from "./HeroSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import StatsSection from "./StatsSection";

const Home = () => {
  return (
    <div>
      <div className="absolute w-full top-0">
        <Navbar bgColor="bg-transparent" />
      </div>
      <section className="hero-radial-bg text-white relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24 min-h-[650px] md:min-h-[750px] flex flex-col justify-between">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center w-full">

          {/* Left Column - Content */}
          <div className="z-10 flex flex-col justify-center text-left max-w-xl pl-4 md:pl-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-[#ff9200] uppercase tracking-wider mb-6 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff9200] animate-pulse" />
              YOUR ONE-STOP AUTOMOTIVE MARKETPLACE
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-[1.1] tracking-tight uppercase">
              EVERYTHING YOUR <br />
              VEHICLE NEEDS – <br />
              <span className="text-[#ff9200]">IN ONE PLACE</span>
            </h1>
            <div className="w-20 h-[4px] bg-[#3b82f6] mt-4 mb-6 rounded-full" />

            {/* Description */}
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-md">
              Discover quality automotive products from trusted vendors. Shop by
              category, vehicle type, or brand.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById("download-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#ff9200] hover:bg-[#e08200] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-[#ff9200]/25 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
              >
                Explore Products &rarr;
              </button>
              <a 
                href="https://carooa.com/login"
                className="border border-white/30 hover:border-white hover:bg-white/5 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Become a Partner &rarr;
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="z-10 flex justify-center items-center w-full px-4 md:px-0 relative group min-h-[420px] md:min-h-[520px]">
            <img
              src={blueCar}
              alt="Car"
              className="w-full max-w-[420px] md:max-w-[560px] lg:max-w-[640px] h-auto object-contain transition-all duration-500 hover:scale-[1.02] relative z-10"
            />
          </div>

        </div>

      </section>

      <MobileExperience />
      <Partner />
      <WhyChooseUs />
      <HeroSection />
      <ContactSection />
      <StatsSection />
      <Footer />

    </div>
  );
};

export default Home;

