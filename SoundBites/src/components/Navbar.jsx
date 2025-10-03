import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800">
      <h2 className="text-2xl font-bold text-blue-400">🎵 MusicSite</h2>
      <ul className="flex gap-6 text-lg">
        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
        <li><Link to="/search" className="hover:text-blue-400">Search</Link></li>
        <li><Link to="/library" className="hover:text-blue-400">Library</Link></li>
        <li><Link to="/profile" className="hover:text-blue-400">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
