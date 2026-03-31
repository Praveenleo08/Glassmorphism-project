import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import Navbar from './Navbar';
import contactBg from './assets/contact us bg.png';

const Success = () => {
    const navigate = useNavigate();

    // Clear cart on success (Optional: Implement based on context availability or rely on Cart clearing logic elsehwere)
    useEffect(() => {
        // You might want to clear the cart here if not done in the payment handler
        // localStorage.removeItem('ibaco-cart'); 
    }, []);

    return (
        <div className="min-h-screen w-full relative font-sans overflow-x-hidden text-[#5D4037]">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={contactBg} alt="Success Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-blue-100/30 mix-blend-overlay"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4">

                <div className="glass max-w-lg w-full p-12 rounded-[3rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex flex-col items-center text-center animate-pop-in">

                    <div className="w-24 h-24 rounded-full bg-green-100/50 flex items-center justify-center mb-6 shadow-inner animate-bounce-slow">
                        <FaCheckCircle className="text-6xl text-green-500 drop-shadow-sm" />
                    </div>

                    <h1 className="text-4xl font-black text-[#5D4037] mb-4">Payment Successful!</h1>

                    <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
                        Thank you for your order. Your delicious treats are being prepared and will be with you shortly!
                    </p>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent mb-8"></div>

                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-gradient-to-r from-[#D81B60] to-[#880E4F] hover:from-[#C2185B] hover:to-[#6A1B9A] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 group"
                    >
                        <FaHome className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </button>

                </div>

            </div>

            <style>{`
                .animate-pop-in {
                    animation: popIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes popIn {
                    0% { opacity: 0; transform: scale(0.9) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-bounce-slow {
                    animation: bounce 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default Success;
