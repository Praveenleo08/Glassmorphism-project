import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMedal, FaLightbulb, FaHeart, FaInstagram, FaBars, FaHome } from 'react-icons/fa';
import logo from './assets/logo.png';
import bg from './assets/Glassmorphism images Source/bg.png';

// New Asset Imports (User Provided)
import img1 from './assets/Our story images/1.png';
import img2 from './assets/Our story images/2.png';
import img3 from './assets/Our story images/3.png';
import img4 from './assets/Our story images/4.png';
import img5 from './assets/Our story images/5.png';
import img6 from './assets/Our story images/6.png';
import img7 from './assets/Our story images/7.png';
import img8 from './assets/Our story images/8.png';

// Scroll Reveal Component
const RevealOnScroll = ({ children, direction = 'up', delay = '0ms' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);

    const getTransform = () => {
        if (isVisible) return 'translate(0, 0)';
        if (direction === 'left') return 'translateX(-50px)';
        if (direction === 'right') return 'translateX(50px)';
        return 'translateY(50px)';
    };

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `all 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}`
            }}
        >
            {children}
        </div>
    );
};

const timelineData = [
    { year: '2012', title: 'A Fresh Beginning', desc: 'Ibaco was launched with a vision to redefine the ice cream experience by offering freshly scooped, customizable ice creams.', img: img1 },
    { year: '2013', title: 'Flavor Innovation', desc: 'We introduced new exotic flavors derived from premiums ingredients sourced globally, setting a new standard.', img: img2 },
    { year: '2015', title: 'Growing Together', desc: 'Expanding our footprint to over 50 stores, bringing the joy of ice cream to more neighborhoods.', img: img3 },
    { year: '2017', title: 'Signature Cakes', desc: 'Launched our exclusive range of ice cream cakes, perfect for celebrating life’s special moments.', img: img4 },
    { year: '2019', title: 'New Aesthetics', desc: 'Revamped our store interiors to provide a more immersive and premium dessert experience.', img: img5 },
    { year: '2021', title: 'Digital Reach', desc: 'Started home delivery and online ordering to serve our customers from the comfort of their homes.', img: img6 },
    { year: '2023', title: 'Limitless Toppings', desc: 'Expanded our toppings bar to include over 30 varieties, allowing for infinite customization.', img: img7 },
    { year: '2025', title: 'Future Ready', desc: 'Continuing the legacy of quality and taste with sustainable practices and new culinary adventures.', img: img8 },
];

