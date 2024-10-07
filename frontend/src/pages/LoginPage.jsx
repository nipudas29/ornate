import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import GlassmorphismEffect from "../components/MorphidmEffect";
import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// 0. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})

// 1. Get projectId from https://cloud.reown.com
const projectId = 'fc49e779c410195ac3cd89219bac765e'

// 2. Create a metadata object - optional
const metadata = {
    name: 'Ornate',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Create modal
createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: [solana, solanaTestnet, solanaDevnet],
    metadata: metadata,
    projectId,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    },
    themeVariables: {
        "--w3m-accent": "#ff681f"
    }
})

export default function LoginPage() {
    return (
        <div className="bg-[#EBD5C3] min-h-screen flex flex-col justify-between relative">
            <div className="p-4 space-y-14">
                <Header />
                <ImageSection />
            </div>

            {/* Responsive w3m-button positioning */}
            <div className="hidden md:block absolute top-10 right-40">
                {/* Button visible at top-right for larger screens */}
                <w3m-button label="Login or Sign Up" />
            </div>

            <div className="md:hidden p-4 mb-4 flex items-center justify-center">
                {/* Button below image for smaller screens */}
                <w3m-button label="Login or Sign Up" />
            </div>

            <ActionButtons />
        </div>
    );
}

function Header() {

    return (
        <header className="p-4 flex justify-between items-center mt-2">
            <h1 className="font-bold">
                <span className="text-xl text-orange-600 md:text-xl font-bold">Ornate</span>
                <span className="text-4xl text-black font-bold leading-none">.</span>
            </h1>
        </header>
    );
}

function ImageSection() {
    const [slideIndex, setSlideIndex] = useState(0);
    const images = ["/login.png", "/login1.jpg", "/login2.jpg"]; // Add more images as needed
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const containerRef = useRef(null);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current && touchEndX.current) {
            const diff = touchStartX.current - touchEndX.current;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    // Swipe left
                    setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
                } else {
                    // Swipe right
                    setSlideIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
                }
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative aspect-[3/4] rounded-xl overflow-hidden max-w-sm mx-auto"
        >
            <img
                src={images[slideIndex]}
                alt="Couture Meets Crypto"
                className="rounded-xl object-cover w-full h-full"
            />
            <GlassmorphismEffect />
            <div className="absolute top-4 left-4 right-4 z-10">
                <h1 className="text-4xl md:text-4xl text-center font-bold text-white">
                    Couture Meets Crypto
                </h1>
            </div>
            <Indicators count={images.length} activeIndex={slideIndex} />
        </div>
    );
}

function Indicators({ count, activeIndex }) {
    return (
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-1 z-10">
            {[...Array(count)].map((_, index) => (
                <div
                    key={index}
                    className={`w-2 h-1 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                />
            ))}
        </div>
    );
}

function ActionButtons() {
    return (
        <div className="p-4 mb-4">
            <div className="flex items-center space-x-3">
                <button className="w-[70px] h-[70px] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                        src="/phantom.png"
                        alt="Phantom"
                        className="object-cover"
                    />
                </button>
                <Link
                    to="/home"
                    className="flex-grow bg-orange-400 text-white rounded-xl py-4 px-6 font-semibold shadow-md flex items-center justify-center"
                >
                    <span className="text-lg">Get Started</span>
                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                </Link>
            </div>
        </div>
    );
}
