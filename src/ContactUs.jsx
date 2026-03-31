import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFax, FaInstagram } from 'react-icons/fa';
import Navbar from './Navbar';
import contactBg from './assets/contact us bg.png';
import logo from './assets/logo.png';

const ContactUs = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen w-full relative font-sans overflow-x-hidden text-[#5D4037]">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={contactBg} alt="Contact Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 mix-blend-overlay"></div>
            </div>

            {/* Floating Blobs Animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar - Consistent with other pages */}
            <Navbar />

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-7xl h-auto min-h-[85vh] flex flex-col items-center justify-center p-4 pt-32 pb-20 mx-auto">

                {/* Page Title */}
                <h1 className="text-5xl md:text-6xl font-sans font-bold text-black mb-12 drop-shadow-sm tracking-tight text-center animate-fade-in-left">Contact Us</h1>

                <div className="w-full flex flex-col lg:flex-row gap-10 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>

                    {/* Left Column: Details & Map */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6">

                        {/* Address & Info Wrapper for Glass Effect */}
                        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[30px] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">

                            {/* Address */}
                            <div className="flex items-start gap-4 mb-8">
                                <div className="mt-1 text-[#D81B60] text-2xl group-hover:scale-110 transition-transform"><FaMapMarkerAlt /></div>
                                <div>
                                    <h3 className="text-2xl font-bold text-black mb-2">ibaco</h3>
                                    <p className="text-gray-800 font-medium leading-relaxed text-lg">
                                        ibaco Enterprises Ltd.,<br />
                                        Tamil Nadu Housing Board "A" Road,<br />
                                        Sholinganallur, Chennai - 600 119, India.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-black/10 my-4"></div>

                            {/* Contact Details */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 group/item hover:translate-x-2 transition-transform">
                                    <div className="text-red-600 transform rotate-90 text-xl"><FaPhoneAlt /></div>
                                    <span className="text-gray-900 font-bold text-lg">+91 7926566385</span>
                                </div>
                                <div className="flex items-center gap-4 group/item hover:translate-x-2 transition-transform">
                                    <div className="text-pink-600 text-xl"><FaFax /></div>
                                    <span className="text-gray-900 font-bold text-lg">+91 79 26564027</span>
                                </div>
                                <div className="flex items-center gap-4 group/item hover:translate-x-2 transition-transform">
                                    <div className="text-red-600 text-xl"><FaEnvelope /></div>
                                    <span className="text-gray-900 font-bold text-lg">info@ibacogroup.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="flex-1 min-h-[300px] bg-white/40 backdrop-blur-md rounded-[30px] overflow-hidden border border-white/50 relative shadow-inner group hover:shadow-lg transition-all">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8931149721867!2d80.2241673!3d12.9786966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d88665f8c85%3A0xe67fd87a2a704f0!2sSholinganallur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, opacity: 0.8, filter: 'contrast(1.1) saturate(1.2)' }}
                                allowFullScreen=""
                                loading="lazy"
                                className="group-hover:scale-105 transition-transform duration-700"
                            ></iframe>
                            <div className="absolute bottom-4 left-[50%] -translate-x-1/2 bg-white/90 px-4 py-1.5 rounded-full shadow-lg text-red-600 font-bold text-sm pointer-events-none border border-red-100 flex items-center gap-1">
                                <FaMapMarkerAlt /> ibaco house
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full lg:w-7/12">
                        <div className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-2xl border border-white/60 rounded-[40px] p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.1)] h-full relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                            <h2 className="text-3xl font-bold text-black mb-8 relative z-10">Reach Out To Us</h2>

                            <form className="flex flex-col gap-6 relative z-10">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-2">
                                        <input type="text" placeholder="Name" className="w-full bg-white/50 border border-white/30 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-600 font-bold focus:ring-2 focus:ring-pink-300 focus:outline-none focus:bg-white/80 shadow-sm transition-all" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <input type="text" placeholder="Company" className="w-full bg-white/50 border border-white/30 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-600 font-bold focus:ring-2 focus:ring-pink-300 focus:outline-none focus:bg-white/80 shadow-sm transition-all" />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-2">
                                        <input type="text" placeholder="Phone" className="w-full bg-white/50 border border-white/30 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-600 font-bold focus:ring-2 focus:ring-pink-300 focus:outline-none focus:bg-white/80 shadow-sm transition-all" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <input type="email" placeholder="Email id" className="w-full bg-white/50 border border-white/30 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-600 font-bold focus:ring-2 focus:ring-pink-300 focus:outline-none focus:bg-white/80 shadow-sm transition-all" />
                                    </div>
                                </div>



                                <div className="flex flex-col gap-2">
                                    <label className="text-black font-bold ml-1 text-sm uppercase tracking-wide opacity-80">Message</label>
                                    <textarea rows="4" className="w-full bg-white/70 border border-white/30 rounded-2xl px-5 py-4 text-gray-800 focus:ring-2 focus:ring-pink-300 focus:outline-none shadow-inner resize-none transition-all"></textarea>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button type="button" className="px-12 py-3 bg-[#8D6E63] hover:bg-[#6D4C41] text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wider">
                                        send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl py-8 mt-12 border-t border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-10 w-full">
                <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center text-sm gap-8 md:gap-4">
                    <div className="flex flex-col gap-1 w-full md:w-auto">
                        <span className="text-red-800 font-bold text-lg tracking-wider">ibaco</span>
                        <p className="text-gray-600">© 2024 Hatsun Agro Product Ltd.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto">
                        <div className="flex flex-col gap-2">
                            <Link to="/our-story" className="text-gray-700 hover:text-[#922B21] font-medium transition-colors">Our Story</Link>
                            <span className="text-gray-700 hover:text-[#922B21] font-medium transition-colors cursor-pointer">Our Products</span>
                            <Link to="/store-locator" className="text-gray-700 hover:text-[#922B21] font-medium transition-colors cursor-pointer">Store Locator</Link>
                        </div>
                        <div className="flex flex-col gap-2">

                            <span className="text-[#D81B60] font-bold cursor-default">Contact Us</span>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <span className="w-8 h-8 rounded-full border border-gray-400/50 flex items-center justify-center text-red-600 hover:bg-red-50 cursor-pointer shadow-sm transition-transform hover:scale-110"><FaInstagram /></span>
                        <span className="w-8 h-8 rounded-full border border-gray-400/50 flex items-center justify-center text-blue-600 hover:bg-blue-50 cursor-pointer shadow-sm transition-transform hover:scale-110">f</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ContactUs;
