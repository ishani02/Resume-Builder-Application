import React from 'react';
import "./header.css";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../firebase/fbconfig';



const handleLogout = (logout) =>{
  auth.signOut().then(()=>{
    logout();
  })
    
}
const Header = (props) => {
    let {auth} = props;
    return ( 
        <div className="header">
            <Link to="/" className="header-logo">
                <img src="https://cdn-icons-png.flaticon.com/512/909/909212.png" alt="ResumeBuilder"/>
                <span className="header-brand">ResumeBuilder</span>
            </Link>
            <nav className="header-links">
                {auth ? (
                    <ul>
                        <li><Link to="/templates">Templates</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/" onClick={() => handleLogout(props.logout)}>Logout</Link></li>
                    </ul>
                ) : (
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                        <li><Link to="/register"><button className="btn">Get Started</button></Link></li>
                    </ul>
                )}
            </nav>
        </div>
    );
}
 
const mapStateToProps=(state)=>{
    return{
        auth: state.auth.isAuth
    }
}
 

const mapDispatchToProps = (dispatch) =>{
    return{
        logout : () =>{ dispatch( {type:"LOGOUT"}  )}
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Header); 
