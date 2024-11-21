import { toast } from "react-toastify"

const notify = (message: string, type: "success" | "error") =>{
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type: type
      });
}

export default notify;