import api from "../api/api"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionType"
import { toast } from "react-toastify";

export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.post('/user/login', { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('token', data.token);
    toast.success(data.msg);

  }
  catch (error) {
    const msg = error.response?.data?.msg || error.message;
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg }
    })
    toast.error(msg);
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  document.location.href = '/';
}