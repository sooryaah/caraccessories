import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setCurrentStep } from '../../store/vendorRegisterSlice';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/carooa_logo.jpg';
import { vendorRegisterApi } from '../../services/allAPI';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

export default function VendorRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    username = "",
    email = "",
    password = ""
  } = useSelector((state) => state.vendorRegister);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem('vendorRegister'));
      if (
        savedData &&
        typeof savedData.username === 'string' &&
        typeof savedData.email === 'string' &&
        typeof savedData.password === 'string'
      ) {
        dispatch(setCredentials({
          username: savedData.username,
          email: savedData.email,
          password: savedData.password
        }));
        setRememberMe(!!savedData.rememberMe);
      }
    } catch (err) {
      console.error("Failed to parse vendorRegister from localStorage", err);
    }
  }, [dispatch]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+(?:\.[a-zA-Z]{2,})+$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!username.trim()) newErrors.username = 'Username is required';
    else if (!usernameRegex.test(username)) newErrors.username = 'Username must not contain special characters';

    if (!email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(password)) newErrors.password = 'Password must contain at least one uppercase letter';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.password = 'Password must contain at least one special character';

    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!validate()) {
      setLoading(false);
      return;
    }
    try {
      const vendorData = { username, email, password };
      const result = await vendorRegisterApi(vendorData);
      console.log("Step 1 success:", result);

      if (result.status === 201) {
        toast.success("Registration successful! Proceeding to OTP verification.");
        dispatch(setCredentials({ username, email, password }));
        const userId = result?.data?.user_id || result?.data?.user?.id;
        if (userId) {
          localStorage.setItem('vendorId', userId);
          localStorage.setItem('vendorEmail', email);
        }

        if (rememberMe) {
          localStorage.setItem('vendorRegister', JSON.stringify({ username, email, password, rememberMe: true }));
        } else {
          localStorage.removeItem('vendorRegister');
        }

        dispatch(setCurrentStep(2));
        setTimeout(() => {
          navigate('/register/verifyOtp');
        }, 3000);
      } else {
        console.log("error :", result.data);
        toast.error(result.data?.error);
      }

    } catch (err) {
      console.error(err);
      const errorMsg = err?.detail || err?.message || "Something went wrong.";
      toast.error(`Registration failed: ${errorMsg}`);
      setError(errorMsg);
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
          <div className="bg-white rounded-full px-8 py-5 shadow-lg flex items-center justify-center border border-gray-100 mb-6">
            <img
              src={logo}
              alt="CAROOA INTERNATIONAL"
              className="w-64 md:w-72 h-auto object-contain"
            />
          </div>

          <div className="text-white text-lg font-medium leading-snug opacity-95">
            <p>Driving Quality.</p>
            <p>Delivering Trust.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - Perfectly proportioned */}
      <div className="flex-1 min-h-screen bg-white flex flex-col justify-center px-8 md:px-20 py-8 z-10">
        <div className="w-full max-w-[430px] mx-auto space-y-5">
          
          {/* Title Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#071a3d] mb-1.5">Seller Account</h1>
            <p className="text-gray-400 text-base">Create an account to start selling</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <div className="relative flex items-center h-[54px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] transition-all">
                <FiUser size={19} className="text-[#071a3d] shrink-0" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) =>
                    dispatch(setCredentials({ username: e.target.value, email, password }))
                  }
                  className="flex-1 border-none outline-none text-base px-3 text-gray-800 placeholder:text-gray-400 bg-transparent"
                />
              </div>
              {fieldErrors.username && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative flex items-center h-[54px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] transition-all">
                <FiMail size={19} className="text-[#071a3d] shrink-0" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => dispatch(setCredentials({ username, email: e.target.value, password }))}
                  className="flex-1 border-none outline-none text-base px-3 text-gray-800 placeholder:text-gray-400 bg-transparent"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative flex items-center h-[54px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] transition-all">
                <FiLock size={19} className="text-[#071a3d] shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => dispatch(setCredentials({ username, email, password: e.target.value }))}
                  className="flex-1 border-none outline-none text-base px-3 text-gray-800 placeholder:text-gray-400 bg-transparent"
                />
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaRegEye size={19} /> : <FaRegEyeSlash size={19} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative flex items-center h-[54px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] transition-all">
                <FiLock size={19} className="text-[#071a3d] shrink-0" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex-1 border-none outline-none text-base px-3 text-gray-800 placeholder:text-gray-400 bg-transparent"
                />
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaRegEye size={19} /> : <FaRegEyeSlash size={19} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Remember me */}
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
            </div>

            {error && (
              <p className="text-red-500 text-center text-xs font-medium">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[54px] font-semibold rounded-xl text-lg transition-all shadow-md mt-2 flex items-center justify-center ${
                loading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#071a3d] hover:bg-[#0a2352] text-white cursor-pointer'
              }`}
            >
              {loading ? 'Processing...' : 'Proceed'}
            </button>

            {/* Footer Login Link */}
            <p className="text-center text-sm md:text-base text-gray-400 pt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-[#ff9200] font-semibold hover:underline ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
}
