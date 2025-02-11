import CommonLayout from "@/layouts/common-layout.tsx";
import Navbar from "@/components/shared/navbar.tsx";
import React, { useState, useRef } from "react";
import { DoBeLogo } from "@/components/shared/logo.tsx";

export function Component() {
    const [spinAngle, setSpinAngle] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const prizes = [
        "1",
        "2",
        "3",
        "4",
        "4",
        "6",
    ];

    const handleSpin = () => {
        if (spinning) return;

        const randomAngle = Math.floor(Math.random() * 360) + 2520; // Minimum 7 full spins + random
        setSpinAngle(randomAngle);
        setSpinning(true);

        setTimeout(() => {
            setSpinning(false);
            const finalAngle = randomAngle % 360;
            const prizeIndex = Math.floor(finalAngle / (360 / prizes.length));
            setSelectedPrize(prizes[prizeIndex]);
        }, 5000);
    };

    return (
        <CommonLayout>
            <div className="m-auto max-w-full lg:max-w-7xl px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="flex flex-col items-center gap-8 p-8">
                    <h1 className="text-4xl font-bold text-center mb-6">
                        🎯 Spin the Wheel and Test Your Luck!
                    </h1>
                    <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-white overflow-hidden bg-white">
                        <div
                            className={`absolute inset-0 transform transition-transform duration-[5000ms] ease-out`}
                            style={{ transform: `rotate(${spinAngle}deg)` }}
                        >
                            {/* Wheel Segments */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-full h-full items-center"
                                    style={{
                                        transform: `rotate(${i * 60}deg)`,
                                        clipPath: "polygon(50% 50%, 100% 100%, 100% 38.5%)",
                                        backgroundColor: `hsl(${i * 60}, 70%, 70%)`,
                                    }}
                                >
                                    <span
                                        className="text-2xl text-black font-semibold items-center justify-center"
                                    >
                                        {prizes[i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* Central Logo */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                            <DoBeLogo className="w-12" />
                        </div>
                    </div>
                    <button
                        onClick={handleSpin}
                        className={`mt-6 px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition ${
                            spinning ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={spinning}
                    >
                        {spinning ? "Spinning..." : "Spin Now"}
                    </button>

                    {/* Display Selected Prize */}
                    {selectedPrize && (
                        <div className="mt-4 text-2xl font-semibold text-green-600">
                            🎉 Congratulations! You won <span className="underline">{selectedPrize}</span>!
                        </div>
                    )}

                    {/* Hidden audio element for the ticking sound */}
                    <audio ref={audioRef} src="/path/to/tick-sound.mp3" preload="auto"></audio>
                </div>
            </div>
        </CommonLayout>
    );
}

