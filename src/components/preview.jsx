import React from 'react';
import { connect } from "react-redux";
import "./preview.css";
import Skin1 from "./skins/skin1";
import Skin2 from "./skins/skin2";
import Skin5 from "./skins/skin5";
import Skin6 from "./skins/skin6";
import Skin7 from "./skins/skin7";

const Preview = (props) => {
    let skinCode = props.skinCode;
    // use props.skills if passed directly, otherwise use from redux
    let skills = props.skills || props.skillsDetails;
    
    const renderSkin = () => {
        switch(skinCode) {
            case "skin1":
                return <Skin1 contact={props.contact} education={props.education} skills={skills} />;
            case "skin2":
                return <Skin2 contact={props.contact} education={props.education} skills={skills} />;
            case "skin3":
                return <Skin5 contact={props.contact} education={props.education} skills={skills} />;
            case "skin4":
            case "skin5":
            case "skin6":
            case "skin8":
                return <Skin6 contact={props.contact} education={props.education} skills={skills} />;
            case "skin7":
                return <Skin7 contact={props.contact} education={props.education} skills={skills} />;
            default:
                return <Skin2 contact={props.contact} education={props.education} skills={skills} />;
        }
    };

    return (
        <div className="resume-page">
            {renderSkin()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        skinCode: state.document.skinCode,
        skillsDetails: state.skillsDetails
    }
}

export default connect(mapStateToProps)(Preview);
