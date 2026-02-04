import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaStar, FaHeart, FaLeaf, FaMedal, FaInstagram, FaHome } from 'react-icons/fa'; // Using fa icons as placeholders for the quality icons
import logo from './assets/logo.png';
import mainBg from './assets/Glassmorphism images Source/bg.png';

// Import Images
// Import Images - Main (High Res)
import chocoMain from './assets/Glassmorphism images Source/choco_new.png'; // High quality choco
import pistaMain from './assets/Glassmorphism images Source/pista_new.png';
import butterMain from './assets/Glassmorphism images Source/butter_new.png';
import cottonMain from './assets/Glassmorphism images Source/cotton candy.png';

import cake1 from './assets/Glassmorphism images Source/cake 1.png';
import cake2 from './assets/Glassmorphism images Source/cake 2.png';
import cake3 from './assets/Glassmorphism images Source/cake 3.png';
import cake4 from './assets/Glassmorphism images Source/cake 4.jpeg'; // Note: User specified jpeg in prompt, checking imports
import cake5 from './assets/Glassmorphism images Source/cake 5.jpeg';
import cake6 from './assets/Glassmorphism images Source/cake 6.jpeg'; // Assuming these filenames match user request

// Thumbnails
import thumbPista from './assets/Glassmorphism images Source/pista_new.png';
import thumbChoco from './assets/Glassmorphism images Source/choco_new.png';
import thumbButter from './assets/Glassmorphism images Source/butter_new.png';
import thumbCotton from './assets/Glassmorphism images Source/cotton candy.png';

// Data for slides to allow switching, but styling focuses on Cotton Candy as verification
const slides = [
    {
        id: 'cotton',
        titleFirst: 'Cotton Candy',
        titleSecond: 'Ice Cream',
        desc: 'A blend of vanilla, strawberry, and a hint of caramelized sugar. This combination creates a sweet, slightly fruity, and light flavor',
        bg: '#F8BBD0', // Pinkish
        accentColor: '#880E4F',
        mainImg: cottonMain,
        thumb: thumbCotton
    },
    {
        id: 'pista',
        titleFirst: 'Pista',
        titleSecond: 'Ice-Cream',
        desc: 'A popular, often green-colored dessert with a distinctive nutty and slightly sweet flavor from pistachios',
        bg: '#C5E1A5',
        accentColor: '#558B2F',
        mainImg: pistaMain,
        thumb: thumbPista
    },
    {
        id: 'choco',
        titleFirst: 'Choco',
        titleSecond: 'Ice-Cream',
        desc: 'A creamy frozen treat flavored with natural or artificial chocolate',
        bg: '#d7b49e',
        accentColor: '#5D4037',
        mainImg: chocoMain,
        thumb: thumbChoco
    },
    {
        id: 'butterscotch',
        titleFirst: 'Butterscotch',
        titleSecond: 'Ice-Cream',
        desc: 'A popular frozen dessert featuring a creamy, sweet base infused with rich butterscotch flavor, often studded with crunchy bits of caramelized sugar and nuts',
        bg: '#FFE082',
        accentColor: '#FF6F00',
        mainImg: butterMain,
        thumb: thumbButter
    }
];

