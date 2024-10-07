import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Header() {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="p-4 flex justify-between items-center mt-2">
            <h1 className="font-bold">
                <span className="text-xl text-orange-600 md:text-xlfont-bold">ornate</span>
                <span className="text-4xl text-black font-bold leading-none">.</span>
            </h1>
            <div className="flex items-center space-x-6">
                <button
                    className="relative bg-white p-2 rounded-lg"
                    onClick={() => navigate('/checkout')}
                >
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>
                <button className="bg-white p-2 rounded-lg">
                    <Menu className="h-6 w-6" />
                </button>
            </div>
            <WalletMultiButton />
        </header>
    );
}
