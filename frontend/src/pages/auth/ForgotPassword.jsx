// pages/ForgotPassword.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white relative px-4">
            <div className="bg-white/10 p-8 pt-12 rounded-2xl backdrop-blur-md w-full max-w-md border border-gray-700 relative">
                
                <button 
                    onClick={() => navigate(-1)} 
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                    aria-label="Close"
                >
                    <FiX size={24} />
                </button>

                <h2 className="text-3xl font-bold mb-4 text-center">Forgot Password</h2>
                <p className="text-gray-300 mb-6 text-center">
                    Enter your email to receive password reset instructions.
                </p>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-md bg-black/40 border border-gray-600 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full py-3 bg-white/20 text-white font-semibold rounded-md hover:bg-white/30 transition">
                    Send Reset Link
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
