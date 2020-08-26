import axios from 'axios';
import AppConfig from '../../config/appConfig';
import * as actionTypes from './actionTypes';

export const  authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    };
};

export const  authSuccess = (accessToken, userId) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        accessToken: accessToken,
        userId: userId
    };
};

export const  authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = () =>{
    return dispatch =>{
        axios.delete(AppConfig.API_URL_JAVA +'/userauth/oauth/revokeToken/'+localStorage.getItem('userRole')+'/'+localStorage.getItem('userId'),
           { headers: { "Authorization" : 'Bearer '+localStorage.getItem('accessToken'),
                        "Content-Type": "application/json",
                        "Accept": "application/json" }
        })
        .then(res => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('userRole');
            dispatch(logout());
        })
        .catch(err =>{
        })
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout());
        },expirationTime* 1000);
    }
}

export const auth = (userName, password, roleId, hostName, timeZone, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());
        const queryParams = '?grant_type=password&username='+userName+'&password='+password+'&roleId='+roleId+'&host='+hostName+'&tz='+timeZone;
        const authData = {
           
        }
        let url = AppConfig.API_URL_JAVA +'/userauth/oauth/token';
        axios.post(url+queryParams, authData)
        .then(res => {            
            const expirationDate = new Date(new Date().getTime() + res.data.expires_in*1000);
            localStorage.setItem('accessToken', res.data.access_token);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userRole',res.data.userRole);
            dispatch(authSuccess(res.data.access_token, res.data.id));
            dispatch(checkAuthTimeout(res.data.expires_in));
        })
        .catch(err =>{
            dispatch(authFail(err.response.data));
        })
    };
};

export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('accessToken');
        if(token){         
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(authSuccess());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId ));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}

export const  userSwitchMode = (userMode) =>{
    return {
        type: actionTypes.USER_SWITCH_MODE,
        userMode: userMode
    };
};