"use client";

export default function Error({ error, reset }) {
    return (
        <div className="w-full flex flex-col justify-center items-center py-20">
            <p className="text-xl text-red-500 font-serif">
                Failed to load products
            </p>
            <p className="text-sm opacity-60">{error.message}</p>

            <button
                onClick={reset}
                className="mt-4 bg-red-600 px-4 py-2 rounded-lg text-white"
            >
                Try Again
            </button>
        </div>
    );
}
