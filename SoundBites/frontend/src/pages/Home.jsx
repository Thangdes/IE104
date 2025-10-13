import React, { useEffect, useState } from "react";
import { useSong } from "../context/SongContext";
import SongCard from "../components/SongCard";
import PlaylistCard from "../components/PlaylistCard";

function Home() {
    const { setCurrentSong } = useSong();
    const [topSongs, setTopSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const backendUrl = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

                const songsRes = await fetch(`${backendUrl}/songs/top`);
                const playlistsRes = await fetch(`${backendUrl}/playlists`);

                const songsData = await songsRes.json();
                const playlistsData = await playlistsRes.json();
                setTopSongs(songsData);
                setPlaylists(playlistsData);
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-[#1b1b1f] text-white font-redhat min-h-screen px-6 py-10 rounded-xl">
            {/* Welcome Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">Welcome to SoundBites</h1>
                <p className="text-gray-400">
                    Enjoy your personalized music experience or try out our trending songs at the moment.
                </p>
            </section>

            {/* Top Songs Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
                    <h2 className="text-3xl font-bold hover:text-[#767679] transition">
                        Top Songs
                    </h2>
                    <button className="bg-white text-[#1b1b1f] font-bold text-lg leading-[22px] px-10 py-3 rounded-[12px] transition-all duration-300 hover:bg-[#626267] hover:text-[#FEFEFE] hover:scale-[1.05]">
                        See All
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {topSongs.map((song) => (
                        <SongCard
                            key={song.song_id}
                            title={song.title}
                            artist={song.artist?.name || "Unknown Artist"}
                            coverImage={song.album?.cover_image}
                            fileUrl={song.file_url}
                            playCount={song.play_count}
                            onPlay={() => setCurrentSong(song)}
                        />
                    ))}
                </div>
            </section>

            {/* Playlists Section */}
            <section>
                <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
                    <h2 className="text-3xl font-bold hover:text-[#767679] transition">
                        Featured Playlists
                    </h2>
                    <button className="bg-white text-[#1b1b1f] font-bold text-lg leading-[22px] px-10 py-3 rounded-[12px] transition-all duration-300 hover:bg-[#626267] hover:text-[#FEFEFE] hover:scale-[1.05]">
                        See All
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {playlists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.playlist_id}
                            name={playlist.name}
                            description={playlist.description}
                            coverImage={playlist.cover_image}
                            owner={playlist.user?.username || "Unknown"}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
