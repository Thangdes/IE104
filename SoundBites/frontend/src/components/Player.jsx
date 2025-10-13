import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../context/SongContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function Player() {
    const { currentSong } = useSong();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1); // 0-1
    const [isMuted, setIsMuted] = useState(false);

    // Play or pause when user clicks the button (only set state)
    const togglePlayPause = () => {
        if (!currentSong?.file_url) return;
        setIsPlaying((prev) => !prev);
    };

    // Reset when song changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setProgress(0);
            if (currentSong?.file_url) {
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        }
    }, [currentSong]);

    // Control audio playback and volume
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (!currentSong?.file_url) return;
        audio.volume = volume;
        audio.muted = isMuted;
        if (isPlaying) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
        }
    }, [isPlaying, currentSong, volume, isMuted]);

    // Update progress bar and current time
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            setProgress(percent || 0);
            setCurrentTime(audio.currentTime || 0);
        };

        audio.addEventListener("timeupdate", updateProgress);
        return () => audio.removeEventListener("timeupdate", updateProgress);
    }, []);

    // Handle volume icon click
    const handleVolumeIconClick = () => {
        setIsMuted((prev) => !prev);
    };

    // Handle slider change
    const handleVolumeChange = (e) => {
        setVolume(Number(e.target.value));
        if (isMuted && Number(e.target.value) > 0) setIsMuted(false);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#1b1b1f] text-white px-6 py-3 flex items-center justify-between border-t border-gray-800 shadow-lg">
            {/* Audio element */}
            <audio ref={audioRef} src={currentSong?.file_url || ""}></audio>

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

                    {/* ▶️ Play/Pause */}
                    <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900 hover:scale-105 transition"
                    >
                        <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
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

            {/* Right: Volume & Options */}
            <div className="flex items-center gap-4 text-gray-300">
                <button className="hover:text-white">
                    <i className="fa-solid fa-list"></i>
                </button>
                <button className="hover:text-white">
                    <i className="fa-solid fa-desktop"></i>
                </button>
                <div className="flex items-center gap-2 w-32">
                    <button onClick={handleVolumeIconClick} className="focus:outline-none">
                        <i className={`fa-solid ${isMuted || volume === 0 ? "fa-volume-xmark" : volume < 0.5 ? "fa-volume-low" : "fa-volume-high"}`}></i>
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-gray-700 rounded accent-gray-300"
                    />
                </div>
            </div>
        </div>
    );
}

export default Player;
