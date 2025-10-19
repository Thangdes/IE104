import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";

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
        seekTo,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
        repeatMode,
        setRepeatMode,
    } = useSong();
    const navigate = useNavigate();
    const [addStatus, setAddStatus] = useState("");

    const handleModeClick = (e) => {
        e.stopPropagation();
        setRepeatMode((m) => (m + 1) % 3);
    };

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

    // Handle progress bar click to seek
    const handleProgressBarClick = (e) => {
        e.stopPropagation();
        if (!currentSong || !duration) return;
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, clickX / rect.width));
        seekTo(percent * duration);
    };

    return (
        <div
            className="fixed bottom-0 left-0 w-full bg-[#1b1b1f] text-white px-6 py-3 flex items-center justify-between border-t border-gray-800 shadow-lg"
            onClick={openDetail}
            style={{ cursor: currentSong ? "pointer" : "default" }}
        >
            {/* Left: Song Info */}
            <div className="flex items-center gap-3" style={{ minWidth: 260, maxWidth: 400, width: 320 }}>
                <img
                    src={
                        currentSong?.album?.cover_image ||
                        "https://i.scdn.co/image/ab67616d00004851d7812467811a7da6e6a44902"
                    }
                    alt="Album Cover"
                    className="w-14 h-14 rounded-md"
                />
                <div className="truncate w-56">
                    <p className="text-sm font-semibold truncate">
                        {currentSong?.title || "Chọn một bài hát để phát"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
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

                {/* Progress bar */}
                <div className="flex items-center gap-2 w-72">
                    <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                    <div
                        className="relative w-full h-1 bg-gray-700 rounded cursor-pointer"
                        onClick={handleProgressBarClick}
                    >
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
                {/* Thông báo khi thêm bài hát vào playlist */}
                {addStatus && <span className="text-green-400 text-xs mr-2">{addStatus}</span>}
                <button
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (!currentSong) return;
                        const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
                        try {
                            const res = await fetch(`${API_BASE}/playlists/1/add-song`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ songId: currentSong.song_id })
                            });
                            const data = await res.json();
                            if (data.success) {
                                setAddStatus("Đã thêm vào playlist!");
                            } else {
                                setAddStatus("Thêm thất bại!");
                            }
                        } catch (err) {
                            setAddStatus("Lỗi khi thêm vào playlist!");
                        }
                        setTimeout(() => setAddStatus("") , 2000);
                    }}
                    className="hover:text-white"
                    title="Thêm vào playlist"
                >
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
