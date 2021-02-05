import axios from 'axios';
import { getCookie } from '../helpers/cookies';
import { server } from './url';

export const sendNewMessage = async (formData) => {
    let cookie = getCookie("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie + "",
        },
        withCredentials: true,
    }

    const response = await axios.post(server + '/api/contact', formData, config);
    return response.data.successMessage;
}
