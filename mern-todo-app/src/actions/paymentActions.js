import { MAKE_PAYMENT_REQUEST, GET_RECEIPT_REQUEST, GET_RECEIPT_SUCCESS, GET_RECEIPT_FAIL, MAKE_PAYMENT_FAIL, } from '../constants/paymentConstants';
import { getPaymentReceipt, pay } from "../api/payment";


const makePayment = (paymentData) => async (dispatch) => {
    try {
        dispatch({
            type: MAKE_PAYMENT_REQUEST,
            payload: paymentData
        });

        const url = await pay(paymentData);

        window.location.replace(url);

    } catch (error) {
        dispatch({
            type: MAKE_PAYMENT_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

const getReceipt = (props) => async (dispatch) => {
    try {
        dispatch({
            type: GET_RECEIPT_REQUEST,
            payload: props
        });

        const user = await getPaymentReceipt(props.match.params.id);

        dispatch({
            type: GET_RECEIPT_SUCCESS,
            payload: user,
        });

    } catch (error) {
        dispatch({
            type: GET_RECEIPT_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}

export { makePayment, getReceipt };