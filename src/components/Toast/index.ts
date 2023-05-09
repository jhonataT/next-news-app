import { toast } from "react-toastify"

type ToasTypes = 'info' | 'success' | 'warning' | 'error' | 'default';

export const customToast = (message: string, type: ToasTypes) => {
    return toast(message, {
        type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    })
}