import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import GlassmorphismEffect from "../components/MorphidmEffect";

export default function LoginPage() {

    const handleUserConnected = async (user) => {
        console.log("User connected successfully:", user);
        const { walletAddress } = user;

        try {
            // Send the walletAddress to the backend for storing in the database
            const response = await fetch("http://localhost:3333/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ walletAddress }),  // Send data to backend
            });

            if (!response.ok) {
                throw new Error("Failed to store wallet in the backend.");
            }

            console.log("Wallet address stored successfully:", walletAddress);
        } catch (error) {
            console.error("Error storing wallet:", error);
        }
    };

    return (
        <DynamicContextProvider
            settings={{
                environmentId: '5a3adb68-6d34-4521-b840-a4a877a66125',
                walletConnectors: [EthereumWalletConnectors],
            }}
        >
            <div className="bg-[#EBD5C3] min-h-screen flex flex-col justify-between">
                <div className="p-4 space-y-14">
                    <Header />
                    <ImageSection />
                    {/* DynamicWidget for smaller screens */}
                    <div className="flex md:hidden justify-center">
                        <DynamicWidget />
                    </div>
                </div>
                <ActionButtons />
            </div>
        </DynamicContextProvider>
    );
}

function ImageSection() {
    const [slideIndex, setSlideIndex] = useState(0);
    const images = ["/login.png", "/login.png", "/login.png"]; // Add more images as needed
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
                    className={`w-2 h-1 rounded-full ${
                        index === activeIndex ? 'bg-white' : 'bg-white/50'
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
