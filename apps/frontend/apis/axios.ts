import axiosModule from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR == "true" ? process.env.NEXT_PUBLIC_FIREBASE_API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL

const axios = axiosModule.create({
    baseURL: API_BASE_URL,
});
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios;