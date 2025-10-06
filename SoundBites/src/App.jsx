import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Player />
      <Footer />
    </div>
  );
}

export default App;
