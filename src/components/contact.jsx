import React, { Component } from 'react';
import "./contact.css";
import Preview from './preview';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateContact} from "../actions/contactActions";
import {saveResumeData} from "../firebase/resumeService";


class Contact extends Component {
    state = { 
       contact:this.props.contactDetails,
       education:this.props.educationDetails
     }

    saveTimeout = null;

    scheduleAutoSave = (nextContact) => {
      const userId = this.props.auth.user?.uid;
      if (!userId) return;
      if (this.saveTimeout) clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(() => {
        saveResumeData(userId, {
          contactDetails: nextContact || this.state.contact,
          educationDetails: this.props.educationDetails,
          skillsDetails: this.props.skillsDetails,
          skinCode: this.props.skinCode
        });
      }, 600);
    }

    onChangeHandler=(e)=>{//e is event naam ka object which we get from input
        e.preventDefault();//hmesha likho ,for e, taaki reload na ho page, to prevent default action of buttons
        // console.log(e.target);
        let id=e.target.id;
        let value=e.target.value;

        this.setState({//to store new value at a given id
            contact: {...this.state.contact, [id]:value}//... se purana jo bhi store hoga uss key mei(purani state le aayega) ,wo aayega nd value se uss id pe new value add hogi, [id] means uski value utha lega or uski key bnalega
        }, () => {
          this.scheduleAutoSave(this.state.contact);
        })
    }

    onSubmitContactDetails=()=>{
      // update redux store
      this.props.updateContactDetails(this.state.contact);

      // save to firestore if user is logged in
      const userId = this.props.auth.user?.uid;
      if(userId){
          saveResumeData(userId, {
              contactDetails: this.state.contact,
              educationDetails: this.props.educationDetails,
              skillsDetails: this.props.skillsDetails,
              skinCode: this.props.skinCode
          });
      }

      // navigate to education page
      this.props.history.push("/education");
}
 componentDidMount(){
  console.log("inside component did mount !!!");
  console.log(this.props);
}

componentDidUpdate(prevProps){//this func changes state finally i.e. next time jb details daalenge to ye updated state pdi hogi already
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
        let {contact,education}=this.state;
        return (
            <div className="contact">
               <div className="contact-form">
                 <div className="contact-heading">
                     <h1>Personal Details</h1>
                 </div>
                 <div className="contact-form-details">
               <div className="input-group">
                 <label htmlFor="">First Name</label>
                 <input type="text" id="fname" value={contact.fname}  onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">Last Name</label>
                 <input type="text" id="lname" value={contact.lname} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group full">
                 <label htmlFor="">Professional Summary</label>
                 <input type="text" id="summary" value={contact.summary} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">Email</label>
                 <input type="text" id="email" value={contact.email} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">Phone</label>
                 <input type="text" id="phone" value={contact.phone} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">Profession</label>
                 <input type="text" id="profession" value={contact.profession} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">Street</label>
                 <input type="text" id="street" value={contact.street} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">City</label>
                 <input type="text" id="city" value={contact.city} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">State</label>
                 <input type="text" id="state" value={contact.state} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">Country</label>
                 <input type="text" id="country" value={contact.country} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="input-group">
                 <label htmlFor="">Pin Code</label>
                 <input type="text" id="pin" value={contact.pin} onChange={(e)=>{this.onChangeHandler(e)}}/>
               </div>
               <div className="next full">
                  <button className="btn" onClick={this.onSubmitContactDetails} >Next</button>
               </div>
               <div className="back full">
                   <Link to="/templates">
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

 
const mapStateToProps=(state) =>{
    return{
        contactDetails : state.contactDetails,
        educationDetails : state.educationDetails,
        skillsDetails : state.skillsDetails,
        skinCode : state.document.skinCode,
        auth : state.auth
    }
}


const mapDispatchToProps =(dispatch) =>{
  return{
    updateContactDetails: (contactDetails)=>{ dispatch( updateContact(contactDetails))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);