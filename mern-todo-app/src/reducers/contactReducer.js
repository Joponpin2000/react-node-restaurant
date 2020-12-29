import { MESSAGE_SEND_REQUEST, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAIL } from '../constants/contactConstants';

function contactSendReducer(state = { contact: {} }, action) {

    switch (action.type) {
        case MESSAGE_SEND_REQUEST:
            return {
                loading: true
            };

        case MESSAGE_SEND_SUCCESS:
            return {
                loading: false,
                success: true,
                contact: action.payload
            };
        case MESSAGE_SEND_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export { contactSendReducer };