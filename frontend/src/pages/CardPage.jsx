import { ShoppingCart, Menu } from "lucide-react";

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

function Header() {
    return (
        <header className="p-4 flex justify-between items-center mt-2">
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

function ImageSection() {
    return (
        <>
            <div className="flex justify-center items-center w-full px-4 my-2">
                <img
                    src="/products/p1.png"
                    alt="Black handbag"
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

function ProductDetails() {
    return (
        <div className="p-4 flex-grow">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Modern Style Outfit</h2>
                <p className="text-lg font-bold">2 SOL</p>
            </div>
            <div className="mb-2">
                <h1 className="font-semibold text-sm">Details</h1>
                <p className="text-xs text-gray-600 mb-4">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div className="flex justify-between items-center font-semibold text-sm">
                <span>Colors:</span>
                <span>Size: M</span>
            </div>
        </div>
    );
}
function BuyButtonNav() {
    return (
        <div className="bg-white w-full py-3 px-4 fixed bottom-0 left-0 right-0 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    variant="outline"
                    className="rounded-full w-10 h-10 text-white p-0 border bg-[#E6841D] text-sm font-bold"
                >
                    -
                </button>
                <span className="text-sm">1</span>
                <button
                    variant="outline"
                    className="rounded-full w-10 h-10 text-white p-0 border bg-[#E6841D] text-sm font-bold"
                >
                    +
                </button>
            </div>
            <button className="bg-[#E6841D] h-[48px] w-[156px]  hover:bg-[#f4a460] text-white rounded-full px-4 py-1.5 text-sm font-semibold">
                Buy Now
            </button>
        </div>
    );
}

export default function CardPage() {
    return (
        <div className="min-h-screen bg-white w-full font-sans flex flex-col">
            <div className="bg-[#f8ede3] pb-7">
                {/* Header */}
                <Header />

                {/* Product Image */}
                <ImageSection />
            </div>


            {/* Product Details */}
            <ProductDetails />

            {/* Quantity and Buy Button - Sticky to Bottom */}
            <BuyButtonNav />
        </div>
    );
}