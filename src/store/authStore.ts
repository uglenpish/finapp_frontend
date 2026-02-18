import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User, LoginData, RegisterData } from "@/types";
import { authApi } from "@/api/auth.api";
import { tokenService } from "@/service/token.service";



export const useAuthStore = defineStore("auth", () => {

  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = ref(false);
  // const fullName = computed(() => `${user.value?.firstName} ${user.value?.lastName}`);

  const login = async (credentials: LoginData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data: response } = await authApi.login(credentials); 
      tokenService.setAccessToken(
        response.token,
      ) 
      user.value = response.user;
      
      isAuthenticated.value = true

    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (data: RegisterData) => {
    const { data: response } = await authApi.register(data)

    tokenService.setAccessToken(response.token)
    user.value = response.user
    isAuthenticated.value = true
  }

  const logout = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await tokenService.clear();
      user.value = null;      
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };


  const clearError = () => {
    error.value = null;
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError
  }
    
});