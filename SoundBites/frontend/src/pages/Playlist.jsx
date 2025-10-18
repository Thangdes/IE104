import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSong } from "../context/SongContext";


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export default function Playlist() {
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

	if (loading) return <div className="text-center text-white p-8">Đang tải...</div>;
	if (!playlist) return <div className="text-center text-red-500 p-8">Không tìm thấy playlist</div>;

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
			<div className="flex items-center gap-8 px-8 pt-8">
				<div className="w-56 h-56 bg-gray-900 rounded shadow flex items-center justify-center overflow-hidden">
					{playlist.cover_image ? (
						<img src={playlist.cover_image} alt="cover" className="w-full h-full object-cover" />
					) : (
						<span className="text-6xl text-gray-600">
							<svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
						</span>
					)}
				</div>
				<div>
					<div className="text-sm font-bold mb-2">Danh sách phát công khai</div>
					<h1 className="text-5xl font-extrabold mb-2">{playlist.name}</h1>
					<div className="text-sm text-gray-400">Playlist ID: {playlist.playlist_id}</div>
					<div className="text-lg font-bold text-gray-300">{playlist.user?.username || "Unknown"}</div>
					{playlist.description && <div className="text-gray-400 mt-2">{playlist.description}</div>}
				</div>
			</div>
			<div className="px-8 pt-8">
				<div className="flex items-center gap-4 mb-6">
					<button className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-xl">+</button>
					<button className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-xl">
						<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
					</button>
					<span className="text-gray-400">...</span>
				</div>
				<div className="flex justify-between items-center mb-4">
					<div className="font-bold">Danh sách <span className="ml-2 text-gray-400">≡</span></div>
				</div>
				<div className="bg-black/40 rounded-lg p-8 min-h-[200px]">
					{playlist.songs && playlist.songs.length > 0 ? (
						<ul>
							{playlist.songs.map(song => (
								<li key={song.song_id} className="mb-4 flex items-center justify-between group hover:bg-gray-800 rounded px-4 py-2 transition">
									<div className="flex-1 cursor-pointer" onClick={() => setCurrentSong(song)}>
										<div className="font-bold text-lg group-hover:text-green-400 flex items-center gap-2">
											<i className="fa-solid fa-play text-base opacity-0 group-hover:opacity-100 transition mr-2"></i>
											{song.title}
										</div>
										<div className="text-gray-400">{song.artist?.name || "Unknown Artist"}</div>
										<div className="text-gray-500 text-sm">Album: {song.album?.name || song.album?.title || "Unknown Album"}</div>
									</div>
									<button
										className="ml-4 text-red-400 hover:text-red-600 text-xl px-2 py-1 rounded transition"
										title="Xóa khỏi playlist"
										onClick={() => handleDeleteSong(song.song_id)}
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</li>
							))}
						</ul>
					) : (
						<div className="text-2xl font-bold mb-4">Chưa có bài hát nào trong playlist này</div>
					)}
				</div>
			</div>
		</div>
	);
}