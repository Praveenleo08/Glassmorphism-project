import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaShoppingCart, FaUserCircle, FaHome } from 'react-icons/fa';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useCart } from './CartContext';
import logo from './assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { getCartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <nav className="flex items-center justify-between px-4 md:px-10 py-4 md:py-6 absolute top-0 w-full z-50 pointer-events-none">
            {/* Pointer events navigate properly to children, but we need pointer-events-auto on interactive elements */}
            <Link to="/" className="pointer-events-auto">
                <img src={logo} alt="ibaco" className="h-16 md:h-24 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-md" />
            </Link>

            <div className="flex items-center gap-2 md:gap-4 relative pointer-events-auto">
                {user ? (
                    <Link to="/account" className="flex items-center gap-2 px-3 md:px-6 py-1.5 rounded-lg border border-black/20 bg-white/20 hover:bg-white/40 transition-all shadow-sm backdrop-blur-sm group">
                        <FaUserCircle className="text-[#880E4F] text-lg md:text-xl group-hover:scale-110 transition-transform" />
                        <span className="text-xs md:text-sm font-bold text-[#880E4F] uppercase tracking-wide truncate max-w-[80px] md:max-w-[100px] hidden sm:inline">{user.displayName || 'User'}</span>
                    </Link>
                ) : (
                    <Link to="/login">
                        <button className="px-4 md:px-8 py-1 md:py-1.5 rounded-lg border border-black/20 bg-transparent text-xs md:text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-lg backdrop-blur-sm">
                            login
                        </button>
                    </Link>
                )}

                <Link to="/products" className="hidden md:inline-block">
                    <button className="px-6 py-1.5 rounded-lg border border-black/20 bg-transparent text-sm font-bold text-black/80 hover:bg-white/20 transition-all uppercase shadow-lg backdrop-blur-sm">
                        Our Products
                    </button>
                </Link>

                <Link to="/cart">
                    <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-lg md:text-xl shadow-lg backdrop-blur-sm relative group">
                        <FaShoppingCart className="group-hover:scale-110 transition-transform" />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-600 text-white text-[10px] md:text-xs font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full shadow-md animate-bounce">
                                {getCartCount()}
                            </span>
                        )}
                    </button>
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-black/20 bg-transparent hover:bg-white/20 transition-all text-black/80 text-lg md:text-xl z-50 relative shadow-lg backdrop-blur-sm"
                >
                    <FaBars />
                </button>

                {/* Mobile Menu Dropdown */}
                <div className={`absolute top-14 md:top-16 right-0 w-64 md:w-72 bg-white/90 backdrop-blur-3xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 md:p-6 flex flex-col gap-3 transition-all duration-300 origin-top-right transform ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'} z-40`}>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Explore</h3>
                        <Link to="/" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg flex items-center gap-2"><FaHome /> Home</Link>
                        <Link to="/our-story" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Story</Link>
                        <Link to="/products" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Products</Link>
                        <Link to="/store-locator" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Store Locator</Link>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Support</h3>

                        <Link to="/contact-us" className="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Contact Us</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
