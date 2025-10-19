import React from "react";

export default function AlbumCard({ title, artist, coverImage, onPlay }) {
    return (
        <div className="flex flex-col items-center text-center group cursor-pointer bg-[#38373D] rounded-xl p-4 hover:bg-[#323137] transition hover:scale-[1.02] hover:shadow-lg">
            <div className="relative w-36 h-36 md:w-40 md:h-40 mb-3 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
                <img
                    src={coverImage || "https://i.scdn.co/image/ab67616d00004851d7812467811a7da6e6a44902"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={onPlay}
                    className="absolute bottom-2 right-2 text-white hover:text-[#626267] opacity-0 group-hover:opacity-100 transition text-3xl rounded-full"
                    aria-label="Play album"
                >
                    <i className="fa-solid fa-play"></i>
                </button>
            </div>
            <h3 className="text-white font-semibold text-lg truncate w-full mb-1">{title}</h3>
            <p className="text-gray-400 text-sm">{artist || "Unknown Artist"}</p>
        </div>
    );
}
