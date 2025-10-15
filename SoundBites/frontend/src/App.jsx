import { Routes, Route, useLocation } from "react-router-dom";
import { SongProvider, useSong } from "./context/SongContext";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import SongDetail from "./pages/SongDetail";

function PlayerWrapper() {
    const { currentSong } = useSong();
    if (!currentSong) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40">
            <Player />
        </div>
    );
}

function App() {
    const location = useLocation();
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
        <SongProvider>
            <div className="flex flex-col min-h-screen bg-[#1b1c1f] text-white font-redhat">
                {/* HEADER */}
                {!isSongPage && <Navbar />}

                {/* MAIN CONTENT */}
                <div className="flex flex-1 relative">
                    {/* SIDEBAR */}
                    <Sidebar />

                    {/* PAGE CONTENT */}
                    <main className={`flex-1 ${isSongPage ? "p-0 pb-0" : "p-6 pb-24"} overflow-y-auto`}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/library" element={<Library />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/song" element={<SongDetail />} />

                            {/* Không cần route login ở đây nữa */}
                        </Routes>
                    </main>
                </div>

                {/* PLAYER (fixed at bottom) */}
                {!isSongPage && <PlayerWrapper />}

                {/* FOOTER */}
                {!isSongPage && <Footer />}
            </div>
        </SongProvider>
    );
}

export default App;
