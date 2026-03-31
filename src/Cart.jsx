import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { FaTrash, FaPlus, FaMinus, FaTags, FaMapMarkerAlt, FaSave, FaPhone } from 'react-icons/fa';
import Navbar from './Navbar';
import contactBg from './assets/contact us bg.png';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, setCartItems } = useCart(); // Need setCartItems to clear cart
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const [user, setUser] = useState(null);
    const [loadingAddress, setLoadingAddress] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setLoadingAddress(true);
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setAddress(docSnap.data().address || '');
                        setPhone(docSnap.data().phone || '');
                        if (docSnap.data().address && docSnap.data().phone) {
                            setIsAddressSaved(true);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching address:", error);
                } finally {
                    setLoadingAddress(false);
                }
            } else {
                setAddress('');
                setIsAddressSaved(false);
                setLoadingAddress(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleApplyPromo = () => {
        if (promoCode.trim().toUpperCase() === 'SAVE10') {
            setDiscount(0.10); // 10% discount
            setPromoError('');
        } else {
            setDiscount(0);
            setPromoError('Invalid Promo Code');
        }
    };

    const handleSaveAddress = async () => {
        if (!user) {
            alert("Please login to save your address.");
            return;
        }
        try {
            setLoadingAddress(true); // Re-use loading state to show activity
            await setDoc(doc(db, "users", user.uid), {
                address: address,
                phone: phone
            }, { merge: true });
            setIsAddressSaved(true);
            alert("Address and Contact saved successfully!");
        } catch (error) {
            console.error("Error saving address:", error);
            alert(`Failed to save address: ${error.message}`);
        } finally {
            setLoadingAddress(false);
        }
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!user) {
            alert("Please login to proceed with payment.");
            navigate('/login');
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const options = {
            key: "rzp_test_SFWlwVACNEuZif",
            amount: Math.round(total * 100), // Razorpay expects amount in paise
            currency: "INR",
            name: "Ibaco",
            description: "Ice Cream Delight",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Ibaco_logo.jpg/1200px-Ibaco_logo.jpg",
            handler: function (response) {
                console.log(response.razorpay_payment_id);
                // Clear Cart
                setCartItems([]);
                // Navigate to success
                navigate('/success');
            },
            prefill: {
                name: user.displayName || "Ice Cream Lover",
                email: user.email,
                contact: phone || ""
            },
            notes: {
                address: address
            },
            theme: {
                color: "#D81B60"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.description);
        });
        rzp1.open();
    };

    const subtotal = getCartTotal();
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    return (
        <div className="min-h-screen w-full relative font-sans overflow-x-hidden text-[#5D4037]">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={contactBg} alt="Cart Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 mix-blend-overlay"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen pt-32 pb-20 px-4 md:px-10 flex flex-col items-center">

                <h1 className="text-4xl md:text-5xl font-black text-[#5D4037] mb-10 tracking-tight drop-shadow-sm text-center">
                    Your <span className="text-[#880E4F]">Shopping Cart</span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className="glass w-full max-w-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white/30 backdrop-blur-md rounded-3xl md:rounded-[3rem] border border-white/50 shadow-xl animate-fade-in-up mt-8">
                        <div className="text-5xl md:text-6xl text-[#880E4F] mb-4 md:mb-6 opacity-50">🛒</div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#5D4037] mb-2">Your cart is empty</h2>
                        <p className="text-gray-700 mb-6 md:mb-8 text-sm md:text-base">Looks like you haven't added any delicious treats yet.</p>
                        <a href="/products" className="px-6 md:px-8 py-2 md:py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-sm md:text-base">
                            Start Shopping
                        </a>
                    </div>
                ) : (
                    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Cart Items */}
                        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6 animate-fade-in-left">
                            {cartItems.map((item) => (
                                <div key={item.uniqueId} className="glass p-4 md:p-6 rounded-3xl md:rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/50 shadow-md flex flex-col sm:flex-row items-center gap-4 md:gap-6 hover:bg-white/50 transition-colors group relative">
                                    <button onClick={() => removeFromCart(item.uniqueId)} className="absolute top-4 right-4 sm:hidden w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors shadow-sm z-10">
                                        <FaTrash size={12} />
                                    </button>
                                    
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-white">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <h3 className="text-lg md:text-xl font-bold text-[#5D4037] leading-tight mb-1">{item.name || item.title || 'Unknown Product'}</h3>
                                        <p className="text-xs md:text-sm text-gray-600 font-medium">Size: {item.size}</p>
                                        <p className="text-base md:text-lg font-bold text-[#880E4F] mt-1">₹{item.price}</p>
                                    </div>

                                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 mt-2 sm:mt-0">
                                        <div className="flex items-center gap-2 md:gap-3 bg-white/50 rounded-full px-2 py-1 md:px-3 md:py-1 border border-white/60 shadow-inner mx-auto sm:mx-0">
                                            <button onClick={() => updateQuantity(item.uniqueId, 'dec')} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#5D4037] transition-colors">
                                                <FaMinus className="text-[10px] md:text-xs" />
                                            </button>
                                            <span className="font-bold text-[#5D4037] w-4 text-center text-sm md:text-base">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.uniqueId, 'inc')} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#5D4037] transition-colors">
                                                <FaPlus className="text-[10px] md:text-xs" />
                                            </button>
                                        </div>

                                        <button onClick={() => removeFromCart(item.uniqueId)} className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors shadow-sm ml-2">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Order Summary, Promo, Address */}
                        <div className="flex flex-col gap-6 animate-fade-in-right delay-100">

                            {/* Promo Code Section */}
                            <div className="glass p-8 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/50 shadow-lg">
                                <h3 className="text-xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                                    <FaTags className="text-[#880E4F]" /> Promo Code
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Use 'SAVE10'"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-1 px-4 py-2 rounded-xl border border-white/60 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#880E4F]/30 placeholder-gray-500 font-medium text-[#5D4037]"
                                    />
                                    <button
                                        onClick={handleApplyPromo}
                                        className="px-4 py-2 bg-[#880E4F] hover:bg-[#6A0DAD] text-white font-bold rounded-xl shadow-md transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {promoError && <p className="text-red-600 text-sm mt-2 font-bold ml-1">{promoError}</p>}
                                {discount > 0 && <p className="text-green-700 text-sm mt-2 font-bold ml-1">Promo code applied!</p>}
                            </div>

                            {/* Delivery Address Section */}
                            <div className="glass p-8 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/50 shadow-lg">
                                <h3 className="text-xl font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-[#880E4F]" /> Delivery Address
                                </h3>

                                {loadingAddress ? (
                                    <div className="text-sm font-bold text-gray-500 animate-pulse">Loading address...</div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {user ? (
                                            <>
                                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/60 bg-white/50 focus-within:ring-2 focus-within:ring-[#880E4F]/30">
                                                    <FaPhone className="text-[#880E4F]" />
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => {
                                                            setPhone(e.target.value);
                                                            setIsAddressSaved(false);
                                                        }}
                                                        placeholder="Phone Number"
                                                        className="w-full bg-transparent focus:outline-none font-medium text-[#5D4037] placeholder-gray-500"
                                                    />
                                                </div>
                                                <textarea
                                                    value={address}
                                                    onChange={(e) => {
                                                        setAddress(e.target.value);
                                                        setIsAddressSaved(false);
                                                    }}
                                                    placeholder="Enter your delivery address..."
                                                    className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#880E4F]/30 placeholder-gray-500 font-medium text-[#5D4037] resize-none h-24"
                                                />
                                                <button
                                                    onClick={handleSaveAddress}
                                                    disabled={isAddressSaved}
                                                    className={`w-full py-2 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 ${isAddressSaved
                                                        ? 'bg-green-100 text-green-700 cursor-default'
                                                        : 'bg-white hover:bg-gray-50 text-[#5D4037]'
                                                        }`}
                                                >
                                                    <FaSave /> {isAddressSaved ? 'Saved' : 'Save Address'}
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center p-4 bg-white/30 rounded-xl border border-white/40">
                                                <p className="text-gray-700 mb-2 font-medium">Please login to manage your delivery address.</p>
                                                <a href="/login" className="text-[#880E4F] font-bold underline">Login Now</a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Order Summary */}
                            <div className="glass p-8 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                                <h3 className="text-2xl font-bold text-[#5D4037] mb-6 border-b border-black/5 pb-4">Order Summary</h3>

                                <div className="flex justify-between items-center mb-3 text-gray-700 font-medium">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between items-center mb-3 text-green-700 font-bold">
                                        <span>Discount (10%)</span>
                                        <span>-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center mb-8 text-[#5D4037] font-black text-2xl pt-4 border-t border-black/10">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    className="w-full py-4 bg-gradient-to-r from-[#D81B60] to-[#880E4F] hover:from-[#C2185B] hover:to-[#6A1B9A] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all text-lg tracking-wide uppercase flex items-center justify-center gap-2"
                                >
                                    Pay ₹{total.toFixed(2)}
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
