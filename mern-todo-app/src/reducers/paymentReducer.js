import { GET_RECEIPT_REQUEST, GET_RECEIPT_FAIL, GET_RECEIPT_SUCCESS } from '../constants/paymentConstants';

function paymentReducer(state = { amountPaid: '#3000' }, action) {
    switch (action.type) {
        case GET_RECEIPT_REQUEST:
            return {
                loading: true
            };

        case GET_RECEIPT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                amountPaid: action.payload,
            };
        case GET_RECEIPT_FAIL:
            return {
                loading: false,

                error: action.payload
            };
        default:
            return state;
    }
}

export { paymentReducer };