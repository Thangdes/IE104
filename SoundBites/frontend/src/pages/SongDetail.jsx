import React from "react";
import { useSong } from "../context/SongContext";

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

import { useNavigate } from "react-router-dom";

export default function SongDetail() {
    const { currentSong, isPlaying, togglePlayPause, progress, currentTime, duration, seekTo, repeatMode, setRepeatMode, queue, playNext, playPrev } = useSong();
    const navigate = useNavigate();
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const detailRef = React.useRef();
    const [addStatus, setAddStatus] = React.useState("");
    // State cho popup chọn playlist
    const [showPlaylistMenu, setShowPlaylistMenu] = React.useState(false);
    const [playlists, setPlaylists] = React.useState([]); // Danh sách playlist user

    // Toàn màn hình
    const handleFullscreen = (e) => {
        e.stopPropagation();
        if (!isFullscreen) {
            detailRef.current?.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    };
    // Hiện dropmenu chọn playlist và lấy danh sách playlist user
    const handleAddToPlaylist = async (e) => {
        e.stopPropagation();
        setShowPlaylistMenu((prev) => !prev);
        if (!showPlaylistMenu) {
            try {
                const token = localStorage.getItem("token");
                const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
                const res = await fetch(`${API_BASE}/playlists`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                const data = await res.json();
                setPlaylists(Array.isArray(data) ? data : []);
            } catch {
                setPlaylists([]);
            }
        }
    };

    // Đóng dropmenu
    const handleCloseMenu = () => {
        setShowPlaylistMenu(false);
    };

    // Thêm bài hát vào playlist khi chọn
    const handleSelectPlaylist = async (playlistId) => {
        if (!currentSong) return;
        try {
            const token = localStorage.getItem("token");
            const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
            const res = await fetch(`${API_BASE}/playlists/${playlistId}/add-song`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ songId: currentSong.song_id })
            });
            const data = await res.json();
            if (data.success) {
                setAddStatus("Đã thêm vào playlist!");
            } else {
                setAddStatus("Thêm vào playlist thất bại!");
            }
        } catch {
            setAddStatus("Thêm vào playlist thất bại!");
        }
    setShowPlaylistMenu(false);
    setTimeout(() => setAddStatus("") , 1500);
    };
    // Back
    const handleBack = (e) => {
        e.stopPropagation();
        navigate(-1);
    };

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
        setRepeatMode((m) => (m + 1) % 3); // 0: no loop, 1: repeat all, 2: repeat one
    };

    return (
        <div ref={detailRef} className="relative min-h-screen flex flex-col">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent"></div>

            {/* Icon group góc trên phải */}
            <div style={{ position: "absolute", top: 24, right: 40, zIndex: 30 }} className="flex items-center gap-4">
                {/* Icon 3 chấm */}
                <button onClick={e => e.stopPropagation()} className="hover:text-white" title="Tùy chọn">
                    <i className="fa-solid fa-ellipsis"></i>
                </button>
                {/* Thêm vào playlist */}
                <div style={{ position: "relative" }}>
                    <button onClick={handleAddToPlaylist} className="hover:text-white" title="Thêm vào playlist">
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    {showPlaylistMenu && (
                        <div className="absolute right-0 mt-2 w-64 bg-[#232326] rounded-lg shadow-lg z-50 border border-gray-700" tabIndex={0} onBlur={handleCloseMenu}>
                            <ul className="py-2">
                                {playlists.length === 0 ? (
                                    <li className="px-4 py-2 text-gray-400">(Đang tải hoặc chưa có playlist)</li>
                                ) : (
                                    playlists.map((pl) => (
                                        <li
                                            key={pl.playlist_id || pl.id}
                                            className="px-4 py-2 cursor-pointer hover:bg-[#333] text-white"
                                            onClick={() => handleSelectPlaylist(pl.playlist_id || pl.id)}
                                        >
                                            <div className="font-semibold">{pl.name}</div>
                                            {pl.description && <div className="text-xs text-gray-400">{pl.description}</div>}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Toàn màn hình */}
                <button onClick={handleFullscreen} className="hover:text-white" title="Toàn màn hình">
                    <i className="fa-solid fa-expand"></i>
                </button>
                {/* Thu nhỏ/back */}
                <button onClick={handleBack} className="hover:text-white" title="Quay lại">
                    <i className="fa-solid fa-compress"></i>
                </button>
            </div>
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-screen px-8 pb-12 text-white">
                {addStatus && <span className="text-green-400 text-xs absolute top-20 right-48 z-40">{addStatus}</span>}
                <div className="max-w-6xl mx-auto w-full text-left">
                    {/* Song info */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                        {currentSong.title}
                    </h1>
                    <button
                        className="text-gray-300 text-lg mb-8 hover:underline text-left"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (currentSong?.artist_id) navigate(`/artists/${currentSong.artist_id}`);
                        }}
                        title={currentSong.artist?.name || "Unknown Artist"}
                    >
                        {currentSong.artist?.name || "Unknown Artist"}
                    </button>

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
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (queue.length > 0) playPrev();
                                }}
                                className={`hover:text-white ${queue.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                                disabled={queue.length === 0}
                                title="Previous"
                            >
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

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (queue.length > 0) playNext();
                                }}
                                className={`hover:text-white ${queue.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                                disabled={queue.length === 0}
                                title="Next"
                            >
                                <i className="fa-solid fa-forward-step"></i>
                            </button>
                            <button onClick={handleModeClick} className="hover:text-white relative">
                                {repeatMode === 0 && <i className="fa-solid fa-repeat text-gray-700"></i>}
                                {repeatMode === 1 && <i className="fa-solid fa-repeat"></i>}
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
