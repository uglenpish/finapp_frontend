<script setup lang="ts">
import { useRouter } from 'vue-router';
import { categoriesStore } from '@/store/categories.store';
import { transactionsStore } from '@/store/transactions.store';
import { ref } from 'vue';
import { add } from 'ionicons/icons'

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
} from '@ionic/vue';

const router = useRouter();
const categoriesSt = categoriesStore();
const transactionsSt = transactionsStore();

const balance = transactionsSt.balance
const transactions = transactionsSt.lastFive

const goToAdd = () => {
  router.push('/app/transaction/new')
}

const getCategoryName = (t: any) => {
  const cat = categoriesSt.getById(t.categoryId)
  const sub = cat?.subcategories.find(s => s.id === t.subcategoryId)
  return sub ? `${cat?.name} • ${sub.name}` : cat?.name
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString()
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Баланс</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{ balance }} ₽</ion-card-title>
                </ion-card-header>
            </ion-card>

            <ion-list>
                <ion-item v-for="t in transactions" :key="t.id">
                    <ion-label>
                        <h3>{{ getCategoryName(t) }}</h3>
                        <p>{{ formatDate(t.createdAt) }}</p>
                    </ion-label>
                    <ion-note :color="t.type === 'income' ? 'success' : 'danger'">
                        {{ t.type === 'income' ? '+' : '-' }}{{ t.amount }} ₽
                    </ion-note>
                </ion-item>
            </ion-list>

            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <ion-fab-button @click="goToAdd">
                    <ion-icon :icon="add" />
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>