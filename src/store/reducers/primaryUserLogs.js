import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    primaryUserLogs: [],
    loading: true
}

const fetchPrimaryUserLogStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}


const fetchPrimaryUserLogSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        primaryUserLogs: action.primaryUserLogs
    });
}


const fetchPrimaryUserLogFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const documentTypeReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRI_USER_LOG_START: return fetchPrimaryUserLogStart(state, action);
        case actionTypes.FETCH_PRI_USER_LOG_SUCCESS: return fetchPrimaryUserLogSuccess(state, action);
        case actionTypes.FETCH_PRI_USER_LOG_FAIL: return fetchPrimaryUserLogFail(state, action);
        default: return state;
    }
}

export default documentTypeReducer;