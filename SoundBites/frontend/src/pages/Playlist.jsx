import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export default function Playlist() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPlaylists() {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/playlists`);
                const data = await res.json();
                setPlaylists(data);
            } catch (error) {
                setPlaylists([]);
            }
            setLoading(false);
        }
        fetchPlaylists();
    }, []);

    if (loading) return <div className="text-center text-white p-8 text-4xl font-bold mb-2">Loading...</div>;

    return (
        <div className="bg-[#1b1b1f] text-white font-redhat min-h-screen px-6 py-10 rounded-xl">
            {/* Header Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">Featured Playlist</h1>
                <p className="text-gray-400">
                    Create a mix that's uniquely yours, or find your next favorite soundtrack among millions of expertly crafted playlists.
                </p>
            </section>

            {/* Playlists Section */}
            <section>
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
                    <h2 className="text-3xl font-bold hover:text-[#767679] transition">
                        Featured Playlists
                    </h2>
                    <button className="bg-white text-[#1b1b1f] font-bold text-lg leading-[22px] px-10 py-3 rounded-[12px] transition-all duration-300 hover:bg-[#626267] hover:text-[#FEFEFE] hover:scale-[1.05]">
                        Create a Playlist
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <div
                                key={playlist.playlist_id}
                                className="cursor-pointer hover:scale-[1.03] transition-all"
                                onClick={() => navigate(`/playlist/${playlist.playlist_id}`)}
                            >
                                <PlaylistCard
                                    name={playlist.name}
                                    description={playlist.description}
                                    coverImage={playlist.cover_image}
                                    owner={playlist.user?.username || "Unknown"}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-2xl font-bold mb-4">Không có playlist nào</div>
                    )}
                </div>
            </section>
        </div>
    );
}