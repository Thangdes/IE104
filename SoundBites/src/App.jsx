import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Profile from "./pages/Profile";

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* HEADER */}
            <Navbar />

            {/* MAIN CONTENT */}
            <div className="flex flex-1 relative">
                {/* SIDEBAR */}
                <Sidebar />

                {/* PAGE CONTENT */}
                <main className="flex-1 p-6 pb-24 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
            </div>

            {/* PLAYER (fixed at bottom) */}
            <div className="fixed bottom-0 left-0 right-0 z-40">
                <Player />
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}

export default App;
