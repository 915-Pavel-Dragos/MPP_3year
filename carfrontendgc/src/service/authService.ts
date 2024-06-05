import axios from 'axios';

const API_URL = 'https://simon123.pythonanywhere.com//';

export const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + 'register/', {
        username,
        email,
        password,
    });
};

export const login = (username: string, password: string) => {
    return axios.post(API_URL + 'login/', {
        username,
        password,
    });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
};

export const isAuthenticated = () => {
    const user = getCurrentUser();
    console.log("Authenticated user:", user);
    return user && user.access;
};