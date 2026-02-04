// Data for slides
const slides = [
    {
        id: 'cotton',
        titleFirst: 'Cotton Candy',
        titleSecond: 'Ice Cream',
        desc: 'A blend of vanilla, strawberry, and a hint of caramelized sugar. This combination creates a sweet, slightly fruity, and light flavor',
        bg: '#F8BBD0', // Pinkish
        accentColor: '#880E4F',
        mainImg: 'assets/Glassmorphism images Source/cotton candy.png',
        thumb: 'assets/Glassmorphism images Source/cotton candy.png'
    },
    {
        id: 'pista',
        titleFirst: 'Pista',
        titleSecond: 'Ice-Cream',
        desc: 'A popular, often green-colored dessert with a distinctive nutty and slightly sweet flavor from pistachios',
        bg: '#C5E1A5',
        accentColor: '#558B2F',
        mainImg: 'assets/Glassmorphism images Source/pista_new.png',
        thumb: 'assets/Glassmorphism images Source/pista_new.png'
    },
    {
        id: 'choco',
        titleFirst: 'Choco',
        titleSecond: 'Ice-Cream',
        desc: 'A creamy frozen treat flavored with natural or artificial chocolate',
        bg: '#d7b49e',
        accentColor: '#5D4037',
        mainImg: 'assets/Glassmorphism images Source/choco_new.png',
        thumb: 'assets/Glassmorphism images Source/choco_new.png'
    },
    {
        id: 'butterscotch',
        titleFirst: 'Butterscotch',
        titleSecond: 'Ice-Cream',
        desc: 'A popular frozen dessert featuring a creamy, sweet base infused with rich butterscotch flavor, often studded with crunchy bits of caramelized sugar and nuts',
        bg: '#FFE082',
        accentColor: '#FF6F00',
        mainImg: 'assets/Glassmorphism images Source/butter_new.png',
        thumb: 'assets/Glassmorphism images Source/butter_new.png'
    }
];

// Helper to check if we are on the home page
const isHomePage = () => !!document.getElementById('home-container');

// State for Home Slider
let currentSlideIndex = 0;

function updateSlide(index) {
    if (!isHomePage()) return;

    currentSlideIndex = index;
    const slide = slides[index];

    // Update Background Color
    document.getElementById('home-container').style.backgroundColor = slide.bg;

    // Update Text
    const titleEl = document.getElementById('hero-title');
    titleEl.innerHTML = `${slide.titleFirst} <br /> ${slide.titleSecond}`;

    document.getElementById('hero-desc').textContent = slide.desc;

    // Update Main Image
    const mainImgContainer = document.getElementById('hero-img-container');
    // Animate out
    // Simple replacement for now, could add sophisticated CSS animation class toggling
    mainImgContainer.innerHTML = `<img src="${slide.mainImg}" alt="${slide.titleFirst}" class="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] filter brightness-110 contrast-110 animate-float-enter" />`;

    // Position Update logic based on index (from React code)
    // ${current === 0 ? 'w-[550px] right-[50px] top-[100px]' : current === 2 ? 'w-[600px] right-[0px] top-[80px]' : 'w-[800px] right-[-50px] top-[50px]'}
    let positionClass = '';
    if (index === 0) positionClass = 'w-[550px] right-[50px] top-[100px]';
    else if (index === 2) positionClass = 'w-[600px] right-[0px] top-[80px]';
    else positionClass = 'w-[800px] right-[-50px] top-[50px]';

    mainImgContainer.className = `relative z-10 transition-all duration-500 ${positionClass}`;


    // Update Navigation Dots/Thumbs line
    // left: `${current * (80 + 32) + 16}px`
    const activeLine = document.getElementById('nav-active-line');
    if (activeLine) {
        activeLine.style.left = `${index * 112 + 16}px`;
    }

    // Update Thumbnails styles
    document.querySelectorAll('.flavor-thumb').forEach((el, i) => {
        if (i === index) {
            el.className = 'flavor-thumb w-20 h-20 rounded-full border-4 p-1 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 z-20 scale-125 border-white -translate-y-4';
        } else {
            el.className = 'flavor-thumb w-20 h-20 rounded-full border-4 p-1 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 z-20 border-white/50 grayscale-[50%]';
        }
    });
}

function initSlider() {
    if (!isHomePage()) return;

    const thumbsContainer = document.getElementById('flavor-thumbs');
    if (!thumbsContainer) return;

    // Generate Thumbs
    thumbsContainer.innerHTML = '';

    // Active Line
    const bgLine = document.createElement('div');
    bgLine.className = 'absolute bottom-[-10px] h-1 bg-white/50 w-full rounded-full';
    thumbsContainer.appendChild(bgLine);

    const activeLine = document.createElement('div');
    activeLine.id = 'nav-active-line';
    activeLine.className = 'absolute bottom-[-10px] h-1 bg-white w-20 transition-all duration-300 ease-in-out z-10';
    thumbsContainer.appendChild(activeLine);

    slides.forEach((s, i) => {
        const thumb = document.createElement('div');
        // Initial class
        thumb.className = `flavor-thumb w-20 h-20 rounded-full border-4 p-1 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 z-20 ${i === 0 ? 'scale-125 border-white -translate-y-4' : 'border-white/50 grayscale-[50%]'}`;

        const img = document.createElement('img');
        img.src = s.thumb;
        img.className = 'w-full h-full object-cover rounded-full';
        img.alt = s.titleFirst;

        thumb.appendChild(img);

        thumb.onclick = () => updateSlide(i);

        thumbsContainer.appendChild(thumb);
    });

    updateSlide(0);
}

// Mobile Menu Logic
function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isOpen = !menu.classList.contains('opacity-0');
            if (isOpen) {
                // Close
                menu.classList.add('opacity-0', 'scale-95', '-translate-y-4', 'pointer-events-none');
                menu.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            } else {
                // Open
                menu.classList.remove('opacity-0', 'scale-95', '-translate-y-4', 'pointer-events-none');
                menu.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            }
        });
    }
}

// Scroll Reveal Logic
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
                entry.target.classList.remove('opacity-0', 'translate-y-12', '-translate-x-12', 'translate-x-12'); // Remove initial states
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        // Set initial state based on data-direction usually, but for simplicity here we assume a class handles it or we set inline styles
        // The React code used inline styles for transform. 
        // We will stick to simple CSS classes for "reveal"
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initMobileMenu();
    initScrollReveal();
});
