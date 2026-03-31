import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaBars, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';

// Importing assets
import logo from './assets/logo.png';
// Using the new snowy background
import cakesBg from './assets/cake products/bg-snow.png';

// Cake Images
import blackcurrant from './assets/cake products/blackcurrant cake.png';
import blackcurrantRich from './assets/cake products/blackcurrent rich cream cake.png';
import blackforest from './assets/cake products/blackforest cake.png';
import butterscotch from './assets/cake products/butterscotch almond amore cake.png';
import chocolateOverload from './assets/cake products/chocolate overload cake.png';
import cottonCandy from './assets/cake products/cotton candy cake.png';
import dessertRoyale from './assets/cake products/dessert royale cake.png';
import fruitBlackcurrant from './assets/cake products/friut & blackcurrant drizzle cake.png';
import mangoItalian from './assets/cake products/mango italian fiesta cake.png';
import mangoKingdom from './assets/cake products/mango kingdom gala cake.png';
import pistachio from './assets/cake products/pistachio almond ecstasy cake.png';
import swissChoco from './assets/cake products/swiss choco symohony cake.png';

const CelebrationCakes = () => {
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

    // Data for cakes
    const allCakes = [
        // Page 1
        { id: 1, title: "Black Forest Cake", desc: "Classic & Rich", image: blackforest },
        { id: 7, title: "Mango Italian Fiesta", desc: "Tropical Delight", image: mangoItalian },
        { id: 11, title: "Blackcurrant", desc: "Tangy & Sweet", image: blackcurrant },
        { id: 4, title: "Cotton Candy Cake", desc: "Fun & Fluffy", image: cottonCandy },

        // Page 2
        { id: 9, title: "Pistachio Almond Ecstasy", desc: "Nutty Perfection", image: pistachio },
        { id: 3, title: "Chocolate Overload", desc: "Decadent Chocolate", image: chocolateOverload },
        { id: 12, title: "Blackcurrant Rich Cream", desc: "Creamy Berry", image: blackcurrantRich },
        { id: 8, title: "Mango Kingdom Gala", desc: "King of Fruits", image: mangoKingdom },

        // Page 3
        { id: 5, title: "Dessert Royale", desc: "Premium Indulgence", image: dessertRoyale },
        { id: 2, title: "Butterscotch Almond Amore", desc: "Nutty & Sweet", image: butterscotch },
        { id: 6, title: "Fruit & Blackcurrant Drizzle", desc: "Fruity Freshness", image: fruitBlackcurrant },
        { id: 10, title: "Swiss Choco Symphony", desc: "Smooth Chocolate", image: swissChoco },
    ];

    const ITEMS_PER_PAGE = 4;
    const totalPages = Math.ceil(allCakes.length / ITEMS_PER_PAGE);

    const paginate = (pageNumber) => {
        if (pageNumber !== currentPage) handlePageChange(pageNumber);
    };

    const nextPage = () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    };

    const currentCakes = allCakes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden font-sans text-[#5c3d2e] selection:bg-[#ff80ab] selection:text-white">

            {/* Background Layer */}
            <div className="fixed inset-0 z-[-1]">
                <img src={cakesBg} alt="Background" className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" />
                {/* Overlay for text readability if snow is too bright */}
                <div className="absolute inset-0 bg-blue-100/10 mix-blend-multiply"></div>
                {/* Animated blobs for extra modern feel - adapting colors for snow theme */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
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
                            {['Our Story', 'Our Products', 'Store Locator', 'Contact Us'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-gray-800 hover:text-[#D81B60] font-medium transition-colors px-3 py-2 hover:bg-white/40 rounded-xl"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 pt-32 pb-20 flex flex-col items-center min-h-[85vh]">

                {/* Header Section with Animation */}
                <div className="text-center mb-16 relative animate-fade-in-left">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#5c3d2e]/50"></div>
                        <h1 className="text-4xl md:text-6xl font-serif text-[#4a3b69] font-bold tracking-wide drop-shadow-sm">
                            Celebration Cakes
                        </h1>
                        <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#5c3d2e]/50"></div>
                    </div>
                    <p className="text-lg md:text-xl text-[#6d5e88] font-light tracking-wide font-sans">
                        Make every moment special
                    </p>
                </div>

                {/* Grid Section - Cake Cards */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 md:px-0 transition-all duration-500 transform ${fadeProp}`}>
                    {currentCakes.map((cake, index) => (
                        <div
                            key={cake.id}
                            className="group relative flex flex-col items-center justify-between"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Glass Card Background */}
                            <div className="absolute inset-0 top-16 bg-white/30 backdrop-blur-md border border-white/50 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] transition-all duration-500 group-hover:bg-white/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:-translate-y-2 z-0"></div>

                            {/* Content Wrapper */}
                            <div className="relative z-10 flex flex-col items-center w-full p-6 pb-8 h-full">

                                {/* Image floating above card */}
                                <div className="w-56 h-56 md:w-64 md:h-64 -mt-16 mb-2 filter drop-shadow-2xl transition-transform duration-500 hover:animate-float group-hover:scale-110">
                                    <img src={cake.image} alt={cake.title} className="w-full h-full object-contain" />
                                </div>

                                {/* Text Content */}
                                <div className="text-center mt-auto">
                                    <h3 className="text-[#2d3047] text-xl font-bold mb-1 tracking-wide font-serif leading-tight px-2">{cake.title}</h3>
                                    <p className="text-[#6d7293] text-sm mb-6 font-medium font-sans">{cake.desc}</p>

                                    <button
                                        onClick={() => navigate(`/product/${cake.id}`, { state: { product: cake, category: 'cake' } })}
                                        className="bg-[#2d68c4] hover:bg-[#24529d] text-white px-8 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 w-full max-w-[160px] uppercase tracking-wider"
                                    >
                                        View Cake
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination & Navigation */}
                <div className="w-full max-w-7xl mt-24 flex flex-col md:flex-row justify-between items-center px-4 gap-6 animate-fade-in-left">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/products')}
                        className="flex items-center gap-2 bg-[#2d68c4] hover:bg-[#24529d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        <FaArrowLeft className="text-xs" /> Back
                    </button>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-2 bg-white/30 backdrop-blur-md rounded-full p-1 border border-white/40 shadow-sm">
                        {[1, 2, 3].map(num => (
                            <button
                                key={num}
                                onClick={() => paginate(num)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentPage === num
                                    ? 'bg-[#8ba4e6] text-[#1a237e] shadow-inner'
                                    : 'text-[#4a3b69] hover:bg-white/40'
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

            {/* Footer */}
            <footer className="w-full bg-[#f2f0ee] pt-12 pb-8 border-t border-[#d7ccc8]/50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-[#5D4037]">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <img src={logo} alt="ibaco" className="h-12 object-contain self-start" />
                        <span className="text-xs font-serif italic opacity-70">Your Ice Cream Destination</span>
                    </div>

                    <div className="hidden md:block"></div>

                    {/* Columns */}
                    <div className="space-y-4">
                        <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Our Story</div>
                        <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Our Products</div>
                        <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Store Locator</div>
                    </div>

                    <div className="space-y-4">

                        <div className="font-sans font-medium text-sm hover:text-[#922B21] cursor-pointer transition-colors">Contact Us</div>
                    </div>

                    {/* Socials & Copyright */}
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
        </div>
    );
};

export default CelebrationCakes;
