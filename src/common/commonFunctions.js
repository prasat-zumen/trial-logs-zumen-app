import React from 'react';
import { toast } from 'react-toastify';
import iconSuccess from '../assets/icon-info.svg'
import iconWarning from '../assets/icon-warning.svg'
import iconDangerous from '../assets/icon-dangerous.svg'

let toastId = '';

export const msgSuccess = (msg) => {
    return <div className="flex align-center">
      <img src={iconSuccess} alt={"success"}/>
      <span className="p-l-10">{msg}</span>
    </div>
  }
export const msgError = (msg) => {
return <div className="flex align-center">
    <img src={iconDangerous} alt={"error"}/>
    <span className="p-l-10">{msg}</span>
</div>
}
export const msgWarning = (msg) => {
return <div className="flex align-center">
    <img src={iconWarning} alt={"warning"}/>
    <span className="p-l-10">{msg}</span>
</div>
}

export const showErrorToast = (errorMessage, event) => {
    if (errorMessage !== undefined && errorMessage) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(msgError(errorMessage), {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          onClose: function () {
            toastId = ''
          }
        });
      }
    }
  };

export const showSuccessToast = message => {
if (message !== undefined && message) {
    if (!toast.isActive(toastId)) {
    toastId = toast.success(msgSuccess(message), {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: function () {
        toastId = ''
        }
    });
    }
}
};

export const showWarningToast = message => {
    if (message !== undefined && message) {
      if (!toast.isActive(toastId)) {
        toastId = toast.warning(msgWarning(message), {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          onClose: function () {
            toastId = ''
          }
        });
      }
    }
};