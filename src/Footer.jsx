import React from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import logo from './assets/logo.png';

const Footer = () => {
    return (
        <footer className="w-full bg-[#f2f0ee] pt-12 pb-8 border-t border-[#d7ccc8]/50 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-[#5D4037]">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <img src={logo} alt="ibaco" className="h-12 object-contain self-start" />
                    <span className="text-xs font-serif italic opacity-70">Your Ice Cream Destination</span>
                </div>

                <div className="hidden md:block"></div> { /* Spacer */}

                {/* Columns */}
                <div className="space-y-4">
                    <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Our Story</div>
                    <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Our Products</div>
                    <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Store Locator</div>
                </div>

                <div className="space-y-4">
                    <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Order Online</div>
                    <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Contact Us</div>
                    <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Nutritional Info</div>
                </div>

                {/* Socials & Copyright (Spanning bottom) */}
                <div className="col-span-1 md:col-span-4 mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6">
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-sans">
                        Follow us on
                        <div className="flex gap-2 ml-2">
                            <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-3" alt="G" /></span>
                            <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-blue-600 cursor-pointer hover:scale-110 transition-transform"><FaFacebookF size={10} /></span>
                            <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-black cursor-pointer hover:scale-110 transition-transform"><FaTwitter size={10} /></span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
