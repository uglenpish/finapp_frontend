import axios from "axios";
// import { useAuthStore } from "@/store/authStore";
import { tokenService } from "@/service/token.service";

console.log(import.meta.env.VITE_API_BASE_URL,)

export const http = axios.create({
    baseURL: '/api',
    timeout: 1000000,
    headers: {
        'Content-Type': 'application/json',
    },
})

http.interceptors.request.use(config => {
    const token = tokenService.getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

http.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            console.error(error.response)
        }

        return Promise.reject(error);
    }
)