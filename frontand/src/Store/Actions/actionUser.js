import {
    LOGOUT_USER_ERROR,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    ORDER_LOGIN_ERROR,
    ORDER_LOGIN_REQUEST,
    ORDER_LOGIN_SUCCESS,
    ORDER_REGISTER_ERROR,
    ORDER_REGISTER_REQUEST,
    ORDER_REGISTER_SUCCESS
} from "./Actionstype";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const orderRegisterSuccess = () => ({type: ORDER_REGISTER_SUCCESS});
export const orderRegisterRequest = () => ({type: ORDER_REGISTER_REQUEST});
export const orderRegisterError = (error) => ({type: ORDER_REGISTER_ERROR, error});


export const orderLoginSuccess = (user) => ({type: ORDER_LOGIN_SUCCESS, user});
export const orderLoginRequest = () => ({type: ORDER_LOGIN_REQUEST});
export const orderLoginError = (error) => ({type: ORDER_LOGIN_ERROR, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
export const logoutUserError = error => ({type: LOGOUT_USER_ERROR, error});

export const orderRegister = (user) => {
    return async (dispatch) => {
        try {
            dispatch(orderRegisterRequest());
            await axiosApi.post('/users', user);
            dispatch(orderRegisterSuccess());
            dispatch(push('/'));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(orderRegisterError(error.response.data));
            } else {
                dispatch(orderRegisterError({global: 'No connection'}));
            }
        }
    }
};

export const orderLogin = (user) => {
    return async (dispatch) => {
        try {
            dispatch(orderLoginRequest());
            const res = await axiosApi.post('/users/sessions', user);
            dispatch(orderLoginSuccess(res.data));
            dispatch(push('/'))
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(orderLoginError(error.response.data));
            } else {
                dispatch(orderLoginError({global: 'No connection'}));
            }
        }
    }
};


export const logoutUser = () => {
  return async (dispatch) =>{
      try {
          dispatch(logoutUserRequest());
          await axiosApi.delete('/users/sessions');
          dispatch(logoutUserSuccess());
          dispatch(push('/'));
      } catch (error){
          dispatch(logoutUserRequest());
          if (error.response && error.response.data) {
              dispatch(logoutUserError(error.response.data));
          } else {
              dispatch(logoutUserError({global: 'No connection'}));
          }
      }
  }
};