import React from 'react';
import "./landingpage.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const Landing = (props) => {
    const { auth } = props;
    
    // Redirect destination based on auth state
    const ctaLink = auth ? "/templates" : "/register";
    
    return (
        <div className="landing">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-badge">Free Resume Builder</span>
                    <h1 className="hero-title">
                        Build a resume that <span className="gradient-text">lands interviews</span>
                    </h1>
                    <p className="hero-subtitle">
                        Create a professional resume in minutes with our easy-to-use builder. 
                        Choose from beautiful templates and download your resume instantly.
                    </p>
                    <div className="hero-cta">
                        <Link to={ctaLink}>
                            <button className="btn-primary-lg">
                                {auth ? "Create My Resume" : "Get Started Free"}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </Link>
                        <span className="hero-note">No credit card required</span>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80" alt="Professional Resume"/>
                    <div className="hero-image-decoration"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why choose ResumeBuilder?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <path d="M3 9h18"/>
                            </svg>
                        </div>
                        <h3>Professional Templates</h3>
                        <p>Choose from ATS-friendly templates designed by HR professionals</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                            </svg>
                        </div>
                        <h3>Easy to Use</h3>
                        <p>Fill in your details and see your resume come to life in real-time</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                            </svg>
                        </div>
                        <h3>Instant Download</h3>
                        <p>Download your polished resume as a PDF ready to send to employers</p>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="stats-section">
                <div className="stat-item">
                    <span className="stat-number">ATS</span>
                    <span className="stat-label">Friendly Templates</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Free to Use</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">PDF</span>
                    <span className="stat-label">Instant Download</span>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to build your professional resume?</h2>
                <p>Create a polished resume in just a few minutes</p>
                <Link to={ctaLink}>
                    <button className="btn-primary-lg">
                        {auth ? "Go to Templates" : "Get Started Free"}
                    </button>
                </Link>
            </section>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isAuth
    };
};

export default connect(mapStateToProps)(Landing);