function Home() {
    const [current, setCurrent] = useState(0); // Start with Cotton Candy (index 0)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const slide = slides[current];

    return (
        <div
            className="min-h-screen w-full relative font-sans overflow-x-hidden transition-colors duration-1000 ease-in-out"
            style={{ backgroundColor: slide.bg }}
        >
            {/* Navbar */}
            <nav className="flex items-center justify-between px-10 py-6 absolute top-0 w-full z-50">
                <img src={logo} alt="ibaco" className="h-40 object-contain" />

                <div className="flex items-center gap-4 relative">
                    <Link to="/login">
                        <button className="px-8 py-1.5 rounded-lg border border-black/20 bg-transparent text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-sm">
                            login
                        </button>
                    </Link>
                    <Link to="/products">
                        <button className="px-6 py-1.5 rounded-lg border border-black/20 bg-transparent text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-sm">
                            Our Products
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-xl shadow-sm">
                            <FaHome />
                        </button>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-xl z-50 relative"
                    >
                        <FaBars />
                    </button>

                    {/* Mobile Menu Dropdown with Smooth Animation */}
                    <div className={`absolute top-16 right-0 w-72 bg-white/80 backdrop-blur-3xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4 transition-all duration-300 origin-top-right transform ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'} z-40`}>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Explore</h3>
                            <Link to="/our-story" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Story</Link>
                            <Link to="/products" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Products</Link>
                            <Link to="/store-locator" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Store Locator</Link>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Support</h3>
                            <span className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg cursor-pointer">Order Online</span>
                            <Link to="/contact-us" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Contact Us</Link>
                            <span className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg cursor-pointer">Nutritional Info</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex items-center pt-24 px-16 overflow-hidden">

                {/* Background Blobs (Optional for extra glassmorphism feel) */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                {/* Left Content */}
                <div className="w-[60%] z-10 flex flex-col items-start animate-fade-in-left">
                    <h1 className="text-[5rem] leading-[1.1] mb-6 font-handwriting text-[#5D4037] drop-shadow-sm font-normal">
                        {slide.titleFirst} <br />
                        {slide.titleSecond}
                    </h1>

                    <p className="text-xl font-bold max-w-xl mb-10 leading-relaxed text-black/80 tracking-wide font-sans">
                        {slide.desc}
                    </p>

                    {/* Flavor Circles (Navigation) */}
                    <div className="flex gap-8 mb-4 items-end pl-4 h-32 relative">
                        {/* Line indicating selection */}
                        <div className="absolute bottom-[-10px] h-1 bg-white/50 w-full rounded-full"></div>
                        <div
                            className="absolute bottom-[-10px] h-1 bg-white w-20 transition-all duration-300 ease-in-out z-10"
                            style={{ left: `${current * (80 + 32) + 16}px` }} // Approx calc for simplicity
                        ></div>

                        {slides.map((s, i) => (
                            <div
                                key={i}
                                className={`w-20 h-20 rounded-full border-4 p-1 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 z-20 ${current === i ? 'scale-125 border-white -translate-y-4' : 'border-white/50 grayscale-[50%]'}`}
                                onClick={() => setCurrent(i)}
                            >
                                <img src={s.image || s.thumb} className="w-full h-full object-cover rounded-full" alt={s.titleFirst} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Big Image */}
                <div className="w-[45%] absolute right-0 top-0 h-full flex items-center justify-center pointer-events-none z-0">
                    {/* Pinkish abstract bg shape from design */}
                    <svg className="absolute top-0 right-0 h-full w-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M50 0 C 80 20, 100 60, 100 100 L 100 0 Z" fill="rgba(255,255,255,0.3)" />
                    </svg>

                    <div key={current} className={`relative z-10 animate-float-enter ${current === 0 ? 'w-[550px] right-[50px] top-[100px]' : current === 2 ? 'w-[600px] right-[0px] top-[80px]' : 'w-[800px] right-[-50px] top-[50px]'}`}>
                        <img src={slide.mainImg} alt={slide.titleFirst} className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] filter brightness-110 contrast-110" />
                    </div>
                </div>
            </div>

            {/* Background Blobs for Glassmorphism */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Red Banner & Marquee Section */}
            {/* The red card overlaps the hero a bit */}
            <div className="relative z-20 -mt-24 px-10">
                <div className="w-full max-w-6xl mx-auto rounded-[50px] bg-gradient-to-br from-[#A93226]/90 to-[#922B21]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(169,50,38,0.5)] relative overflow-hidden flex flex-col md:flex-row items-center p-2 border border-white/20 ring-1 ring-white/30">

                    {/* Left Text */}
                    <div className="flex-1 p-8 text-white">
                        <h2 className="text-4xl font-bold leading-tight font-sans tracking-wide">
                            Plunge into <br />
                            our Ice <br />
                            Cream <br />
                            ocean
                        </h2>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 flex justify-center items-center gap-16 p-6 text-white border-l border-white/10 border-r border-white/10">
                        <div className="text-center">
                            <div className="text-6xl font-bold font-sans">25+</div>
                            <div className="text-sm font-bold uppercase tracking-wider mt-2">Diverse <br /> Categories</div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center items-center p-6 text-white">
                        <div className="text-center">
                            <div className="text-6xl font-bold font-sans">125 +</div>
                            <div className="text-sm font-bold uppercase tracking-wider mt-2">Ice Creams</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div className="w-full bg-[#D98880] py-4 mt-8 overflow-hidden relative">
                <div className="whitespace-nowrap animate-marquee flex gap-10 text-[#7B241C] font-bold text-xl uppercase tracking-widest font-cursive">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <span key={i}>Ice Creams that are lip-smackingly delicious!</span>
                    ))}
                </div>
            </div>

            {/* Features Row */}
            <div className="w-full bg-blue-300/30 backdrop-blur-sm py-12 flex justify-center gap-16 items-center flex-wrap">
                <div className="flex items-center gap-4">
                    <div className="bg-[#A93226] p-3 rounded-full text-white text-2xl shadow-lg"><FaMedal /></div>
                    <span className="font-bold text-[#5D4037] text-lg leading-tight">No Compromise <br /> on Quality!</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-[#E67E22] p-3 rounded-full text-white text-2xl shadow-lg"><FaStar /></div>
                    <span className="font-bold text-[#5D4037] text-lg leading-tight">Creative and <br /> Innovative</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-[#8D6E63] p-3 rounded-full text-white text-2xl shadow-lg"><FaLeaf /></div>
                    <span className="font-bold text-[#5D4037] text-lg leading-tight">Naturally <br /> Pure</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-[#C0392B] p-3 rounded-full text-white text-2xl shadow-lg"><FaHeart /></div>
                    <span className="font-bold text-[#5D4037] text-lg leading-tight">Made with <br /> Care</span>
                </div>
            </div>



            {/* Red Separator */}
            <div className="w-full h-12 bg-[#922B21] mt-8 shadow-inner border-t-4 border-[#C0392B]"></div>

            <div className="text-center mt-12 mb-4 relative z-10">
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-widest text-outline opacity-30 select-none">We hear you scream</h2>
                <h2 className="text-6xl md:text-7xl font-cursive text-[#922B21] -mt-10 md:-mt-14 relative z-10 drop-shadow-md">For Ice-Cream</h2>
            </div>

            {/* Cake Animation Section */}
            <div className="py-12 px-10 overflow-hidden relative z-10">
                <div className="flex gap-8 animate-marquee whitespace-nowrap">
                    {[cake1, cake2, cake3, cake4, cake5, cake6, cake1, cake2, cake3, cake4, cake5, cake6].map((cake, index) => (
                        <div key={index} className="w-[300px] h-[350px] shrink-0 bg-pink-100/40 backdrop-blur-md rounded-[40px] p-6 flex items-center justify-center border border-white/60 shadow-[0_10px_40px_-10px_rgba(255,182,193,0.5)] hover:scale-105 transition-transform duration-300 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img src={cake} alt={`Cake ${index}`} className="w-full h-full object-contain drop-shadow-xl relative z-10 filter brightness-105" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl py-8 mt-12 border-t border-white/60 shadow-lg relative z-10">
                <div className="w-full max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center text-sm gap-4">

                    {/* Brand / Copyright */}
                    <div className="flex flex-col gap-1">
                        <span className="text-red-800 font-bold text-lg tracking-wider">ibaco</span>
                        <p className="text-gray-600">© 2024 Hatsun Agro Product Ltd.</p>
                        <p className="text-gray-500 text-xs text-justify max-w-xs">NO COMPROMISE. NATURALLY. CREATIVE AND REAL.</p>
                    </div>

                    {/* Links Column 1 */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gray-800 font-semibold mb-1">Explore</h3>
                        <Link to="/our-story"><p className="hover:text-[#922B21] cursor-pointer">Our Story</p></Link>
                        <Link to="/products"><p className="hover:text-[#922B21] cursor-pointer">Our Products</p></Link>
                        <Link to="/store-locator"><p className="hover:text-[#922B21] cursor-pointer">Store Locator</p></Link>
                    </div>

                    {/* Links Column 2 */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gray-800 font-semibold mb-1">Support</h3>
                        <p className="hover:text-[#922B21] cursor-pointer">Order Online</p>
                        <Link to="/contact-us"><p className="hover:text-[#922B21] cursor-pointer">Contact Us</p></Link>
                        <p className="hover:text-[#922B21] cursor-pointer">Nutritional Info</p>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gray-800 font-semibold mb-1">Follow Us</h3>
                        <div className="flex gap-3">
                            <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-red-500 hover:bg-red-50 cursor-pointer shadow-sm text-xs"><FaInstagram /></span>
                            <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-blue-600 hover:bg-blue-50 cursor-pointer shadow-sm text-xs">f</span>
                            <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-pink-600 hover:bg-pink-50 cursor-pointer shadow-sm text-xs">In</span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Home;

