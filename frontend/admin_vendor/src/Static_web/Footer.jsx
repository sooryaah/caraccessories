import React from "react";
import logo from "../assets/carooa_logo.jpg";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#071a3d] text-white border-t border-[#0a2352]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <div className="bg-white rounded-full px-5 py-2 shadow-sm inline-flex items-center justify-center mb-4">
            <img src={logo} alt="CAROOA INTERNATIONAL" className="h-9 w-auto object-contain" />
          </div>
          <p className="text-gray-300 text-base leading-relaxed">
            Drive Your Dreams – Quality Parts, Perfect Fit
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#ff9200]">COMPANY INFO</h3>
          <ul className="space-y-2.5 text-gray-300 text-sm md:text-base">
            <li><Link to="/" className="hover:text-[#ff9200] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#ff9200] transition-colors">About</Link></li>
            <li><Link to="/partner&category" className="hover:text-[#ff9200] transition-colors">Products & Categories</Link></li>
            <li><Link to="/parnterwithus" className="hover:text-[#ff9200] transition-colors">Partner With Us</Link></li>
            <li><Link to="/contactsection" className="hover:text-[#ff9200] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#ff9200]">CONNECT WITH US</h3>
          <ul className="space-y-2.5 text-gray-300 text-sm md:text-base">
            <li>
              <a href="mailto:carooa@gmail.com" className="flex items-center gap-2 hover:text-[#ff9200] transition-colors">
                <FaEnvelope className="shrink-0" />
                <span>carooa@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="mailto:carooainternational@gmail.com" className="flex items-center gap-2 hover:text-[#ff9200] transition-colors">
                <FaEnvelope className="shrink-0" />
                <span>carooainternational@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@carooa.com" className="flex items-center gap-2 hover:text-[#ff9200] transition-colors">
                <FaEnvelope className="shrink-0" />
                <span>info@carooa.com</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/carooainternational?utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#ff9200] transition-colors">
                <FaInstagram className="shrink-0" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/share/1EjFzZAjoi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#ff9200] transition-colors">
                <FaFacebook className="shrink-0" />
                <span>Facebook</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-[#ff9200]">INFORMATION</h3>
          <ul className="space-y-2.5 text-gray-300 text-sm md:text-base">
            <li><Link to="/successstories" className="hover:text-[#ff9200] transition-colors">Success Stories</Link></li>
            <li><Link to="/register" className="hover:text-[#ff9200] transition-colors font-semibold">Signup As Vendor</Link></li>
            <li><a href="#" className="hover:text-[#ff9200] transition-colors">Download App</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#0a2352] py-6 text-gray-400 text-sm flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        <p>Copyright © 2020 - 2026 CAROOA INTERNATIONAL Pvt Ltd</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#ff9200] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#ff9200] transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
