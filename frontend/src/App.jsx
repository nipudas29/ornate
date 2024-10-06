import './App.css';
import AuctionPage from './pages/AuctionPage';
import CardPage from './pages/CardPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/auction" element={<AuctionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
