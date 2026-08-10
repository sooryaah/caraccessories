import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { serverurl } from '../../services/serverURL';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import logo from '../../assets/carooa_logo.jpg';
import lock from '../../assets/pass.png';
import wrong from '../../assets/WrongPassword.png';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const { uidb64, token } = useParams();

  const validate = () => {
    const newErrors = {};
    if (!formData.newPassword || formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url = `${serverurl}/auth/password/reset-password/${uidb64}/${token}/`;
      await axios.post(url, {
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      });

      setSuccess('Password Changed Successfully');
      setErrorMsg('');
      setSubmitted(true);
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMsg("This password reset link has expired or is invalid. Please request a new one.");
      } else {
        setErrorMsg(error.response?.data?.detail || "Something went wrong. Please try again.");
      }
      setSuccess('');
      setSubmitted(true);
    }
  };

  const handleRetry = () => {
    setFormData({ newPassword: '', confirmPassword: '' });
    setErrors({});
    setErrorMsg('');
    setSuccess('');
    setSubmitted(false);
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
      <div className="flex-1 min-h-screen bg-white flex flex-col justify-center px-8 md:px-20 py-12 z-10">
        <div className="w-full max-w-[430px] mx-auto space-y-7">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#071a3d] mb-2">Reset Password</h1>
                <p className="text-gray-400 text-base md:text-lg">Enter your new password and confirm it.</p>
              </div>

              {/* New Password */}
              <div className="relative flex flex-col pt-1">
                <div className="relative flex items-center h-[58px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] transition-all">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="New Password"
                    className="flex-1 border-none outline-none text-base md:text-lg px-1 text-gray-800 placeholder:text-gray-400 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showNew ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>

              {/* Confirm New Password */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center h-[58px] border border-gray-200 rounded-xl px-4 focus-within:border-[#071a3d] transition-all">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm New Password"
                    className="flex-1 border-none outline-none text-base md:text-lg px-1 text-gray-800 placeholder:text-gray-400 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showConfirm ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[58px] bg-[#071a3d] hover:bg-[#0a2352] text-white font-semibold rounded-xl text-lg md:text-xl transition-all shadow-md mt-3 flex items-center justify-center cursor-pointer"
              >
                Reset Password
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              {success && (
                <>
                  <img src={lock} alt="Success" className="h-28 w-28 object-contain mb-4" />
                  <h2 className="text-[#071a3d] text-2xl font-bold mb-2">{success}</h2>
                  <p className="text-gray-500 text-base mb-6">
                    Click the button below to return to the login page.
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full h-[58px] bg-[#071a3d] text-white rounded-xl text-lg font-semibold hover:bg-[#0a2352] transition shadow-md"
                  >
                    Return to Login
                  </button>
                </>
              )}

              {errorMsg && (
                <>
                  <img src={wrong} alt="Error" className="h-28 w-36 object-contain mb-4" />
                  <p className="text-gray-800 text-base font-medium mb-6">{errorMsg}</p>

                  {errorMsg.includes("expired") || errorMsg.includes("invalid") ? (
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full h-[58px] bg-[#071a3d] text-white rounded-xl text-lg font-semibold hover:bg-[#0a2352] transition shadow-md"
                    >
                      Go to Login
                    </button>
                  ) : (
                    <button
                      onClick={handleRetry}
                      className="w-full h-[58px] bg-[#071a3d] text-white rounded-xl text-lg font-semibold hover:bg-[#0a2352] transition shadow-md"
                    >
                      Try Again
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ResetPassword;
