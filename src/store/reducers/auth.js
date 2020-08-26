import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    accessToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    userMode: 'buyer'
}

const authStart = (state, action) => {
    return updateObject(state,{error:null, loading:true});
}

const authSuccess = (state, action) => {
    return updateObject(state,{
        accessToken: action.accessToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    });
}

const authLogout = (state,action) =>{
    return updateObject(state,{
        accessToken: null,
        userId: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const userSwitchMode = (state, action) => {
    const updatedState = {
        userMode: action.userMode
    };
    return updateObject(state,updatedState);
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.USER_SWITCH_MODE: return userSwitchMode(state, action);
        default:
            return state;
    }
}

export default authReducer;