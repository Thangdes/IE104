import { Link } from "react-router-dom";


function Sidebar() {
    return (
        <aside className="w-64 flex-shrink-0">
            <div className="sticky top-0 h-screen overflow-y-auto px-4 py-6 bg-[#1b1b1f] rounded-r-xl">
                <div>
                    <div className="text-lg font-semibold mt-4 mb-4 border-b border-gray-700 pb-2">
                        Menu
                    </div>

                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-house"></i>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/search"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    <span>Search</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/library"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-heart"></i>
                                    <span>Likes</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-music"></i>
                                    <span>Playlists</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/albums"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-record-vinyl"></i>
                                    <span>Albums</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/following"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-user-plus"></i>
                                    <span>Following</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* General Section */}
                    <div className="text-lg font-semibold mt-8 mb-4 border-b border-gray-700 pb-2">
                        General
                    </div>

                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/settings"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-gear"></i>
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/subscription"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-crown"></i>
                                    <span>Subscription</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#logout"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                >
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <span>Log out</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
