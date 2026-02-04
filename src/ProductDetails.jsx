import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaMinus, FaPlus, FaShoppingCart, FaBars, FaTimes, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from './assets/logo.png';
import Footer from './Footer';
import { useCart } from './CartContext';

// Backgrounds
import iceCreamBg from './assets/ice-cream-detail-bg.png';
import cakeBg from './assets/cake-detail-bg.png';

const ProductDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addToCart, getCartCount } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('Medium');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fallback if no state provided (e.g. direct link access - ideally would fetch by ID)
    const product = state?.product || {
        id: 0,
        title: "Product Not Found",
        desc: "Please return to the products page.",
        image: null,
        price: 0
    };
    const category = state?.category || 'ice-cream'; // 'ice-cream' or 'cake'

    const bgImage = category === 'cake' ? cakeBg : iceCreamBg;
    const sizes = category === 'cake' ? ['500g', '1kg', '2kg'] : ['Small', 'Medium', 'Large'];
    const basePrice = category === 'cake' ? 850 : 150;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    const handleQuantity = (type) => {
        if (type === 'dec') {
            if (quantity > 1) setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    // Calculate dynamic price based on size and quantity
    const getPrice = () => {
        let multiplier = 1;
        if (selectedSize === sizes[0]) multiplier = 0.8;
        if (selectedSize === sizes[2]) multiplier = 1.5;
        return Math.round(basePrice * multiplier);
    };

    const handleAddToCart = () => {
        const finalPrice = getPrice();
        addToCart(product, quantity, selectedSize, finalPrice);
        navigate('/cart');
    };

    return (
        <div className="min-h-screen w-full relative font-sans text-[#5D4037] overflow-x-hidden flex flex-col">

            {/* Background */}
            <div className="fixed inset-0 z-[-1]">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 md:px-12 py-6 absolute top-0 w-full z-50">
                <img src={logo} alt="ibaco" className="h-14 md:h-16 object-contain cursor-pointer" onClick={() => navigate('/')} />
                <div className="flex items-center gap-4 relative">
                    <button onClick={() => navigate(-1)} className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-white/40 bg-white/30 text-sm font-bold text-[#5c3d2e] hover:bg-white/50 transition-all uppercase shadow-sm backdrop-blur-md">
                        <FaArrowLeft /> Back
                    </button>
                    <button onClick={() => navigate('/cart')} className="relative w-12 h-12 flex items-center justify-center rounded-full border border-white/40 bg-white/30 hover:bg-white/50 transition-all text-[#5c3d2e] text-xl backdrop-blur-md">
                        <FaShoppingCart />
                        {getCartCount() > 0 && <span className="absolute -top-1 -right-1 bg-[#D81B60] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{getCartCount()}</span>}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-12 h-12 flex items-center justify-center rounded-full border border-white/40 bg-white/30 hover:bg-white/50 transition-all text-[#5c3d2e] text-xl backdrop-blur-md">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-32 pb-20 flex flex-col items-center flex-grow">

                {/* Title (Mobile) */}
                <h1 className="md:hidden text-4xl font-serif font-bold text-[#2d3047] mb-8 text-center drop-shadow-md">{product.title}</h1>

                {/* Glass Card */}
                <div className="relative w-full max-w-6xl bg-white/20 backdrop-blur-xl border border-white/40 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-visible">

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_40px_rgba(255,255,255,0.5)] pointer-events-none"></div>

                    {/* Left: Image */}
                    <div className="relative flex justify-center items-center h-full min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-full blur-3xl scale-75"></div>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full max-w-sm md:max-w-md object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)] animate-float z-10 hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col gap-6 z-10">

                        <div className="hidden md:block">
                            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#2d3047] mb-2 drop-shadow-sm leading-tight">{product.title}</h1>
                            <p className="text-[#3F51B5] font-bold tracking-wider uppercase text-sm mb-4">{category === 'cake' ? 'Premium Cake' : 'Sweet & Fun'}</p>
                        </div>

                        {/* Description Box */}
                        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
                            <h3 className="text-xl font-bold text-[#2d3047] mb-2">Description</h3>
                            <p className="text-[#455A64] leading-relaxed font-medium">
                                {product.desc || "A delightful treat crafted with the finest ingredients to melt your heart. Experience the perfect balance of flavors and textures in every bite."}
                            </p>
                        </div>

                        {/* Options Row */}
                        <div className="flex flex-wrap gap-6 items-end mt-2">

                            {/* Size Selector */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-[#2d3047]">Size</span>
                                <div className="flex bg-white/30 rounded-full p-1 border border-white/40">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedSize === size ? 'bg-[#2d68c4] text-white shadow-md' : 'text-[#455A64] hover:bg-white/30'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-[#2d3047]">Quantity</span>
                                <div className="flex items-center gap-4 bg-white/30 rounded-full px-6 py-2 border border-white/40 h-[42px]">
                                    <button onClick={() => handleQuantity('dec')} className="text-[#2d68c4] hover:text-[#1a237e] transition-colors"><FaMinus size={12} /></button>
                                    <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
                                    <button onClick={() => handleQuantity('inc')} className="text-[#2d68c4] hover:text-[#1a237e] transition-colors"><FaPlus size={12} /></button>
                                </div>
                            </div>

                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between mt-8 p-4 bg-white/40 rounded-3xl border border-white/50 shadow-inner">
                            <div className="text-4xl font-bold text-[#2d3047]">
                                ₹{getPrice() * quantity}
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="bg-[#2d68c4] hover:bg-[#154db3] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-blue-500/40 transition-all flex items-center gap-3 transform hover:-translate-y-1"
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>

                    </div>
                </div>

                {/* Recommendations */}
                <div className="w-full max-w-6xl mt-20">
                    <h3 className="text-2xl font-serif font-bold text-[#4E342E] mb-8 px-4">You May Also Like</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} onClick={() => window.scrollTo(0, 0)} className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-white/30 flex flex-col items-center hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm hover:shadow-lg">
                                <div className="w-28 h-28 mb-4 bg-gradient-to-tr from-white/40 to-transparent rounded-full flex items-center justify-center border border-white/20">
                                    <span className="text-4xl">🍦</span>
                                </div>
                                <h4 className="font-bold text-lg text-[#4E342E] text-center mb-1">Delight {i}</h4>
                                <p className="text-xs font-bold text-[#2d68c4] uppercase tracking-wide">View Product</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />

            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
};

export default ProductDetails;
