import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Player() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#1b1b1f] text-white px-6 py-3 flex items-center justify-between border-t border-gray-800 shadow-lg">
            {/* Left: Song Info */}
            <div className="flex items-center gap-3">
                <img
                    src="https://i.scdn.co/image/ab67616d00004851d7812467811a7da6e6a44902"
                    alt="Album Cover"
                    className="w-14 h-14 rounded-md"
                />
                <div>
                    <p className="text-sm font-semibold">The Fate of Ophelia</p>
                    <p className="text-xs text-gray-400">Taylor Swift</p>
                </div>
                <button className="ml-3 text-gray-400 hover:text-green-500">
                    <i className="fa-regular fa-heart"></i>
                </button>
            </div>

            {/* Center: Controls */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-5 text-gray-300">
                    <button className="hover:text-white">
                        <i className="fa-solid fa-shuffle"></i>
                    </button>
                    <button className="hover:text-white">
                        <i className="fa-solid fa-backward-step"></i>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900 hover:scale-105 transition">
                        <i className="fa-solid fa-play"></i>
                    </button>
                    <button className="hover:text-white">
                        <i className="fa-solid fa-forward-step"></i>
                    </button>
                    <button className="hover:text-white">
                        <i className="fa-solid fa-repeat"></i>
                    </button>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 w-72">
                    <span className="text-xs text-gray-400">1:12</span>
                    <div className="relative w-full h-1 bg-gray-700 rounded">
                        <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded" style={{ width: "40%" }}></div>
                    </div>
                    <span className="text-xs text-gray-400">3:45</span>
                </div>
            </div>

            {/* Right: Volume & Options */}
            <div className="flex items-center gap-4 text-gray-300">
                <button className="hover:text-white">
                    <i className="fa-solid fa-list"></i>
                </button>
                <button className="hover:text-white">
                    <i className="fa-solid fa-desktop"></i>
                </button>
                <div className="flex items-center gap-2 w-24">
                    <i className="fa-solid fa-volume-high"></i>
                    <div className="relative w-full h-1 bg-gray-700 rounded">
                        <div className="absolute top-0 left-0 h-1 bg-gray-300 rounded" style={{ width: "70%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;
