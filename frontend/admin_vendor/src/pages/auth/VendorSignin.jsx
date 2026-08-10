import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/carooa_logo.jpg';
import { vendorLoginApi } from '../../services/allAPI';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FiUser, FiLock } from 'react-icons/fi';

export default function VendorSignIn() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email_or_username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await vendorLoginApi(formData);
      console.log(response.data);
      if (response.status === 200) {
        toast.success('Login successful');
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        setTimeout(() => {
          navigate('/vendor/dashboard', { replace: true });
        }, 2000);
      } else {
        toast.error(response.data.error || 'Login failed');
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error ||
        error.response?.data?.detail ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white select-none">
      {/* LEFT BRAND SECTION */}
      <div className="w-full md:w-[44%] min-h-[280px] md:min-h-screen bg-[#071a3d] relative overflow-hidden flex flex-col justify-center items-start px-8 md:px-16 py-12 text-white">
        
        {/* Seamless Full-height Curved Orange & White Overlap (Swoosh Arc) */}
        <div className="absolute top-0 right-0 bottom-0 w-[450px] pointer-events-none hidden md:block">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M 30 0 C 95 30, 95 70, 30 100 L 100 100 L 100 0 Z" fill="#ff9200" />
            <path d="M 36 0 C 101 30, 101 70, 36 100 L 100 100 L 100 0 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Content inside Navy section */}
        <div className="relative z-10 flex flex-col items-start max-w-[340px]">
          {/* White Rounded Logo Container */}
          <div className="bg-white rounded-full px-8 py-5 shadow-lg flex items-center justify-center border border-gray-100 mb-6">
            <img
              src={logo}
              alt="CAROOA INTERNATIONAL"
              className="w-64 md:w-72 h-auto object-contain"
            />
          </div>

          {/* Tagline */}
          <div className="text-white text-lg font-medium leading-snug opacity-95">
            <p>Driving Quality.</p>
            <p>Delivering Trust.</p>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION - Perfectly proportioned */}
      <div className="flex-1 min-h-screen bg-white flex flex-col justify-center px-8 md:px-20 py-12 z-10">
        <div className="w-full max-w-[430px] mx-auto space-y-7">
          
          {/* Title Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#071a3d] mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-base md:text-lg">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-1">
            {/* Email or Username Input */}
            <div className="relative flex items-center h-[58px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] focus-within:shadow-sm transition-all">
              <FiUser size={20} className="text-[#071a3d] shrink-0" />
              <input
                type="text"
                name="email_or_username"
                placeholder="Email or Username"
                value={formData.email_or_username}
                onChange={handleChange}
                className="flex-1 border-none outline-none text-base md:text-lg px-3 text-gray-800 placeholder:text-gray-400 bg-transparent"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center h-[58px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] focus-within:shadow-sm transition-all">
              <FiLock size={20} className="text-[#071a3d] shrink-0" />
              <input
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 border-none outline-none text-base md:text-lg px-3 text-gray-800 placeholder:text-gray-400 bg-transparent"
                required
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </button>
            </div>

            {/* Remember me + Forgot Password */}
            <div className="flex justify-between items-center text-sm md:text-base pt-1">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#071a3d] rounded cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#ff9200] font-semibold hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[58px] bg-[#071a3d] hover:bg-[#0a2352] text-white font-semibold rounded-xl text-lg md:text-xl transition-all shadow-md mt-3 flex items-center justify-center cursor-pointer"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Footer Register */}
            <p className="text-center text-sm md:text-base text-gray-400 pt-3">
              Don’t have an account?{' '}
              <Link to="/register" className="text-[#ff9200] font-semibold hover:underline ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}