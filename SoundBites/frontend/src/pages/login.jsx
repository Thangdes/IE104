import React from 'react';
import '../styles/login.css';



const Login = () => {
    return (
        <div className="login-container">
            <div className="background-wrapper">
                <div className="background-image"></div>
                <div className="background-overlay"></div>

                {/* Hiệu ứng particles âm nhạc */}
                <div className="music-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            </div>

            <div className="login-content">
                <div className="login-card">
                    {/* Header với logo */}
                    <div className="login-header">
                        <div className="logo-wrapper">
                            <div className="logo-main">SOUNDBITES</div>
                            <div className="logo-subtitle">FEEL THE RHYTHM</div>
                        </div>
                        <div className="decoration-wave">
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                        </div>
                    </div>

                    {/* Form section */}
                    <div className="form-section">
                        <h1 className="welcome-title">Welcome Back</h1>
                        <p className="welcome-subtitle">Sign in to your account</p>

                        <form className="login-form">
                            {/* Email Input với icon */}
                            <div className="input-container">
                                <label className="input-label">Email address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <div className="input-highlight"></div>
                                </div>
                            </div>

                            {/* Password Input với icon */}
                            <div className="input-container">
                                <label className="input-label">Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                    </svg>
                                    <input
                                        type="password"
                                        className="form-input"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <div className="input-highlight"></div>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="form-options">
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" className="checkbox-input" />
                                    <span className="checkbox-custom"></span>
                                    <span className="checkbox-label">Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="submit-button">
                                <span className="button-text">Sign In</span>
                                <div className="button-wave"></div>
                            </button>
                        </form>

                        {/* Decorative Elements */}
                        <div className="form-decoration">
                            <div className="decoration-dot"></div>
                            <div className="decoration-line"></div>
                            <div className="decoration-dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;