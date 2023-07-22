import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectComponent } from "./uiSlice";
import { loginStart, loginSuccess, loginFailure, logOut } from "./userSlice";
import { toastStyles } from "../toastConfig";
import Axios from "axios";

import { apidomain } from "../utils/domain";

export const display = (dispatch, component) => {
  dispatch(selectComponent(component));
};

export const loginUser = async (dispatch, user, callback) => {
  // console.log(user);
  dispatch(loginStart());
  try {
    const { data } = await Axios.post(`${apidomain}/auth/login`, user);
    if (data.token) {
      // console.log(data);
      dispatch(loginSuccess(data));
      // alert("Login successful");
      toast.success("Login successful", toastStyles.success);
      callback();
    }
  } catch ({ response }) {
    dispatch(loginFailure());
    // alert(response.data.error);
    toast.error(response.data.error, toastStyles.error);
  }
};

export const logOutuser = async (dispatch) => {
  // console.log(dispatch);
  dispatch(logOut());
  toast.success("You are logged out", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
