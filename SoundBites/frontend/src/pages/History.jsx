import React, { useEffect, useState, useRef } from "react";
import { useSong } from "../context/SongContext";
import SongCard from "../components/SongCard";

function History() {
    const { playQueue, historyUpdateCallbacks } = useSong();
    const [historySongs, setHistorySongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            setHistorySongs([]);
            setLoading(false);
            return;
        }
        const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
        try {
            const res = await fetch(`${API_BASE}/history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            const songs = Array.isArray(data) ? data : [];
            // Loại bỏ duplicate dựa trên song_id (chỉ giữ bài đầu tiên)
            const uniqueSongs = songs.filter((song, index, self) => 
                index === self.findIndex(s => s.song_id === song.song_id)
            );
            setHistorySongs(uniqueSongs);
        } catch (error) {
            console.error("Error fetching history:", error);
            setHistorySongs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
        
        // Đăng ký callback để tự động refresh khi có bài mới được thêm vào lịch sử
        const refreshCallback = () => {
            fetchHistory();
        };
        historyUpdateCallbacks.current.push(refreshCallback);
        
        // Cleanup: xóa callback khi component unmount
        return () => {
            historyUpdateCallbacks.current = historyUpdateCallbacks.current.filter(
                cb => cb !== refreshCallback
            );
        };
    }, []);

    if (loading) {
        return (
            <div className="p-8 text-gray-300">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <section>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">History</h1>
                    <p className="text-gray-400">Recently played songs</p>
                </div>
                {historySongs.length === 0 ? (
                    <div className="text-center text-gray-400 text-xl mt-12">No listening history yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {historySongs.map((song, index) => (
                            <SongCard
                                key={song.song_id}
                                title={song.title}
                                artist={song.artist?.name || "Unknown Artist"}
                                coverImage={song.album?.cover_image}
                                playCount={song.play_count}
                                onPlay={() => playQueue(historySongs, index)}
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

export default History;

