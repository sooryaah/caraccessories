import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/carooa_logo.jpg';
import mail from '../../assets/email.png';
import forgot from '../../assets/forgot.png';
import { forgotPasswordApi } from '../../services/allAPI';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (email.trim() === '') {
      setError('Email is required');
      setLoading(false);
      setSubmitted(true);
      return;
    }

    try {
      await forgotPasswordApi(email);
      setSuccess('EMAIL_SENT');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset link could not be sent. Ensure the provided email is registered.');
    } finally {
      setEmail('');
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setError('');
    setSuccess('');
    setButtonVisible(true);
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
            <>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#071a3d] mb-2">Forgot Password</h1>
                <p className="text-gray-400 text-base md:text-lg">Enter your email address to receive a password reset link.</p>
              </div>

              <div className="space-y-5 pt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-[58px] border border-gray-200 rounded-xl px-4 text-base md:text-lg focus:outline-none focus:border-[#071a3d] focus-within:shadow-sm transition-all"
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-[58px] bg-[#071a3d] hover:bg-[#0a2352] text-white font-semibold rounded-xl text-lg md:text-xl transition-all shadow-md mt-3 flex items-center justify-center cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Proceed'}
                </button>

                <p className="mt-4 text-sm md:text-base text-center text-gray-400">
                  Remember your password?{' '}
                  <span
                    onClick={() => navigate('/login')}
                    className="text-[#ff9200] font-semibold cursor-pointer hover:underline"
                  >
                    Go back to Login
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              {success === 'EMAIL_SENT' && (
                <>
                  <img src={mail} alt="Email Sent" className="h-32 w-32 object-contain mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-[#071a3d]">Check your email</h2>
                  <p className="text-gray-500 text-base mb-6">
                    We have sent password recovery instructions to your email address.
                  </p>
                </>
              )}
              {error && (
                <>
                  <img src={forgot} alt="Error" className="h-44 w-44 object-contain mb-4" />
                  <p className="text-gray-800 text-base mb-6">{error}</p>
                  {buttonVisible && (
                    <button
                      onClick={() => {
                        setButtonVisible(false);
                        setTimeout(() => handleRetry(), 300);
                      }}
                      className="px-7 py-3.5 bg-[#071a3d] text-white rounded-xl text-base font-semibold hover:bg-[#0a2352] transition shadow-md"
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
}
