import { Routes, Route, useLocation } from "react-router-dom";
import { SongProvider, useSong } from "./context/SongContext";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Lyric from "./components/Lyric";

import Home from "./pages/Home";
import Album from "./pages/Album";
import AlbumDetail from "./pages/AlbumDetail";
import ArtistDetail from "./pages/ArtistDetail";
import Playlist from "./pages/Playlist";
import PlaylistDetail from "./pages/PlaylistDetail";
import Search from "./pages/Search";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import SongDetail from "./pages/SongDetail";
import ComingSoon from "./pages/ComingSoon";
import History from "./pages/History";

function PlayerWrapper() {
    const { currentSong } = useSong();
    if (!currentSong) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60]">
            <Player />
        </div>
    );
}

function LyricOverlay() {
    const { showLyricOverlay, currentSong } = useSong();
    if (!showLyricOverlay || !currentSong) return null;
    
    const bg = currentSong?.album?.cover_image || "/signup_bg.jpg";
    
    return (
        <div className="fixed inset-0 z-50 flex flex-col pb-20">
            {/* Background image với gradient */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/80 to-black/60"></div>
            
            {/* Layout 3 cột */}
            <div className="relative flex flex-1 overflow-hidden">
                {/* Sidebar trái */}
                <div className="w-64 flex-shrink-0 bg-[#1b1b1f]/90 backdrop-blur-sm border-r border-gray-800/50">
                    <Sidebar />
                </div>
                
                {/* Panel lyric ở giữa */}
                <div className="flex-1 overflow-hidden relative">
                    <Lyric />
                </div>
                
                {/* Sidebar phải - thông tin bài hát */}
                <div className="w-80 flex-shrink-0 bg-[#1b1b1f]/80 backdrop-blur-sm border-l border-gray-800/50 overflow-y-auto">
                    <div className="p-6">
                        {/* Album art */}
                        <div className="mb-6">
                            <img
                                src={currentSong?.album?.cover_image || bg}
                                alt={currentSong?.title}
                                className="w-full aspect-square object-cover rounded-lg shadow-xl"
                            />
                        </div>
                        
                        {/* Song info */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                                {currentSong?.title}
                            </h2>
                            <div className="text-gray-400 space-y-1">
                                {currentSong?.artist && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Nghệ sĩ:</span>
                                        <span className="text-white hover:underline cursor-pointer">
                                            {currentSong.artist.name}
                                        </span>
                                    </div>
                                )}
                                {currentSong?.album && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Album:</span>
                                        <span className="text-white hover:underline cursor-pointer">
                                            {currentSong.album.title || currentSong.album.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Additional info */}
                        {currentSong?.genre && (
                            <div className="mb-4">
                                <span className="text-xs text-gray-500">Thể loại:</span>
                                <span className="text-gray-300 ml-2">{currentSong.genre.name}</span>
                            </div>
                        )}
                        
                        {currentSong?.play_count !== undefined && (
                            <div className="mb-4">
                                <span className="text-xs text-gray-500">Lượt nghe:</span>
                                <span className="text-gray-300 ml-2">{currentSong.play_count.toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppContent() {
    const location = useLocation();
    const { showLyricOverlay } = useSong();
    const isLoginPage = location.pathname === "/login";
    const isSignupPage = location.pathname === "/signup";
    const isSongPage = location.pathname.startsWith("/song");

    if (isLoginPage) {
        // Chỉ render LoginPage, không có layout
        return <LoginPage />;
    }
    if (isSignupPage) {
        // Chỉ render Signup, không có layout
        return <Signup />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#1b1c1f] text-white font-redhat">
            {/* HEADER */}
            {!isSongPage && !showLyricOverlay && <Navbar />}

            {/* MAIN CONTENT */}
            {!showLyricOverlay && (
                <div className="flex flex-1 relative">
                    {/* SIDEBAR */}
                    <Sidebar />

                    {/* PAGE CONTENT */}
                    <main className={`flex-1 ${isSongPage ? "p-0 pb-0" : "p-6 pb-24"} overflow-y-auto`}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/favorites" element={<Likes />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/song" element={<SongDetail />} />
                            <Route path="/playlist" element={<Playlist />} />
                            <Route path="/playlists/:id" element={<PlaylistDetail />} />
                            <Route path="/albums" element={<Album />} />
                            <Route path="/albums/:id" element={<AlbumDetail />} />
                            <Route path="/artists/:id" element={<ArtistDetail />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/coming-soon" element={<ComingSoon />} />

                            {/* Không cần route login ở đây nữa */}
                        </Routes>
                    </main>
                </div>
            )}

            {/* PLAYER (fixed at bottom) - luôn hiển thị khi có bài hát, kể cả khi lyric overlay mở */}
            {(!isSongPage || showLyricOverlay) && <PlayerWrapper />}

            {/* FOOTER */}
            {!isSongPage && !showLyricOverlay && <Footer />}

            {/* LYRIC OVERLAY */}
            <LyricOverlay />
        </div>
    );
}

function App() {
    return (
        <SongProvider>
            <AppContent />
        </SongProvider>
    );
}

export default App;
