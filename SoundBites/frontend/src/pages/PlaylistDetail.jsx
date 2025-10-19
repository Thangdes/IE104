import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSong } from "../context/SongContext";


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";


function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return '--:--';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setCurrentSong } = useSong();

    useEffect(() => {
        async function fetchPlaylist() {
            setLoading(true);
            const res = await fetch(`${API_BASE}/playlists/${id}`);
            const data = await res.json();
            setPlaylist(data);
            setLoading(false);
        }
        fetchPlaylist();
    }, [id]);

    async function handleDeleteSong(songId) {
        if (!window.confirm("Bạn có chắc muốn xóa bài hát này khỏi playlist?")) return;
        try {
            const res = await fetch(`${API_BASE}/playlists/${id}/remove-song`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ songId })
            });
            const data = await res.json();
            if (data.success) {
                setPlaylist((prev) => ({
                    ...prev,
                    songs: prev.songs.filter(s => s.song_id !== songId)
                }));
            } else {
                alert("Xóa thất bại!");
            }
        } catch (err) {
            alert("Lỗi khi xóa bài hát!");
        }
    }

    if (loading) return <div className="text-center text-white p-8 text-4xl font-bold mb-2">Loading...</div>;
    if (!playlist) return <div className="text-center text-red-500 p-8 text-2xl font-bold mb-2">Cannot find playlist</div>;

    return (
        <div className="bg-[#1b1b1f] text-white font-redhat min-h-screen px-6 py-10 rounded-xl">
            {/* Header Section */}
            <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-56 h-56 bg-[#23232a] rounded-xl shadow flex items-center justify-center overflow-hidden mb-6 md:mb-0">
                    {playlist.cover_image ? (
                        <img src={playlist.cover_image} alt="cover" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-6xl text-gray-600">
                            <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                    )}
                </div>
                <div className="flex-1">
                    <div className="text-sm font-bold mb-2 text-gray-400">Public Playlist</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">{playlist.name}</h1>
                    <div className="text-lg font-bold text-gray-300 mb-2">Created by {playlist.user?.username || "Unknown"}</div>
                    {playlist.description && <div className="text-gray-400 mt-2 text-base">{playlist.description}</div>}
                </div>
            </section>

            {/* Songs Section */}
            <section>
                <div className="flex items-center justify-between mb-6 pb-2">
                    <h2 className="text-4xl font-bold transition">Songs in {playlist.name}</h2>
                </div>
                <div className="bg:transparent rounded-xl p-8 min-h-[200px]">
                    {playlist.songs && playlist.songs.length > 0 ? (
                        <div className="grid gap-4">
                            {/* Table Header */}
                            <div className="grid grid-cols-[56px_1fr_180px_120px_120px] items-center border-b border-gray-700 pb-2 text-gray-400 tracking-wide uppercase text-lg font-normal">
                                <div>#</div>
                                <div>Title</div>
                                <div>Album</div>
                                <div className="text-center">Duration</div>
                                <div className="hidden md:block text-right">Actions</div>
                            </div>
                            {/* Track Items */}
                            {playlist.songs.map((song, idx) => (
                                <div key={song.song_id} className="grid grid-cols-[56px_1fr_180px_120px_120px] items-center py-3 border-b border-gray-800 hover:bg-[#28282e] transition group">
                                    {/* Index */}
                                    <div className="text-lg font-semibold text-gray-300">{idx + 1}</div>

                                    {/* Title & Cover */}
                                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSong(song)}>
                                        <img
                                            src={song.album?.cover_image || song.cover_image}
                                            alt={song.title}
                                            className="w-14 h-14 object-cover rounded-md"
                                        />
                                        <div className="flex flex-col">
                                            <div className="text-lg text-white font-medium">{song.title}</div>
                                            <div className="text-sm text-gray-400">{song.artist?.name || "Unknown Artist"}</div>
                                        </div>
                                    </div>

                                    {/* Album Name */}
                                    <div className="text-lg text-white truncate">{song.album?.title || "Unknown Album"}</div>

                                    {/* Duration */}
                                    <div className="text-lg text-white text-center">{formatDuration(song.duration)}</div>

                                    {/* Actions: Delete */}
                                    <div className="flex justify-end gap-3 text-gray-400 items-center">
                                        <button
                                            className="ml-4 text-white hover:text-red-400 text-xl px-2 py-1 rounded transition"
                                            title="Remove from playlist"
                                            onClick={() => handleDeleteSong(song.song_id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-2xl font-bold mb-4">There are no songs in this playlist yet.</div>
                    )}
                </div>
            </section>
        </div>
    );
}