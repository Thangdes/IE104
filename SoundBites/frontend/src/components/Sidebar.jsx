import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Sidebar() {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        user = null;
    }

    const handleProtectedNav = (path) => {
        if (user) {
            navigate(path);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setShowPopup(true);
        }
    };

    return (
        <aside className="w-64 flex-shrink-0">
            <div className="sticky top-0 h-screen overflow-y-auto px-4 py-6 bg-[#1b1b1f] rounded-r-xl">
                <div>
                    <div className="flex items-center justify-between text-lg font-semibold mt-4 mb-4 border-b border-gray-700 pb-2">
                        <span>Menu</span>
                    </div>

                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                >
                                    <i className="fa-solid fa-house"></i>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/search"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <span>Search</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition w-full text-left"
                                    onClick={() => handleProtectedNav("/favorites")}
                                >
                                    <i className="fa-solid fa-heart"></i>
                                    <span>Likes</span>
                                </button>
                            </li>
                            <li>
                                <Link
                                    to="/playlist"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                >
                                    <i className="fa-solid fa-list"></i>
                                    <span>Playlists</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/albums"
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                >
                                    <i className="fa-solid fa-record-vinyl"></i>
                                    <span>Albums</span>
                                </Link>
                            </li>
                            {/* <li>
                                <button
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition w-full text-left"
                                    onClick={() => handleProtectedNav("/following")}
                                >
                                    <i className="fa-solid fa-user-plus"></i>
                                    <span>Following</span>
                                </button>
                            </li> */}
                            <li>
                                <button
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition w-full text-left"
                                    onClick={() => handleProtectedNav("/history")}
                                >
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                    <span>History</span>
                                </button>
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
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                >
                                    <i className="fa-solid fa-gear"></i>
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#28282e] transition w-full text-left"
                                    onClick={() => {
                                        localStorage.removeItem("user");
                                        localStorage.removeItem("token");
                                        navigate("/");
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <span>Log out</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Popup for login required */}
            {showPopup && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="bg-[#23232a] rounded-xl shadow-lg p-8 text-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-white text-xl font-bold mb-4">Please sign in to use this feature</h2>
                        <button
                            className="bg-white text-[#1b1b1f] font-bold px-6 py-2 rounded-xl hover:bg-[#626267] hover:text-[#FEFEFE] transition-all duration-300"
                            onClick={() => { setShowPopup(false); navigate("/login"); }}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;