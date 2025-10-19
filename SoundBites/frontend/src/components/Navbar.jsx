import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="top-0 left-0 w-full bg-[#1b1b1f] backdrop-blur-sm shadow-lg pt-2 pb-2 z-50">
            <div className="mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="logo.png"
                        alt="Site Logo"
                        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <img
                        src="name.png"
                        alt="Site Name"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Navigation Menu */}
                <nav>
                    <ul className="flex items-center gap-8 text-white text-base font-medium">
                        {/* Profile Section */}
                        <li>
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 bg-transparent hover:bg-[#2a2a2e] px-3 py-2 rounded-xl transition-all duration-200"
                            >
                                <div className="h-10 w-10 bg-gray-300 rounded-xl"></div>
                                <div className="flex flex-col text-left">
                                    <span className="text-white font-medium text-[15px]">
                                        Wade Warren
                                    </span>
                                    <span className="text-gray-400 text-sm leading-tight">
                                        Free Plan
                                    </span>
                                </div>
                                <i className="fa-solid fa-caret-down"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
