import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function Player() {
    const {
        currentSong,
        setCurrentSong,
        audioRef,
        isPlaying,
        togglePlayPause,
        currentTime,
        duration,
        progress,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
    } = useSong();
    const navigate = useNavigate();

    // Handle volume icon click
    const handleVolumeIconClick = () => {
        setIsMuted((prev) => !prev);
    };

    // Handle slider change
    const handleVolumeChange = (e) => {
        setVolume(Number(e.target.value));
        if (isMuted && Number(e.target.value) > 0) setIsMuted(false);
    };

    const openDetail = () => {
        if (!currentSong) return;
        navigate("/song");
    };

    return (
        <div
            className="fixed bottom-0 left-0 w-full bg-[#1b1b1f] text-white px-6 py-3 flex items-center justify-between border-t border-gray-800 shadow-lg"
            onClick={openDetail}
            style={{ cursor: currentSong ? "pointer" : "default" }}
        >
            {/* Audio element is provided by SongProvider (hidden) */}

            {/* Left: Song Info */}
            <div className="flex items-center gap-3">
                <img
                    src={
                        currentSong?.album?.cover_image ||
                        "https://i.scdn.co/image/ab67616d00004851d7812467811a7da6e6a44902"
                    }
                    alt="Album Cover"
                    className="w-14 h-14 rounded-md"
                />
                <div>
                    <p className="text-sm font-semibold">
                        {currentSong?.title || "Chọn một bài hát để phát"}
                    </p>
                    <p className="text-xs text-gray-400">
                        {currentSong?.artist?.name || ""}
                    </p>
                </div>
                <button onClick={(e) => e.stopPropagation()} className="ml-3 text-gray-400 hover:text-green-500">
                    <i className="fa-regular fa-heart"></i>
                </button>
            </div>

            {/* Center: Controls (click to open detail) */}
            <div
                className="flex flex-col items-center gap-2"
                onClick={openDetail}
                style={{ cursor: currentSong ? "pointer" : "default" }}
            >
                <div className="flex items-center gap-5 text-gray-300">
                    <button onClick={(e) => e.stopPropagation()} className="hover:text-white">
                        <i className="fa-solid fa-shuffle"></i>
                    </button>
                    <button onClick={(e) => e.stopPropagation()} className="hover:text-white">
                        <i className="fa-solid fa-backward-step"></i>
                    </button>

                    {/* Play/Pause */}
                    <button
                        onClick={(e) => {
                            // prevent center area click from also opening detail
                            e.stopPropagation();
                            togglePlayPause();
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900 hover:scale-105 transition"
                    >
                        <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
                    </button>

                    <button onClick={(e) => e.stopPropagation()} className="hover:text-white">
                        <i className="fa-solid fa-forward-step"></i>
                    </button>
                    <button onClick={(e) => e.stopPropagation()} className="hover:text-white">
                        <i className="fa-solid fa-repeat"></i>
                    </button>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 w-72">
                    <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                    <div className="relative w-full h-1 bg-gray-700 rounded">
                        <div
                            className="absolute top-0 left-0 h-1 bg-gray-200 rounded"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-400">{formatTime(currentSong?.duration)}</span>
                </div>
            </div>

            {/* Right: Volume & Options (clicks here should NOT open detail) */}
            <div onClick={(e) => e.stopPropagation()} style={{ cursor: "default" }} className="flex items-center gap-4 text-gray-300">
                <button onClick={(e) => e.stopPropagation()} className="hover:text-white">
                    <i className="fa-solid fa-list"></i>
                </button>
                <button className="hover:text-white">
                    <i className="fa-solid fa-desktop"></i>
                </button>
                <div className="flex items-center gap-2 w-32">
                    <button onClick={(e) => { e.stopPropagation(); handleVolumeIconClick(); }} className="focus:outline-none">
                        <i className={`fa-solid ${isMuted || volume === 0 ? "fa-volume-xmark" : volume < 0.5 ? "fa-volume-low" : "fa-volume-high"}`}></i>
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={(e) => { e.stopPropagation(); handleVolumeChange(e); }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="w-20 h-1 bg-gray-700 rounded accent-gray-300"
                    />
                </div>
            </div>
        </div>
    );
}

export default Player;