const OurStory = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen w-full relative font-sans overflow-x-hidden text-[#5D4037]">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <img src={bg} alt="Background" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-purple-200/40 via-pink-100/40 to-blue-100/40 mix-blend-overlay"></div>
            </div>

            {/* Floating Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-4 md:px-10 py-4 md:py-6 absolute top-0 w-full z-50">
                <Link to="/">
                    <img src={logo} alt="ibaco" className="h-16 md:h-24 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-md" />
                </Link>

                <div className="flex items-center gap-2 md:gap-4 relative">
                    <Link to="/login">
                        <button className="hidden sm:block px-4 md:px-8 py-1 md:py-1.5 rounded-lg border border-black/20 bg-transparent text-xs md:text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-sm">
                            login
                        </button>
                    </Link>
                    <button className="hidden sm:block px-4 md:px-6 py-1 md:py-1.5 rounded-lg border border-black/20 bg-transparent text-xs md:text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-sm">
                        Our Products
                    </button>
                    <Link to="/">
                        <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-lg md:text-xl shadow-sm">
                            <FaHome />
                        </button>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-lg md:text-xl z-50 relative"
                    >
                        <FaBars />
                    </button>

                    {/* Mobile Menu Dropdown with Smooth Animation */}
                    <div className={`absolute top-14 md:top-16 right-0 w-64 md:w-72 bg-white/90 backdrop-blur-3xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 md:p-6 flex flex-col gap-3 md:gap-4 transition-all duration-300 origin-top-right transform ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'} z-40`}>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Explore</h3>
                            <Link to="/our-story" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Story</Link>
                            <span className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg cursor-pointer">Our Products</span>
                            <Link to="/store-locator" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Store Locator</Link>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Support</h3>

                            <Link to="/contact-us" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 pb-20 pt-44 flex flex-col items-center">

                {/* Header Card */}
                <RevealOnScroll direction="up">
                    <div className="w-full max-w-5xl bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-2xl border border-white/60 rounded-3xl md:rounded-[50px] p-6 md:p-20 text-center shadow-[0_20px_50px_rgba(31,38,135,0.15)] mb-12 md:mb-20 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#922B21] to-transparent opacity-50"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        <h1 className="font-cursive text-5xl md:text-8xl mb-6 md:mb-8 text-[#922B21] drop-shadow-sm animate-float">A Fresh Scoop Begins</h1>
                        <p className="text-base md:text-2xl leading-relaxed text-gray-800 max-w-3xl mx-auto font-medium tracking-wide">
                            <span className="font-bold text-[#D32F2F] text-xl md:text-3xl">Ibaco</span> was launched with a vision to redefine the
                            ice cream experience by offering freshly scooped,
                            customizable ice creams made with premium ingredients.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* New Section: Our Philosophy */}
                <div className="w-full max-w-6xl mb-32">
                    <RevealOnScroll delay="100ms">
                        <h2 className="text-4xl font-black uppercase tracking-widest text-[#880E4F] text-center mb-16 drop-shadow-sm">What Drives Us</h2>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Quality */}
                        <RevealOnScroll delay="200ms" direction="up">
                            <div className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[40px] p-10 text-center hover:bg-white/40 transition-all duration-300 hover:-translate-y-2 shadow-lg group">
                                <div className="w-20 h-20 bg-white/70 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[#E91E63] text-4xl group-hover:scale-110 transition-transform">
                                    <FaMedal />
                                </div>
                                <h3 className="text-2xl font-bold text-[#922B21] mb-4">Premium Quality</h3>
                                <p className="text-gray-800 font-medium">We source only the finest ingredients from around the world to ensure every scoop is pure perfection.</p>
                            </div>
                        </RevealOnScroll>

                        {/* Innovation */}
                        <RevealOnScroll delay="300ms" direction="up">
                            <div className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[40px] p-10 text-center hover:bg-white/40 transition-all duration-300 hover:-translate-y-2 shadow-lg group">
                                <div className="w-20 h-20 bg-white/70 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[#FBC02D] text-4xl group-hover:scale-110 transition-transform">
                                    <FaLightbulb />
                                </div>
                                <h3 className="text-2xl font-bold text-[#922B21] mb-4">Endless Innovation</h3>
                                <p className="text-gray-800 font-medium">Constantly experimenting with new flavors and textures to bring you the most exciting deserts.</p>
                            </div>
                        </RevealOnScroll>

                        {/* Passion */}
                        <RevealOnScroll delay="400ms" direction="up">
                            <div className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[40px] p-10 text-center hover:bg-white/40 transition-all duration-300 hover:-translate-y-2 shadow-lg group">
                                <div className="w-20 h-20 bg-white/70 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[#D81B60] text-4xl group-hover:scale-110 transition-transform">
                                    <FaHeart />
                                </div>
                                <h3 className="text-2xl font-bold text-[#922B21] mb-4">Made with Love</h3>
                                <p className="text-gray-800 font-medium">Everything we create is crafted with passion and care, designed to create unforgettable moments.</p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Timeline Title */}
                <RevealOnScroll delay="200ms">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-center mb-28 select-none relative drop-shadow-sm">
                        Our Journey Over The Years
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] rounded-full"></span>
                    </h2>
                </RevealOnScroll>

                {/* Vertical Timeline */}
                <div className="w-full max-w-6xl relative">
                    <div className="flex flex-col gap-32 relative">
                        {/* Central Dashed Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 border-l-4 border-dotted border-[#922B21]/30 -translate-x-1/2 hidden md:block"></div>

                        {timelineData.map((item, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                {/* Timeline Content Card */}
                                <div className={`w-full md:w-[45%] relative group perspective-1000`}>
                                    <RevealOnScroll direction={index % 2 === 0 ? 'left' : 'right'}>
                                        <div className="bg-gradient-to-br from-white/70 via-white/40 to-pink-50/20 backdrop-blur-xl border border-white/60 rounded-3xl md:rounded-[40px] p-6 md:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(233,30,99,0.2)] transition-all duration-500 md:hover:-translate-y-2 relative overflow-hidden flex flex-col justify-center min-h-[auto] md:min-h-[250px] mt-6 md:mt-0">

                                            {/* Hover Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Year Badge - Integrated into card layout for better alignment */}
                                            <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 font-black text-6xl md:text-8xl text-[#922B21] select-none z-0">
                                                {item.year}
                                            </div>
                                            <div className="w-max bg-white/60 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-full font-black text-[#D81B60] text-lg md:text-xl shadow-sm mb-4 md:mb-6 z-10 border border-white/50 relative">
                                                {item.year}
                                            </div>

                                            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                                                <div className="order-2 md:order-1 flex-1">
                                                    <h3 className="text-2xl md:text-3xl font-bold text-[#880E4F] mb-2 md:mb-4 group-hover:text-[#D81B60] transition-colors">{item.title}</h3>
                                                    <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">{item.desc}</p>
                                                </div>
                                                <div className="order-1 md:order-2 w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white/60 rounded-full flex items-center justify-center p-3 md:p-4 shadow-inner group-hover:rotate-12 transition-transform duration-500 border border-white">
                                                    <img src={item.img} alt={item.year} className="w-full h-full object-contain filter drop-shadow-md" />
                                                </div>
                                            </div>
                                        </div>
                                    </RevealOnScroll>
                                </div>

                                {/* Placeholder for opposite side spacing on desktop */}
                                <div className="hidden md:block w-[45%]"></div>

                                {/* Center Dot with Pulse */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">
                                    <RevealOnScroll delay="100ms">
                                        <div className="w-8 h-8 bg-[#E91E63] rounded-full border-4 border-white shadow-lg relative group-hover:scale-125 transition-transform duration-300">
                                            <div className="absolute inset-0 bg-[#E91E63] rounded-full animate-ping opacity-75"></div>
                                        </div>
                                    </RevealOnScroll>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer - Moved Outside Container for Full Width */}
            <footer className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl py-8 mt-12 border-t border-white/60 shadow-lg relative z-10 w-full">
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
                        <Link to="/our-story"><p className="hover:text-[#922B21] cursor-pointer text-[#922B21] font-bold">Our Story</p></Link>
                        <p className="hover:text-[#922B21] cursor-pointer">Our Products</p>
                        <Link to="/store-locator"><p className="hover:text-[#922B21] cursor-pointer">Store Locator</p></Link>
                    </div>

                    {/* Links Column 2 */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gray-800 font-semibold mb-1">Support</h3>

                        <Link to="/contact-us"><p className="hover:text-[#922B21] cursor-pointer">Contact Us</p></Link>
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
};

export default OurStory;
