import React from "react";
import car from "../assets/car_transparent.png";
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
      <section className="hero-radial-bg text-white relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-20 min-h-[650px] md:min-h-[750px]">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[4.2fr_5.8fr] gap-8 md:gap-12 items-center">

          <div className="z-10 flex flex-col justify-center text-left max-w-xl pl-4 md:pl-8">
            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-[1.1] tracking-tight uppercase">
              EVERYTHING YOUR VEHICLE NEEDS - IN ONE PLACE
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-300 font-light leading-relaxed">
              Discover quality automotive products from trusted vendors. Shop by
              category, vehicle type, or brand.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById("download-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Products
              </button>
              <a 
                href="https://carooa.com/login"
                className="border-2 border-white hover:bg-white hover:text-[#0b1c3e] active:scale-95 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center justify-center cursor-pointer"
              >
                Become a Partner
              </a>
            </div>
          </div>

          <div className="z-10 flex justify-center items-center w-full px-4 md:px-0">
            <img
              src={car}
              alt="Car"
              className="w-full max-w-[620px] md:max-w-[760px] lg:max-w-[880px] xl:max-w-[980px] max-h-[460px] md:max-h-[560px] lg:max-h-[640px] object-contain object-center h-auto transition-transform duration-500 hover:scale-105"
            />
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 -mt-10 mb-20 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative pt-16 flex flex-col items-center">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 flex items-center justify-center">
            <img src={star} alt="Quality Products" className="w-20 h-20 object-contain" />
          </div>
          <h3 className="font-bold text-xl text-[#0a1c3e] text-center mt-2">Quality Products</h3>
          <p className="text-sm mt-3 text-slate-500 text-center leading-relaxed">
            Handpicked products from trusted vendors for your vehicle.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative pt-16 flex flex-col items-center">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 flex items-center justify-center">
            <img src={circle} alt="Easy Returns" className="w-20 h-20 object-contain" />
          </div>
          <h3 className="font-bold text-xl text-[#0a1c3e] text-center mt-2">Easy Returns</h3>
          <p className="text-sm mt-3 text-slate-500 text-center leading-relaxed">
            Hassle-free returns and exchange for a smooth experience.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative pt-16 flex flex-col items-center">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 flex items-center justify-center">
            <img src={lock} alt="Secure Shopping" className="w-20 h-20 object-contain" />
          </div>
          <h3 className="font-bold text-xl text-[#0a1c3e] text-center mt-2">Secure Shopping</h3>
          <p className="text-sm mt-3 text-slate-500 text-center leading-relaxed">
            Your data and transactions are 100% safe with us.
          </p>
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

