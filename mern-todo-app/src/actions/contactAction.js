import { MESSAGE_SEND_REQUEST, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAIL } from '../constants/contactConstants';
import { sendNewMessage } from "../api/contact";


const sendMessage = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: MESSAGE_SEND_REQUEST,
            payload: formData
        });
        const newContactFromDatabase = await sendNewMessage(formData);
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: newContactFromDatabase
        })
    } catch (error) {
        dispatch({
            type: MESSAGE_SEND_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export { sendMessage };