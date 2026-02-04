import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import bg1 from './assets/Glassmorphism images Source/bg.png';
import logo from './assets/logo.png';
import './App.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative font-sans text-gray-800 overflow-hidden"
            style={{ backgroundImage: `url(${bg1})`, backgroundColor: '#e699bc' }}
        >
            {/* Abstract blobs for depth */}
            <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
            <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '3s' }}></div>

            <div className="glass w-[900px] min-h-[580px] rounded-[3rem] p-16 relative flex gap-10 items-center animate-fade-in-left">

                {/* Left Form Section */}
                <div className="w-[45%] flex flex-col z-10 pt-2">
                    <h1 className="text-5xl font-black mb-3 tracking-tight text-[#333]">Let's get started!</h1>
                    <p className="text-gray-600 mb-6 font-medium">
                        Already have an account? <Link to="/login" className="text-[#880E4F] font-bold hover:underline">Log in</Link>
                    </p>

                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm font-bold pl-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-10 rounded-xl bg-white/40 border border-white/50 px-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#880E4F]/30 focus:bg-white/60 transition-all font-medium shadow-inner"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm font-bold pl-2">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-10 rounded-xl bg-white/40 border border-white/50 px-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#880E4F]/30 focus:bg-white/60 transition-all font-medium shadow-inner"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 text-sm font-bold pl-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-10 rounded-xl bg-white/40 border border-white/50 px-5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#880E4F]/30 focus:bg-white/60 transition-all font-medium shadow-inner"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center gap-3 mt-2 pl-1">
                            <div
                                className={`w-5 h-5 rounded-md border-2 border-gray-600 flex items-center justify-center cursor-pointer transition-all ${agreed ? 'bg-[#880E4F] border-[#880E4F]' : 'bg-transparent'}`}
                                onClick={() => setAgreed(!agreed)}
                            >
                                {agreed && <span className="text-white text-xs font-bold">✓</span>}
                            </div>
                            <label className="text-sm text-gray-600 cursor-pointer select-none font-medium" onClick={() => setAgreed(!agreed)}>
                                I accept <a href="#" className="text-[#880E4F] font-bold hover:underline">Terms and Conditions</a>
                            </label>
                        </div>

                        <button
                            type="button"
                            className="w-full sm:w-[200px] h-12 mt-4 bg-[#333] hover:bg-black text-white rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 text-lg"
                        >
                            Create an account
                        </button>
                    </form>

                    <div className="flex gap-6 mt-6 ml-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-110 transition-transform">
                            <FcGoogle size={24} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-110 transition-transform text-[#1877F2]">
                            <FaFacebookF size={22} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-110 transition-transform text-black">
                            <FaXTwitter size={22} />
                        </button>
                    </div>
                </div>

                {/* Right Logo Section */}
                <div className="w-[55%] flex flex-col items-center justify-center z-10 relative">
                    {/* Decorative circle behind logo */}
                    <div className="absolute w-[300px] h-[300px] bg-white/20 rounded-full blur-2xl"></div>
                    <img src={logo} alt="ibaco" className="w-[400px] object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" />
                </div>
            </div>
        </div>
    );
}

export default Signup;
