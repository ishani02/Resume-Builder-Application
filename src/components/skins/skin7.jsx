import React from 'react';
import "./skin7.css";

const Skin7 = (props) => {
    const {
        fname = "",
        lname = "",
        phone = "",
        email = "",
        city = "",
        state = "",
        street = "",
        country = "",
        pin = "",
        profession = "",
        summary = "",
    } = props.contact || {};

    const {
        cgpa = "",
        city: educationCity = "",
        state: educationState = "",
        degree = "",
        collegeName = "",
        graduationMonth = "",
        graduationYear = "",
        experience = "",
    } = props.education || {};

    const {
        skill1 = "",
        skill2 = "",
        skill3 = "",
        skill4 = "",
        skill5 = "",
        skill6 = "",
    } = props.skills || {};

    const skillsList = [skill1, skill2, skill3, skill4, skill5, skill6].filter(Boolean);

    // Build contact line
    const contactParts = [phone, email, [street, city, state, country, pin].filter(Boolean).join(" ")].filter(Boolean);
    const contactLine = contactParts.join(" | ");

    return (
        <div className="skin7-container">
            {/* Header */}
            <div className="skin-header">
                <div className="name"><b>{fname} {lname}</b></div>
                {contactLine && <div className="address">{contactLine}</div>}
            </div>

            {/* Professional Summary */}
            {(profession || summary) && (
                <div className="professional-summary">
                    <div className="profession-summary-heading"><b>Professional Summary</b></div>
                    <div className="profession-description">
                        {profession && <div className="profession-details">{profession}</div>}
                        {summary && <div className="profession-summary">{summary}</div>}
                    </div>
                </div>
            )}

            {/* Experience */}
            {experience && (
                <div className="experience">
                    <div className="experience-heading"><b>Experience</b></div>
                    <div className="experience-description">
                        <li>{experience}</li>
                    </div>
                </div>
            )}

            {/* Education */}
            {(degree || collegeName) && (
                <div className="Education">
                    <div className="education-heading"><b>Education</b></div>
                    <div className="education-description">
                        <div className="degree">
                            {degree && <b>{degree}</b>}
                            {collegeName && <li>{collegeName}</li>}
                            {(graduationMonth || graduationYear) && (
                                <li>{[graduationMonth, graduationYear].filter(Boolean).join(" ")}</li>
                            )}
                            {(educationCity || educationState) && (
                                <li>{[educationCity, educationState].filter(Boolean).join(", ")}</li>
                            )}
                            {cgpa && <li>CGPA: {cgpa}</li>}
                        </div>
                    </div>
                </div>
            )}

            {/* Skills */}
            {skillsList.length > 0 && (
                <div className="skills">
                    <div className="skills-heading"><b>Skills</b></div>
                    <div className="skills-list">
                        {skillsList.map((skill, index) => (
                            <span key={index} className="skill-item">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Skin7;
