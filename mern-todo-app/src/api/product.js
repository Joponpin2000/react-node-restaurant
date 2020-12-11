import axios from 'axios';
import { getCookie } from '../helpers/cookies';

export const createProduct = async (formData) => {

    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Cookie: "token=" + cookie + "",
        },
        withCredentials: true
    }

    const response = await axios.post('/api/product', formData, config);

    return response;
}

export const fetchProducts = async () => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    const response = await axios.get('/api/products', config);
    return response.data.products;
}

export const fetchProductdetails = async (productId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    const response = await axios.get('/api/products/' + productId, config);
    return response.data.product;
}

export const updateProduct = async (formData) => {

    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie + "",
        },
        withCredentials: true
    }

    const response = await axios.put('/api/product/' + formData.id, formData, config);

    return response.data.product;
}

export const delProduct = async (productId) => {

    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }

    const response = await axios.delete('/api/product/' + productId, config);

    return response.data.product;
}

export const saveNewProduct = async (formData) => {
    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookie,
        },
        withCredentials: true
    }

    const response = await axios.post('/api/product', formData, config);

    return response.data.product;
}
