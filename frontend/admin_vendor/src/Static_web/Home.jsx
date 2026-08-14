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

          {/* Right Column - Image & Glowing Ring */}
          <div className="z-10 flex justify-center items-center w-full px-4 md:px-0 relative group min-h-[400px]">
            {/* Glowing Neon Ring */}
            <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full border-2 border-blue-500/35 shadow-[0_0_60px_rgba(37,99,235,0.35)] pointer-events-none z-0 animate-[pulse_3s_infinite]" />
            
            {/* Ambient background glow */}
            <div className="absolute w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#0c2b5c]/30 rounded-full blur-3xl pointer-events-none z-0" />
            
            <img
              src={blueCar}
              alt="Car"
              className="w-full max-w-[360px] md:max-w-[460px] max-h-[360px] md:max-h-[460px] object-cover object-bottom transition-all duration-500 hover:scale-[1.02] relative z-10 hero-image-mask"
            />
          </div>

        </div>

        {/* Features Strip */}
        <div className="container mx-auto px-6 md:px-12 mt-16 md:mt-20 w-full relative z-10">
          <div className="border border-blue-500/10 bg-[#071735]/40 backdrop-blur-md rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left shadow-lg">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-[#0c244c]/60 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Trusted Vendors</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Quality you can rely on</p>
                <div className="w-8 h-[2px] bg-[#ff9200] mt-1.5" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-[#0c244c]/60 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Wide Selection</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Everything for every vehicle</p>
                <div className="w-8 h-[2px] bg-[#ff9200] mt-1.5" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-[#0c244c]/60 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Support 24/7</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">We're here to help</p>
                <div className="w-8 h-[2px] bg-[#ff9200] mt-1.5" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-[#0c244c]/60 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Secure Shopping</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Safe payments & protection</p>
                <div className="w-8 h-[2px] bg-[#ff9200] mt-1.5" />
              </div>
            </div>

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

