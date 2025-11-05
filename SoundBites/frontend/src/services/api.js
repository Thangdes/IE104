// Normalize API base: ensure it's an absolute URL to backend (not relative to Vite dev server)
let API_BASE = (import.meta.env.VITE_API_BASE && String(import.meta.env.VITE_API_BASE).trim()) || "http://localhost:4000/api";
if (!/^https?:\/\//i.test(API_BASE)) {
    // If provided base is relative like "/api" or "api", fallback to localhost backend
    API_BASE = "http://localhost:4000/api";
}
// Remove trailing slash
API_BASE = API_BASE.replace(/\/+$/, '');
if (import.meta.env.DEV) {
    console.debug('[api] API_BASE =', API_BASE);
}

export async function updateUserProfile(userId, profile, token) {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(profile)
    });
    return res.json();
}
export async function fetchUserProfile(userId, token) {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    if (!res.ok) {
        let errText = '';
        try { errText = await res.text(); } catch { errText = ''; }
        return { success: false, error: errText || `HTTP ${res.status}` };
    }
    return res.json();
}

export async function uploadUserAvatar(userId, file, token) {
    const fd = new FormData();
    fd.append('avatar', file);
    const url = `${API_BASE}/users/${userId}/avatar`;
    if (import.meta.env.DEV) {
        console.debug('[uploadUserAvatar] POST', url, 'file=', file?.name, 'size=', file?.size);
    }
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: fd
    });
    // Fallback: if 404, try toggling trailing /api segment in base URL
    if (res.status === 404) {
        let altBase = API_BASE;
        if (/\/api$/.test(API_BASE)) {
            altBase = API_BASE.replace(/\/api$/, '');
        } else {
            altBase = `${API_BASE}/api`;
        }
        const altUrl = `${altBase.replace(/\/+$/, '')}/users/${userId}/avatar`;
        if (import.meta.env.DEV) {
            console.debug('[uploadUserAvatar] retry POST', altUrl);
        }
        res = await fetch(altUrl, {
            method: 'POST',
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: fd
        });
    }
    if (!res.ok) {
        // Final fallback: send as base64 via PUT /users/:id
        try {
            const base64 = await fileToDataURL(file);
            const putRes = await fetch(`${API_BASE}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ avatar_base64: base64 })
            });
            if (!putRes.ok) {
                let payload;
                try { payload = await putRes.json(); } catch { payload = { error: `HTTP ${putRes.status}` }; }
                return { success: false, ...(typeof payload === 'object' ? payload : { error: String(payload) }) };
            }
            const data = await putRes.json();
            const url = data?.user?.avatar_url || data?.url;
            return { success: true, url };
        } catch {
            let payload;
            try { payload = await res.json(); } catch { payload = { error: `HTTP ${res.status}` }; }
            return { success: false, ...(typeof payload === 'object' ? payload : { error: String(payload) }) };
        }
    }
    return res.json();
}

// Helpers
export function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        } catch (e) {
            reject(e);
        }
    });
}

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

// Artist API
export async function getArtistById(id) {
    const r = await fetch(`${API_BASE}/artists/${id}`);
    if (!r.ok) throw new Error(`Failed to fetch artist ${id}`);
    return r.json();
}
