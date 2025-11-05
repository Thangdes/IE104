import React from "react";
import { useNavigate } from "react-router-dom";

// Helper to get JWT token from localStorage
function getToken() {
    return localStorage.getItem("token");
}


import { useEffect, useState } from "react";

function SongCard({ title, artist, coverImage, playCount, onPlay, song_id, artistId }) {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    // Get token and update liked state when token or song_id changes
    const token = getToken();
    useEffect(() => {
        async function fetchLiked() {
            if (!token || !song_id) {
                console.log(`[SongCard] Skipping fetchLiked: token=${token}, song_id=${song_id}`);
                return setLiked(false);
            }
            const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
            try {
                const res = await fetch(`${API_BASE}/favorites/is-liked?songId=${song_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setLiked(!!data.liked);
            } catch (err) {
                console.log(`[SongCard] song_id: ${song_id}, error fetching liked:`, err);
                setLiked(false);
            }
        }
        fetchLiked();
    }, [song_id, token]);

    const handleLike = async (e) => {
        e.stopPropagation();
        const token = getToken();
        if (!token || !song_id) return;
        const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
        try {
            const res = await fetch(`${API_BASE}/favorites/${liked ? "unlike" : "like"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ songId: song_id })
            });
            const data = await res.json();
            if (data.success) setLiked(!liked);
        } catch (e) {
            console.warn('[SongCard] like toggle failed', e);
        }
    };

    return (
        <div className="flex flex-col items-center text-center bg-[#38373D] hover:bg-[#323137] rounded-xl transition cursor-pointer group p-3">
            {/* Album Cover */}
            <div className="relative w-36 h-36 md:w-40 md:h-40 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center mb-3">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={`${title} cover`}
                        className="object-cover w-full h-full group-hover:scale-105 transition"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-400 animate-pulse" />
                )}

                <button
                    onClick={onPlay}
                    className="absolute bottom-2 right-2 text-white hover:text-[#626267] opacity-0 group-hover:opacity-100 transition text-3xl rounded-full"
                    aria-label="Play song"
                >
                    <i className="fa-solid fa-play"></i>
                </button>
                <span
                    onClick={handleLike}
                    className="absolute top-2 right-2 text-xl cursor-pointer"
                    title={liked ? "Bỏ thích" : "Thích"}
                >
                    <i className={liked ? "fa-solid fa-heart text-green-500" : "fa-regular fa-heart text-gray-400 hover:text-green-500"}></i>
                </span>
            </div>

            {/* Info */}
            <div className="w-full">
                <h3 className="text-white font-semibold text-xl truncate">{title}</h3>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (artistId) navigate(`/artists/${artistId}`);
                    }}
                    className="text-gray-400 text-base truncate hover:underline text-left"
                    title={artist}
                >
                    {artist}
                </button>
                <p className="text-gray-500 text-sm mt-1"><i className="text-[#626267] fa-solid fa-headphones"></i> {playCount.toLocaleString()} plays</p>
            </div>
        </div>
    );
}

export default SongCard;
