import * as actionTypes from "../types";

const initialState = {
    isDarkMode: false,
    lang: "en",
    error: null, 
    
};


function uiReducer (state = initialState, action)
{
    switch(action.type) {
        case actionTypes.SET_THEME:
            return {
                ...state,
                isDarkMode: action.payload,
            };
            case actionTypes.SET_LANG:
            return {
                ...state,
                lang: action.payload,
            };
            
            case actionTypes.USER_ERROR: 
            return{
                ...state,
                error: action.payload,
            };
            default:
                return{
                    ...state,
                }
    }
}

export default uiReducer;