import axios from 'axios';
import { server } from './url';

export const signup = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await axios.post(server + '/api/auth/signup', data, config);

    return response;
}

export const login = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await axios.post(server + '/api/auth/login', data, config);

    return response;
}

export const signInUser = async (data) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await axios.post(server + '/api/auth/login', data, config);
    return response;
}

export const signUpUser = async (data) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await axios.post(server + '/api/auth/signup', data, config);

    return response;
}