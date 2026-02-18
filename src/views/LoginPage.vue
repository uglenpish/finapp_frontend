<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="auth-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Добро пожаловать</ion-card-title>
            <ion-card-subtitle>Войдите в свою учетную запись</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-input
                  v-model="form.email"
                  label="Email"
                  label-placement="stacked"
                  type="email"
                  placeholder="Введите свой email"
                  :disabled="authStore.isLoading"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="form.password"
                  label="Password"
                  label-placement="stacked"
                  type="password"
                  placeholder="Введите свой password"
                  :disabled="authStore.isLoading"
                ></ion-input>
              </ion-item>
            </ion-list>

            <ion-button
              expand="block"
              class="ion-margin-top"
              :disabled="!isFormValid || authStore.isLoading"
              @click="handleLogin"
            >
              <ion-spinner v-if="authStore.isLoading" class="ion-margin-end"></ion-spinner>
              {{ authStore.isLoading ? 'Вход в систему...' : 'Войти' }}
            </ion-button>

            <ion-note class="demo-credentials">
              <p><strong>Демонстрационные данные:</strong></p>
              <p>Email: demo@example.com</p>
              <p>Password: Password123</p>
            </ion-note>

            <div class="auth-links">
              <p>
                У вас нет учетной записи?
                <router-link to="/register">Зарегистрироваться</router-link>
              </p>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Error Alert -->
        <ion-alert
          :is-open="!!authStore.error"
          header="Error"
          :message="authStore.error"
          :buttons="['OK']"
          @didDismiss="authStore.clearError"
        ></ion-alert>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner,
  IonNote,
  IonAlert
} from '@ionic/vue';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: ''
});

const isFormValid = computed(() => {
  return form.value.email && form.value.password && form.value.password.length >= 6;
});

const handleLogin = async () => {
  try {
    await authStore.login(form.value);
    await router.push('/dash');
  } catch (error) {
    // Error handled in store
  }
};

// Автозаполнение демо данных для тестирования
// onMounted(() => {
//   form.value.email = 'demo@example.com';
//   form.value.password = 'Password123';
// });
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 2rem;
}

.demo-credentials {
  display: block;
  background: var(--ion-color-light);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
}

.demo-credentials p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.auth-links {
  text-align: center;
  margin-top: 1rem;
}

.auth-links a {
  color: var(--ion-color-primary);
  text-decoration: none;
}
</style>