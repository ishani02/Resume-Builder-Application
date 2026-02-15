import React from 'react';
import './skin5.css';

const Skin5 = (props) => {    
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

    const skillsList = [skill1, skill2, skill3, skill4, skill5, skill6].filter(Boolean);

    // Helper for graduation date
    const hasGradDate = graduationMonth || graduationYear;

    return (
        <div className="skin5-container">
            {/* Header */}
            <div className="prev-header">
                <div className="name">
                    <div className="fname">{fname}</div>
                    <div className="lname">{lname}</div>
                </div>
                <div className="contacts">
                    <div className="adress">
                        {street && <div className="street">{street}</div>}
                        {city && <div className="city">{city}</div>}
                        {state && <div className="state">{state}</div>}
                        {country && <div className="country">{country}</div>}
                        {pin && <div className="pin">{pin}</div>}
                    </div>
                    {phone && <div className="phone">Ph: {phone}</div>}
                    {email && <div className="email">Email: {email}</div>}
                </div>
            </div>

            {/* Professional Summary */}
            {(profession || summary) && (
                <div className="hsum">
                    <div className="heading">Professional Summary</div>
                    <div className="summary">
                        <div className="profession details">
                            {profession}{profession && summary && " - "}{summary}
                        </div>
                    </div>
                </div>
            )}

            {/* Education */}
            {(degree || collegeName) && (
                <div className="edu">
                    <div className="heading">Education</div>
                    <div className="education-details">
                        {hasGradDate && (
                            <div className="line1">
                                <div className="edu-end">
                                    {graduationMonth && <div className="graduationMonth">{graduationMonth}</div>}
                                    {graduationYear && <div className="graduationYear">{graduationYear}</div>}
                                </div>
                            </div>
                        )}
                        <div className="edu-contact">
                            <div className="course-detail">
                                {degree && <div className="degree">{degree}</div>}
                                {collegeName && <div className="college">: {collegeName}</div>}
                            </div>
                            {educationCity && <div className="educationCity">{educationCity}</div>}
                            {educationState && <div className="educationState">{educationState}</div>}
                        </div>
                        {cgpa && <div className="cgpa">CGPA: {cgpa}</div>}
                    </div>
                </div>
            )}

            {/* Experience */}
            {experience && (
                <div className="exp">
                    <div className="heading">Experience</div>
                    <div className="experience-details">{experience}</div>
                </div>
            )}

            {/* Skills */}
            {skillsList.length > 0 && (
                <div className="skl">
                    <div className="heading">Skills</div>
                    <div className="skills-list">
                        {skillsList.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Skin5;
