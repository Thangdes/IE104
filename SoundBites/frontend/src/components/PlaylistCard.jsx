import React from "react";

function PlaylistCard({ name, description, coverImage, owner, onClick }) {
    return (
        <div
            onClick={onClick}
            className="group relative bg-[#38373D] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
            {/* Cover Image */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={coverImage}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 flex items-end justify-between p-4">
                    {/* Bottom-left Play Button */}
                    <button className="text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
                        <i className="fa-solid fa-circle-play text-2xl"></i>
                    </button>

                    {/* Bottom-right Info Button */}
                    <button className="text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
                        <i className="fa-solid fa-circle-info text-2xl"></i>
                    </button>
                </div>
            </div>


            {/* Text Info */}
            <div className="p-4">
                <h3 className="text-white font-semibold text-lg truncate">{name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mt-1">{description}</p>
                <p className="text-gray-500 text-xs mt-2">By {owner}</p>
            </div>
        </div>
    );
}

export default PlaylistCard;
