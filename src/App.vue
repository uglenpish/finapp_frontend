<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

// Инициализируем аутентификацию при загрузке приложения
authStore.initializeAuth();
</script>
