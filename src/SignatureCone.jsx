import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBars, FaArrowLeft, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useCart } from './CartContext';

// Background from Ice Cream Cakes
import productsBg from './assets/cake products/bg-snow.png';
import logo from './assets/logo.png';

// Cone Images
import coneImage from './assets/SignatureCones/single_cone.png';

// Reusing Flavors, Toppings, Sauces data from CoolingSips
// But defining them here to keep component self-contained
import blackCurrant from './assets/Ice Cream Flavour/blackcurrent.png';
import blueberryCheesecake from './assets/Ice Cream Flavour/blueberry cheesecake.png';
import butterscotch from './assets/Ice Cream Flavour/buttersctoch.png';
import chocoChip from './assets/Ice Cream Flavour/choco chip.png';
import chocolate from './assets/Ice Cream Flavour/chocolate.png';
import cookiesCream from './assets/Ice Cream Flavour/cookies & cream.png';
import irishCoffee from './assets/Ice Cream Flavour/irish coffee.png';
import mango from './assets/Ice Cream Flavour/mango.png';
import saltedCaramel from './assets/Ice Cream Flavour/salted caramel.png';
import strawberry from './assets/Ice Cream Flavour/strawberry.png';
import tenderCoconut from './assets/Ice Cream Flavour/tender coconut.png';
import vanilla from './assets/Ice Cream Flavour/vanilla.png';

import sauceBlackCurrant from './assets/Sauses/blackcurrent.png';
import sauceChocolateFudge from './assets/Sauses/chocolate fudge.png';
import sauceChocolate from './assets/Sauses/chocolate.png';
import sauceHoney from './assets/Sauses/honey.png';
import sauceMango from './assets/Sauses/mango ripple.png';
import sauceSaltedCaramel from './assets/Sauses/salted caramel.png';
import sauceStrawberry from './assets/Sauses/strawberry.png';

import topAlmond from './assets/Toppings/almond.png';
import topAssortedNuts from './assets/Toppings/assorted nuts.png';
import topBlueberry from './assets/Toppings/blueberry.png';
import topCandiedFruit from './assets/Toppings/candied fruit.png';
import topCashewNuts from './assets/Toppings/cashew nuts.png';
import topChocoButtons from './assets/Toppings/chocolate buttons.png';
import topChocoCurls from './assets/Toppings/chocolate curls.png';
import topChocoSprinkles from './assets/Toppings/chocolate sprinkles.png';
import topCreamSticks from './assets/Toppings/cream sticks.png';
import topDoubleChocoChips from './assets/Toppings/double choco chips.png';
import topDriedCranberry from './assets/Toppings/dried cranberry.png';
import topFig from './assets/Toppings/fig.png';
import topFudgeBrownie from './assets/Toppings/fudge brownie.png';
import topMangoChuncks from './assets/Toppings/mango chuncks.png';
import topRainbowButtons from './assets/Toppings/rainbow buttons.png';
import topRainbowSprinkles from './assets/Toppings/rainbow sprinkles.png';

