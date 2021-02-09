import axios from 'axios';
import { getCookie } from '../helpers/cookies';
import { server } from './url';

export const createProduct = async (formData) => {

    let cookie = getCookie("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Cookie: "token=" + cookie + "",
        },
        withCredentials: true
    }

    const response = await axios.post(server + '/api/product', formData, config);

    return response;
}

export const fetchProducts = async () => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    const response = await axios.get(`${server}/api/products`, config);
    console.log(response)
    console.log(response.data.products)
    return response.data.products;
}

export const fetchProductdetails = async (productId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }

    const response = await axios.get(server + '/api/products/' + productId, config);
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

    const response = await axios.put(server + '/api/product/' + formData.id, formData, config);

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

    const response = await axios.delete(server + '/api/product/' + productId, config);

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

    const response = await axios.post(server + '/api/product', formData, config);

    return response.data.product;
}
