import * as actionTypes from './actionTypes';
import AppConfig from '../../config/appConfig';
import axios from 'axios';

export const fetchPrimaryUserLogSuccess = (primaryUserLogs) => {
    return {
        type: actionTypes.FETCH_PRI_USER_LOG_SUCCESS,
        primaryUserLogs : primaryUserLogs        
    };
}

export const fetchPrimaryUserLogFail = (error) => {
    return {
        type: actionTypes.FETCH_PRI_USER_LOG_FAIL,
        error: error
    };
}

export const fetchPrimaryUserLogStart = () => {
    return {
        type: actionTypes.FETCH_PRI_USER_LOG_START
    };
}

export const fetchPrimaryUserLogs = (primaryUserLogs) => {
    return dispatch => {
        dispatch(fetchPrimaryUserLogStart());
        let url = AppConfig.API_URL_JAVA +'/api/v1/user/trial/getLoggedPrimaryUsers';
        const body = {
            userId:localStorage.getItem('userId'),
            roleId:parseInt(localStorage.getItem('userRole'))            
        };
        const headers = {
            headers: { "Authorization" : 'Bearer '+localStorage.getItem('accessToken') }
        }
        axios.put(url, body, headers)
            .then(res=>{
                dispatch(fetchPrimaryUserLogSuccess(res.data.resourceData));
            }).catch(err=>{
                dispatch(fetchPrimaryUserLogFail(err));
            });
    }
}

export const fetchTrialUserLogs = (trialUserLogs) => {
    return dispatch => {
        dispatch(fetchPrimaryUserLogStart());
        let url = AppConfig.API_URL_JAVA +'/api/v1/user/trial/getLoggerTrialUsers';
        const body = {
            userId:localStorage.getItem('userId'),
            roleId:parseInt(localStorage.getItem('userRole'))            
        };
        const headers = {
            headers: { "Authorization" : 'Bearer '+localStorage.getItem('accessToken') }
        }
        axios.put(url, body, headers)
            .then(res=>{
                dispatch(fetchPrimaryUserLogSuccess(res.data.resourceData));
            }).catch(err=>{
                dispatch(fetchPrimaryUserLogFail(err));
            });
    }
}

