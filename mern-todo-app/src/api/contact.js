import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export const sendNewMessage = async (formData) => {
    let cookie = getCookie("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie + "",
        },
        withCredentials: true,
    }

    const response = await axios.post('/api/contact', formData, config);
    return response.data.successMessage;
}
