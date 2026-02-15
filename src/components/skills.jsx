import React, { Component } from 'react';
import "./contact.css";
import Preview from './preview';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { updateSkills } from '../actions/skillsActions';
import { saveResumeData } from '../firebase/resumeService';

class Skills extends Component {
    state = {  
        contact : this.props.contactDetails,
        education : this.props.educationDetails,
        skills : this.props.skillsDetails
    }

    saveTimeout = null;

    scheduleAutoSave = (nextSkills) => {
        const userId = this.props.auth.user?.uid;
        if (!userId) return;
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            saveResumeData(userId, {
                contactDetails: this.props.contactDetails,
                educationDetails: this.props.educationDetails,
                skillsDetails: nextSkills || this.state.skills,
                skinCode: this.props.skinCode
            });
        }, 600);
    }

    onChangeHandler = (e) =>{
        e.preventDefault();
        let key=e.target.id;
        let value=e.target.value;

        this.setState({
            skills : {...this.state.skills , [key]:value}  
        }, () => {
            this.scheduleAutoSave(this.state.skills);
        })
    }

    onSubmitSkillsDetails=()=>{
        // save in redux store
        this.props.updateSkillsDetails(this.state.skills);
        
        // save to firestore if user is logged in
        const userId = this.props.auth.user?.uid;
        if(userId){
            saveResumeData(userId, {
                contactDetails: this.props.contactDetails,
                educationDetails: this.props.educationDetails,
                skillsDetails: this.state.skills,
                skinCode: this.props.skinCode
            });
        }
        
        this.props.history.push("./finalize");
    }

    componentDidUpdate(prevProps){
        if (
            prevProps.contactDetails !== this.props.contactDetails ||
            prevProps.educationDetails !== this.props.educationDetails ||
            prevProps.skillsDetails !== this.props.skillsDetails
        ) {
            this.setState({
                contact: this.props.contactDetails,
                education: this.props.educationDetails,
                skills: this.props.skillsDetails
            })
        }
    }

    render() { 
        let{contact,education,skills}=this.state;
        return (
          <div className="contact">
            <div className="contact-form">
                <div className="contact-heading">
                    <h1>Skills</h1>
                </div>
                <div className="contact-form-details">
                    <div className="input-group">
                        <label htmlFor="">Skill 1</label>
                        <input type="text" id="skill1" value={skills.skill1} onChange={(e) => this.onChangeHandler(e)} placeholder="e.g. JavaScript"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Skill 2</label>
                        <input type="text" id="skill2" value={skills.skill2} onChange={(e) => this.onChangeHandler(e)} placeholder="e.g. React.js"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Skill 3</label>
                        <input type="text" id="skill3" value={skills.skill3} onChange={(e) => this.onChangeHandler(e)} placeholder="e.g. Node.js"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Skill 4</label>
                        <input type="text" id="skill4" value={skills.skill4} onChange={(e) => this.onChangeHandler(e)} placeholder="e.g. Python"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Skill 5</label>
                        <input type="text" id="skill5" value={skills.skill5} onChange={(e) => this.onChangeHandler(e)} placeholder="e.g. SQL"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Skill 6</label>
                        <input type="text" id="skill6" value={skills.skill6} onChange={(e) => this.onChangeHandler(e)} placeholder="e.g. Git"/>
                    </div>
                    <div className="next full">
                        <button className="btn" onClick={this.onSubmitSkillsDetails}>Next</button>
                    </div>
                    <div className="back full">
                        <Link to="/education">
                            <button className="btn">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="preview-form">
                <div className="preview-form-inner">
                    <Preview contact={contact} education={education} skills={skills}></Preview>
                </div>
            </div>
          </div>
        );
    }
}
 
const mapStateToProps = (state) =>{
    return {
        contactDetails : state.contactDetails,
        educationDetails : state.educationDetails,
        skillsDetails : state.skillsDetails,
        skinCode : state.document.skinCode,
        auth : state.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateSkillsDetails : (skillsDetails) => {dispatch( updateSkills(skillsDetails))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Skills);
