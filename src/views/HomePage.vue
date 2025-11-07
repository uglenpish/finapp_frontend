<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="handleLogout" :disabled="authStore.isLoading">
            <ion-spinner v-if="authStore.isLoading"></ion-spinner>
            <ion-icon v-else :icon="logOutOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="welcome-section">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Welcome, {{ authStore.fullName }}! 👋</ion-card-title>
            <ion-card-subtitle>{{ authStore.user?.email }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <p>You are successfully logged in to Fintask.</p>
            
            <ion-list class="ion-margin-top">
              <ion-item>
                <ion-label>
                  <h3>Account Status</h3>
                  <p>{{ authStore.user?.isVerified ? 'Verified' : 'Not Verified' }}</p>
                </ion-label>
                <ion-badge :color="authStore.user?.isVerified ? 'success' : 'warning'" slot="end">
                  {{ authStore.user?.isVerified ? 'Verified' : 'Pending' }}
                </ion-badge>
              </ion-item>

              <ion-item>
                <ion-label>
                  <h3>Member Since</h3>
                  <p>{{ formattedJoinDate }}</p>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-button expand="block" class="ion-margin-top" @click="showDemoAlert">
              Demo Action
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card class="demo-features">
          <ion-card-header>
            <ion-card-title>Demo Features</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-icon :icon="walletOutline" slot="start"></ion-icon>
                <ion-label>Financial Dashboard</ion-label>
              </ion-item>
              
              <ion-item>
                <ion-icon :icon="trendingUpOutline" slot="start"></ion-icon>
                <ion-label>Budget Planning</ion-label>
              </ion-item>
              
              <ion-item>
                <ion-icon :icon="analyticsOutline" slot="start"></ion-icon>
                <ion-label>Expense Tracking</ion-label>
              </ion-item>
              
              <ion-item>
                <ion-icon :icon="notificationsOutline" slot="start"></ion-icon>
                <ion-label>Smart Notifications</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonSpinner,
  IonBadge,
  alertController
} from '@ionic/vue';
import { logOutOutline, walletOutline, trendingUpOutline, analyticsOutline, notificationsOutline } from 'ionicons/icons';

const authStore = useAuthStore();
const router = useRouter();

const formattedJoinDate = computed(() => {
  if (!authStore.user?.createdAt) return '';
  return new Date(authStore.user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const handleLogout = async () => {
  await authStore.logout();
  await router.push('/login');
};

const showDemoAlert = async () => {
  const alert = await alertController.create({
    header: 'Demo Feature',
    message: 'This is a demo feature. In a real app, this would show financial data.',
    buttons: ['OK']
  });

  await alert.present();
};
</script>

<style scoped>
.welcome-section {
  max-width: 600px;
  margin: 0 auto;
}

.demo-features {
  margin-top: 1rem;
}
</style>