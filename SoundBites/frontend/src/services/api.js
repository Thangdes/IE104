const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function fetchSongs() {
    const r = await fetch(`${API_BASE}/songs`);
    return r.json();
}

export async function uploadSong(formData) {
    const r = await fetch(`${API_BASE}/songs/upload`, {
        method: "POST",
        body: formData
    });
    return r.json();
}

// Search API: query songs, playlists, artists
export async function search(query) {
    const r = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    if (!r.ok) throw new Error("Search failed");
    return r.json();
}
