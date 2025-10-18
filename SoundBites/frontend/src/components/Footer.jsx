import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer className="bg-[#1b1b1f] text-white font-redhat px-6 md:px-12 py-12">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left: Logo + Description */}
                    <div>
                        <a href="#" className="inline-flex items-center gap-2 mb-4">
                            <img
                                src="logo.png"
                                alt="Site Logo"
                                className="h-10 w-auto"
                            />
                            <img
                                src="name.png"
                                alt="Site Name"
                                className="h-10 w-auto"
                            />
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Music is the food of the soul.
                        </p>
                    </div>

                    {/* Right: Follow the beat */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow the beat</h3>
                        <ul className="flex flex-wrap gap-4">
                            <li>
                                <a
                                    href="https://www.instagram.com"
                                    className="text-white text-2xl hover:text-[#999] transition"
                                    title="Instagram"
                                >
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com"
                                    className="text-white text-2xl hover:text-[#999] transition"
                                    title="Facebook"
                                >
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/"
                                    className="text-white text-2xl hover:text-[#999] transition"
                                    title="YouTube"
                                >
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://tiktok.com/"
                                    className="text-white text-2xl hover:text-[#999] transition"
                                    title="TikTok"
                                >
                                    <i className="fa-brands fa-tiktok"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/"
                                    className="text-white text-2xl hover:text-[#999] transition"
                                    title="X"
                                >
                                    <i className="fa-brands fa-x-twitter"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- Middle Section --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-base font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/" className="hover:text-white" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">About</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-semibold mb-4">Communities</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/coming-soon" className="hover:text-white">For Artists</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">Developers</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">Advertising</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">Investors</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">Vendors</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-semibold mb-4">Premium Plans</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/coming-soon" className="hover:text-white">Premium Individual</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">Premium Student</Link></li>
                            <li><Link to="/coming-soon" className="hover:text-white">Free Plan</Link></li>
                        </ul>
                    </div>
                </div>

                {/* --- Bottom Section --- */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 pb-10 gap-4">
                    <div className="text-gray-500 text-sm text-center md:text-left">
                        © SoundBites | Designed by{" "}
                        <a className="text-white hover:underline">Group 1</a>
                    </div>

                    <ul className="flex gap-4">
                        <li><a href="https://www.spotify.com" className="hover:text-[#999]"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="https://www.apple.com/apple-music/" className="hover:text-[#999]"><i className="fa-brands fa-facebook"></i></a></li>
                        <li><a href="https://www.youtube.com/" className="hover:text-[#999]"><i className="fa-brands fa-youtube"></i></a></li>
                        <li><a href="https://tidal.com/" className="hover:text-[#999]"><i className="fa-brands fa-tiktok"></i></a></li>
                        <li><a href="https://www.facebook.com/" className="hover:text-[#999]"><i className="fa-brands fa-x-twitter"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

