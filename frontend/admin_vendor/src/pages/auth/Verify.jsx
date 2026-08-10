import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOtpVerified, setCurrentStep, resetVendorRegistration } from '../../store/vendorRegisterSlice';
import logo from '../../assets/carooa_logo.jpg';
import { resendOtpApi, verifyVendorOtpApi } from '../../services/allAPI';
import { toast } from 'react-toastify';

export default function Verify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpComplete) {
      alert("Please enter the complete OTP");
      return;
    }

    const code = otp.join("");
    const vendorId = localStorage.getItem("vendorId");

    if (!vendorId) {
      alert("User not found. Please re-register.");
      return;
    }

    try {
      const payload = {
        user_id: vendorId,
        otp: code,
        email: localStorage.getItem("vendorEmail")
      };

      const response = await verifyVendorOtpApi(payload);

      console.log(response.data);
      toast.success(response.data);

      dispatch(setOtpVerified(true));
      dispatch(setCurrentStep(0));
      localStorage.setItem("vendorOtpVerified", "true");
      dispatch(resetVendorRegistration());
      navigate("/vendor-register/company-details");

    } catch (error) {
      console.error("OTP verification failed:", error);
      const msg = error?.response?.data?.error || "Invalid OTP. Please try again.";
      toast.error(msg);
      alert(msg);
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("vendorEmail");
    if (!email) {
      alert("Email not found. Please re-register.");
      return;
    }

    try {
      const result = await resendOtpApi(email);
      console.log(result);
      if (result.status === 200) {
        toast.success("OTP resent successfully to your email.");
        setResendTimer(60);
      } else {
        toast.error(result.data);
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      const msg = error?.response?.data?.error || "Failed to resend OTP. Try again.";
      toast.error(error?.response?.data?.error || msg);
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
      <div className="flex-1 min-h-screen bg-white flex flex-col justify-center px-8 md:px-20 py-12 z-10">
        <div className="w-full max-w-[430px] mx-auto space-y-7">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#071a3d] mb-2">Verify Details</h1>
            <p className="text-gray-400 text-base md:text-lg">We've sent a 4-digit code to your email. Enter it below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7 pt-1">
            <div className="flex justify-center gap-3.5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold text-[#071a3d] border border-gray-200 rounded-xl focus:outline-none focus:border-[#071a3d] bg-gray-50/50"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!isOtpComplete}
              className={`w-full h-[58px] font-semibold rounded-xl text-lg md:text-xl transition-all shadow-md flex items-center justify-center ${
                isOtpComplete
                  ? "bg-[#071a3d] hover:bg-[#0a2352] text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Verify Code
            </button>

            <p className="text-center text-sm md:text-base text-gray-400">
              Didn’t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                className={`ml-1 font-semibold ${
                  resendTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#ff9200] hover:underline"
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
              </button>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
}
