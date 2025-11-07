import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User, LoginData, RegisterData } from "../types";

const fakeAutchService = {
  login: async (data: LoginData): Promise<{token: string; user: User}> => {
    await new Promise((r) => setTimeout(r, 1000));

    if (data.email === 'demo@example.com' && data.password === 'Password123') {
      return {
        token: 'fake-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: data.email,
          firstName: 'Demo',
          lastName: 'User',
          isVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  register: async (data: RegisterData): Promise<{token: string; user: User}> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      token: 'fake-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email: data.email,
        firstName: 'Demo',
        lastName: 'User',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export const useAuthStore = defineStore("auth", () => {

  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAutchenticated = computed(() => !!token.value && !!user.value);
  const fullName = computed(() => `${user.value?.firstName} ${user.value?.lastName}`);

  const login = async (credentials: LoginData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fakeAutchService.login(credentials); 
      token.value = response.token; 
      user.value = response.user;
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (credentials: RegisterData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fakeAutchService.register(credentials); 
      token.value = response.token; 
      user.value = response.user;
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await fakeAutchService.logout();
      token.value = null;
      user.value = null;      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAutchenticated,
    fullName,
    initializeAuth,
    login,
    register,
    logout,
    clearError
  }
    
});