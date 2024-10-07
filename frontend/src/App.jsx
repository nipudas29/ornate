import './App.css';
import { CartProvider } from './components/CartContext';
import AuctionPage from './pages/AuctionPage';
import CardPage from './pages/CardPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletContextProvider } from './components/WalletContextProvider';

function App() {
  return (
    <WalletContextProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/card" element={<CardPage />} />
            <Route path="/product/:id" element={<CardPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/auction" element={<AuctionPage />} />
            <Route path="/auction/:id" element={<AuctionPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </WalletContextProvider>
  );
}

export default App;