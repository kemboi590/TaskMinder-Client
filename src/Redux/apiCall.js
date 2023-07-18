import { selectComponent } from "./uiSlice";
import { loginStart, loginSuccess, loginFailure, logOut } from "./userSlice";
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
      alert("Login successful");
      callback();
    }
  } catch ({ response }) {
    dispatch(loginFailure());
    alert(response.data.error);
  }
};

export const logOutuser = async (dispatch) => {
  // console.log(dispatch);
  dispatch(logOut());
};


