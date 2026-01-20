import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import MainPage from './MainPage.jsx';
import './App.css';

function AppRoutes({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
      <Route path="/" element={loggedIn ? <MainPage /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <AppRoutes loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </Router>
  );
}

export default App;
