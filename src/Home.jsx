import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaStar, FaHeart, FaLeaf, FaMedal, FaInstagram, FaHome, FaUserCircle } from 'react-icons/fa'; // Using fa icons as placeholders
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Navbar from './Navbar'; // Import Navbar
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
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const slide = slides[current];

    return (
        <div
            className="min-h-screen w-full relative font-sans overflow-x-hidden transition-colors duration-1000 ease-in-out"
            style={{ backgroundColor: slide.bg }}
        >
            <Navbar /> {/* Use Navbar component */}

            {/* Hero Section */}
            <div className="relative w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-between pt-32 md:pt-24 px-6 md:px-16 overflow-hidden pb-12">

                {/* Background Blobs (Optional for extra glassmorphism feel) */}
                <div className="absolute top-20 right-20 w-64 md:w-96 h-64 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 left-20 w-64 md:w-96 h-64 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                {/* Left Content */}
                <div className="w-full md:w-[50%] lg:w-[45%] z-20 flex flex-col items-center md:items-start animate-fade-in-left text-center md:text-left mt-10 md:mt-0 md:pl-8">
                    <h1 className="text-5xl md:text-[5rem] leading-[1.1] mb-4 md:mb-6 font-handwriting text-[#5D4037] drop-shadow-sm font-normal">
                        {slide.titleFirst} <br />
                        {slide.titleSecond}
                    </h1>

                    <p className="text-base md:text-xl font-bold max-w-xl mb-8 md:mb-10 leading-relaxed text-black/80 tracking-wide font-sans px-4 md:px-0">
                        {slide.desc}
                    </p>

                    {/* Flavor Circles (Navigation) */}
                    <div className="flex gap-4 md:gap-8 mb-4 items-end md:pl-4 h-24 md:h-32 relative justify-center md:justify-start w-full md:w-auto">
                        {/* Line indicating selection (hidden on mobile for cleaner look) */}
                        <div className="hidden md:block absolute bottom-[-10px] h-1 bg-white/50 w-full rounded-full"></div>
                        <div
                            className="hidden md:block absolute bottom-[-10px] h-1 bg-white w-20 transition-all duration-300 ease-in-out z-10"
                            style={{ left: `${current * (80 + 32) + 16}px` }} // Approx calc for simplicity
                        ></div>

                        {slides.map((s, i) => (
                            <div
                                key={i}
                                className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-2 md:border-4 p-1 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 z-20 ${current === i ? 'scale-125 border-white -translate-y-2 md:-translate-y-4' : 'border-white/50 grayscale-[50%]'}`}
                                onClick={() => setCurrent(i)}
                            >
                                <img src={s.image || s.thumb} className="w-full h-full object-cover rounded-full" alt={s.titleFirst} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Big Image */}
                <div className="w-full md:w-[50%] relative h-[40vh] md:h-[80vh] flex items-center justify-center pointer-events-none z-10 mt-12 md:mt-0">
                    {/* Pinkish abstract bg shape from design */}
                    <svg className="hidden md:block absolute top-0 right-0 h-full w-full z-0 opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M50 0 C 80 20, 100 60, 100 100 L 100 0 Z" fill="rgba(255,255,255,0.3)" />
                    </svg>

                    <div key={current} className="relative z-10 animate-float-enter flex justify-center w-full">
                        <img 
                            src={slide.mainImg} 
                            alt={slide.titleFirst} 
                            className="w-[85%] md:w-[90%] max-w-[600px] xl:max-w-[700px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] filter brightness-110 contrast-110 transition-transform duration-500 hover:scale-105" 
                        />
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
            <div className="relative z-20 -mt-8 md:-mt-16 px-4 md:px-10">
                <div className="w-full max-w-6xl mx-auto rounded-3xl md:rounded-[50px] bg-gradient-to-br from-[#A93226]/90 to-[#922B21]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(169,50,38,0.5)] relative overflow-hidden flex flex-col md:flex-row items-center p-2 border border-white/20 ring-1 ring-white/30">

                    {/* Left Text */}
                    <div className="w-full md:flex-1 p-6 md:p-8 text-white text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight font-sans tracking-wide">
                            Plunge into <br className="hidden md:block" />
                            our Ice <br className="hidden md:block" />
                            Cream <br className="hidden md:block" />
                            ocean
                        </h2>
                    </div>

                    {/* Stats */}
                    <div className="w-full md:flex-1 flex justify-center items-center gap-8 md:gap-16 p-6 text-white border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-white/10">
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-bold font-sans">25+</div>
                            <div className="text-xs md:text-sm font-bold uppercase tracking-wider mt-2">Diverse <br /> Categories</div>
                        </div>
                    </div>

                    <div className="w-full md:flex-1 flex justify-center items-center p-6 text-white">
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-bold font-sans">125 +</div>
                            <div className="text-xs md:text-sm font-bold uppercase tracking-wider mt-2">Ice Creams</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <div className="w-full bg-[#D98880] py-4 mt-8 overflow-hidden relative">
                <div className="whitespace-nowrap animate-marquee flex gap-10 text-[#7B241C] font-bold text-lg md:text-xl uppercase tracking-widest font-cursive">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <span key={i}>Ice Creams that are lip-smackingly delicious!</span>
                    ))}
                </div>
            </div>

            {/* Features Row */}
            <div className="w-full bg-blue-300/30 backdrop-blur-sm py-8 md:py-12 flex justify-center gap-8 md:gap-16 items-center flex-wrap px-4">
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
                    <div className="bg-[#A93226] p-3 rounded-full text-white text-xl md:text-2xl shadow-lg"><FaMedal /></div>
                    <span className="font-bold text-[#5D4037] text-sm md:text-lg leading-tight">No Compromise <br className="hidden md:block"/> on Quality!</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
                    <div className="bg-[#E67E22] p-3 rounded-full text-white text-xl md:text-2xl shadow-lg"><FaStar /></div>
                    <span className="font-bold text-[#5D4037] text-sm md:text-lg leading-tight">Creative and <br className="hidden md:block"/> Innovative</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
                    <div className="bg-[#8D6E63] p-3 rounded-full text-white text-xl md:text-2xl shadow-lg"><FaLeaf /></div>
                    <span className="font-bold text-[#5D4037] text-sm md:text-lg leading-tight">Naturally <br className="hidden md:block"/> Pure</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
                    <div className="bg-[#C0392B] p-3 rounded-full text-white text-xl md:text-2xl shadow-lg"><FaHeart /></div>
                    <span className="font-bold text-[#5D4037] text-sm md:text-lg leading-tight">Made with <br className="hidden md:block"/> Care</span>
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
                <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center text-sm gap-8 md:gap-4">

                    {/* Brand / Copyright */}
                    <div className="flex flex-col gap-1 w-full md:w-1/4">
                        <span className="text-red-800 font-bold text-lg tracking-wider">ibaco</span>
                        <p className="text-gray-600">© 2024 Hatsun Agro Product Ltd.</p>
                        <p className="text-gray-500 text-xs text-justify md:max-w-xs">NO COMPROMISE. NATURALLY. CREATIVE AND REAL.</p>
                    </div>

                    {/* Links Column 1 */}
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <h3 className="text-gray-800 font-semibold mb-1">Explore</h3>
                        <Link to="/our-story"><p className="hover:text-[#922B21] cursor-pointer">Our Story</p></Link>
                        <Link to="/products"><p className="hover:text-[#922B21] cursor-pointer">Our Products</p></Link>
                        <Link to="/store-locator"><p className="hover:text-[#922B21] cursor-pointer">Store Locator</p></Link>
                    </div>

                    {/* Links Column 2 */}
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <h3 className="text-gray-800 font-semibold mb-1">Support</h3>

                        <Link to="/contact-us"><p className="hover:text-[#922B21] cursor-pointer">Contact Us</p></Link>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-2 w-full md:w-auto">
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

