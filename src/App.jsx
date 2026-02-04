import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import OurStory from './OurStory';
import ProductsHome from './ProductsHome';
import OurProducts from './OurProducts';
import StoreLocator from './StoreLocator';
import ContactUs from './ContactUs';
import ScrollToTop from './ScrollToTop';

import CelebrationCakes from './CelebrationCakes';
import ProductDetails from './ProductDetails';
import Cart from './Cart';

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/products" element={<ProductsHome />} />
          <Route path="/ice-cream-items" element={<OurProducts />} />
          <Route path="/celebration-cakes" element={<CelebrationCakes />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
