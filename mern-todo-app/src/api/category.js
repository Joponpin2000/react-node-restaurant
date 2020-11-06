import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export const createCategory = async (formData) => {
    let cookie = getCookie("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            Cookie: "token=" + cookie + "",
        },
        withCredentials: true
    }

    const response = await axios.post('/api/category', formData, config);
    return response;
}

export const getCategories = async () => {
    let cookie = getCookie("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }
    const response = await axios.get('/api/category', config);

    return response.data.categories;
}

export const saveNewCategory = async (category) => {
    let cookie = getCookie("token");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }

    const response = await axios.post('/api/category', category, config);
    return response.data.category;
}
