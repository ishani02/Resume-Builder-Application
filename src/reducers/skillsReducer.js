const { initialState } = require("./initialState");

export const skillsReducer=(state=initialState.skillsDetails, action) =>{
if(action.type==="UPDATE_SKILLS"){
    return{
        ...action.skillsDetails
    }
}
else if(action.type==="LOAD_RESUME"){
    // load saved skills from firestore
    if(action.resumeData && action.resumeData.skillsDetails){
        return{
            ...action.resumeData.skillsDetails
        };
    }
}
else if(action.type==="LOGOUT"){
    // clear data on logout
    return initialState.skillsDetails;
}

return state;
}
