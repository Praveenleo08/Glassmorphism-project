import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('ibaco-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('ibaco-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity, size, price) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id && item.size === size);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity, size, price, uniqueId: Date.now() }];
        });
    };

    const removeFromCart = (uniqueId) => {
        setCartItems(prevItems => prevItems.filter(item => item.uniqueId !== uniqueId));
    };

    const updateQuantity = (uniqueId, type) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.uniqueId === uniqueId) {
                    const newQuantity = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
                    return { ...item, quantity: Math.max(1, newQuantity) };
                }
                return item;
            })
        );
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
