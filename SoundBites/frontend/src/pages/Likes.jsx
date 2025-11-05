import React, { useEffect, useState } from "react";
import { useSong } from "../context/SongContext";
import SongCard from "../components/SongCard";

function Likes() {
    const { setCurrentSong, playQueue } = useSong();
    const [likedSongs, setLikedSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLikedSongs() {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setLikedSongs([]);
                setLoading(false);
                return;
            }
            const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
            try {
                const res = await fetch(`${API_BASE}/favorites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setLikedSongs(Array.isArray(data) ? data : (data.songs || []));
            } catch {
                setLikedSongs([]);
            }
            setLoading(false);
        }
        fetchLikedSongs();
    }, []);

    if (loading) return <div className="text-center text-white p-8 text-4xl font-bold mb-2">Loading...</div>;

    return (
        <div className="bg-[#1b1b1f] text-white font-redhat min-h-screen px-6 py-10 rounded-xl">
            {/* Header */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">Your Liked Songs</h1>
                <p className="text-gray-400">
                    All the songs you have liked are collected here. Enjoy your favorites!
                </p>
            </section>

            {/* Liked Songs Grid */}
            <section>
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
                    <h2 className="text-3xl font-bold hover:text-[#767679] transition">
                        Liked Songs
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-lg text-gray-400">{likedSongs.length} songs</span>
                        {likedSongs.length > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playQueue(likedSongs, 0);
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900 hover:scale-105 transition"
                                title="Play all liked songs"
                            >
                                <i className={`fa-solid fa-play`}></i>
                            </button>
                        )}
                    </div>
                </div>
                {likedSongs.length === 0 ? (
                    <div className="text-center text-gray-400 text-xl mt-12">You haven't liked any songs yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {likedSongs.map((song) => (
                            <SongCard
                                key={song.song_id}
                                title={song.title}
                                artist={song.artist?.name || "Unknown Artist"}
                                coverImage={song.album?.cover_image}
                                playCount={song.play_count}
                                onPlay={() => setCurrentSong(song)}
                                song_id={song.song_id}
                                artistId={song.artist_id}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Likes;
