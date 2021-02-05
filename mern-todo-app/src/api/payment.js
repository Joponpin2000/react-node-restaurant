import axios from 'axios';
import { getCookie } from '../helpers/cookies';
import { server } from './url';

export const pay = async (paymentData) => {
    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }

    const response = await axios.post(server + '/api/paystack/pay', paymentData, config);

    return response.data.url;
}

export const verify = async (reference) => {
    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }

    const response = await axios.get(server + '/api/paystack/callback?ref=' + reference, config);

    return response.data.url;
}


export const getPaymentReceipt = async (id) => {
    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }

    const response = await axios.get(server + '/payment-success/' + id, config);

    return response.data.user;
}