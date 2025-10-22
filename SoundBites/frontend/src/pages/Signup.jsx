import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

const Signup = () => {
    // State for form fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        // Username validation: no spaces
        if (username.includes(' ')) {
            setError("Username cannot contain spaces");
            return;
        }
        // Password validation: >6 chars, contains letter and number
        if (password.length < 7) {
            setError("Password must be at least 7 characters");
            return;
        }
        if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            setError("Password must contain both letters and numbers");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, role: "user" })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Signup failed");
            } else {
                setSuccess("Signup successful! You can now log in.");
            }
        } catch (err) {
            setError("Server error");
        }
        setLoading(false);
    };

    return (
        <>
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
                }
                @keyframes wave {
                    0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
                    50% { transform: scaleY(1.5); opacity: 1; }
                }
                @keyframes shimmer {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                .animate-float { animation: float 6s infinite ease-in-out; }
                .animate-wave { animation: wave 1.5s infinite ease-in-out; }
                .animate-shimmer { animation: shimmer 3s infinite; }
                
                input[type="checkbox"]:checked + div {
                    background-color: #10b981;
                    border-color: #10b981;
                }
                input[type="checkbox"]:checked + div::after {
                    content: '';
                    position: absolute;
                    left: 4px;
                    top: 1px;
                    width: 5px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                
                .form-input:focus + .input-highlight {
                    opacity: 1;
                    transform: scaleX(1);
                }
                
                .submit-button:active .button-wave {
                    width: 300px;
                    height: 300px;
                }
            `}</style>

            <div className="min-h-screen flex relative overflow-hidden bg-black">
                {/* Background với hình ảnh mới */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/signup_bg.jpg')`,
                            filter: 'brightness(0.4) contrast(1.2)',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900/10 to-black" />
                </div>

                {/* Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute bg-green-500 rounded-full opacity-30 animate-float ${i === 0 ? 'w-1.5 h-1.5 top-1/5 left-1/10' :
                                i === 1 ? 'w-1 h-1 top-3/5 left-4/5' :
                                    i === 2 ? 'w-2 h-2 top-4/5 left-1/5' :
                                        i === 3 ? 'w-1.25 h-1.25 top-2/5 left-9/10' :
                                            'w-1.75 h-1.75 top-1/10 left-7/10'
                                }`}
                            style={{ animationDelay: `${i * 1}s` }}
                        />
                    ))}
                </div>

                {/* Signup Content - Đặt khung bên trái */}
                <div className="relative z-10 w-full flex justify-center items-center p-10 pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20">
                    {/* Card: dịch sang trái */}
                    <div
                        className="
                            bg-[#121212]/95 border border-gray-800 rounded-2xl 
                            p-8 sm:p-10 md:p-12 
                            w-[85%] sm:w-[360px] md:w-[380px] lg:w-[400px] xl:w-[520px]
                            min-h-[95vh]
                            flex flex-col justify-center
                            backdrop-blur-xl shadow-2xl relative overflow-hidden
                            translate-x-0 sm:-translate-x-6 md:-translate-x-20 lg:-translate-x-32 xl:-translate-x-80
                        "
                    >

                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-shimmer" />

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="mb-4">
                                <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-wider mb-2 drop-shadow-lg">
                                    SOUNDBITES
                                </div>
                                <div className="text-green-400 text-xs lg:text-sm tracking-widest uppercase font-medium">
                                    BITE THE BEAT
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 mt-4">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 h-4 bg-green-500 rounded-full animate-wave"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="relative px-4 md:px-6 lg:px-8">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white text-center mb-1">
                                Create Account
                            </h1>
                            <p className="text-gray-400 text-center mb-6 text-xs lg:text-sm">
                                Join our music community
                            </p>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Username Input */}
                                <div>
                                    <label className="block text-white text-xs lg:text-sm font-medium mb-1.5 tracking-wide">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <svg
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                        <input
                                            type="text"
                                            className="form-input w-full pl-14 pr-4 py-3 bg-white/8 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-sm lg:text-base"
                                            placeholder="Enter your username"
                                            required
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                        <div className="input-highlight absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-b-xl scale-x-0 transition-transform duration-300 origin-center" />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-white text-xs lg:text-sm font-medium mb-1.5 tracking-wide">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <svg
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                        <input
                                            type="email"
                                            className="form-input w-full pl-14 pr-4 py-3 bg-white/8 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-sm lg:text-base"
                                            placeholder="Enter your email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <div className="input-highlight absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-b-xl scale-x-0 transition-transform duration-300 origin-center" />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label className="block text-white text-xs lg:text-sm font-medium mb-1.5 tracking-wide">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <svg
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                        </svg>
                                        <input
                                            type="password"
                                            className="form-input w-full pl-14 pr-4 py-3 bg-white/8 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-sm lg:text-base"
                                            placeholder="Create a password"
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <div className="input-highlight absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-b-xl scale-x-0 transition-transform duration-300 origin-center" />
                                    </div>
                                </div>

                                {/* Confirm Password Input */}
                                <div>
                                    <label className="block text-white text-xs lg:text-sm font-medium mb-1.5 tracking-wide">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <svg
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                        </svg>
                                        <input
                                            type="password"
                                            className="form-input w-full pl-14 pr-4 py-3 bg-white/8 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-sm lg:text-base"
                                            placeholder="Confirm your password"
                                            required
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                        <div className="input-highlight absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-b-xl scale-x-0 transition-transform duration-300 origin-center" />
                                    </div>
                                </div>

                                {/* Music Preferences */}
                                {/**
                                <div>
                                    <label className="block text-white text-xs lg:text-sm font-medium mb-1.5 tracking-wide">
                                        Favorite Music Genres
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="form-input w-full pl-4 pr-4 py-3 bg-white/8 border border-gray-700 rounded-2xl text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-sm lg:text-base"
                                            required
                                        >
                                            <option value="">Select your favorite genres</option>
                                            <option value="pop">Pop</option>
                                            <option value="rock">Rock</option>
                                            <option value="hiphop">Hip Hop</option>
                                            <option value="electronic">Electronic</option>
                                            <option value="jazz">Jazz</option>
                                            <option value="classical">Classical</option>
                                            <option value="r&b">R&B</option>
                                            <option value="country">Country</option>
                                        </select>
                                        <div className="input-highlight absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-b-xl scale-x-0 transition-transform duration-300 origin-center" />
                                    </div>
                                </div>
                                */}

                                {/* Terms and Conditions */}
                                <div className="flex items-center text-xs lg:text-sm">
                                    <label className="checkbox-wrapper flex items-center cursor-pointer text-gray-400">
                                        <input type="checkbox" className="checkbox-input sr-only" required />
                                        <div className="checkbox-custom w-4 h-4 border-2 border-gray-600 rounded mr-2 relative transition-all duration-300" />
                                        I agree to the <a href="#" className="text-green-500 hover:text-green-400 transition-colors duration-300 mx-1">Terms of Service</a> and <a href="#" className="text-green-500 hover:text-green-400 transition-colors duration-300 mx-1">Privacy Policy</a>
                                    </label>
                                </div>

                                {/* Newsletter Subscription */}
                                <div className="flex items-center text-xs lg:text-sm">
                                    <label className="checkbox-wrapper flex items-center cursor-pointer text-gray-400">
                                        <input type="checkbox" className="checkbox-input sr-only" />
                                        <div className="checkbox-custom w-4 h-4 border-2 border-gray-600 rounded mr-2 relative transition-all duration-300" />
                                        Subscribe to newsletter for new music releases and updates
                                    </label>
                                </div>

                                {/* Error/Success Message */}
                                {error && <div className="text-red-500 text-xs text-center mb-2">{error}</div>}
                                {success && <div className="text-green-500 text-xs text-center mb-2">{success}</div>}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="submit-button w-full bg-green-500 text-black font-semibold py-3 rounded-2xl hover:bg-green-400 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 relative overflow-hidden group text-sm lg:text-base"
                                    disabled={loading}
                                >
                                    <span className="button-text relative z-10">{loading ? "Creating..." : "Create Account"}</span>
                                    <div className="button-wave absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full transition-all duration-600 transform -translate-x-1/2 -translate-y-1/2" />
                                </button>
                            </form>

                            {/* Social Signup */}
                            <div className="mt-6">
                                <div className="relative text-center text-gray-500 text-xs lg:text-sm mb-4">
                                    <span className="px-2 bg-[#121212]/95">or sign up with</span>
                                </div>
                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-700 rounded-2xl text-white opacity-50 cursor-not-allowed text-sm lg:text-base"
                                        disabled
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Sign up with Google
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-700 rounded-2xl text-white opacity-50 cursor-not-allowed text-sm lg:text-base bg-black/50"
                                        disabled
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                        </svg>
                                        Sign up with Apple
                                    </button>
                                </div>
                            </div>

                            {/* Login Link */}
                            <div className="text-center mt-6">
                                <p className="text-gray-500 text-xs">
                                    Already have an account?{' '}
                                    <a href="/login#" className="text-green-500 hover:text-green-400 transition-colors duration-300 font-medium">
                                        Sign in
                                    </a>
                                </p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <div className="w-16 h-0.5 bg-gray-700 rounded-full" />
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;