import React from "react";

function SongCard({ title, artist, coverImage, playCount, onPlay, fileUrl }) {
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
            </div>

            {/* Info */}
            <div className="w-full">
                <h3 className="text-white font-semibold text-xl truncate">{title}</h3>
                <p className="text-gray-400 text-base truncate">{artist}</p>
                <p className="text-gray-500 text-sm mt-1"><i className="text-[#626267] fa-solid fa-headphones"></i> {playCount.toLocaleString()} plays</p>
            </div>
        </div>
    );
}

export default SongCard;
