import React from "react";
import "./skin2.css";

const Skin2 = (props) => {
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

    const skillsList = [skill1, skill2, skill3, skill4, skill5, skill6].filter(Boolean);

    // Get initials
    const initials = `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
    
    // Helper for address
    const addressParts = [street, city, pin, state].filter(Boolean);
    const address = addressParts.join(", ");

    // Helper for graduation date
    const gradDate = [graduationMonth, graduationYear].filter(Boolean).join(" ");

    return (
        <div className="skin2-container">
            {/* Header */}
            <div className="contact-details-skin2">
                <div className="contact-details-name-s2">
                    <div className="contact-details-logo-s2">{initials}</div>
                    <div className="contact-details-info-s2">
                        <div className="contact-details-fullName-s2">
                            {fname} {lname}
                        </div>
                        {profession && (
                            <div className="contact-details-profession-s2">{profession}</div>
                        )}
                    </div>
                </div>
                <div className="contact-details-email-phone-s2">
                    {address && <div className="contact-details-address-s2">{address}</div>}
                    {phone && <div className="contact-details-phone-s2">{phone}</div>}
                    {email && <div className="contact-details-email-s2">{email}</div>}
                </div>
            </div>

            {/* Professional Summary */}
            {summary && (
                <div className="professional-summary-skin2">
                    <div className="professional-summary-heading-s2">Professional Summary</div>
                    <div className="professional-summary-details-s2">{summary}</div>
                </div>
            )}

            {/* Education */}
            {(degree || collegeName) && (
                <div className="education-details-skin2">
                    <div className="education-details-heading-s2">Education</div>
                    <div className="education-details-s2">
                        {degree && (
                            <div className="education-details-degree-s2">
                                {degree}{cgpa && ` | GPA: ${cgpa}`}
                            </div>
                        )}
                        <div className="education-details-name-s2">
                            {[collegeName, educationCity, educationState].filter(Boolean).join(", ")}
                            {gradDate && ` | ${gradDate}`}
                        </div>
                    </div>
                </div>
            )}

            {/* Experience */}
            {experience && (
                <div className="experience-details-skin2">
                    <div className="experience-details-heading-s2">Experience</div>
                    <div className="experience-details-s2">{experience}</div>
                </div>
            )}

            {/* Skills */}
            {skillsList.length > 0 && (
                <div className="skills-details-skin2">
                    <div className="skills-details-heading-s2">Skills</div>
                    <div className="skills-list-s2">
                        {skillsList.map((skill, index) => (
                            <span key={index} className="skill-tag-s2">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skin2;
