const { initialState } = require("./initialState");

export const contactReducer=(state=initialState.contactDetails,action)=>{
   if(action.type=="UPDATE_CONTACT"){
       return{
           ...action.contactDetails,
       };
   }
   else if(action.type=="LOAD_RESUME"){
       // load saved contact details from firestore
       if(action.resumeData && action.resumeData.contactDetails){
           return{
               ...action.resumeData.contactDetails
           };
       }
   }
   else if(action.type=="LOGOUT"){
       // clear data on logout
       return initialState.contactDetails;
   }
   return state;
};