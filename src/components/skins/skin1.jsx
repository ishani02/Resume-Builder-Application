import React from "react";
import "./skin1.css";

const Skin1 = (props) => {
    const {
        fname = "",
        lname = "",
        summary = "",
        email = "",
        phone = "",
        profession = "",
        street = "",
        city = "",
        state = "",
        country = "",
        pin = "",
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

    // Get array of skills that have values
    const skillsList = [skill1, skill2, skill3, skill4, skill5, skill6].filter(Boolean);

    // Helper to join address parts with commas
    const addressParts = [street, city, state, pin, country].filter(Boolean);
    const address = addressParts.join(", ");

    // Helper for graduation date
    const gradDate = [graduationMonth, graduationYear].filter(Boolean).join(" ");

    return (
        <div className="skin1-container">
            {/* Header */}
            <div className="contact-details-skin1" style={{paddingBottom: '20px'}}>
                <div className="contact-full-name">
                    {fname} {lname}
                </div>
                {profession && <div className="profession-details">{profession}</div>}
                <div className="email-phone">
                    {email && <div className="email-details">{email}</div>}
                    {phone && <div className="phone-details">{phone}</div>}
                </div>
                {address && <div className="address-details">{address}</div>}
            </div>

            {/* Professional Summary */}
            {summary && (
                <div className="professional-summary-skin1">
                    <div className="professional-summary-heading">Professional Summary</div>
                    <div className="professional-summary-details">{summary}</div>
                </div>
            )}

            {/* Education */}
            {(degree || collegeName) && (
                <div className="education-details-skin1">
                    <div className="education-details-heading">Education</div>
                    <div className="education-details">
                        {degree && (
                            <div className="education-details-degree">
                                {degree}{cgpa && ` | GPA: ${cgpa}`}
                            </div>
                        )}
                        <div className="education-details-name">
                            {[collegeName, educationCity, educationState].filter(Boolean).join(", ")}
                            {gradDate && ` | ${gradDate}`}
                        </div>
                    </div>
                </div>
            )}

            {/* Experience */}
            {experience && (
                <div className="experience-details-skin1">
                    <div className="experience-details-heading">Experience</div>
                    <div className="experience-details">{experience}</div>
                </div>
            )}

            {/* Skills */}
            {skillsList.length > 0 && (
                <div className="skills-details-skin1">
                    <div className="skills-details-heading">Skills</div>
                    <div className="skills-list">
                        {skillsList.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skin1;
