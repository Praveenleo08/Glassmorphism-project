import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaInstagram, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import bgImage from './assets/ea23eba1-dac1-4a76-abed-fefa52559845.png';
import logo from './assets/logo.png';

// Dummy data for stores
const stores = [
    {
        id: 1,
        name: "IBACO - TN - CBE - SARAVANAMPATTI",
        address: "SRI SARAVANA BAVA TOWERS, SRP MILLS NEAR, COIMBATORE-641032",
        details: ""
    },
    {
        id: 2,
        name: "IBACO - TN - CBE - PEELAMEDU",
        address: "1392A, GROUND FLOOR, AVINASHI ROAD, COIMBATORE, 641004",
        details: ""
    },
    {
        id: 3,
        name: "IBACO - TN - CBE - RAMANATHAPURAM",
        address: "NILGIRIS SUPER MARKET, COIMBATORE, TAMIL NADU, 641018",
        details: ""
    },
    {
        id: 4,
        name: "IBACO - TN - CBE - RS PURAM",
        address: "DB ROAD, RS PURAM, COIMBATORE, 641002",
        details: ""
    },
    {
        id: 5,
        name: "IBACO - TN - CHENNAI - ANNA NAGAR",
        address: "12, 2ND AVENUE, ANNA NAGAR, CHENNAI, 600040",
        details: ""
    }
];

function StoreLocator() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [city, setCity] = useState('Coimbatore');
    const [pincode, setPincode] = useState('');

    const filteredStores = stores.filter(store => {
        if (pincode) {
            return store.address.includes(pincode) || store.name.includes(pincode);
        }
        if (city) {
            return store.address.toLowerCase().includes(city.toLowerCase()) || store.name.toLowerCase().includes(city.toLowerCase());
        }
        return true;
    });

    const mapQuery = `ibaco+${encodeURIComponent(pincode || city || 'Tamil Nadu')}`;

    return (
        <div className="min-h-screen w-full relative font-sans overflow-x-hidden text-[#5D4037]">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
            </div>

            {/* Floating Blobs Animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-4 md:px-10 py-4 md:py-6 absolute top-0 w-full z-50">
                <Link to="/">
                    <img src={logo} alt="ibaco" className="h-16 md:h-24 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-md" />
                </Link>

                <div className="flex items-center gap-2 md:gap-4 relative">
                    <Link to="/login">
                        <button className="hidden sm:block px-4 md:px-8 py-1 md:py-1.5 rounded-lg border border-black/20 bg-transparent text-xs md:text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-lg backdrop-blur-sm">
                            login
                        </button>
                    </Link>
                    <button className="hidden sm:block px-4 md:px-6 py-1 md:py-1.5 rounded-lg border border-black/20 bg-transparent text-xs md:text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-lg backdrop-blur-sm">
                        Our Products
                    </button>
                    <Link to="/">
                        <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-lg md:text-xl shadow-lg backdrop-blur-sm">
                            <FaHome />
                        </button>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-lg md:text-xl z-50 relative shadow-lg backdrop-blur-sm"
                    >
                        <FaBars />
                    </button>

                    {/* Mobile Menu Dropdown */}
                    <div className={`absolute top-14 md:top-16 right-0 w-64 md:w-72 bg-white/90 backdrop-blur-3xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 md:p-6 flex flex-col gap-3 md:gap-4 transition-all duration-300 origin-top-right transform ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'} z-40`}>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Explore</h3>
                            <Link to="/our-story" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Story</Link>
                            <span className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg cursor-pointer">Our Products</span>
                            <span className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg cursor-pointer text-[#D81B60] font-bold">Store Locator</span>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Support</h3>

                            <Link to="/contact-us" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen pt-32 md:pt-44 pb-20 px-4 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-10 md:mb-12 animate-fade-in-left">
                    <h1 className="text-5xl md:text-7xl font-sans font-bold text-white drop-shadow-lg mb-2 tracking-tight">Locate Us</h1>
                    <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide">(Company owned parlours)</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-4xl justify-center animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                    <select 
                        value={city} 
                        onChange={(e) => { setCity(e.target.value); setPincode(''); }}
                        className="w-full md:w-auto px-8 py-3 appearance-none rounded-2xl md:rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl text-white font-bold hover:bg-white/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-center md:text-left"
                    >
                        <option value="" className="text-black">All Cities</option>
                        <option value="Coimbatore" className="text-black">Coimbatore</option>
                        <option value="Chennai" className="text-black">Chennai</option>
                    </select>
                    
                    <input 
                        type="text" 
                        placeholder="Pincode" 
                        value={pincode}
                        onChange={(e) => { setPincode(e.target.value); setCity(''); }}
                        className="w-full px-8 py-3 rounded-2xl md:rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl text-white font-bold placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all md:w-48 text-center"
                    />
                </div>

                {/* Main Glass Content */}
                <div className="w-full max-w-6xl h-auto md:h-[600px] min-h-[800px] md:min-h-0 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden animate-fade-in-left" style={{ animationDelay: '0.4s' }}>

                    {/* Left: Map Placeholder */}
                    <div className="w-full md:w-[60%] h-[400px] md:h-full relative p-4 group">
                        <div className="w-full h-full rounded-[30px] overflow-hidden bg-gray-900/40 relative shadow-inner border border-white/10 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <iframe
                                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(20%) contrast(1.2) opacity(0.9)' }}
                                allowFullScreen=""
                                loading="lazy"
                                className="group-hover:filter-none transition-all duration-700 scale-100 group-hover:scale-105"
                            ></iframe>

                            {/* Map Overlay Text */}
                            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg pointer-events-none">
                                <p className="text-sm font-bold text-gray-800 flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /> {filteredStores.length} Location{filteredStores.length !== 1 ? 's' : ''} Nearby</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: List */}
                    <div className="w-full md:w-[40%] h-[400px] md:h-full bg-white/5 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/10 flex flex-col">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-2xl font-bold text-white drop-shadow-md">Available Stores</h2>
                            <p className="text-white/60 text-sm">Scroll to view all</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50 transition-colors">
                            <div className="flex flex-col gap-4">
                                {filteredStores.length > 0 ? filteredStores.map((store) => (
                                    <div key={store.id} className="p-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer group hover:translate-x-2 duration-300 shadow-md">
                                        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-pink-200 transition-colors">{store.name}</h3>
                                        <p className="text-white/80 leading-relaxed font-medium text-sm border-t border-white/10 pt-2 mt-1">
                                            {store.address}
                                        </p>
                                    </div>
                                )) : (
                                    <div className="p-5 text-white/80 font-medium">No stores found for selected location.</div>
                                )}
                            </div>
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
                            <span className="text-[#D81B60] font-bold cursor-default">Store Locator</span>
                        </div>
                        <div className="flex flex-col gap-2">

                            <Link to="/contact-us" className="text-gray-700 hover:text-[#922B21] font-medium transition-colors cursor-pointer">Contact Us</Link>
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
}

export default StoreLocator;
