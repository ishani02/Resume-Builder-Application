const { initialState } = require("./initialState");

export const documentReducer = (state = initialState.document , action) =>{
    if(action.type === "CHANGE_SKIN"){
               return{ 
                    ...state , skinCode : action.skinCode
               }
           }
    else if(action.type==="LOAD_RESUME"){
        // load saved skin from firestore
        if(action.resumeData && action.resumeData.skinCode){
            return{
                ...state,
                skinCode: action.resumeData.skinCode
            };
        }
    }
    else if(action.type==="LOGOUT"){
        // reset to default on logout
        return initialState.document;
    }
    return state;
}