import React, { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import PlaylistCard from "../components/PlaylistCard";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchResults, setSearchResults] = useState({
    songs: [],
    playlists: [],
    artists: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - Thay thế bằng API call thực tế
  const mockSearchData = {
    songs: [
      {
        song_id: 1,
        title: "The Fate of Ophelia",
        artist: { name: "Taylor Swift" },
        album: { cover_image: "https://i.scdn.co/image/ab67616d00004851d7812467811a7da6e6a44902" },
        play_count: 1250000
      },
      {
        song_id: 2,
        title: "Blinding Lights",
        artist: { name: "The Weeknd" },
        album: { cover_image: "https://i.scdn.co/image/ab67616d000048515efc6f15d6977b60c8494d4f" },
        play_count: 2850000
      }
    ],
    playlists: [
      {
        playlist_id: 1,
        name: "Chill Vibes",
        description: "Relaxing tunes for your downtime",
        cover_image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        user: { username: "SoundBites Curators" }
      },
      {
        playlist_id: 2,
        name: "Workout Energy",
        description: "High energy tracks to power your workout",
        cover_image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        user: { username: "Fitness Pro" }
      }
    ],
    artists: [
      {
        artist_id: 1,
        name: "Taylor Swift",
        image: "https://i.scdn.co/image/ab67706f00000002d0d5d48f33b8e3a60c7a7a1a",
        followers: 85200000
      },
      {
        artist_id: 2,
        name: "The Weeknd",
        image: "https://i.scdn.co/image/ab67706f00000002c8b5e5b8f1c8c5e5d5a5a5a5",
        followers: 45600000
      }
    ]
  };

  // Search function - sẽ thay thế bằng API call thực tế
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults({ songs: [], playlists: [], artists: [] });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(mockSearchData);
      setIsLoading(false);
    }, 800);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePlaySong = (song) => {
    console.log("Playing song:", song);
    // Implement play logic here
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
        {["all", "songs", "playlists", "artists"].map((tab) => (
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
                  >
                    <div className="relative w-32 h-32 bg-gray-700 rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={artist.image}
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
                    <p className="text-gray-400 text-sm">
                      {artist.followers.toLocaleString()} followers
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {searchQuery && !isLoading &&
            searchResults.songs.length === 0 &&
            searchResults.playlists.length === 0 &&
            searchResults.artists.length === 0 && (
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