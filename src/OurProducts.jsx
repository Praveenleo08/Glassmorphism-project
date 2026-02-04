import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaBars, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';

// Importing assets
import productsBg from './assets/ea23eba1-dac1-4a76-abed-fefa52559845.png';
import logo from './assets/logo.png';

// Ice Cream Images
import cottonCandy from './assets/ice cream products/cotton candy.png';
import coffeeCaramel from './assets/ice cream products/coffee caramel.png';
import peachStrawberry from './assets/ice cream products/peach & strawberry.png';
import butterScotch from './assets/ice cream products/butter scotch.png';
import bubblegum from './assets/ice cream products/bubblegum.png';
import beanVanilla from './assets/ice cream products/bean vanilla.png';
import strawberry from './assets/ice cream products/strawberry.png';
import tiramisu from './assets/ice cream products/tiramisu.png';
import oatmealChocochip from './assets/ice cream products/oatmeal chocochip.png';
import darkChocolate from './assets/ice cream products/dark chocolate.png';
import almondCrunch from './assets/ice cream products/almond crunch.png';
import tenderCoconut from './assets/ice cream products/tender cocount.png';

const OurProducts = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fadeProp, setFadeProp] = useState('opacity-100 translate-x-0');
    const [currentPage, setCurrentPage] = useState(1);

    // Initial load scroll
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePageChange = (newPage) => {
        // 1. Slide Out Left
        setFadeProp('opacity-0 -translate-x-20');

        setTimeout(() => {
            // 2. Update Content & Jump to Right (Hidden)
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setFadeProp('opacity-0 translate-x-20');

            setTimeout(() => {
                // 3. Slide In to Center
                setFadeProp('opacity-100 translate-x-0');
            }, 50);

        }, 500); // Matches CSS duration
    };

    // Data for pages
    const allProducts = [
        // Page 1
        { id: 1, title: "Cotton Candy", desc: "Fluffy & sweet", image: cottonCandy },
        { id: 2, title: "Coffee Caramel", desc: "Rich & Indulgent", image: coffeeCaramel },
        { id: 3, title: "Peach & strawberry", desc: "Fruity & Refreshing", image: peachStrawberry },
        { id: 4, title: "Butter Scotch", desc: "Tropical & Creamy", image: butterScotch },

        // Page 2
        { id: 5, title: "Bubblegum", desc: "Sweet & Fun", image: bubblegum },
        { id: 6, title: "Bean Vanilla", desc: "Classic & Rich", image: beanVanilla },
        { id: 7, title: "Strawberry", desc: "Sweet & Fruity", image: strawberry },
        { id: 8, title: "Tiramisu", desc: "Coffee & Mascarpone", image: tiramisu },

        // Page 3
        { id: 9, title: "Oatmeal Chocochip", desc: "Sweet & Fun", image: oatmealChocochip },
        { id: 10, title: "Dark Chocolate", desc: "Intense & Delightful", image: darkChocolate },
        { id: 11, title: "Almond Crunch", desc: "Nutty & Sweet", image: almondCrunch },
        { id: 12, title: "Tender Coconut", desc: "Tropical & Creamy", image: tenderCoconut },
    ];

    const ITEMS_PER_PAGE = 4;
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber) => {
        if (pageNumber !== currentPage) handlePageChange(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    };

    const currentProducts = allProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden font-sans text-[#5c3d2e] selection:bg-[#ff80ab] selection:text-white">

            {/* Background Layer */}
            <div className="fixed inset-0 z-[-1]">
                <img src={productsBg} alt="Background" className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-purple-100/10 to-blue-100/20"></div>
                {/* Animated blobs for extra modern feel */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 md:px-10 py-6 absolute top-0 w-full z-50">
                <img src={logo} alt="ibaco" className="h-16 md:h-24 object-contain cursor-pointer drop-shadow-md hover:scale-105 transition-transform" onClick={() => navigate('/')} />

                <div className="flex items-center gap-4 relative">
                    <Link to="/products">
                        <button className="hidden md:block px-6 py-2 rounded-full border border-white/50 bg-white/20 text-sm font-bold text-[#5c3d2e] hover:bg-white/40 transition-all uppercase shadow-[0_4px_10px_rgba(0,0,0,0.1)] backdrop-blur-md">
                            Back to Products
                        </button>
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-white/50 bg-white/20 hover:bg-white/40 transition-all text-[#5c3d2e] text-xl z-50 backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                    >
                        <FaBars />
                    </button>

                    {/* Mobile Menu Dropdown */}
                    <div className={`absolute top-16 right-0 w-72 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 z-50 transition-all duration-300 origin-top-right transform ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'}`}>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-white/30 pb-2 mb-1">Explore</h3>
                            <Link to="/our-story" className="text-gray-800 hover:text-[#D81B60] font-medium transition-colors px-3 py-2 hover:bg-white/40 rounded-xl">Our Story</Link>
                            <Link to="/products" className="text-gray-800 hover:text-[#D81B60] font-medium transition-colors px-3 py-2 hover:bg-white/40 rounded-xl">Our Products</Link>
                            <Link to="/store-locator" className="text-gray-800 hover:text-[#D81B60] font-medium transition-colors px-3 py-2 hover:bg-white/40 rounded-xl">Store Locator</Link>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <h3 className="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-white/30 pb-2 mb-1">Support</h3>
                            <div className="text-gray-800 hover:text-[#D81B60] font-medium transition-colors px-3 py-2 hover:bg-white/40 rounded-xl cursor-pointer">Order Online</div>
                            <Link to="/contact-us" className="text-gray-800 hover:text-[#D81B60] font-medium transition-colors px-3 py-2 hover:bg-white/40 rounded-xl">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 pt-32 pb-20 flex flex-col items-center min-h-[85vh]">

                {/* Header Section with Animation */}
                <div className="text-center mb-16 relative animate-fade-in-left">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#5c3d2e]/50"></div>
                        <h1 className="text-4xl md:text-6xl font-cursive text-[#4a3b69] font-bold tracking-wide drop-shadow-sm">
                            Delicious Ice Creams
                        </h1>
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#5c3d2e]/50"></div>
                    </div>
                    <p className="text-lg md:text-xl text-[#6d5e88] font-light tracking-wide font-sans">
                        Choose your favorite treat
                    </p>
                </div>

                {/* Grid Section - Updated Cards */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 md:px-0 transition-all duration-500 transform ${fadeProp}`}>
                    {currentProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative flex flex-col items-center justify-between"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Glass Card Background */}
                            <div className="absolute inset-0 top-16 bg-white/20 backdrop-blur-md border border-white/40 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] transition-all duration-500 group-hover:bg-white/40 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 z-0"></div>

                            {/* Content Wrapper */}
                            <div className="relative z-10 flex flex-col items-center w-full p-6 pb-8 h-full">

                                {/* Image floating above card */}
                                <div className="w-48 h-48 md:w-56 md:h-56 -mt-10 mb-2 filter drop-shadow-2xl transition-transform duration-500 hover:animate-float group-hover:scale-115">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                                </div>

                                {/* Text Content */}
                                <div className="text-center mt-auto">
                                    <h3 className="text-[#2d3047] text-xl font-bold mb-1 tracking-wide font-sans">{product.title}</h3>
                                    <p className="text-[#6d7293] text-sm mb-6 font-medium">{product.desc}</p>

                                    <button
                                        onClick={() => navigate(`/product/${product.id}`, { state: { product, category: 'ice-cream' } })}
                                        className="bg-[#2d68c4] hover:bg-[#24529d] text-white px-8 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 w-full max-w-[160px]"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination & Navigation */}
                <div className="w-full max-w-7xl mt-20 flex flex-col md:flex-row justify-between items-center px-4 gap-6 animate-fade-in-left">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/products')}
                        className="flex items-center gap-2 bg-[#2d68c4] hover:bg-[#24529d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        <FaArrowLeft className="text-xs" /> Back
                    </button>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30 shadow-sm">
                        {[1, 2, 3].map(num => (
                            <button
                                key={num}
                                onClick={() => paginate(num)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentPage === num
                                    ? 'bg-[#8ba4e6] text-[#1a237e] shadow-inner'
                                    : 'text-[#4a3b69] hover:bg-white/30'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all ${currentPage === totalPages
                                ? 'bg-gray-400/50 cursor-not-allowed hidden'
                                : 'bg-[#2d68c4] hover:bg-[#24529d] shadow-md'
                                }`}
                        >
                            <FaArrowRight />
                        </button>
                    </div>

                </div>

            </main>

            {/* Full Footer from Home Page */}
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
                            <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-blue-600 hover:bg-blue-50 cursor-pointer shadow-sm text-xs"><FaFacebookF /></span>
                            <span className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-pink-600 hover:bg-pink-50 cursor-pointer shadow-sm text-xs"><FaTwitter /></span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default OurProducts;
