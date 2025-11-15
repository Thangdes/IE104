import React, { useEffect, useState } from "react";
import QueueList from "./QueueList";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";

// Helper to get JWT token from localStorage
function getToken() {
    return localStorage.getItem("token");
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}


function Player() {
    const {
        currentSong,
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
        queue,
        currentQueueIndex,
        playNext,
        playPrev,
        isShuffle,
        toggleShuffle,
        showLyricOverlay,
        toggleLyricOverlay,
    } = useSong();
    const navigate = useNavigate();
    const [addStatus, setAddStatus] = useState("");
    useEffect(() => {
        if (addStatus) {
            const timer = setTimeout(() => setAddStatus(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [addStatus]);

    // Add to playlist modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [loadingPlaylists, setLoadingPlaylists] = useState(false);
    const [addError, setAddError] = useState("");

    // Fetch playlists when opening add modal
    const fetchPlaylists = async () => {
        setLoadingPlaylists(true);
        setAddError("");
        const token = getToken();
        const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
        try {
            const res = await fetch(`${API_BASE}/playlists`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            const data = await res.json();
            setPlaylists(Array.isArray(data) ? data : []);
        } catch {
            setAddError("Failed to load playlists");
        }
        setLoadingPlaylists(false);
    };

    const openAddModal = (e) => {
        e.stopPropagation();
        setShowAddModal(true);
        fetchPlaylists();
    };

    const handleAddToPlaylist = async (playlistId) => {
        if (!currentSong) return;
        setAddError("");
        const token = getToken();
        const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
        try {
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
                setAddStatus("Added to playlist!");
                setShowAddModal(false);
            } else {
                setAddError("Failed to add to playlist");
            }
        } catch {
            setAddError("Failed to add to playlist");
        }
    };

    // QueueList popup state
    const [showQueue, setShowQueue] = useState(false);

    // Like state
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        async function fetchLiked() {
            if (!currentSong) return setLiked(false);
            const token = getToken();
            if (!token) return setLiked(false);
            const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
            try {
                const res = await fetch(`${API_BASE}/favorites/is-liked?songId=${currentSong.song_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setLiked(!!data.liked);
            } catch {
                setLiked(false);
            }
        }
        fetchLiked();
    }, [currentSong]);

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!currentSong) return;
        const token = getToken();
        if (!token) return;
        const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
        try {
            const res = await fetch(`${API_BASE}/favorites/${liked ? "unlike" : "like"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ songId: currentSong.song_id })
            });
            const data = await res.json();
            if (data.success) setLiked(!liked);
        } catch (e) {
            console.warn('[Player] like toggle failed', e);
        }
    };

    const handleModeClick = (e) => {
        e.stopPropagation();
        setRepeatMode((m) => (m + 1) % 3); // 0: no loop, 1: repeat all, 2: repeat one
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

    // Fullscreen controls and back are not used in the mini player; removed to satisfy lint.

    return (
        <div
            ref={undefined}
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
                    <button
                        type="button"
                        className="text-xs text-gray-400 truncate hover:underline text-left"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (currentSong?.artist_id) navigate(`/artists/${currentSong.artist_id}`);
                        }}
                        title={currentSong?.artist?.name || ""}
                    >
                        {currentSong?.artist?.name || ""}
                    </button>
                </div>
                <button onClick={(e) => e.stopPropagation()} className="ml-3 text-gray-400 hover:text-green-500">
                    <span onClick={handleLike} title={liked ? "Bỏ thích" : "Thích"}>
                        <i className={liked ? "fa-solid fa-heart text-green-500" : "fa-regular fa-heart"}></i>
                    </span>
                </button>
                <button onClick={openAddModal} className="ml-1 text-gray-400 hover:text-blue-400" title="Add to playlist">
                    <i className="fa-solid fa-plus"></i>
                </button>

                {/* Add to Playlist Modal */}
                {showAddModal && (
                    <div className="fixed left-1/4 bottom-7 z-50 bg-transparent bg-opacity-50" style={{ pointerEvents: 'auto' }} onClick={() => setShowAddModal(false)}>
                        <div className="bg-[#23232a] rounded-xl p-6 min-w-[320px] max-w-[90vw] text-white relative shadow-lg" onClick={e => e.stopPropagation()}>
                            <button className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl" onClick={() => setShowAddModal(false)}>&times;</button>
                            <h2 className="text-xl font-bold mb-4">Add this song to a playlist:</h2>
                            {loadingPlaylists ? (
                                <div className="text-center py-4">Loading playlists...</div>
                            ) : addError ? (
                                <div className="text-red-400 py-2">{addError}</div>
                            ) : playlists.length === 0 ? (
                                <div className="text-gray-400 py-2">No playlists found.</div>
                            ) : (
                                <ul className="space-y-2 max-h-60 overflow-y-auto">
                                    {playlists.map((pl) => (
                                        <li key={pl.playlist_id}>
                                            <button
                                                className="w-full text-left px-4 py-2 rounded hover:bg-[#38373D] transition"
                                                onClick={() => handleAddToPlaylist(pl.playlist_id)}
                                            >
                                                {pl.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Thông báo khi thêm bài hát vào playlist */}
            {addStatus && <span className="text-green-400 text-xs fixed left-1/4 bottom-9 z-50">{addStatus}</span>}

            {/* Center: Controls (click to open detail) */}
            <div
                className="flex flex-col items-center gap-2"
                onClick={openDetail}
                style={{ cursor: currentSong ? "pointer" : "default" }}
            >
                <div className="flex items-center gap-5 text-gray-300">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleShuffle();
                        }}
                        className={isShuffle ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-white"}
                        title={isShuffle ? "Shuffle: ON" : "Shuffle: OFF"}
                    >
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

            <div onClick={(e) => e.stopPropagation()} style={{ cursor: "default" }} className="flex items-center gap-4 text-gray-300">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (currentSong) {
                            toggleLyricOverlay();
                        }
                    }}
                    className={showLyricOverlay ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-white"}
                    title={showLyricOverlay ? "Ẩn lời bài hát" : "Xem lời bài hát"}
                >
                    <i className="fa-solid fa-microphone"></i>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowQueue(true);
                    }}
                    className="hover:text-white"
                    title="Show current queue"
                >
                    <i className="fa-solid fa-list"></i>
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
            {/* QueueList Popup */}
            {showQueue && (
                <QueueList
                    queue={queue}
                    currentQueueIndex={currentQueueIndex}
                    onClose={() => setShowQueue(false)}
                />
            )}
        </div>
    );
}

export default Player;