const SignatureCone = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // State for customization
    const [selectedFlavor, setSelectedFlavor] = useState(1); // Default to Strawberry
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [selectedSauce, setSelectedSauce] = useState(1);
    const [basePrice] = useState(180); // Adjusted base price for Cones
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeTab, setActiveTab] = useState('flavor'); // flavor, toppings, sauce

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFlavorSelect = (id) => {
        if (selectedFlavor === id) return;
        setIsAnimating(true);
        setSelectedFlavor(id);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Data Configuration
    const flavors = [
        { id: 1, name: 'Strawberry', file: 'strawberry.png', image: strawberry, color: 'bg-pink-100' },
        { id: 2, name: 'Chocolate', file: 'chocolate.png', image: chocolate, color: 'bg-amber-900/20' },
        { id: 3, name: 'Mango', file: 'mango.png', image: mango, color: 'bg-yellow-100' },
        { id: 4, name: 'Vanilla', file: 'vanilla.png', image: vanilla, color: 'bg-orange-50' },
        { id: 5, name: 'Blackcurrant', file: 'blackcurrent.png', image: blackCurrant, color: 'bg-purple-100' },
        { id: 6, name: 'Butterscotch', file: 'buttersctoch.png', image: butterscotch, color: 'bg-yellow-200' },
        { id: 7, name: 'Choco Chip', file: 'choco chip.png', image: chocoChip, color: 'bg-amber-100' },
        { id: 8, name: 'Cookies & Cream', file: 'cookies & cream.png', image: cookiesCream, color: 'bg-gray-100' },
        { id: 9, name: 'Glueberry Cheesecake', file: 'blueberry cheesecake.png', image: blueberryCheesecake, color: 'bg-purple-50' },
        { id: 10, name: 'Irish Coffee', file: 'irish coffee.png', image: irishCoffee, color: 'bg-amber-50' },
        { id: 11, name: 'Salted Caramel', file: 'salted caramel.png', image: saltedCaramel, color: 'bg-orange-200' },
        { id: 12, name: 'Tender Coconut', file: 'tender coconut.png', image: tenderCoconut, color: 'bg-green-50' },
    ];

    const toppings = [
        { id: 1, name: 'Almond', image: topAlmond, price: 10 },
        { id: 2, name: 'Assorted Nuts', image: topAssortedNuts, price: 15 },
        { id: 3, name: 'Blueberry', image: topBlueberry, price: 10 },
        { id: 4, name: 'Candied Fruit', image: topCandiedFruit, price: 10 },
        { id: 5, name: 'Cashew Nuts', image: topCashewNuts, price: 10 },
        { id: 6, name: 'Chocolate Buttons', image: topChocoButtons, price: 5 },
        { id: 7, name: 'Chocolate Curls', image: topChocoCurls, price: 5 },
        { id: 8, name: 'Chocolate Sprinkles', image: topChocoSprinkles, price: 5 },
        { id: 9, name: 'Cream Sticks', image: topCreamSticks, price: 10 },
        { id: 10, name: 'Double Choco Chips', image: topDoubleChocoChips, price: 5 },
        { id: 11, name: 'Dried Cranberry', image: topDriedCranberry, price: 10 },
        { id: 12, name: 'Fig', image: topFig, price: 10 },
        { id: 13, name: 'Fudge Brownie', image: topFudgeBrownie, price: 15 },
        { id: 14, name: 'Mango Chuncks', image: topMangoChuncks, price: 10 },
        { id: 15, name: 'Rainbow Buttons', image: topRainbowButtons, price: 5 },
        { id: 16, name: 'Rainbow Sprinkles', image: topRainbowSprinkles, price: 5 },
    ];

    const sauces = [
        { id: 1, name: 'Blackcurrant', image: sauceBlackCurrant, color: 'bg-purple-600' },
        { id: 2, name: 'Chocolate Fudge', image: sauceChocolateFudge, color: 'bg-amber-900' },
        { id: 3, name: 'Chocolate', image: sauceChocolate, color: 'bg-amber-800' },
        { id: 4, name: 'Honey', image: sauceHoney, color: 'bg-yellow-400' },
        { id: 5, name: 'Mango Ripple', image: sauceMango, color: 'bg-yellow-500' },
        { id: 6, name: 'Salted Caramel', image: sauceSaltedCaramel, color: 'bg-orange-400' },
        { id: 7, name: 'Strawberry', image: sauceStrawberry, color: 'bg-red-500' },
    ];



    const toggleTopping = (id) => {
        if (selectedToppings.includes(id)) {
            setSelectedToppings(selectedToppings.filter(t => t !== id));
        } else {
            setSelectedToppings([...selectedToppings, id]);
        }
    };

    const getToppingPrice = () => {
        return selectedToppings.reduce((total, id) => {
            const topping = toppings.find(t => t.id === id);
            return total + (topping ? topping.price : 0);
        }, 0);
    };

    const totalPrice = basePrice + getToppingPrice();
    const currentFlavor = flavors.find(f => f.id === selectedFlavor);
    const currentConeImage = coneImage;

    const handleAddToCart = () => {
        const compositeId = `cone-${currentFlavor.id}-${selectedToppings.sort().join('-')}-${selectedSauce}`;
        const item = {
            id: compositeId,
            name: `${currentFlavor.name} Signature Cone`,
            image: coneImage, // Use the visual cone image for cart
            toppings: selectedToppings.map(tId => toppings.find(t => t.id === tId)?.name).join(', '),
            sauce: sauces.find(s => s.id === selectedSauce)?.name,
            basePrice: basePrice,
            customizationPrice: getToppingPrice(),
            description: `Signature Cone with ${currentFlavor.name}, ${selectedToppings.length > 0 ? selectedToppings.map(tId => toppings.find(t => t.id === tId)?.name).join(', ') : 'no toppings'} and ${sauces.find(s => s.id === selectedSauce)?.name || 'no sauce'}`
        };

        addToCart(item, 1, 'Regular', totalPrice);
        navigate('/cart');
    };

    return (
        <div className="min-h-screen lg:h-screen w-full relative overflow-x-hidden lg:overflow-hidden font-sans text-[#5c3d2e] selection:bg-[#ff80ab] selection:text-white flex flex-col">

            {/* Background Layer - Snowy Cake Background */}
            <div className="fixed inset-0 z-[-1]">
                <img src={productsBg} alt="Background" className="w-full h-full object-cover absolute top-0 left-0 z-[-1] opacity-100" />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-blue-100/10 mix-blend-multiply"></div>

                {/* Animated Orbs/Blobs matching Snowflake theme */}
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
            </div>

            {/* Navbar - Compact */}
            <nav className="flex items-center justify-between px-8 py-4 z-50 bg-white/20 backdrop-blur-md border-b border-white/20">
                <img src={logo} alt="ibaco" className="h-12 md:h-16 object-contain cursor-pointer drop-shadow-lg hover:scale-105 transition-transform" onClick={() => navigate('/')} />

                <div className="flex items-center gap-4">
                    <Link to="/products">
                        <button className="px-6 py-2 rounded-full bg-white/30 text-[#5c3d2e] font-bold text-sm hover:bg-white/50 transition-all border border-white/40 backdrop-blur-md shadow-lg">
                            EXIT
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Main Content - Flex Row, No Page Scroll on Desktop */}
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 px-4 lg:px-12 py-4 pb-24 lg:pb-4 lg:h-[calc(100vh-80px)]">

                {/* Left Side: Preview (Signature Cone) */}
                <div className="w-full lg:w-5/12 h-full flex flex-col items-center justify-center relative">

                    {/* Floating Price Tag */}
                    <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/60 animate-bounce-short">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block text-center">Total</span>
                        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2d68c4] to-[#8ba4e6]">₹{totalPrice.toFixed(0)}</span>
                    </div>

                    <div className="relative w-full max-w-[400px] h-[400px] lg:h-full lg:max-h-[600px] rounded-[3rem] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center p-8 overflow-hidden group mt-12 lg:mt-0">

                        {/* Glow effect based on flavor */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-${currentFlavor.color ? currentFlavor.color.replace('bg-', '') : 'blue-200'}/40 to-transparent opacity-60 transition-colors duration-700`}></div>

                        {/* Dynamic Composition */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center -mt-6">

                            {/* Main Flavor Image (Scoop) */}
                            <img
                                src={currentFlavor.image}
                                alt={currentFlavor.name}
                                key={currentFlavor.id}
                                className={`w-[75%] max-h-[75%] object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] cursor-pointer hover:scale-105 transition-all duration-700 relative z-10 ${isAnimating ? 'animate-pop-in' : 'animate-float'}`}
                            />

                            {/* Floating Toppings */}
                            {selectedToppings.map((tid, index) => {
                                const topping = toppings.find(t => t.id === tid);
                                if (!topping) return null;
                                // Random positions
                                const positions = [
                                    'top-[10%] -right-[5%]', 'bottom-[20%] -left-[5%]', 'top-[20%] -left-[5%]',
                                    'bottom-[30%] -right-[10%]', 'top-[5%] right-[10%]', 'bottom-[10%] left-[10%]'
                                ];
                                const pos = positions[index % positions.length];
                                return (
                                    <img
                                        key={tid}
                                        src={topping.image}
                                        alt={topping.name}
                                        className={`absolute ${pos} w-16 h-16 object-contain z-20 animate-bounce-slow drop-shadow-md`}
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    />
                                );
                            })}
                        </div>

                        {/* Sauce Overlay (Bottom Corner) */}
                        {selectedSauce && (() => {
                            const sauce = sauces.find(s => s.id === selectedSauce);
                            if (sauce) {
                                return (
                                    <div className="absolute bottom-4 right-4 z-30 bg-white/60 backdrop-blur-md p-2 rounded-full shadow-lg items-center gap-2 flex animate-slide-up">
                                        <img
                                            src={sauce.image}
                                            alt={sauce.name}
                                            className="w-8 h-8 object-contain"
                                        />
                                        <span className="text-xs font-bold text-gray-700 pr-2">{sauce.name}</span>
                                    </div>
                                );
                            }
                            return null;
                        })()}

                        {/* Bottom Summary Glass */}
                        <div className="absolute bottom-6 left-6 right-auto p-4 bg-white/50 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg flex flex-col gap-2 max-w-[70%]">
                            <h2 className="text-xl font-bold text-[#5c3d2e] leading-none">{currentFlavor.name}</h2>
                            <div className="flex flex-wrap gap-1.5 max-h-[60px] overflow-y-auto custom-scrollbar">
                                {selectedToppings.map(tid => (
                                    <span key={tid} className="px-2 py-0.5 bg-white/70 rounded-lg text-[10px] font-bold text-[#5c3d2e] shadow-sm border border-white/30 whitespace-nowrap">
                                        {toppings.find(t => t.id === tid)?.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Tabbed Customization Panel */}
                <div className="w-full lg:w-7/12 min-h-[500px] lg:h-full flex flex-col bg-white/30 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden lg:overflow-hidden">

                    {/* Tabs Header */}
                    <div className="flex items-center p-2 bg-white/20 border-b border-white/20">
                        {['flavor', 'toppings', 'sauce'].map((tab, idx) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 rounded-xl text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden ${activeTab === tab ? 'bg-white shadow-lg text-[#2d68c4]' : 'text-gray-600 hover:bg-white/30'}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${activeTab === tab ? 'bg-[#2d68c4] text-white' : 'bg-gray-400/50 text-white'}`}>
                                        {idx + 1}
                                    </span>
                                    {tab}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gradient-to-b from-transparent to-white/20">

                        {/* FLAVOR TAB */}
                        {activeTab === 'flavor' && (
                            <div className="animate-slide-up">
                                <h3 className="text-2xl font-bold text-[#5c3d2e] mb-6 drop-shadow-sm">Pick Your Scoop</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {flavors.map(flavor => (
                                        <div
                                            key={flavor.id}
                                            onClick={() => handleFlavorSelect(flavor.id)}
                                            className={`group cursor-pointer rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-300 border backdrop-blur-sm ${selectedFlavor === flavor.id ? 'bg-white border-blue-400 shadow-[0_10px_20px_rgba(45,104,196,0.2)] scale-105' : 'bg-white/40 border-white/40 hover:bg-white/70'}`}
                                        >
                                            <div className="relative w-20 h-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                                <img src={flavor.image} alt={flavor.name} className="w-full h-full object-contain filter drop-shadow-md" />
                                                {selectedFlavor === flavor.id && <div className="absolute -top-2 -right-2 bg-[#2d68c4] text-white rounded-full p-1 shadow-md"><FaCheck size={10} /></div>}
                                            </div>
                                            <span className={`text-sm font-bold text-center ${selectedFlavor === flavor.id ? 'text-[#2d68c4]' : 'text-[#4E342E]'}`}>{flavor.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TOPPINGS TAB */}
                        {activeTab === 'toppings' && (
                            <div className="animate-slide-up">
                                <h3 className="text-2xl font-bold text-[#5c3d2e] mb-6 drop-shadow-sm">Add Some Crunch</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {toppings.map(topping => {
                                        const isSelected = selectedToppings.includes(topping.id);
                                        return (
                                            <div
                                                key={topping.id}
                                                onClick={() => toggleTopping(topping.id)}
                                                className={`group cursor-pointer rounded-2xl p-3 flex flex-col items-center gap-2 transition-all duration-300 border backdrop-blur-sm ${isSelected ? 'bg-gradient-to-br from-blue-50 to-white border-blue-400 shadow-lg scale-105' : 'bg-white/40 border-white/40 hover:bg-white/70'}`}
                                            >
                                                <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                                                    <img src={topping.image} alt={topping.name} className="w-full h-full object-contain filter drop-shadow-md" />
                                                    {isSelected && <div className="absolute -top-2 -right-2 bg-[#2d68c4] text-white rounded-full p-1 shadow-md"><FaCheck size={10} /></div>}
                                                </div>
                                                <div className="text-center">
                                                    <span className={`block text-xs font-bold ${isSelected ? 'text-[#2d68c4]' : 'text-[#4E342E]'}`}>{topping.name}</span>
                                                    {topping.price > 0 && <span className="text-[10px] font-bold text-gray-500">+₹{topping.price}</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* SAUCE TAB */}
                        {activeTab === 'sauce' && (
                            <div className="animate-slide-up">
                                <h3 className="text-2xl font-bold text-[#5c3d2e] mb-6 drop-shadow-sm">Drizzle Delight</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {sauces.map(sauce => {
                                        const isSelected = selectedSauce === sauce.id;
                                        return (
                                            <div
                                                key={sauce.id}
                                                onClick={() => setSelectedSauce(sauce.id)}
                                                className={`group cursor-pointer rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-300 border backdrop-blur-sm ${isSelected ? 'bg-white border-blue-400 shadow-lg scale-105' : 'bg-white/40 border-white/40 hover:bg-white/70'}`}
                                            >
                                                <div className="relative w-20 h-20 transition-transform duration-500 group-hover:scale-110">
                                                    <img src={sauce.image} alt={sauce.name} className="w-full h-full object-contain filter drop-shadow-md" />
                                                    {isSelected && <div className="absolute -top-2 -right-2 bg-[#2d68c4] text-white rounded-full p-1 shadow-md"><FaCheck size={10} /></div>}
                                                </div>
                                                <span className={`text-sm font-bold text-center ${isSelected ? 'text-[#2d68c4]' : 'text-[#4E342E]'}`}>{sauce.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-4 bg-white/40 border-t border-white/30 backdrop-blur-md flex justify-between items-center z-10">
                        <button
                            onClick={() => {
                                setSelectedFlavor(1);
                                setSelectedToppings([]);
                                setSelectedSauce(1);
                                setActiveTab('flavor');
                            }}
                            className="px-6 py-2.5 rounded-xl bg-white/50 text-gray-700 font-bold hover:bg-white/80 transition-colors text-sm shadow-sm"
                        >
                            RESET
                        </button>

                        <div className="flex gap-3">
                            {activeTab !== 'sauce' ? (
                                <button
                                    onClick={() => setActiveTab(activeTab === 'flavor' ? 'toppings' : 'sauce')}
                                    className="px-8 py-3 rounded-xl bg-[#5c3d2e] text-white font-bold shadow-lg hover:bg-[#3e2b21] hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    NEXT STEP <FaArrowRight size={12} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#2d68c4] to-[#4fc3f7] text-white font-bold shadow-[0_10px_20px_rgba(45,104,196,0.3)] hover:shadow-[0_15px_30px_rgba(45,104,196,0.4)] hover:-translate-y-1 transition-all flex items-center gap-2"
                                >
                                    ADD TO CART
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </main>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .animate-pop-in {
                    animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                @keyframes popIn {
                    0% { opacity: 0; transform: scale(0.8) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 0.4s ease-out forwards;
                }
                @keyframes slideUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-bounce-slow {
                    animation: bounceSlow 3s infinite;
                }
                @keyframes bounceSlow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-pulse-slow {
                    animation: pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulseSlow {
                    0%, 100% { opacity: 1; scale: 1; }
                    50% { opacity: .8; scale: 1.05; }
                }
            `}</style>
        </div>
    );
};

export default SignatureCone;
