import React, { useEffect, useState } from 'react';
import { ChevronLeft, ShoppingCart, Menu, Minus, Plus, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from '../idl/dutch_auction.json'; // Make sure to generate and import the IDL

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
            className="bg-white p-2 flex gap-2 rounded-lg shadow-md"
            onClick={() => window.history.back()} // Functionality to go back in history
        >
            <ChevronLeft className="h-5 w-5" />
            <span>Auction</span>
        </button>
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

function PlaceBidButton() {
    const [time, setTime] = useState({ hours: 0, minutes: 3, seconds: 59 })
    const wallet = useWallet();
    const [isProcessing, setIsProcessing] = useState(false);

    const PROGRAM_ID = new PublicKey("9gJdVojkx2iun5S2kDN5c2kK8iBwuwvFMmJHXZrPAYgW");

    const getProvider = () => {
        const connection = new Connection("https://api.devnet.solana.com");
        const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
        return provider;
    };

    const handlePlaceBid = async () => {
        if (!wallet.connected) {
            alert("Please connect your wallet first!");
            return;
        }

        setIsProcessing(true);

        try {
            const provider = getProvider();
            const program = new Program(idl, PROGRAM_ID, provider);

            const [auctionPDA] = await PublicKey.findProgramAddress(
                [Buffer.from("auction"), wallet.publicKey.toBuffer()],
                program.programId
            );

            await program.methods.placeBid()
                .accounts({
                    auction: auctionPDA,
                    bidder: wallet.publicKey,
                    seller: new PublicKey("EWXqwtzwYmNgNVoKSxXvhPv3hrbS4ZVhrLHYjGL4TYa4"), // Replace with actual seller's public key
                    systemProgram: web3.SystemProgram.programId,
                })
                .rpc();

            alert("Bid placed successfully!");
        } catch (error) {
            console.error("Error placing bid:", error);
            alert("An error occurred while placing the bid. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
                    clearInterval(timer)
                    return prevTime
                }

                let newSeconds = prevTime.seconds - 1
                let newMinutes = prevTime.minutes
                let newHours = prevTime.hours

                if (newSeconds < 0) {
                    newSeconds = 59
                    newMinutes -= 1
                }

                if (newMinutes < 0) {
                    newMinutes = 59
                    newHours -= 1
                }

                return { hours: newHours, minutes: newMinutes, seconds: newSeconds }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm max-w-md">
            <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Auction ending in</span>
                <div className="flex space-x-2">
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{String(time.hours).padStart(2, '0')}</span>
                        <span className="text-xs ml-1">Hrs</span>
                    </div>
                    <span className="text-2xl font-bold">:</span>
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{String(time.minutes).padStart(2, '0')}</span>
                        <span className="text-xs ml-1">Min</span>
                    </div>
                    <span className="text-2xl font-bold">:</span>
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{String(time.seconds).padStart(2, '0')}</span>
                        <span className="text-xs ml-1">Sec</span>
                    </div>
                </div>
            </div>
            <button 
                className="bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-2 px-4 rounded-full"
                onClick={handlePlaceBid}
                disabled={isProcessing || !wallet.connected}
            >
                {isProcessing ? "Processing..." : "PLACE BID"}
            </button>
        </div>
    )
}

// Main CheckoutPage component
export default function AuctionPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product data based on id
        // This is a placeholder, replace with actual API call
        setProduct({
            id,
            image: "/products/p1.png",
            title: "Auction Item",
            price: "3 SOL",
            description: "Limited edition item up for auction."
        });
    }, [id]);

    if (!product) return <div>Loading...</div>;

    const subtotal = 0;
    const gasPrice = 0.0997;
    const total = subtotal + gasPrice;

    return (
        <div className="min-h-screen bg-[#f5e6d3] text-gray-800 p-4 max-w-md mx-auto font-sans">
            <Header />

            {/* Add padding top to compensate for fixed header */}
            <main className="space-y-4">
                <div className="mt-6">
                    <BackButton />
                </div>
                <ImageSection/>
            </main>

            {/* Fixed promo code, pricing, and checkout button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 space-y-4 shadow-lg">
                <PricingSummary subtotal={subtotal} gasPrice={gasPrice} total={total} />
                <PlaceBidButton />
            </div>
        </div>
    );
}