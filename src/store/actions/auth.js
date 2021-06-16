import axios from 'axios';
import AppConfig from '../../config/appConfig';
import * as actionTypes from './actionTypes';
import {
    showErrorToast,
    showSuccessToast,
    showWarningToast
  } from '../../common/commonFunctions';

//Set default URL of API
axios.defaults.baseURL = AppConfig.API_URL_JAVA;
axios.defaults.timeout = 0;

let apiFailCounter = 0;

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

export const buyerLogin =  {
    url: '/userauth/oauth/token',
    method: 'POST',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
}

export const injectParamsToUrl = (_url_, paramObj) => {
    var url = _url_;
    for (let key in paramObj) {
      url = url.replace(':' + key, paramObj[key]);
    }
    return url;
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout());
        },expirationTime* 1000);
    }
}



export const handleErrorByStatus = error => {
    switch (error.status) {
      case 400:
        try {
          const message = error.data.error_description;
          showErrorToast(message);
        } catch (error) { }
        try {
          const message = error.data.responseMessage;
          showErrorToast(message);
        } catch (error) { }
        try {
          const message = error.responseMessage;
          showErrorToast(message);
        } catch (error) { }
        break;
      case 406:
        try {
          const message = error.data.error_description;
          showWarningToast(message);
        } catch (error) { }
        try {
          const message = error.data.responseMessage;
          showWarningToast(message);
        } catch (error) { }
        try {
          const message = error.responseMessage;
          showWarningToast(message);
        } catch (error) { }
        break;
      case 500:
        try {
          const message = error.data.message;
          showErrorToast(message);
        } catch (error) { }
        break;
      case 504:
        try {
          const message = error.data.error_description;
          showErrorToast(message);
        } catch (error) { }
        try {
          const message = error.data.responseMessage;
          showErrorToast(message);
        } catch (error) { }
        try {
          const message = error.responseMessage;
          showErrorToast(message);
        } catch (error) { }
        break;
      default:
        break;
    }
  };

export const auth = (userName, password, roleId, hostName, timeZone, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());
        const userDetails = {
            grant_type: 'password',
            username: userName,
            password: password,
            roleId: roleId,
          }
        var encodedBody = [];
        for (var property in userDetails) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(userDetails[property]);
        encodedBody.push(encodedKey + "=" + encodedValue);
        }
        encodedBody = encodedBody.join("&");
        let apiDetails = buyerLogin;
        let requestObject = Object.assign({}, apiDetails);
        requestObject.data = encodedBody;
        requestObject.url = injectParamsToUrl(requestObject.url, encodedBody);  

        axios(requestObject)
            .then(function (result) {
                const expirationDate = new Date(new Date().getTime() + result.data.expires_in*1000);
                localStorage.setItem('accessToken', result.data.access_token);
                localStorage.setItem('userId', result.data.id);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userRole',result.data.userRole);
                dispatch(authSuccess(result.data.access_token, result.data.id));
                dispatch(checkAuthTimeout(result.data.expires_in));
                apiFailCounter = 0;
                if (result.data && result.data.status === 200) {
                    if (result.data.responseMessage) {
                    const message = result.data.responseMessage;
                    if (requestObject.showResultMessage === true)
                        showSuccessToast(message);
                    }
                } else {
                    if (requestObject.showErrorMessage === true)
                    handleErrorByStatus(result.data);
                }
                return result;
            }).catch(function (error) {
                dispatch(authFail(error));
                if (error && error.response) {
                    if (requestObject.showErrorMessage === true)
                    handleErrorByStatus(error.response);
                }
                if (
                    error.config.maxContentLength - 1 &&
                    error.toString().indexOf('Network Error') > -1
                ) {
                    apiFailCounter++;
                    if (apiFailCounter >= 3) {
                    localStorage.clear();
                    window.open(window.location.origin, '_self');
                    }
                }
                return error.response;
            });
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