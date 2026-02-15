import React, { Component } from 'react';
import "./contact.css";
import Preview from './preview';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { updateEducation } from '../actions/educationActions';
import { saveResumeData } from '../firebase/resumeService';

class Education extends Component {
    state = {  
        contact : this.props.contactDetails,
        education : this.props.educationDetails

    }

    saveTimeout = null;

    scheduleAutoSave = (nextEducation) => {
        const userId = this.props.auth.user?.uid;
        if (!userId) return;
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            saveResumeData(userId, {
                contactDetails: this.props.contactDetails,
                educationDetails: nextEducation || this.state.education,
                skillsDetails: this.props.skillsDetails,
                skinCode: this.props.skinCode
            });
        }, 600);
    }
    onChangeHandler = (e) =>{
        e.preventDefault();
        let key=e.target.id;
        let value=e.target.value;

        this.setState({
            education : {...this.state.education , [key]:value}  
        }, () => {
            this.scheduleAutoSave(this.state.education);
        })
    }

    onSubmitEducationDetails=()=>{
        // save in redux store
        this.props.updateEducationDetails(this.state.education);
        
        // save to firestore if user is logged in
        const userId = this.props.auth.user?.uid;
        if(userId){
            saveResumeData(userId, {
                contactDetails: this.props.contactDetails,
                educationDetails: this.state.education,
                skillsDetails: this.props.skillsDetails,
                skinCode: this.props.skinCode
            });
        }
        
        this.props.history.push("./skills");
    }

    componentDidUpdate(prevProps){
        if (
            prevProps.contactDetails !== this.props.contactDetails ||
            prevProps.educationDetails !== this.props.educationDetails
        ) {
            this.setState({
                contact: this.props.contactDetails,
                education: this.props.educationDetails
            })
        }
    }

    render() { 
        let{contact,education}=this.state;
        return (
          <div className="contact">
        <div className="contact-form">
        <div className="contact-heading">
                <h1>Education Details</h1>
            </div>
        <div className="contact-form-details">
                <div className="input-group">
                    <label htmlFor="">College Name</label>
                    <input type="text" id="collegeName" value={education.collegeName} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="input-group">
                    <label htmlFor="">Degree</label>
                    <input type="text" id="degree" value={education.degree} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="input-group">
                    <label htmlFor="">CGPA</label>
                    <input type="text" id="cgpa" value={education.cgpa} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="input-group">
                    <label htmlFor="">City</label>
                    <input type="text" id="city" value={education.city} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="input-group">
                    <label htmlFor="">State</label>
                    <input type="text" id="state" value={education.state} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="input-group">
                    <label htmlFor="">Graduation Month</label>
                    <input type="text" id="graduationMonth" value={education.graduationMonth} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="input-group full">
                    <label htmlFor="">Graduation Year</label>
                    <input type="text" id="graduationYear" value={education.graduationYear} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="input-group full">
                    <label htmlFor="">Experience</label>
                    <input type="text" id="experience" value={education.experience} onChange={ (e) =>{  this.onChangeHandler(e)  }   }/>
                </div>
                <div className="next full">
                    <button className="btn" onClick={ this.onSubmitEducationDetails }>Next</button>
                </div>
                <div className="back full">
                    <Link to="/contact">
                    <button className="btn">Back</button>
                    </Link>
                </div>
            </div>
          
              </div>
            
              <div className="preview-form">
                  <div className="preview-form-inner">
                      <Preview contact={contact} education={education}></Preview>
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
        updateEducationDetails : (educationDetails) => {dispatch( updateEducation(educationDetails))}
       }
}

export default connect(mapStateToProps,mapDispatchToProps)(Education); 