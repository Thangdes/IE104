import React from "react";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export default function AlbumCard({ title, artist, coverImage, album_id, artistId }) {
    const { playQueue } = useSong();
    const navigate = useNavigate();

    const handlePlay = async (e) => {
        if (e) e.stopPropagation();
        try {
            const res = await fetch(`${API_BASE}/albums/${album_id}`);
            const data = await res.json();
            if (Array.isArray(data.songs) && data.songs.length > 0) {
                playQueue(data.songs, 0);
            }
        } catch {
            // Optionally show error
        }
    };

    const handleCardClick = () => {
        navigate(`/albums/${album_id}`);
    };

    return (
        <div
            className="flex flex-col items-center text-center group cursor-pointer bg-[#38373D] rounded-xl p-4 hover:bg-[#323137] transition hover:scale-[1.02] hover:shadow-lg"
            onClick={handleCardClick}
        >
            <div className="relative w-36 h-36 md:w-40 md:h-40 mb-3 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
                <img
                    src={coverImage || "https://i.scdn.co/image/ab67616d00004851d7812467811a7da6e6a44902"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={handlePlay}
                    className="absolute bottom-2 right-2 text-white hover:text-[#626267] opacity-0 group-hover:opacity-100 transition text-3xl rounded-full"
                    aria-label="Play album"
                >
                    <i className="fa-solid fa-play"></i>
                </button>
            </div>
            <h3 className="text-white font-semibold text-lg truncate w-full mb-1">{title}</h3>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    if (artistId) navigate(`/artists/${artistId}`);
                }}
                className="text-gray-400 text-sm hover:underline"
                title={artist}
            >
                {artist || "Unknown Artist"}
            </button>
        </div>
    );
}
