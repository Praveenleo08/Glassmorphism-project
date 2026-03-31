import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getCartCount } from './cart.js';

// Navbar Injection
function injectNavbar() {
    const navbarHTML = `
    <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm" id="navbar">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="relative w-12 h-12">
                    <div class="absolute inset-0 bg-white/30 rounded-full blur-md group-hover:blur-lg transition-all"></div>
                    <img src="assets/logo.png" alt="Ibaco Logo" class="relative z-10 w-full h-full object-contain drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                </div>
                <span class="text-2xl font-bold tracking-wider text-[#880E4F] font-cursive drop-shadow-sm group-hover:text-[#D81B60] transition-colors">ibaco</span>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-8 bg-white/20 px-8 py-3 rounded-full border border-white/30 shadow-inner backdrop-blur-sm">
                <a href="index.html" class="nav-link text-[#5D4037] font-semibold hover:text-[#D81B60] transition-colors relative group">
                    Home
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D81B60] transition-all group-hover:w-full"></span>
                </a>
                <a href="products.html" class="nav-link text-[#5D4037] font-semibold hover:text-[#D81B60] transition-colors relative group">
                    Products
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D81B60] transition-all group-hover:w-full"></span>
                </a>
                <a href="our-story.html" class="nav-link text-[#5D4037] font-semibold hover:text-[#D81B60] transition-colors relative group">
                    Our Story
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D81B60] transition-all group-hover:w-full"></span>
                </a>
                <a href="contact-us.html" class="nav-link text-[#5D4037] font-semibold hover:text-[#D81B60] transition-colors relative group">
                    Contact
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D81B60] transition-all group-hover:w-full"></span>
                </a>
            </div>

            <!-- Right Icons -->
            <div class="flex items-center gap-4 sm:gap-6">
                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-black/20 bg-white/20 text-[#5D4037] hover:bg-white/40 transition-all z-50">
                    <i class="fas fa-bars"></i>
                </button>

                <!-- Search (Visual Only) -->
                <button class="w-10 h-10 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center transition-all text-[#5D4037] hover:text-[#880E4F] shadow-sm hidden sm:flex">
                    <i class="fas fa-search"></i>
                </button>

                <!-- Cart -->
                <a href="cart.html" class="relative w-10 h-10 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center transition-all text-[#5D4037] hover:text-[#880E4F] shadow-sm transform hover:scale-110">
                    <i class="fas fa-shopping-cart"></i>
                    <span id="cart-count" class="absolute -top-1 -right-1 bg-[#D81B60] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce hidden">0</span>
                </a>

                <!-- User Profile / Auth -->
                <div id="auth-container" class="relative">
                    <!-- Injected via JS based on auth state -->
                    <a href="login.html" class="px-5 py-2 bg-gradient-to-r from-[#D81B60] to-[#880E4F] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm tracking-wide">
                        Login
                    </a>
                </div>
            </div>
            
            <!-- Mobile Menu Dropdown -->
            <div id="mobile-menu" class="absolute top-20 right-4 w-72 bg-white/90 backdrop-blur-3xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4 transition-all duration-300 origin-top-right transform scale-95 opacity-0 pointer-events-none z-40">
                <div class="flex flex-col gap-2">
                    <h3 class="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Explore</h3>
                    <a href="our-story.html" class="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Story</a>
                    <a href="products.html" class="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Our Products</a>
                    <a href="store-locator.html" class="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Store Locator</a>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <h3 class="text-[#922B21] font-bold text-sm uppercase tracking-wider border-b border-gray-200/50 pb-2 mb-1">Support</h3>
                    <span class="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg cursor-pointer">Order Online</span>
                    <a href="contact-us.html" class="text-gray-700 hover:text-[#D81B60] font-medium transition-colors px-2 py-1 hover:bg-white/40 rounded-lg">Contact Us</a>
                </div>
            </div>

        </div>
    </nav>
    <div style="height: 80px;"></div> <!-- Spacer -->
    `;

    // Insert at beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Mobile Menu Toggle Logic
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isClosed = mobileMenu.classList.contains('pointer-events-none');
            if (isClosed) {
                mobileMenu.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
            } else {
                mobileMenu.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && e.target !== mobileBtn) {
                mobileMenu.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
            }
        });
    }
}

// Authentication Listener
function initAuth() {
    onAuthStateChanged(auth, (user) => {
        const authContainer = document.getElementById('auth-container');
        if (user) {
            // User is signed in
            authContainer.innerHTML = `
                <div class="flex items-center gap-3 cursor-pointer group relative" id="user-menu-btn">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFECB3] to-[#FFD54F] border-2 border-white shadow-md overflow-hidden flex items-center justify-center text-[#5D4037] font-bold text-lg">
                        ${user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                </div>
                <!-- Dropdown -->
                 <div id="user-dropdown" class="absolute right-0 top-12 w-48 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-2 hidden opacity-0 transform -translate-y-2 transition-all duration-200">
                    <div class="px-4 py-2 border-b border-gray-200/50">
                        <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Signed in as</p>
                        <p class="text-sm font-bold text-[#880E4F] truncate">${user.displayName || 'User'}</p>
                    </div>
                    <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-[#F8BBD0]/30 rounded-xl transition-colors font-medium">Profile</a>
                    <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-[#F8BBD0]/30 rounded-xl transition-colors font-medium">Orders</a>
                    <div class="h-px bg-gray-200/50 my-1"></div>
                    <button id="logout-btn" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold flex items-center gap-2">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            `;

            // Toggle Dropdown
            const userBtn = document.getElementById('user-menu-btn');
            const dropdown = document.getElementById('user-dropdown');

            if (userBtn && dropdown) {
                userBtn.addEventListener('click', () => {
                    const isHidden = dropdown.classList.contains('hidden');
                    if (isHidden) {
                        dropdown.classList.remove('hidden');
                        setTimeout(() => {
                            dropdown.classList.remove('opacity-0', '-translate-y-2');
                        }, 10);
                    } else {
                        dropdown.classList.add('opacity-0', '-translate-y-2');
                        setTimeout(() => {
                            dropdown.classList.add('hidden');
                        }, 200);
                    }
                });
            }

            // Logout Logic
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async () => {
                    try {
                        await signOut(auth);
                        window.location.reload();
                    } catch (error) {
                        console.error('Logout error', error);
                    }
                });
            }

        } else {
            // User is signed out
            authContainer.innerHTML = `
                <a href="login.html" class="px-5 py-2 bg-gradient-to-r from-[#D81B60] to-[#880E4F] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm tracking-wide">
                    Login
                </a>
            `;
        }
    });
}

function updateCartCountUI() {
    const count = getCartCount();
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        if (count === 0) {
            badge.classList.add('hidden');
        } else {
            badge.classList.remove('hidden');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    initAuth();
    updateCartCountUI();
});

export { updateCartCountUI };
