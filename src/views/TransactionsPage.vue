<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { categoriesStore } from '@/store/categories.store';
import { transactionsStore, type TransactionType } from '@/store/transactions.store';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonNote,
} from '@ionic/vue';

const router = useRouter();
const categoriesSt = categoriesStore();
const transactionsSt = transactionsStore();

type FilterType = 'all' | TransactionType;

const currentFilter = ref<FilterType>('all');

const transactions = computed(() => {
  if (currentFilter.value === 'all') {
    return transactionsSt.items;
  }
  return transactionsSt.items.filter((t) => t.type === currentFilter.value);
});

const getCategoryName = (t: (typeof transactionsSt.items.value)[number]) => {
  const cat = categoriesSt.getById(t.categoryId);
  const sub = cat?.subcategories.find((s) => s.id === t.subcategoryId);
  return sub ? `${cat?.name} • ${sub.name}` : cat?.name;
};

const formatDate = (d: string) => new Date(d).toLocaleDateString();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/dash" />
        </ion-buttons>
        <ion-title>Транзакции</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-segment v-model="currentFilter" value="all">
        <ion-segment-button value="all">
          <ion-label>Все</ion-label>
        </ion-segment-button>
        <ion-segment-button value="expense">
          <ion-label>Расходы</ion-label>
        </ion-segment-button>
        <ion-segment-button value="income">
          <ion-label>Доходы</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-list class="ion-margin-top">
        <ion-item
          v-for="t in transactions"
          :key="t.id"
        >
          <ion-label>
            <h3>{{ getCategoryName(t) || 'Без категории' }}</h3>
            <p>{{ formatDate(t.createdAt) }}</p>
          </ion-label>
          <ion-note slot="end" :color="t.type === 'income' ? 'success' : 'danger'">
            {{ t.type === 'income' ? '+' : '-' }}{{ t.amount }} ₽
          </ion-note>
        </ion-item>

        <ion-item v-if="!transactions.length">
          <ion-label>
            <p>Пока нет транзакций.</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

