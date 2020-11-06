import { signInUser, signUpUser } from "../api/auth";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

const signin = (formData) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST, payload: formData
    })
    try {
        const { data } = await signInUser(formData);
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

const register = (formData) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST, payload: formData
    })
    try {
        const { data } = await signUpUser(formData);
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.successMessage
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export { signin, register };