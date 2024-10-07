const GlassmorphismEffect = () => {
    return (
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDUgNVpNNSAwTDAgNVoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiPjwvcGF0aD4KPC9zdmc+')] opacity-5" />
        </div>
    );
};

export default GlassmorphismEffect;