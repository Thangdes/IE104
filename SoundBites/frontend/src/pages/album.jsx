import React, { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export default function Album() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAlbums() {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE}/albums`);
                const data = await res.json();
                setAlbums(data);
            } catch (error) {
                setAlbums([]);
            }
            setLoading(false);
        }
        fetchAlbums();
    }, []);

    if (loading) return <div className="text-center text-white p-8 text-4xl font-bold mb-2">Loading...</div>;

    return (
        <div className="bg-[#1b1b1f] text-white font-redhat min-h-screen px-6 py-10 rounded-xl">
            {/* Header Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">Latest Albums</h1>
                <p className="text-gray-400">
                    Discover the latest and greatest albums from your favorite artists.
                </p>
            </section>

            {/* Albums Section */}
            <section>
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
                    <h2 className="text-3xl font-bold hover:text-[#767679] transition">
                        All Albums
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {albums.length > 0 ? (
                        albums.map((album) => (
                            <div
                                key={album.album_id}
                                className="cursor-pointer hover:scale-[1.03] transition-all"
                                onClick={() => navigate(`/albums/${album.album_id}`)}
                            >
                                <AlbumCard
                                    title={album.title}
                                    artist={album.artist?.name}
                                    coverImage={album.cover_image}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-2xl font-bold mb-4">Không có album nào</div>
                    )}
                </div>
            </section>
        </div>
    );
}
