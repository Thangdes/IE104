import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    const { playQueue } = useSong();
    const navigate = useNavigate();

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

    // Drag and drop state
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Drag and drop handlers (move out of handleDeleteSong)
    function handleDragStart(index) {
        setDraggedIndex(index);
    }
    function handleDragOver(e, index) {
        e.preventDefault();
        setHoveredIndex(index);
    }
    function handleDrop(e, dropIndex) {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setHoveredIndex(null);
            return;
        }
        const newSongs = [...playlist.songs];
        const draggedSong = newSongs[draggedIndex];
        newSongs.splice(draggedIndex, 1);
        newSongs.splice(dropIndex, 0, draggedSong);
        setPlaylist((prev) => ({ ...prev, songs: newSongs }));
        setDraggedIndex(null);
        setHoveredIndex(null);
    }
    function handleDragEnd() {
        setDraggedIndex(null);
        setHoveredIndex(null);
    }

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
                alert("Failed to delete the song!");
            }
        } catch {
            alert("Failed to delete the song!");
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

            {/* Play & Shuffle Buttons left, Delete Playlist right */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    <button
                        className="flex items-center gap-2 bg-white text-[#1b1b1f] font-semibold text-lg leading-[22px] px-8 py-3 rounded-[12px] transition-all duration-300 hover:bg-[#626267] hover:text-[#FEFEFE] hover:scale-[1.05]"
                        onClick={() => {
                            if (playlist.songs && playlist.songs.length > 0) {
                                playQueue(playlist.songs, 0);
                            }
                        }}
                    >
                        <i className="fa-solid fa-play"></i>
                        <span>Play</span>
                    </button>
                    <button
                        className="flex items-center gap-2 bg-[#2a2a2a] text-white font-semibold text-lg leading-[22px] px-8 py-3 rounded-[12px] transition-all duration-300 hover:bg-[#626267] hover:text-[#FEFEFE] hover:scale-[1.05]"
                        onClick={() => {
                            if (playlist.songs && playlist.songs.length > 0) {
                                const shuffled = [...playlist.songs].sort(() => Math.random() - 0.5);
                                playQueue(shuffled, 0);
                            }
                        }}
                    >
                        <i className="fa-solid fa-shuffle"></i>
                        <span>Shuffle</span>
                    </button>
                </div>
                <button
                    className="flex items-center gap-2 border-red-900 bg-transparent text-red-500 font-light text-lg leading-[22px] px-8 py-3 rounded-[12px] transition-all duration-300 hover:bg-red-950 hover:text-red-400 hover:scale-[1.05]"
                    onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this playlist?')) {
                            try {
                                const res = await fetch(`${API_BASE}/playlists/${id}`, { method: 'DELETE' });
                                const data = await res.json();
                                if (data.success) {
                                    alert('Playlist deleted successfully.');
                                    navigate('/');
                                } else {
                                    alert('Failed to delete playlist.');
                                }
                            } catch {
                                alert('Error deleting playlist.');
                            }
                        }
                    }}
                >
                    <i className="fa-solid fa-trash"></i>
                    <span>Delete Playlist</span>
                </button>
            </div>

            {/* Songs Section */}
            <section>
                <div className="flex items-center justify-between mb-6 pb-2">
                    <h2 className="text-4xl font-bold transition">Songs in {playlist.name}</h2>
                </div>
                <div className="bg:transparent rounded-xl p-8 min-h-[200px]">
                    {playlist.songs && playlist.songs.length > 0 ? (
                        <div className="grid gap-4">
                            {/* Table Header */}
                            <div className="grid grid-cols-[40px_56px_1fr_180px_120px_120px] items-center border-b border-gray-700 pb-2 text-gray-400 tracking-wide uppercase text-lg font-normal">
                                <div></div>
                                <div>#</div>
                                <div>Title</div>
                                <div>Album</div>
                                <div className="text-center">Duration</div>
                                <div className="hidden md:block text-right">Actions</div>
                            </div>
                            {/* Track Items with drag and drop */}
                            {playlist.songs.map((song, idx) => (
                                <div
                                    key={song.song_id}
                                    draggable
                                    onDragStart={() => handleDragStart(idx)}
                                    onDragOver={(e) => handleDragOver(e, idx)}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    onDragEnd={handleDragEnd}
                                    className={`grid grid-cols-[40px_56px_1fr_180px_120px_120px] items-center py-3 border-b border-gray-800 hover:bg-[#28282e] transition group cursor-move ${draggedIndex === idx ? "opacity-50" : ""} ${hoveredIndex === idx && draggedIndex !== null && draggedIndex !== idx ? "border-t-2 border-white" : ""}`}
                                >
                                    {/* Drag Handle */}
                                    <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <i className="fa-solid fa-grip-lines text-gray-400"></i>
                                    </div>
                                    {/* Index */}
                                    <div className="text-lg font-semibold text-gray-300">{idx + 1}</div>
                                    {/* Title & Cover */}
                                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
                                        if (playlist.songs && playlist.songs.length > 0) {
                                            playQueue(playlist.songs, idx);
                                        }
                                    }}>
                                        <img
                                            src={song.album?.cover_image || song.cover_image}
                                            alt={song.title}
                                            className="w-14 h-14 object-cover rounded-md"
                                        />
                                        <div className="flex flex-col">
                                            <div className="text-lg text-white font-medium">{song.title}</div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (song.artist_id) navigate(`/artists/${song.artist_id}`);
                                                }}
                                                className="text-sm text-gray-400 hover:underline text-left"
                                            >
                                                {song.artist?.name || "Unknown Artist"}
                                            </button>
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