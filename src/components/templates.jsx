import React, { Component } from 'react';
import { connect } from "react-redux";
import { skinCodes } from "../Constants/skinCodes";
import "./templates.css";
import { updateSkin } from '../actions/documentActions';
import { saveResumeData } from '../firebase/resumeService';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class Templates extends Component {
    state = { 
        skinCode: this.props.skinCode
    }

    handleSkinSelect = (skinCode) => {
        this.props.changeSkinCode(skinCode);
        
        // save skin selection to firestore
        const userId = this.props.auth.user?.uid;
        if(userId){
            saveResumeData(userId, {
                contactDetails: this.props.contactDetails,
                educationDetails: this.props.educationDetails,
                skillsDetails: this.props.skillsDetails,
                skinCode: skinCode
            });
        }
        
        this.props.history.push("/contact");
    }

    componentDidMount() {
        console.log("inside mount", this.props.skinCode);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            skinCode: newProps.skinCode
        });
    }

    render() {
        let { skinCode } = this.state;
        
        return (
            <div className="templates-page">
                {/* Hero Section */}
                <section className="templates-hero">
                    <div className="hero-content">
                        <span className="hero-badge">Step 1 of 3</span>
                        <h1>Choose Your Template</h1>
                        <p>Select a professional template that best represents your career goals</p>
                    </div>
                </section>

                {/* How It Works */}
                <section className="how-it-works">
                    <h2>How It Works</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div className="step-icon">
                                <i className="fas fa-palette"></i>
                            </div>
                            <h3>Choose Template</h3>
                            <p>Pick from our collection of professional, ATS-friendly templates</p>
                        </div>
                        <div className="step-arrow">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div className="step-icon">
                                <i className="fas fa-edit"></i>
                            </div>
                            <h3>Fill Your Details</h3>
                            <p>Enter your information with real-time preview on the side</p>
                        </div>
                        <div className="step-arrow">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div className="step-icon">
                                <i className="fas fa-download"></i>
                            </div>
                            <h3>Download PDF</h3>
                            <p>Get your polished resume ready to send to employers</p>
                        </div>
                    </div>
                </section>

                {/* Templates Slider */}
                <section className="templates-section">
                    <div className="section-header">
                        <h2>Professional Templates</h2>
                        <p>Swipe through our templates and click to select</p>
                    </div>
                    
                    <div className="templates-slider-container">
                        <Slider
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={3}
                            slidesToScroll={1}
                            centerMode={true}
                            centerPadding="0px"
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 2,
                                        centerMode: false
                                    }
                                },
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 1,
                                        centerMode: true
                                    }
                                }
                            ]}
                        >
                            {skinCodes.map((skin) => {
                                const isSelected = skin.value === skinCode;
                                return (
                                    <div key={skin.id} className="slide-wrapper">
                                        <div 
                                            className={`template-card ${isSelected ? 'selected' : ''}`}
                                            onClick={() => this.handleSkinSelect(skin.value)}
                                        >
                                            <div className="template-preview">
                                                <img src={`/images/${skin.value}.svg`} alt={`Template ${skin.id}`} />
                                                <div className="template-overlay">
                                                    <button className="use-template-btn">
                                                        <i className="fas fa-check"></i>
                                                        Use This Template
                                                    </button>
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div className="template-info">
                                                    <span className="selected-badge">Selected</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </section>

                {/* Tips Section */}
                <section className="tips-section">
                    <div className="tips-content">
                        <div className="tips-icon">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <div className="tips-text">
                            <h3>Pro Tip</h3>
                            <p>Choose a clean, simple template for corporate jobs. Creative templates work great for design and marketing roles.</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        skinCode: state.document.skinCode,
        contactDetails: state.contactDetails,
        educationDetails: state.educationDetails,
        skillsDetails: state.skillsDetails,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSkinCode: (skinCode) => { dispatch(updateSkin(skinCode)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
