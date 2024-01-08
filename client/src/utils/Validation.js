import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const toastOptions = {
  position: "top-center",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const signupValidation = (form) => {
  const { username, email, password, confirmpassword } = form;
  if (username === "") {
    toast.error("Username is required.", toastOptions);
    return false;
  } else if (email === "") {
    toast.error("Email is required.", toastOptions);
    return false;
  } else if (password === "") {
    toast.error("Password is required.", toastOptions);
    return false;
  } else if (confirmpassword === "") {
    toast.error("confirmPassword is required.", toastOptions);
    return false;
  } else if (password !== confirmpassword) {
    toast.error("Password and confirmPassword must be same.", toastOptions);
    return false;
  }
  return true;
};

export const loginValidator = (form) => {
  const { email, password } = form;
  if (email === "") {
    toast.error("Email is required.", toastOptions);
    return false;
  } else if (password === "") {
    toast.error("Password is required.", toastOptions);
    return false;
  }
  return true;
};
