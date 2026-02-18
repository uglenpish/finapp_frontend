const ACCESS_TOKEN_KEY = 'access_token';

export const tokenService = {
    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    setAccessToken(access: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, access);
    },

    clear() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
}