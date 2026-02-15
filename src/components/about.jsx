import React from 'react';
import "./about.css";
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <h1>About ResumeBuilder</h1>
                <p>Helping job seekers land their dream jobs since 2020</p>
            </section>

            {/* Mission Section */}
            <section className="about-mission">
                <div className="mission-content">
                    <div className="mission-text">
                        <span className="section-label">Our Mission</span>
                        <h2>Making professional resumes accessible to everyone</h2>
                        <p>
                            We believe that everyone deserves a chance to present themselves professionally. 
                            Our free resume builder eliminates the barriers between talented individuals and 
                            their dream careers by providing beautiful, ATS-friendly templates.
                        </p>
                        <p>
                            Whether you're a fresh graduate or an experienced professional, our platform 
                            helps you create a resume that truly represents your potential.
                        </p>
                    </div>
                    <div className="mission-image">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Team collaboration" />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values">
                <span className="section-label">Our Values</span>
                <h2>What drives us every day</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-heart"></i>
                        </div>
                        <h3>User First</h3>
                        <p>Every feature we build starts with understanding your needs and challenges</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-lock"></i>
                        </div>
                        <h3>Privacy Focused</h3>
                        <p>Your personal information stays secure and is never shared with third parties</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-gift"></i>
                        </div>
                        <h3>Always Free</h3>
                        <p>Core features remain free forever because opportunity shouldn't have a price tag</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h3>Continuous Improvement</h3>
                        <p>We're constantly adding new templates and features based on your feedback</p>
                    </div>
                </div>
            </section>

            {/* Features Highlight Section */}
            <section className="about-stats">
                <div className="stat-box">
                    <span className="stat-num">ATS</span>
                    <span className="stat-text">Friendly Templates</span>
                </div>
                <div className="stat-box">
                    <span className="stat-num">100%</span>
                    <span className="stat-text">Free to Use</span>
                </div>
                <div className="stat-box">
                    <span className="stat-num">PDF</span>
                    <span className="stat-text">Instant Download</span>
                </div>
                <div className="stat-box">
                    <span className="stat-num">Easy</span>
                    <span className="stat-text">Step-by-Step Builder</span>
                </div>
            </section>

            {/* Contact Section */}
            <section className="about-contact">
                <div className="contact-card">
                    <div className="contact-icon">
                        <i className="fas fa-envelope"></i>
                    </div>
                    <h2>Have questions?</h2>
                    <p>Our team is here to help you with any questions about our resume builder.</p>
                    <a href="mailto:support@resumebuilder.com" className="contact-email">
                        support@resumebuilder.com
                    </a>
                    <p className="response-time">
                        <i className="fas fa-clock"></i>
                        We typically respond within 24 hours
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <h2>Ready to create your professional resume?</h2>
                <p>Build a polished resume in just a few minutes</p>
                <Link to="/templates">
                    <button className="cta-button">
                        Start Building Now
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </Link>
            </section>
        </div>
    );
}

export default About;
