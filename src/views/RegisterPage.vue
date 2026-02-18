<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="auth-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Create Account</ion-card-title>
            <ion-card-subtitle>Join us today</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-input
                  v-model="form.username"
                  label="First Name"
                  label-placement="stacked"
                  placeholder="Enter your username"
                  :disabled="authStore.isLoading"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="form.email"
                  label="Email"
                  label-placement="stacked"
                  type="email"
                  placeholder="Enter your email"
                  :disabled="authStore.isLoading"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-input
                  v-model="form.password"
                  label="Password"
                  label-placement="stacked"
                  type="password"
                  placeholder="Create a password"
                  :disabled="authStore.isLoading"
                ></ion-input>
              </ion-item>
            </ion-list>

            <ion-button
              expand="block"
              class="ion-margin-top"
              :disabled="!isFormValid || authStore.isLoading"
              @click="handleRegister"
            >
              <ion-spinner v-if="authStore.isLoading" class="ion-margin-end"></ion-spinner>
              {{ authStore.isLoading ? 'Creating account...' : 'Create Account' }}
            </ion-button>

            <div class="auth-links">
              <p>
                Already have an account? 
                <router-link to="/login">Sign in</router-link>
              </p>
            </div>
          </ion-card-content>
        </ion-card>

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
import { ref, computed } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
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
  IonAlert
} from '@ionic/vue';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  username: '',
  email: '',
  password: ''
});

const isFormValid = computed(() => {
  return (
    form.value.username &&
    form.value.email &&
    form.value.password &&
    form.value.password.length >= 6
  );
});

const handleRegister = async () => {
  try {
    console.log(11);
    await authStore.register(form.value);
    await router.push('/dash');
  } catch (error) {
    // Error handled in store
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 2rem;
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