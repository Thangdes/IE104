import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtistById } from "../services/api";
import AlbumCard from "../components/AlbumCard";
import { useSong } from "../context/SongContext";

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "--:--";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { playQueue } = useSong();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getArtistById(id);
        if (!ignore) setArtist(data);
      } catch {
        if (!ignore) setError("Failed to load artist");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  const totalDuration = useMemo(() => {
    if (!artist?.songs) return 0;
    return artist.songs.reduce((sum, s) => sum + (Number(s.duration) || 0), 0);
  }, [artist]);

  const handlePlayAll = () => {
    if (artist?.songs?.length) {
      playQueue(artist.songs, 0);
    }
  };

  if (loading) return <div className="text-center text-white p-8 text-3xl font-bold">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-8 text-2xl font-bold">{error}</div>;
  if (!artist) return <div className="text-center text-red-500 p-8 text-2xl font-bold">Artist not found</div>;

  return (
    <div className="bg-[#1b1b1f] text-white font-redhat min-h-screen px-6 py-10 rounded-xl">
      {/* Header */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-56 h-56 bg-[#23232a] rounded-full shadow overflow-hidden flex items-center justify-center">
          {artist.image_url ? (
            <img src={artist.image_url} alt={artist.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500 text-6xl">🎤</div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold mb-2 text-gray-400">Artist</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{artist.name}</h1>
          {artist.country && (
            <div className="text-gray-300 text-lg mb-2">{artist.country}</div>
          )}
          {artist.bio && (
            <p className="text-gray-400 leading-relaxed max-w-3xl">{artist.bio}</p>
          )}
          <div className="text-gray-400 mt-3 text-base">
            {artist.songs?.length || 0} songs • {artist.albums?.length || 0} albums • {Math.floor(totalDuration / 60)} mins total
          </div>
          {artist.songs?.length > 0 && (
            <button onClick={handlePlayAll} className="mt-4 bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">
              Play All
            </button>
          )}
        </div>
      </section>

      {/* Songs */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 pb-2">
          <h2 className="text-3xl font-bold">Popular</h2>
        </div>
        <div className="bg-transparent rounded-xl min-h-[160px]">
          {artist.songs && artist.songs.length > 0 ? (
            <div className="grid gap-2">
              <div className="grid grid-cols-[56px_1fr_200px_120px] items-center border-b border-gray-700 pb-2 text-gray-400 uppercase tracking-wide text-sm">
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div className="text-center">Duration</div>
              </div>
              {artist.songs.map((song, idx) => (
                <div
                  key={song.song_id}
                  className="grid grid-cols-[56px_1fr_200px_120px] items-center py-3 border-b border-gray-800 hover:bg-[#28282e] transition cursor-pointer"
                  onClick={() => {
                    // queue whole list and start at this song
                    playQueue(artist.songs, idx);
                  }}
                >
                  <div className="text-lg font-semibold text-gray-300">{idx + 1}</div>
                  <div className="flex items-center gap-3">
                    <img
                      src={song.album?.cover_image}
                      alt={song.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="text-lg text-white font-medium">{song.title}</div>
                    </div>
                  </div>
                  <div className="text-lg text-white truncate">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (song.album?.album_id) navigate(`/albums/${song.album.album_id}`);
                      }}
                      className="hover:underline text-left"
                    >
                      {song.album?.title || "Single"}
                    </button>
                  </div>
                  <div className="text-lg text-white text-center">{formatDuration(song.duration)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No songs yet.</div>
          )}
        </div>
      </section>

      {/* Albums */}
      <section>
        <div className="flex items-center justify-between mb-6 pb-2">
          <h2 className="text-3xl font-bold">Albums</h2>
        </div>
        {artist.albums && artist.albums.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {artist.albums.map((album) => (
              <AlbumCard
                key={album.album_id}
                title={album.title}
                artist={album.artist?.name || artist.name}
                coverImage={album.cover_image}
                album_id={album.album_id}
              />)
            )}
          </div>
        ) : (
          <div className="text-gray-400">No albums yet.</div>
        )}
      </section>
    </div>
  );
}
