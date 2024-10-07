import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../components/CartContext";
import { ChevronLeft, Minus, Plus } from 'lucide-react';

function ImageSection({ image }) {
    return (
        <>
            <div className="flex justify-center items-center w-full px-4 my-2">
                <img
                    src={image}
                    alt="Product"
                    className="w-full max-h-[50vh] object-contain rounded-md"
                />
            </div>
            <div className="flex justify-center mt-5 gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
        </>
    );
}

function ProductDetails({ title, price, description }) {
    return (
        <div className="p-4 flex-grow">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-lg font-bold">{price}</p>
            </div>
            <div className="mb-2">
                <h1 className="font-semibold text-sm">Details</h1>
                <p className="text-xs text-gray-600 mb-4">{description}</p>
            </div>
            <div className="flex justify-between items-center font-semibold text-sm">
                <span>Colors:</span>
                <span>Size: M</span>
            </div>
        </div>
    );
}

function BuyButtonNav({ onBuyNow }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

    return (
        <div className="bg-white w-full py-3 px-4 fixed bottom-0 left-0 right-0 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={handleDecrement}
                    className="rounded-full w-10 h-10 text-white p-0 border bg-[#E6841D] text-sm font-bold flex justify-center items-center"
                >
                    <Minus size={16} />
                </button>
                <span className="text-sm">{quantity}</span>
                <button
                    onClick={handleIncrement}
                    className="rounded-full w-10 h-10 text-white p-0 border bg-[#E6841D] text-sm font-bold flex justify-center items-center"
                >
                    <Plus size={16} />
                </button>
            </div>
            <button
                onClick={() => onBuyNow(quantity)}
                className="bg-[#E6841D] h-[48px] w-[156px] hover:bg-[#f4a460] text-white rounded-full px-4 py-1.5 text-sm font-semibold"
            >
                Add to Cart
            </button>
        </div>
    );
}


function BackButton() {
    return (
        <button
            className="bg-white p-2 flex gap-2 rounded-lg shadow-md ml-5"
            onClick={() => window.history.back()} // Functionality to go back in history
        >
            <ChevronLeft className="h-5 w-5" />
        </button>
    );
}

export default function CardPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (location.state && location.state.product) {
            setProduct(location.state.product);
        } else {
            // Fetch product data based on id
            // This is a placeholder, replace with actual API call
            setProduct({
                id,
                image: "/products/p2.png",
                title: "Modern Style Outfit",
                price: "2 SOL",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            });
        }
    }, [id, location.state]);

    const handleBuyNow = (quantity) => {
        if (product) {
            addToCart({ ...product, quantity });
            navigate('/checkout');
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-white w-full font-sans flex flex-col">
            <div className="bg-[#f8ede3]">
                <Header />
                <BackButton />
                <ImageSection image={product.image} />
            </div>

            <ProductDetails title={product.title} price={product.price} description={product.description} />

            <BuyButtonNav onBuyNow={handleBuyNow} />
        </div>
    );
}