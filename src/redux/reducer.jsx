import { combineReducers } from 'redux'

const getToken = (state,action) =>{
    switch (action.type){
        case "GET_TOKEN":
            return {token: action.payload.access, refresh_token: action.payload.refresh}
        default: return state;
    }
}


const rootReducer = combineReducers({
    tokens : getToken
});

export default rootReducer;