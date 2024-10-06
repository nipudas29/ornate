import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

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

function Header() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-end">
                <span className="text-xl text-orange-600 md:text-xl font-bold">ornate</span>
                <span className="text-4xl text-orange-600 font-bold leading-none">.</span>
            </div>
            <div className="flex items-center space-x-4">
                {/* DynamicWidget for larger screens */}
                <div className="hidden md:flex">
                    <DynamicWidget />
                </div>
                {/* Arrow Button */}
                <div className="w-12 h-12 md:w-12 md:h-12 bg-orange-400 rounded-full flex items-center justify-center">
                    <ChevronRightIcon className="w-5 h-5 text-white" />
                </div>
            </div>
        </div>
    );
}

function ImageSection() {
    return (
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden max-w-sm mx-auto">
            <img
                src="/login.png"
                alt="Couture Meets Crypto"
                className="rounded-xl object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 right-4">
                <h1 className="text-4xl md:text-4xl text-center font-bold text-white">
                    Couture Meets Crypto
                </h1>
            </div>
            <Indicators />
        </div>
    );
}

function Indicators() {
    return (
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-1">
            <div className="w-3 h-1 bg-white rounded-full" />
            <div className="w-2 h-1 bg-white/50 rounded-full" />
            <div className="w-2 h-1 bg-white/50 rounded-full" />
        </div>
    );
}

function ActionButtons() {
    return (
        <div className="p-4 mb-4 flex-shrink-0">
            <div className="flex space-x-3">
                <button className="w-[75px] h-[75px] md:w-[80px] md:h-[80px] bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-md">
                    <img
                        src="/google.png"
                        alt="Google"
                        width={20}
                        height={20}
                    />
                </button>
                <Link to={'/home'} className="flex-grow text-lg bg-orange-400 text-white rounded-xl md:rounded-2xl py-2 px-4 font-semibold shadow-md flex items-center justify-center">
                    Get Started
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Link>
            </div>
        </div>
    );
}
