import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
// import {createStore , applyMiddleware , compose } from "redux";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {myReducer} from "./reducers/myReducer";
import { auth } from "./firebase/fbconfig";
import { loadResumeData } from "./firebase/resumeService";
// import thunk from 'redux-thunk';


const store = createStore(myReducer);

// restore auth session and load saved resume data
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userDetails = {
      uid: user.uid,
      displayName: user.displayName || user.email,
      email: user.email
    };
    store.dispatch({ type: "LOGIN", userDetails: userDetails });
    const resumeData = await loadResumeData(user.uid);
    if (resumeData) {
      store.dispatch({ type: "LOAD_RESUME", resumeData: resumeData });
    }
  } else {
    store.dispatch({ type: "LOGOUT" });
  }
});


ReactDOM.render( <Provider store={store}><Router> <App /> </Router></Provider>  ,document.getElementById('root'));


