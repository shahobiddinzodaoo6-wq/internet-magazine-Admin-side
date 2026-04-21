import axios from "axios";

export const API_IMAGE = import.meta.env.VITE_API + "/images";

function saveToken(token: string) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_API,
});

axiosRequest.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API,
});

export { saveToken, getToken };
