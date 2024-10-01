import React, { useState } from 'react';
import { ChevronLeft, ShoppingCart, Menu, Minus, Plus, Trash2 } from 'lucide-react';

function CartIcon() {
    return (
        <button variant="ghost" size="icon" className="relative bg-white p-2 rounded-lg">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
        </button>
    );
}

function MenuIcon() {
    return (
        <button variant="ghost" size="icon" className='bg-white p-2 rounded-lg'>
            <Menu className="h-6 w-6" />
        </button>
    );
}

function BackButton() {
    return (
        <button
            className="bg-white p-2 rounded-lg shadow-md"
            onClick={() => window.history.back()} // Functionality to go back in history
        >
            <ChevronLeft className="h-5 w-5" />
        </button>
    );
}

function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-[#f5e6d3] p-4 flex justify-between items-center mt-2 z-10">
            <h1 className="font-bold">
                <span className="text-xl text-orange-600 md:text-xl font-bold">ornate</span>
                <span className="text-4xl text-black font-bold leading-none">.</span>
            </h1>
            <div className="flex items-center space-x-6">
                <CartIcon />
                <MenuIcon />
            </div>
        </header>
    );
}

// Component to render each cart item
const CartItem = ({ item, updateQuantity }) => {
    return (
        <div className="flex items-center bg-white rounded-xl p-4 shadow-md">
            <div className={`w-16 h-16 ${item.color} rounded-md mr-4 overflow-hidden`}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
                <h2 className="font-semibold text-sm">{item.name}</h2>
                <p className="text-[#f97316] font-bold text-sm">{item.price} SOL</p>
                <div className="flex items-center mt-2 space-x-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-6 w-6 p-0">
                        <Minus className="h-3 w-3" />
                    </button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-6 w-6 p-0">
                        <Plus className="h-3 w-3" />
                    </button>
                </div>
            </div>
            <button className="h-6 w-6 p-0">
                <Trash2 className="h-4 w-4 text-gray-400" />
            </button>
        </div>
    );
};

// Component to render the promo code input and apply button
const PromoCode = ({ promoCode, setPromoCode }) => {
    return (
        <div className="flex gap-2 bg-white p-3 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="PROMO CODE"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
            />
            <button className="bg-[#f97316] text-white px-6 py-2 rounded-xl">APPLY</button>
        </div>
    );
};

// Component to render the subtotal, gas price, and total
const PricingSummary = ({ subtotal, gasPrice, total }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-500">Sub Total</span>
                <span>{subtotal.toFixed(3)} SOL</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Gas price</span>
                <span>{gasPrice.toFixed(4)} SOL</span>
            </div>
            <div className="flex justify-between font-bold">
                <span>Bag Total</span>
                <span>{total.toFixed(3)} SOL</span>
            </div>
        </div>
    );
};

// Main CheckoutPage component
export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Modern Style Outfit', price: 10, quantity: 1, image: '/products/p1.png', color: 'bg-pink-300' },
    ]);
    const [promoCode, setPromoCode] = useState('');

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gasPrice = 0.0997;
    const total = subtotal + gasPrice;

    const updateQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
        ));
    };

    return (
        <div className="min-h-screen bg-[#f5e6d3] text-gray-800 p-4 max-w-md mx-auto font-sans">
            <Header />

            {/* Add padding top to compensate for fixed header */}
            <main className="space-y-4 mt-8 pt-6 pb-48">
                <div className="mt-6">
                    <BackButton />
                </div>
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />
                ))}
            </main>

            {/* Fixed promo code, pricing, and checkout button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 space-y-4 shadow-lg">
                <PromoCode promoCode={promoCode} setPromoCode={setPromoCode} />
                <PricingSummary subtotal={subtotal} gasPrice={gasPrice} total={total} />
                <button className="w-full bg-[#f97316] text-white py-4 text-lg font-semibold rounded-3xl shadow-md">
                    Proceed To Checkout
                </button>
            </div>
        </div>
    );
}
