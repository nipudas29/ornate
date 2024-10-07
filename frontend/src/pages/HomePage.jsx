import { useState } from 'react';
import { House, Search, ShoppingCart, Menu, Heart, Receipt, Grid, Headphones, User, SlidersHorizontal } from 'lucide-react';
import { HomeIcon } from '../components/Icons/HomeIcons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';

function SearchBar() {
    return (
        <div className="px-4 mb-4 w-full">
            <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="search"
                    placeholder="Search"
                    className="pl-10 pr-10 py-3 rounded-full bg-white w-full shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <SlidersHorizontal className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
}

function CategoryButtons() {
    const categories = ["All", "Man", "Woman", "Bags", "Accessories"];
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <div className="no-scrollbar px-4 mt-3 mb-4 flex space-x-2 overflow-x-auto">
            {categories.map((item) => (
                <button
                    key={item}
                    onClick={() => setSelectedCategory(item)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${item === selectedCategory
                        ? "bg-[#D6CCC2] text-black font-medium"
                        : "bg-transparent text-gray-600"
                        }`}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

function ProductCard({ id, image, title, price, aspectRatio = '1/1', isBidding = false }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleClick = () => {
        if (isBidding) {
            navigate(`/auction/${id}`);
        } else {
            navigate(`/product/${id}`, { state: { product: { id, image, title, price, description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' } } });
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart({ id, image, title, price });
    };

    return (
        <div className="relative rounded-3xl overflow-hidden" onClick={handleClick}>
            <img src={image} alt={title} className="w-full h-full object-cover" style={{ aspectRatio }} />
            {isBidding && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    LIVE
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-medium text-white">{title}</h3>
                        <span className="text-sm font-bold text-white">{price}</span>
                    </div>
                    {isBidding ? (
                        <button
                            className="w-20 bg-orange-500 rounded-3xl px-3 py-1 flex items-center justify-center text-white text-xs font-bold"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/auction/${id}`);
                            }}
                        >
                            Bid Now
                        </button>
                    ) : (
                        <button
                            className="h-8 w-8 bg-white rounded-full flex items-center justify-center"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="h-4 w-4 text-gray-800" />
                        </button>
                    )}
                </div>
            </div>
            <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-gray-800" />
            </button>
        </div>
    );
}

function ProductGrid({ products }) {
    return (
        <div className="px-4 grid grid-cols-2 gap-4 mb-20">
            {products.map((product, index) => (
                <ProductCard key={index} {...product} />
            ))}
        </div>
    );
}

function BottomNavigation() {
    const navItems = [
        { icon: House },
        { icon: Receipt },
        { icon: Grid },
        { icon: Headphones },
        { icon: User },
    ];

    return (
        <nav className="fixed h-[68px] bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white rounded-full shadow-lg w-11/12 max-w-md p-2">
            <div className="flex justify-center items-center h-full">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center justify-center text-white mx-6" // Increased from mx-4 to mx-6
                    >
                        <item.icon className="h-6 w-6" />
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default function HomePage() {
    const products = [
        { id: 1, image: "/products/p1.png", title: "Outfit", price: "3 SOL", aspectRatio: '3/4', isBidding: true, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ducimus quasi voluptatibus quaerat corporis dolore reprehenderit cumque alias beatae? Reiciendis?" },
        { id: 2, image: "/products/p2.png", title: "Modern style outfit", price: "4 SOL", aspectRatio: '1/1', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ducimus quasi voluptatibus quaerat corporis dolore reprehenderit cumque alias beatae? Reiciendis?" },
        { id: 3, image: "/products/p3.png", title: "Modern style outfit", price: "2 SOL", aspectRatio: '1/1', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ducimus quasi voluptatibus quaerat corporis dolore reprehenderit cumque alias beatae? Reiciendis?" },
        { id: 4, image: "/products/p4.png", title: "Modern style outfit", price: "5 SOL", aspectRatio: '2/3', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ducimus quasi voluptatibus quaerat corporis dolore reprehenderit cumque alias beatae? Reiciendis?" },
    ];

    return (
        <div className="w-full bg-[#f8f3ef] min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 w-full z-10 bg-[#EBD5C3] shadow-md">
                <Header />
                <SearchBar />
            </div>

            <div className="flex-1 mt-36 mb-[80px] overflow-y-auto">
                <CategoryButtons />
                <div className="px-4 mb-4 text-right mt-1">
                    <h2 className="text-sm text-muted-foreground">All Collection</h2>
                </div>
                <ProductGrid products={products} />
            </div>

            <BottomNavigation />
        </div>
    );
}

