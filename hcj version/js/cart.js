// Cart Logic

export const getCartItems = () => {
    const savedCart = localStorage.getItem('ibaco-cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

export const saveCartItems = (cartItems) => {
    localStorage.setItem('ibaco-cart', JSON.stringify(cartItems));
    // Dispatch custom event to update UI in other components
    window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (product, quantity, size, price) => {
    let cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.id === product.id && item.size === size);

    if (existingItem) {
        cartItems = cartItems.map(item =>
            item.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
    } else {
        cartItems.push({ ...product, quantity, size, price, uniqueId: Date.now() });
    }

    saveCartItems(cartItems);
};

export const removeFromCart = (uniqueId) => {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.uniqueId !== uniqueId);
    saveCartItems(cartItems);
};

export const updateQuantity = (uniqueId, type) => {
    let cartItems = getCartItems();
    cartItems = cartItems.map(item => {
        if (item.uniqueId === uniqueId) {
            const newQuantity = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
    });
    saveCartItems(cartItems);
};

export const getCartTotal = () => {
    const cartItems = getCartItems();
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
    const cartItems = getCartItems();
    return cartItems.reduce((count, item) => count + item.quantity, 0);
};

// Listen for updates to update UI elsewhere
window.addEventListener('cartUpdated', () => {
    import('./main.js').then(module => {
        module.updateCartCountUI();
    });
});
