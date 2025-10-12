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
