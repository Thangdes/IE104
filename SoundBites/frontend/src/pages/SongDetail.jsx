import React from "react";
import { useSong } from "../context/SongContext";

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SongDetail() {
    const { currentSong, isPlaying, togglePlayPause, progress, currentTime, duration, seekTo, repeatMode, setRepeatMode } = useSong();

    if (!currentSong) {
        return (
            <div className="p-8 text-gray-300">Chưa có bài hát nào được chọn.</div>
        );
    }

    const bg = currentSong?.album?.cover_image || "/signup_bg.jpg";

    // Handle progress bar click to seek
    const handleProgressBarClick = (e) => {
        e.stopPropagation();
        if (!currentSong || !(duration || currentSong.duration)) return;
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const dur = duration || currentSong.duration;
        const percent = Math.max(0, Math.min(1, clickX / rect.width));
        seekTo(percent * dur);
    };

    // Repeat mode button handler
    const handleModeClick = (e) => {
        e.stopPropagation();
        setRepeatMode((m) => (m + 1) % 3);
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-screen px-8 pb-12 text-white">
                <div className="max-w-6xl mx-auto w-full text-left">
                    {/* Song info */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                        {currentSong.title}
                    </h1>
                    <p className="text-gray-300 text-lg mb-8">
                        {currentSong.artist?.name || "Unknown Artist"}
                    </p>

                    {/* Progress bar */}
                    <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration || currentSong.duration)}</span>
                    </div>
                    <div
                        className="relative mt-2 h-1 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
                        onClick={handleProgressBarClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-1 bg-white rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                        <div
                            className="absolute top-[-3px] w-3 h-3 bg-white rounded-full shadow-lg"
                            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
                        ></div>
                    </div>

                    {/* Controls (match Player layout) */}
                    <div className="flex flex-col items-center mt-8">
                        <div className="flex items-center gap-6 text-gray-300">
                            <button className="hover:text-white">
                                <i className="fa-solid fa-shuffle"></i>
                            </button>
                            <button className="hover:text-white">
                                <i className="fa-solid fa-backward-step"></i>
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlayPause();
                                }}
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-gray-900 hover:scale-105 transition"
                            >
                                <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
                            </button>

                            <button className="hover:text-white">
                                <i className="fa-solid fa-forward-step"></i>
                            </button>
                            <button onClick={handleModeClick} className="hover:text-white relative">
                                {repeatMode === 0 && <i className="fa-solid fa-repeat"></i>}
                                {repeatMode === 1 && <i className="fa-solid fa-shuffle"></i>}
                                {repeatMode === 2 && (
                                    <>
                                        <i className="fa-solid fa-repeat"></i>
                                        <span className="absolute -bottom-1 text-xs font-bold hover:text-white">1</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
