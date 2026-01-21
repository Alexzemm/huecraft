import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import MainPage from './MainPage.jsx';
import Cart from './Cart.jsx';
import './App.css';

function AppRoutes({ loggedIn, setLoggedIn, cartItems, setCartItems }) {
  const navigate = useNavigate();
  const location = window.location.pathname;
  useEffect(() => {
    if (!loggedIn && location !== '/login') {
      navigate('/login');
    } else if (loggedIn && location === '/login') {
      navigate('/');
    }
  }, [loggedIn, navigate, location]);

  // Handler to go to cart page
  const handleCartClick = () => {
    navigate('/cart');
  };

  // Remove and clear handlers for Cart
  const handleRemoveFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
      <Route path="/" element={loggedIn ? <MainPage onCartClick={handleCartClick} cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" replace />} />
      <Route path="/cart" element={loggedIn ? <Cart items={cartItems} onRemove={handleRemoveFromCart} onClear={handleClearCart} /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  return (
    <Router>
      <AppRoutes loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartItems={cartItems} setCartItems={setCartItems} />
    </Router>
  );
}

export default App;
