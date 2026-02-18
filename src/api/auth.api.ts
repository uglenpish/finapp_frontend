import { http } from "./http";
import type { LoginData, RegisterData, AuthResponse } from '@/types';

export const authApi = {
    login(data: LoginData) {
        return http.post<AuthResponse>('/auth/login', data)
    },

    register(data: RegisterData) {
        console.log(data);
        return http.post<AuthResponse>('/auth/register', data)
    },
}