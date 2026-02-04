import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './assets/logo.png';
import Footer from './Footer';

// Assets
import productsBg from './assets/Products home page/products page bg.png';
import topBanner from './assets/Products home page/top.png';
import img1 from './assets/Products home page/1.png'; // Crunchy Comfort
import img2 from './assets/Products home page/2.png'; // Frozen Refreshment
import img3 from './assets/Products home page/3.png'; // Celebration Cakes (Assumed)
import img4 from './assets/Products home page/4.png'; // Cooling Sips
import img5 from './assets/Products home page/5.png'; // Ice Cream Delight
import img6 from './assets/Products home page/6.png'; // Unused/Extra

const ProductsHome = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categoriesTop = [
        {
            id: 1,
            title: "Ice Cream Delights",
            image: img5,
            link: '/ice-cream-items',
            btnText: "VIEW FLAVORS",
            delay: "100ms",
            style: "scale-110"
        },
        {
            id: 2,
            title: "Celebration Cakes",
            image: img4, // Swapped from img3
            link: '/celebration-cakes',
            btnText: "SELECT YOUR CAKES",
            delay: "200ms",
            style: ""
        },
        {
            id: 3,
            title: "Cooling Sips",
            image: img3, // Swapped from img4
            link: '#',
            btnText: "EXPLORE SHAKES",
            delay: "300ms",
            style: ""
        }
    ];

    const categoriesBottom = [
        {
            id: 4,
            title: "Crunchy Comfort",
            image: img1,
            link: '#',
            btnText: "BUILD YOUR CONES",
            delay: "400ms"
        },
        {
            id: 5,
            title: "Frozen Refreshment",
            image: img2,
            link: '#',
            btnText: "BLENDED JOY",
            delay: "500ms"
        }
    ];

    return (
        <div className="min-h-screen w-full relative font-sans text-[#5D4037] overflow-x-hidden selection:bg-[#BCAaa4] selection:text-white flex flex-col">

            {/* Background with Overlay */}
            <div className="fixed inset-0 z-[-1]">
                <img src={productsBg} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-white/10 mix-blend-soft-light"></div>
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 md:px-12 py-4 absolute top-0 w-full z-50">
                <img
                    src={logo}
                    alt="ibaco"
                    className="h-14 md:h-16 object-contain cursor-pointer drop-shadow-md hover:scale-105 transition-transform"
                    onClick={() => navigate('/')}
                />

                <div className="flex items-center gap-4 relative">
                    <button
                        onClick={() => navigate('/')}
                        className="hidden md:block px-6 py-1.5 rounded-full border border-gray-400/30 bg-white/80 text-sm font-bold text-[#5c3d2e] hover:bg-white transition-all uppercase shadow-sm tracking-wide"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-400/30 bg-white/80 hover:bg-white transition-all text-[#5c3d2e] text-lg z-50 shadow-sm"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Mobile Menu */}
                    <div className={`absolute top-14 right-0 w-64 bg-white/95 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 flex flex-col gap-3 transition-all duration-300 origin-top-right transform ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'}`}>
                        <div className="flex flex-col gap-1">
                            {['Our Story', 'Our Products', 'Store Locator', 'Contact Us'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-3 py-2 hover:bg-gray-100 rounded-lg text-sm"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative pt-28 pb-16 px-4 flex flex-col items-center flex-grow">

                {/* Top Floating Pill Header */}
                <div className="bg-gradient-to-r from-[#F5F5F5]/90 to-[#FFFFFF]/90 backdrop-blur-md px-12 py-3 rounded-full border border-[#D7CCC8] shadow-lg mb-8 animate-fade-in-down transform hover:scale-105 transition-transform duration-500">
                    <h1 className="text-xl md:text-3xl font-serif font-bold text-[#6D4C41] tracking-wide text-center">
                        Ice Cream that melt your heart
                    </h1>
                </div>

                {/* Hero Image Group - Floating & Glowing */}
                <div className="relative w-full max-w-5xl mb-12 animate-float group perspective-1000">
                    {/* Glow behind image */}
                    <div className="absolute inset-0 bg-white/40 filter blur-[80px] rounded-full scale-75 opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>
                    <img
                        src={topBanner}
                        alt="Hero Collection"
                        className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:rotate-1"
                    />
                </div>

                {/* Tagline Strip - Glassmorphism */}
                <div className="w-full max-w-4xl py-3 flex justify-center items-center mb-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md"></div>
                    <p className="relative z-10 text-lg md:text-2xl text-[#4E342E] font-medium text-center font-serif tracking-wide drop-shadow-sm">
                        Choose from 30+ unique Ice creams, 12+ stunning Ice Cakes
                    </p>
                </div>

                {/* "The World of Ibaco" Main Section */}
                <div className="w-full max-w-[85rem] relative mt-8">

                    {/* Outer Fancy Border Frame */}
                    <div className="absolute -inset-4 md:-inset-8 rounded-[4rem] border-[3px] border-[#D7CCC8]/60 pointer-events-none z-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.5)]"></div>
                    <div className="absolute -inset-4 md:-inset-8 rounded-[4rem] border border-white/80 pointer-events-none z-0 mix-blend-overlay"></div>

                    {/* Ribbon Header */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 w-[280px] md:w-[400px]">
                        {/* Ribbon Body */}
                        <div className="relative bg-gradient-to-b from-[#efebe9] to-[#d7ccc8] px-4 py-3 md:py-4 rounded-lg shadow-lg text-center border-t border-white/50">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5D4037] drop-shadow-sm">The World of Ibaco</h2>

                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-30 mix-blend-multiply rounded-lg"></div>

                            {/* Ribbon Ends (Folded effect) */}
                            <div className="absolute top-3 -left-2 w-4 h-full bg-[#8D6E63] transform skew-y-[30deg] -z-10 rounded-sm shadow-md"></div>
                            <div className="absolute top-3 -right-2 w-4 h-full bg-[#8D6E63] transform -skew-y-[30deg] -z-10 rounded-sm shadow-md"></div>
                        </div>
                        {/* Ribbon Tails */}
                        <div className="absolute top-1/2 -left-8 w-10 h-10 bg-[#d7ccc8] transform -translate-y-1/2 -z-20 clip-ribbon-left"></div>
                        <div className="absolute top-1/2 -right-8 w-10 h-10 bg-[#d7ccc8] transform -translate-y-1/2 -z-20 clip-ribbon-right"></div>
                    </div>


                    {/* Products Grid */}
                    <div className="pt-20 pb-12 px-4 md:px-12 flex flex-col gap-12">

                        {/* Row 1: 3 Items - No Pagination */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end">
                            {categoriesTop.map((cat, idx) => (
                                <div key={cat.id} className={`flex flex-col items-center group relative z-10 ${cat.style}`} style={{ animationDelay: cat.delay }}>
                                    {/* Card Body */}
                                    <div
                                        onClick={() => navigate(cat.link)}
                                        className="relative w-full aspect-[4/5] bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-[0_10px_30px_rgba(139,83,72,0.1)] transition-all duration-500 group-hover:bg-white/60 group-hover:scale-[1.03] group-hover:shadow-[0_20px_50px_rgba(139,83,72,0.2)] cursor-pointer overflow-visible flex flex-col items-center justify-end pb-8"
                                    >
                                        {/* Inner Light Glow */}
                                        <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] pointer-events-none"></div>

                                        {/* Image Container - Overflows top slightly */}
                                        <div className="absolute -top-10 w-full h-[75%] flex items-center justify-center p-2">
                                            <img
                                                src={cat.image}
                                                alt={cat.title}
                                                className="w-[90%] h-[90%] object-contain filter drop-shadow-2xl transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-2"
                                            />
                                        </div>

                                        <div className="z-10 text-center mt-auto px-4">
                                            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4E342E] leading-tight mb-2 drop-shadow-sm">{cat.title}</h3>
                                        </div>
                                    </div>

                                    {/* Gradient Pill Button */}
                                    <button
                                        onClick={() => navigate(cat.link)}
                                        className="-mt-5 z-20 bg-gradient-to-r from-[#bcaa99] to-[#a1887f] text-white font-bold text-xs md:text-sm px-8 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:from-[#a1887f] hover:to-[#8d6e63] transition-all transform hover:-translate-y-1 uppercase tracking-widest border border-white/20"
                                    >
                                        {cat.btnText}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Row 2: 2 Items (Centered) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 md:px-32 items-end">
                            {categoriesBottom.map((cat, idx) => (
                                <div key={cat.id} className="flex flex-col items-center group relative z-10" style={{ animationDelay: cat.delay }}>
                                    {/* Card */}
                                    <div
                                        className="relative w-full aspect-[4/3.5] bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-[0_10px_30px_rgba(139,83,72,0.1)] transition-all duration-500 group-hover:bg-white/60 group-hover:scale-[1.03] group-hover:shadow-[0_20px_50px_rgba(139,83,72,0.2)] cursor-pointer overflow-visible flex flex-col items-center justify-end pb-8"
                                    >
                                        <div className="absolute -top-12 w-full h-[85%] flex items-center justify-center p-4">
                                            <img
                                                src={cat.image}
                                                alt={cat.title}
                                                className="w-[85%] h-[85%] object-contain filter drop-shadow-2xl transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:-translate-y-2"
                                            />
                                        </div>

                                        <div className="z-10 text-center mt-auto px-4">
                                            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4E342E] leading-tight mb-2 drop-shadow-sm">{cat.title}</h3>
                                        </div>
                                    </div>
                                    <button
                                        className="-mt-5 z-20 bg-gradient-to-r from-[#bcaa99] to-[#a1887f] text-white font-bold text-xs md:text-sm px-10 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:from-[#a1887f] hover:to-[#8d6e63] transition-all transform hover:-translate-y-1 uppercase tracking-widest border border-white/20"
                                    >
                                        {cat.btnText}
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>

            <Footer />

            <style>
                {`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .clip-ribbon-left {
                    clip-path: polygon(100% 0, 0 50%, 100% 100%);
                }
                .clip-ribbon-right {
                    clip-path: polygon(0 0, 100% 50%, 0 100%);
                }
                `}
            </style>

        </div>
    );
};

export default ProductsHome;
