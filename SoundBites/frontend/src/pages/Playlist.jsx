import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export default function Playlist() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", description: "", cover: null, coverPreview: "" });
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        user = null;
    }

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

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cover" && files && files[0]) {
            setForm((prev) => ({
                ...prev,
                cover: files[0],
                coverPreview: URL.createObjectURL(files[0])
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        setCreating(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user") || "null");
            if (!user || !user.id) {
                setError("You must be logged in");
                setCreating(false);
                return;
            }
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            if (form.cover) formData.append("cover", form.cover);
            // Pass user info in header (for backend to get user id)
            const res = await fetch(`${API_BASE}/playlists`, {
                method: "POST",
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    "x-user": JSON.stringify(user),
                },
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setShowModal(false);
                setForm({ name: "", description: "", cover: null, coverPreview: "" });
                // Refresh playlists
                setPlaylists((prev) => [data.playlist, ...prev]);
            } else {
                setError(data.error || "Failed to create playlist");
            }
        } catch (err) {
            setError("Failed to create playlist");
        }
        setCreating(false);
    };


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
                    <button
                        className="bg-white text-[#1b1b1f] font-bold text-lg leading-[22px] px-10 py-3 rounded-[12px] transition-all duration-300 hover:bg-[#626267] hover:text-[#FEFEFE] hover:scale-[1.05]"
                        onClick={() => {
                            if (user) {
                                setShowModal(true);
                            } else {
                                setShowPopup(true);
                            }
                        }}
                    >
                        Create a Playlist
                    </button>
                    {/* Popup for login required */}
                    {showPopup && (
                        <div
                            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
                            onClick={() => setShowPopup(false)}
                        >
                            <div
                                className="bg-[#23232a] rounded-xl shadow-lg p-8 text-center"
                                onClick={e => e.stopPropagation()}
                            >
                                <h2 className="text-white text-xl font-bold mb-4">Please sign in to use this feature</h2>
                                <button
                                    className="bg-white text-[#1b1b1f] font-bold px-6 py-2 rounded-xl hover:bg-[#626267] hover:text-[#FEFEFE] transition-all duration-300"
                                    onClick={() => { setShowPopup(false); navigate("/login"); }}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <div className="bg-[#23232a] rounded-2xl p-8 w-full max-w-md relative shadow-2xl border border-white/10">
                            <button
                                className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
                                onClick={() => setShowModal(false)}
                                disabled={creating}
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-white">Create Playlist</h2>
                            <form onSubmit={handleCreatePlaylist} className="space-y-5">
                                <div>
                                    <label className="block text-white/80 font-semibold mb-1">Playlist Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleFormChange}
                                        required
                                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10"
                                        placeholder="Enter playlist name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 font-semibold mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleFormChange}
                                        rows={3}
                                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10"
                                        placeholder="Describe your playlist"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 font-semibold mb-1">Cover Picture</label>
                                    <input
                                        type="file"
                                        name="cover"
                                        accept="image/*"
                                        onChange={handleFormChange}
                                        className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                                    />
                                    {form.coverPreview && (
                                        <img src={form.coverPreview} alt="cover preview" className="mt-3 w-32 h-32 object-cover rounded-md border border-white/10" />
                                    )}
                                </div>
                                {error && <div className="text-red-400 text-sm">{error}</div>}
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="w-full bg-white text-[#1b1b1f] font-bold text-lg py-2 rounded-md transition-all duration-200 hover:bg-[#626267] hover:text-[#FEFEFE] disabled:opacity-60"
                                >
                                    {creating ? "Creating..." : "Create Playlist"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <PlaylistCard
                                key={playlist.playlist_id}
                                id={playlist.playlist_id}
                                name={playlist.name}
                                description={playlist.description}
                                coverImage={playlist.cover_image}
                                owner={playlist.user?.username || "Unknown"}
                            />
                        ))
                    ) : (
                        <div className="text-2xl font-bold mb-4">Không có playlist nào</div>
                    )}
                </div>
            </section>
        </div>
    );
}