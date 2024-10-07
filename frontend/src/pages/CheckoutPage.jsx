import React, { useState } from 'react';
import { ChevronLeft, ShoppingCart, Menu, Minus, Plus, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../components/CartContext';

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

// Component to render each cart item
const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="flex items-center bg-white rounded-xl p-4 shadow-md">
            <div className={`w-16 h-16 ${item.color} rounded-md mr-4 overflow-hidden`}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
                <h2 className="font-semibold text-sm">{item.title}</h2>
                <p className="text-[#f97316] font-bold text-sm">{item.price}</p>
                <div className="flex items-center mt-2 space-x-2">
                    <button onClick={() => updateQuantity(Math.max(1, item.quantity - 1))} className="h-6 w-6 p-0">
                        <Minus className="h-3 w-3" />
                    </button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.quantity + 1)} className="h-6 w-6 p-0">
                        <Plus className="h-3 w-3" />
                    </button>
                </div>
            </div>
            <button className="h-6 w-6 p-0" onClick={removeItem}>
                <Trash2 className="h-4 w-4 text-gray-400" />
            </button>
        </div>
    );
};

// Component to render the promo code input and apply button
const PromoCode = ({ promoCode, setPromoCode }) => {
    return (
        <div className="flex gap-2 bg-white p-3 rounded-lg drop-shadow-lg">
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
const PricingSummary = ({ subtotal, gasPrice, discount, total }) => {
    return (
        <div className="bg-white p-4 rounded-lg drop-shadow-lg space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-500">Sub Total</span>
                <span>{subtotal.toFixed(3)} SOL</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Gas price</span>
                <span>{gasPrice.toFixed(4)} SOL</span>
            </div>
            {discount > 0 && (
                <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{discount.toFixed(3)} SOL</span>
                </div>
            )}
            <div className="flex justify-between font-bold">
                <span>Bag Total</span>
                <span>{total.toFixed(3)} SOL</span>
            </div>
        </div>
    );
};

export default function CheckoutPage() {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const [promoCode, setPromoCode] = useState('');

    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const gasPrice = 0.0997;
    const discount = promoCode === 'DISCOUNT10' ? subtotal * 0.1 : 0;
    const total = subtotal + gasPrice - discount;

    return (
        <div className="min-h-screen bg-[#f5e6d3] text-gray-800 p-4 max-w-md mx-auto font-sans">
            <Header />

            <main className="space-y-4 mb-24">
                <div className="mt-6">
                    <BackButton />
                </div>
                {cartItems.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        updateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
                        removeItem={() => removeFromCart(item.id)}
                    />
                ))}
            </main>

            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[43px] p-4 space-y-8 shadow-lg">
                <PromoCode promoCode={promoCode} setPromoCode={setPromoCode} />
                <PricingSummary subtotal={subtotal} gasPrice={gasPrice} discount={discount} total={total} />
                <button className="w-full bg-[#f97316] text-white py-4 text-lg font-semibold rounded-3xl shadow-md">
                    Proceed To Checkout
                </button>
            </div>
        </div>
    );
}