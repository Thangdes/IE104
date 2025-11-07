import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SongCard from "../components/SongCard";
import PlaylistCard from "../components/PlaylistCard";
import AlbumCard from "../components/AlbumCard";
import { search as searchAPI } from "../services/api";
import { useSong } from "../context/SongContext";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [searchResults, setSearchResults] = useState({
        songs: [],
        playlists: [],
        artists: [],
        albums: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const { playQueue } = useSong();
    const navigate = useNavigate();

    // Search function - fetch from backend
    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults({ songs: [], playlists: [], artists: [], albums: [] });
            return;
        }
        setIsLoading(true);
        try {
            const results = await searchAPI(query);
            setSearchResults({
                songs: results.songs || [],
                playlists: results.playlists || [],
                artists: results.artists || [],
                albums: results.albums || []
            });
        } catch {
            setSearchResults({ songs: [], playlists: [], artists: [], albums: [] });
        }
        setIsLoading(false);
    };

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handlePlaySong = (song) => {
        const songIndex = searchResults.songs.findIndex(s => s.song_id === song.song_id);
        if (songIndex >= 0 && searchResults.songs.length > 0) {
            playQueue(searchResults.songs, songIndex);
        } else {
            // Nếu không có trong danh sách, tạo queue với bài đó
            playQueue([song], 0);
        }
    };

    const handlePlaylistClick = (playlist) => {
        console.log("Opening playlist:", playlist);
        // Navigate to playlist detail
    };

    return (
        <div className="bg-[#1b1b1f] text-white font-redhat min-h-screen px-6 py-8 rounded-xl">
            {/* Search Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Search</h1>
                <p className="text-gray-400">
                    Discover songs, playlists, and artists
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#28282e] text-white px-6 py-4 pl-14 rounded-2xl border border-gray-700 focus:outline-none focus:border-[#626267] focus:ring-2 focus:ring-[#626267]/20 transition-all duration-300 text-lg"
                    />
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                    </div>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                        >
                            <i className="fa-solid fa-times text-lg"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* Search Tabs */}
            <div className="flex space-x-1 mb-8 border-b border-gray-700">
                {["all", "songs", "albums", "playlists", "artists"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 font-medium capitalize transition-all duration-300 border-b-2 ${activeTab === tab
                            ? "text-white border-white"
                            : "text-gray-400 border-transparent hover:text-gray-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

            {/* Search Results */}
            {!isLoading && (
                <div className="space-y-12">
                    {/* Songs Results */}
                    {(activeTab === "all" || activeTab === "songs") && searchResults.songs.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Songs</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {searchResults.songs.map((song) => (
                                    <SongCard
                                        key={song.song_id}
                                        title={song.title}
                                        artist={song.artist?.name || "Unknown Artist"}
                                        coverImage={song.album?.cover_image}
                                        playCount={song.play_count}
                                        onPlay={() => handlePlaySong(song)}
                                        song_id={song.song_id}
                                        artistId={song.artist_id}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Albums Results */}
                    {(activeTab === "all" || activeTab === "albums") && searchResults.albums.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Albums</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {searchResults.albums.map((album) => (
                                    <AlbumCard
                                        key={album.album_id}
                                        title={album.title}
                                        artist={album.artist?.name}
                                        coverImage={album.cover_image}
                                        album_id={album.album_id}
                                        artistId={album.artist_id}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Playlists Results */}
                    {(activeTab === "all" || activeTab === "playlists") && searchResults.playlists.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Playlists</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {searchResults.playlists.map((playlist) => (
                                    <PlaylistCard
                                        key={playlist.playlist_id}
                                        name={playlist.name}
                                        description={playlist.description}
                                        coverImage={playlist.cover_image}
                                        owner={playlist.user?.username || "Unknown"}
                                        onClick={() => handlePlaylistClick(playlist)}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Artists Results */}
                    {(activeTab === "all" || activeTab === "artists") && searchResults.artists.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Artists</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                {searchResults.artists.map((artist) => (
                                    <div
                                        key={artist.artist_id}
                                        className="flex flex-col items-center text-center group cursor-pointer"
                                        onClick={() => navigate(`/artists/${artist.artist_id}`)}
                                    >
                                        <div className="relative w-32 h-32 bg-gray-700 rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                                            <img
                                                src={artist.image_url}
                                                alt={artist.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="text-white text-2xl">
                                                    <i className="fa-solid fa-circle-play"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-semibold text-lg truncate w-full">
                                            {artist.name}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Empty State */}
                    {searchQuery && !isLoading &&
                        searchResults.songs.length === 0 &&
                        searchResults.playlists.length === 0 &&
                        searchResults.artists.length === 0 &&
                        searchResults.albums.length === 0 && (
                            <div className="text-center py-12">
                                <i className="fa-solid fa-music text-6xl text-gray-600 mb-4"></i>
                                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                                    No results found
                                </h3>
                                <p className="text-gray-500">
                                    Try searching with different keywords
                                </p>
                            </div>
                        )}

                    {/* Initial State */}
                    {!searchQuery && (
                        <div className="text-center py-12">
                            <i className="fa-solid fa-search text-6xl text-gray-600 mb-4"></i>
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">
                                Start searching
                            </h3>
                            <p className="text-gray-500">
                                Find your favorite songs, playlists, and artists
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;