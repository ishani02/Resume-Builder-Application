import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Preview from './preview';
import "./finalize.css";
import { skinCodes } from "../Constants/skinCodes";
import { updateSkin } from "../actions/documentActions";
import { saveResumeData } from '../firebase/resumeService';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


class Finalize extends Component {
    state = { 
        contact: this.props.contact,
        education: this.props.education,
        skills: this.props.skills,
        skinCode: this.props.skinCode
    };

    handleSkinSelect = (skinCode) => {
        this.props.changeSkinCode(skinCode);
        
        // save skin change to firestore
        const userId = this.props.auth.user?.uid;
        if(userId){
            saveResumeData(userId, {
                contactDetails: this.props.contact,
                educationDetails: this.props.education,
                skillsDetails: this.props.skills,
                skinCode: skinCode
            });
        }
    }

    handleDownloadPdf = () => {
        const element = this.previewRef;
        if (!element) return;

        html2canvas(element, {
            scale: 1,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: '#ffffff'
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });
            
            // A4 dimensions in points
            const pdfWidth = 595.28;
            const pdfHeight = 841.89;
            
            // Add image to fill the entire page
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('MyResume.pdf');
        });
    }
  
    componentDidUpdate(prevProps) {
        if (
            prevProps.skinCode !== this.props.skinCode ||
            prevProps.contact !== this.props.contact ||
            prevProps.education !== this.props.education ||
            prevProps.skills !== this.props.skills
        ) {
            this.setState({
                skinCode: this.props.skinCode,
                contact: this.props.contact,
                education: this.props.education,
                skills: this.props.skills
            });
        }
    }
    
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
    
        let { contact, education, skills, skinCode } = this.state;

        return (
            <div className="finalize">
                {/* Left Side - Resume Preview */}
                <div className="finalize-left">
                    <div className="preview-header">
                        <h2>Your Resume Preview</h2>
                        <p>This is how your resume will look when downloaded</p>
                    </div>
                    <div className="preview-wrapper">
                        <div className="final-preview" ref={(el) => this.previewRef = el}>
                            <Preview contact={contact} education={education} skills={skills}></Preview>
                        </div>
                    </div>
                </div>

                {/* Right Side - Actions & Templates */}
                <div className="finalize-right">
                    {/* Download Section */}
                    <div className="download-section">
                        <div className="download-icon">
                            <i className="fas fa-file-pdf"></i>
                        </div>
                        <h3>Ready to download?</h3>
                        <p>Your resume is ready! Download it as a PDF file.</p>
                        <button className="download-btn" onClick={this.handleDownloadPdf}>
                            <i className="fas fa-download"></i>
                            Download PDF
                        </button>
                        <Link to="/skills" className="back-link">
                            <button className="back-btn">
                                <i className="fas fa-arrow-left"></i>
                                Edit Details
                            </button>
                        </Link>
                    </div>

                    {/* Template Selector */}
                    <div className="template-section">
                        <h3>Change Template</h3>
                        <p>Not happy? Pick a different style</p>
                        <div className="templates-slider">
                            <Slider {...settings}>
                                {skinCodes.map((skin) => {
                                    let isSelected = skin.value === skinCode ? "selected" : "";
                                    return (
                                        <div className="slide-item" key={skin.id}>
                                            <div className={`template-card ${isSelected}`}>
                                                <img src={`/images/${skin.value}.svg`} alt={skin.value} />
                                                <button 
                                                    className="use-btn" 
                                                    onClick={() => this.handleSkinSelect(skin.value)}
                                                >
                                                    {isSelected ? "Selected" : "Use This"}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        contact: state.contactDetails,
        education: state.educationDetails,
        skills: state.skillsDetails,
        skinCode: state.document.skinCode,
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSkinCode: (skinCode) => { dispatch(updateSkin(skinCode)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finalize);
