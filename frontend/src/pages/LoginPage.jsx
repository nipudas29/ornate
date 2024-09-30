import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="bg-[#EBD5C3] min-h-screen flex flex-col justify-between">
            <div className="p-4 space-y-14">
                <Header />
                <ImageSection />
                <AuthLinks />
            </div>
            <ActionButtons />
        </div>
    );
}

function Header() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-end">
                <span className="text-xl text-orange-600 md:text-xl font-bold">ornate</span>
                <span className="text-4xl text-orange-600 font-bold leading-none">.</span>
            </div>
            <div className="w-12 h-12 md:w-12 md:h-12 bg-orange-400 rounded-full flex items-center justify-center">
                <ChevronRightIcon className="w-5 h-5 text-white" />
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

function AuthLinks() {
    return (
        <div className="text-center">
            <span className="text-sm md:text-sm">
                <a href="#" className="underline font-semibold">Sign up</a>
                {" Or "}
                <a href="#" className="underline font-semibold">Log In</a>
            </span>
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
