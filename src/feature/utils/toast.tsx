import {toast} from "react-toastify";
import React from "react";
import {isObject} from "../../utils/utils.ts";

export const toastInfo = (content: any) => {
    let message;
    if(React.isValidElement(content)){
        message = content;
    }else{
        message = content + '';
    }

    toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        closeOnClick: true,
    });
}
export const toastError = (content: any) => {
    let message;
    if(React.isValidElement(content)){
        message = content;
    }else if(isObject(content) && content.message){
        message = content.message;
    }else{
        message = content + '';
    }

    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        closeOnClick: true,
    });
}