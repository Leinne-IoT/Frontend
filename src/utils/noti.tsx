import {toast} from "react-toastify";

export const notifyError = (message: any, error?: any) => {
    if(error){
        console.error(error);
    }

    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        type: 'error'
    });
}