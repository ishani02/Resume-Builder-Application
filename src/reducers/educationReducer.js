const { initialState } = require("./initialState");

export const educationReducer=(state=initialState.educationDetails, action) =>{
if(action.type=="UPDATE_EDUCATION"){
    return{
        ...action.educationDetails
    }
}
else if(action.type=="LOAD_RESUME"){
    // load saved education details from firestore
    if(action.resumeData && action.resumeData.educationDetails){
        return{
            ...action.resumeData.educationDetails
        };
    }
}
else if(action.type=="LOGOUT"){
    // clear data on logout
    return initialState.educationDetails;
}

return state;
}