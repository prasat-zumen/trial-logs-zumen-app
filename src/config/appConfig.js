let getAPIURL = () => {
  let returnUrl = '';
  switch (window.location.hostname) {
    case 'localhost':
      returnUrl = '103.21.53.11:8572';
      // returnUrl = 'localhost:8572';
      break;
    case 'trial.zumen.in':
      returnUrl = 'trial.zumen.in';
      break;
    case 'internal-trial.zumen.in':
      returnUrl = 'trial.zumen.in';
      break;
    default:
      returnUrl = '103.21.53.11:8572'; 
      break;
  }
  return returnUrl;
};


let API_URL_JAVA = () => {
  let API_URL_JAVA = '';
  switch (window.location.hostname) {
    case 'localhost':
      API_URL_JAVA = 'http://' + getAPIURL()
      break;
    case 'trial.zumen.in':
      API_URL_JAVA = 'https://' + getAPIURL()
      break;
    case 'internal-trial.zumen.in':
      API_URL_JAVA = 'https://' + getAPIURL()
      break;
    default:
      API_URL_JAVA = 'https://' + getAPIURL();     
      break;
  }
  return API_URL_JAVA;
};

export default {
  API_URL_JAVA: API_URL_JAVA()
};
