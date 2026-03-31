import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FaUserCircle, FaSignOutAlt, FaPhone, FaMapMarkerAlt, FaEdit, FaSave } from 'react-icons/fa';
import Navbar from './Navbar';
import contactBg from './assets/contact us bg.png';
import logo from './assets/logo.png';

const UserAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const navigate = useNavigate();

    const [error, setError] = useState('');

    useEffect(() => {
        let timeoutId;

        // Failsafe: Stop loading after 5 seconds if network is blocked
        timeoutId = setTimeout(() => {
            if (loading) {
                setLoading(false);
                setError("Connection timeout. Please check your network.");
            }
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth,
            async (currentUser) => {
                clearTimeout(timeoutId);
                if (currentUser) {
                    setUser(currentUser);
                    try {
                        const docRef = doc(db, "users", currentUser.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            setPhone(docSnap.data().phone || '');
                            setAddress(docSnap.data().address || '');
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    }
                } else {
                    // Don't auto-redirect immediately on error to let user see the UI
                    if (!loading) navigate('/login');
                }
                setLoading(false);
            },
            (err) => {
                clearTimeout(timeoutId);
                console.error("Auth Error:", err);
                setLoading(false);
                setError(err.message);
            }
        );
        return () => {
            unsubscribe();
            clearTimeout(timeoutId);
        };
    }, [navigate, loading]);

    const handleSaveProfile = async () => {
        setSaveLoading(true);
        try {
            await setDoc(doc(db, "users", user.uid), {
                phone: phone,
                address: address
            }, { merge: true });
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setSaveLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#e699bc] text-white gap-4">
                <div className="text-2xl font-bold animate-pulse">Loading Account...</div>
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full font-bold backdrop-blur-sm transition-all border border-white/40"
                >
                    Cancel
                </button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#e699bc] text-white gap-6 p-4 text-center">
                <div className="text-6xl">⚠️</div>
                <h2 className="text-3xl font-bold">Connection Error</h2>
                <div className="bg-white/20 p-6 rounded-xl max-w-lg backdrop-blur-sm border border-white/30 shadow-lg">
                    <p className="text-lg font-medium mb-2">{error}</p>
                    <p className="text-sm opacity-90">
                        Please check your internet connection. If you are using a VPN or Proxy, try disabling it.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-white text-[#D81B60] rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                    >
                        Retry Connection
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-black/20 hover:bg-black/30 text-white rounded-full font-bold backdrop-blur-sm transition-all border border-white/40"
                    >
                        Go to Login
                    </button>
                </div>
                <div className="mt-8 text-xs opacity-70 max-w-md">
                    Technical Detail: If this persists, ensure <code>firebase.googleapis.com</code> is reachable from your network.
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen w-full relative font-sans overflow-x-hidden text-[#5D4037]">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={contactBg} alt="Account Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 mix-blend-overlay"></div>
            </div>

            {/* Floating Blobs Animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 pt-32 pb-20">

                {/* Glass Card */}
                <div className="glass w-full max-w-4xl min-h-[550px] rounded-[3rem] p-12 relative flex flex-col md:flex-row gap-12 items-center animate-fade-in-up bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">

                    {/* Left Section: Profile Info */}
                    <div className="flex-1 w-full flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/30 pb-8 md:pb-0 md:pr-8">
                        <div className="relative mb-6 group">
                            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-purple-200 to-pink-200 p-1 shadow-2xl">
                                <div className="w-full h-full bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
                                    <FaUserCircle className="text-[10rem] text-[#880E4F]/70" />
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-4 w-10 h-10 bg-green-400 rounded-full border-4 border-white shadow-md" title="Online"></div>
                        </div>

                        <h1 className="text-4xl font-black text-[#5D4037] tracking-tight mb-2 text-center drop-shadow-sm">
                            {user.displayName || 'Ice Cream Lover'}
                        </h1>
                        <p className="text-lg font-bold text-[#880E4F] bg-white/40 px-6 py-1.5 rounded-full shadow-inner border border-white/30">
                            {user.email}
                        </p>
                    </div>

                    {/* Right Section: Actions & Stats */}
                    <div className="flex-1 w-full flex flex-col gap-6">
                        <div className="bg-white/40 rounded-[2rem] p-8 shadow-inner border border-white/50 flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-[#5D4037] mb-2 border-b border-black/5 pb-2">My Profile</h2>

                            <div className="flex justify-between items-center group cursor-default">
                                <span className="font-semibold text-gray-700">Member Since</span>
                                <span className="font-bold text-[#880E4F] bg-pink-100 px-3 py-1 rounded-lg shadow-sm">Feb 2026</span>
                            </div>

                            <div className="flex justify-between items-center group cursor-default">
                                <span className="font-semibold text-gray-700">Account Status</span>
                                <span className="flex items-center gap-2 font-bold text-green-700 bg-green-100 px-3 py-1 rounded-lg shadow-sm">
                                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> Active
                                </span>
                            </div>

                            {/* Editable Fields */}
                            <div className="mt-4 pt-4 border-t border-black/5 flex flex-col gap-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold text-[#5D4037]">Contact Details</h3>
                                    <button
                                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm transition-all shadow-sm ${isEditing
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                            }`}
                                    >
                                        {isEditing ? (saveLoading ? 'Saving...' : <><FaSave /> Save</>) : <><FaEdit /> Edit</>}
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-600 flex items-center gap-2"><FaPhone className="text-[#880E4F]" /> Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter phone number"
                                            className="w-full px-4 py-2 rounded-xl border border-white/60 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#880E4F]/30 placeholder-gray-400 font-medium text-[#5D4037]"
                                        />
                                    ) : (
                                        <p className="font-medium text-[#5D4037] bg-white/30 px-4 py-2 rounded-xl border border-white/40 min-h-[42px] flex items-center">
                                            {phone || <span className="text-gray-400 italic">No phone number added</span>}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-gray-600 flex items-center gap-2"><FaMapMarkerAlt className="text-[#880E4F]" /> Detailed Address</label>
                                    {isEditing ? (
                                        <textarea
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your detailed address"
                                            className="w-full px-4 py-2 rounded-xl border border-white/60 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#880E4F]/30 placeholder-gray-400 font-medium text-[#5D4037] resize-none h-24"
                                        />
                                    ) : (
                                        <p className="font-medium text-[#5D4037] bg-white/30 px-4 py-2 rounded-xl border border-white/40 min-h-[60px] whitespace-pre-wrap">
                                            {address || <span className="text-gray-400 italic">No address added</span>}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full py-4 mt-auto bg-gradient-to-r from-[#D81B60] to-[#880E4F] hover:from-[#C2185B] hover:to-[#6A1B9A] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all text-lg tracking-wide flex items-center justify-center gap-3 group"
                        >
                            <FaSignOutAlt className="text-xl group-hover:rotate-180 transition-transform duration-500" />
                            Sign Out
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserAccount;
