import React, { useState } from 'react';
import "./register.css";
import { connect } from "react-redux";
import { auth, provider } from '../firebase/fbconfig';
import { Link } from 'react-router-dom';
import { loadResumeData, saveUserProfile } from '../firebase/resumeService';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleGoogleSignup = () => {
        auth.signInWithPopup(provider)
            .then(async (user) => {
                let { uid, displayName, email } = user.user;
                let userDetails = { uid, displayName, email };
                props.login(userDetails);
                saveUserProfile(userDetails);
                
                // check if user has any saved resume data
                const resumeData = await loadResumeData(uid);
                if(resumeData){
                    props.loadResume(resumeData);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleEmailSignup = (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                let { uid, displayName, email } = user.user;
                let userDetails = { uid, displayName: displayName || email, email };
                props.login(userDetails);
                saveUserProfile(userDetails);
                // new user, no resume data to load
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="register-page">
            <div className="register-container">
                {/* Left Side - Branding */}
                <div className="register-brand-section">
                    <div className="brand-content">
                        <div className="brand-icon">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h2>Start Your Journey</h2>
                        <p>Create your professional resume in minutes</p>
                        <div className="brand-features">
                            <div className="brand-feature">
                                <i className="fas fa-check"></i>
                                <span>Professional Templates</span>
                            </div>
                            <div className="brand-feature">
                                <i className="fas fa-check"></i>
                                <span>100% Free to Use</span>
                            </div>
                            <div className="brand-feature">
                                <i className="fas fa-check"></i>
                                <span>Instant PDF Download</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="register-form-section">
                    <div className="register-header">
                        <h1>Create an account</h1>
                        <p>Get started with your free account today</p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button className="btn-google" onClick={handleGoogleSignup}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign up with Google
                    </button>

                    <div className="divider">
                        <span>or register with email</span>
                    </div>

                    <form onSubmit={handleEmailSignup} className="register-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="terms">
                            <label className="terms-checkbox">
                                <input type="checkbox" required />
                                <span>
                                    I agree to the{" "}
                                    <button type="button" className="link-button">Terms of Service</button>
                                    {" "}and{" "}
                                    <button type="button" className="link-button">Privacy Policy</button>
                                </span>
                            </label>
                        </div>

                        <button type="submit" className="btn-register">
                            Create Account
                        </button>
                    </form>

                    <p className="signin-link">
                        Already have an account? <Link to="/signin">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userDetails) => { dispatch({ type: "LOGIN", userDetails: userDetails }) },
        loadResume: (resumeData) => { dispatch({ type: "LOAD_RESUME", resumeData: resumeData }) }
    };
};

export default connect(null, mapDispatchToProps)(Register);
