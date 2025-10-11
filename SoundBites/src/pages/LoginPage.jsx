import React from 'react';

const Login = () => {
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
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1453090927415-5f45085b65c0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')`,
                            filter: 'brightness(0.4) contrast(1.2)',
                            backgroundPosition: 'center 35%'
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

                {/* Login Content */}
                <div className="relative z-10 w-full flex justify-center items-center p-10 pr-4 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20">
                    {/* Card: tăng kích thước và padding, giữ translate để dịch phải */}
                    <div
                        className="
    bg-[#121212]/95 border border-gray-800 rounded-2xl 
    p-8 sm:p-10 md:p-12 
    w-[85%] sm:w-[360px] md:w-[380px] lg:w-[400px] xl:w-[520px]
    min-h-[95vh]
    flex flex-col justify-center
    backdrop-blur-xl shadow-2xl relative overflow-hidden
    translate-x-0 sm:translate-x-6 md:translate-x-20 lg:translate-x-32 xl:translate-x-80
  "
                    >



                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-shimmer" />

                        {/* Header - giảm cỡ chữ header để cân đối với form */}
                        <div className="text-center mb-8">
                            <div className="mb-4">
                                <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-wider mb-2 drop-shadow-lg  ">
                                    SOUNDBITES
                                </div>
                                <div className="text-green-400 text-xs lg:text-sm tracking-widest uppercase font-medium">
                                    FEEL THE RHYTHM
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
                                Welcome Back
                            </h1>
                            <p className="text-gray-400 text-center mb-6 text-xs lg:text-sm">
                                Sign in to your account
                            </p>

                            <form className="space-y-6">
                                {/* Email Input - giảm py để gọn hơn */}
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
                                            className="form-input w-full pl-14 pr-4 py-4 bg-white/8 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-sm lg:text-base"
                                            placeholder="Enter your email"
                                            required
                                        />
                                        <div className="input-highlight absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-b-xl scale-x-0 transition-transform duration-300 origin-center" />
                                    </div>
                                </div>

                                {/* Password Input - tương tự */}
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
                                            className="form-input w-full pl-14 pr-4 py-4 bg-white/8 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-sm lg:text-base"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <div className="input-highlight absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-b-xl scale-x-0 transition-transform duration-300 origin-center" />
                                    </div>
                                </div>

                                {/* Options - giảm text size */}
                                <div className="flex justify-between items-center text-xs lg:text-sm">
                                    <label className="checkbox-wrapper flex items-center cursor-pointer text-gray-400">
                                        <input type="checkbox" className="checkbox-input sr-only" />
                                        <div className="checkbox-custom w-4 h-4 border-2 border-gray-600 rounded mr-2 relative transition-all duration-300" />
                                        Remember me
                                    </label>
                                    <a href="#" className="text-green-500 hover:text-green-400 transition-colors duration-300">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button - giảm py */}
                                <button
                                    type="submit"
                                    className="submit-button w-full bg-green-500 text-black font-semibold py-4 rounded-2xl hover:bg-green-400 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 relative overflow-hidden group text-sm lg:text-base"
                                >
                                    <span className="button-text relative z-10">Sign In</span>
                                    <div className="button-wave absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full transition-all duration-600 transform -translate-x-1/2 -translate-y-1/2" />
                                </button>
                            </form>

                            {/* Social Login - thêm phần đăng ký Google và Apple */}
                            <div className="mt-6">
                                <div className="relative text-center text-gray-500 text-xs lg:text-sm mb-4">
                                    <span className="px-2 bg-[#121212]/95">or continue with</span>
                                </div>
                                <div className="space-y-6">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-700 rounded-2xl text-white hover:border-green-500 hover:text-green-500 transition-all duration-300 text-sm lg:text-base"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Sign in with Google
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-700 rounded-2xl text-white hover:border-green-500 hover:text-green-500 transition-all duration-300 text-sm lg:text-base bg-black/50"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16.51 8H8.98v1h4.49c.61 0 .96.31 1.08.85L15 12v1h-4.49c-.61 0-.96.31-1.08.85L8 16h7.51v-1h-4.49c-.61 0-.96-.31-1.08-.85L9 14v-1h4.49c.61 0 .96-.31 1.08-.85L16.51 12v-1z" />
                                        </svg>
                                        Sign in with Apple
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Elements - di chuyển xuống dưới */}
                            <div className="flex justify-center items-center gap-4 mt-8">
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

export default Login;