import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export const getOrders = async () => {
    let cookie = getCookie("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }
    const response = await axios.get('/api/orders', config);

    return response.data.orders;
}

export const delOrder = async (id) => {

    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }

    const response = await axios.delete('/api/orders/' + id, config);

    return response.data.product;
}
