import { Link } from "react-router-dom";

function Navbar() {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        user = null;
    }

    return (
        <header className="top-0 left-0 w-full bg-[#1b1b1f] backdrop-blur-sm shadow-lg pt-2 pb-2 z-50">
            <div className="mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/logo.png"
                        alt="Site Logo"
                        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <img
                        src="/name.png"
                        alt="Site Name"
                        className="h-10 w-auto"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </Link>

                {/* Navigation Menu */}
                <nav>
                    <ul className="flex items-center gap-8 text-white text-base font-medium">
                        {user ? (
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 bg-transparent hover:bg-[#2a2a2e] px-3 py-2 rounded-xl transition-all duration-200"
                                >
                                    {user.avatar_url ? (
                                        <img
                                            src={user.avatar_url}
                                            alt="Avatar"
                                            className="h-10 w-10 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 bg-gray-300 rounded-xl"></div>
                                    )}
                                    <div className="flex flex-col text-left">
                                        <span className="text-white font-medium text-[15px]">
                                            {user.username}
                                        </span>
                                        <span className="text-gray-400 text-sm leading-tight">
                                            Free Plan
                                        </span>
                                    </div>
                                    <i className="fa-solid fa-caret-down"></i>
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="bg-[#2a2a2e] px-6 py-2 rounded-xl text-white font-semibold hover:bg-[#323137] hover:scale-[1.02] transform transition-all duration-200"
                                >
                                    Sign in
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
