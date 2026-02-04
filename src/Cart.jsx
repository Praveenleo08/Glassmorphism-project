import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import Footer from './Footer';
import { FaArrowLeft, FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import logo from './assets/logo.png';
import iceCreamBg from './assets/ice-cream-detail-bg.png'; // Reusing bg

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    return (
        <div className="min-h-screen w-full relative font-sans text-[#5D4037] overflow-x-hidden flex flex-col">

            {/* Background */}
            <div className="fixed inset-0 z-[-1]">
                <img src={iceCreamBg} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 md:px-12 py-6 absolute top-0 w-full z-50">
                <img src={logo} alt="ibaco" className="h-14 md:h-16 object-contain cursor-pointer" onClick={() => navigate('/')} />
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/40 bg-white/30 text-sm font-bold text-[#5c3d2e] hover:bg-white/50 transition-all uppercase shadow-sm backdrop-blur-md">
                    <FaArrowLeft /> Back
                </button>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-32 pb-20 flex-grow flex flex-col items-center">

                <h1 className="text-4xl font-serif font-bold text-[#2d3047] mb-12 drop-shadow-md text-center">Your Cart</h1>

                <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 md:p-10 overflow-hidden relative min-h-[400px]">
                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_40px_rgba(255,255,255,0.5)] pointer-events-none"></div>

                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-6 text-[#5D4037]">
                            <FaShoppingBag size={60} className="opacity-20" />
                            <h2 className="text-2xl font-bold opacity-60">Your cart is empty</h2>
                            <button onClick={() => navigate('/products')} className="bg-[#2d68c4] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-blue-500/40 transition-all uppercase text-sm">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {/* Header Row */}
                            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-black/5 text-sm font-bold uppercase tracking-wider text-[#2d3047]/70 px-4">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-center">Total</div>
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.uniqueId} className="bg-white/40 rounded-2xl p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center border border-white/50 shadow-sm relative group">

                                        {/* Product Info */}
                                        <div className="col-span-6 flex items-center gap-4 w-full">
                                            <div className="w-20 h-20 bg-white/50 rounded-xl p-2 flex items-center justify-center border border-white/60">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h3 className="font-serif font-bold text-lg text-[#2d3047]">{item.title}</h3>
                                                <p className="text-xs font-bold uppercase text-[#2d68c4] tracking-wide">{item.size}</p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-2 text-center font-bold text-[#5D4037]">
                                            ₹{item.price}
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-span-2 flex justify-center">
                                            <div className="flex items-center gap-3 bg-white/50 rounded-full px-3 py-1 border border-white/60">
                                                <button onClick={() => updateQuantity(item.uniqueId, 'dec')} className="text-[#2d68c4] hover:scale-110 transition-transform"><FaMinus size={10} /></button>
                                                <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.uniqueId, 'inc')} className="text-[#2d68c4] hover:scale-110 transition-transform"><FaPlus size={10} /></button>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="col-span-2 text-center font-bold text-xl text-[#2d68c4]">
                                            ₹{item.price * item.quantity}
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.uniqueId)}
                                            className="absolute top-2 right-2 md:static md:top-auto md:right-auto md:absolute md:right-4 text-red-400 hover:text-red-600 transition-colors p-2"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Section */}
                            <div className="mt-8 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <button onClick={() => navigate('/products')} className="text-[#2d68c4] font-bold text-sm hover:underline">
                                    Continue Shopping
                                </button>

                                <div className="flex flex-col gap-4 w-full md:w-auto min-w-[300px]">
                                    <div className="flex justify-between items-center text-xl font-bold text-[#2d3047]">
                                        <span>Grand Total</span>
                                        <span className="text-3xl">₹{getCartTotal()}</span>
                                    </div>
                                    <button className="w-full bg-[#2d68c4] hover:bg-[#1a237e] text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-blue-900/30 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <style>
                {`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.2);
                }
                `}
            </style>
        </div>
    );
};

export default Cart;
