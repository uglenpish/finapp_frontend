<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { categoriesStore, type CategoryType } from '@/store/categories.store';
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
  IonSpinner,
} from '@ionic/vue';

const router = useRouter();
const categoriesSt = categoriesStore();

const currentType = ref<CategoryType>('expense');
const isLoading = ref(false);
const categories = ref<typeof categoriesSt.categories.value>([]);

const loadCategories = async () => {
  isLoading.value = true;
  try {
    categories.value = await categoriesSt.getCategories(currentType.value);
  } finally {
    isLoading.value = false;
  }
};

watch(currentType, () => {
  loadCategories();
}, { immediate: true });
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/dash" />
        </ion-buttons>
        <ion-title>Категории</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-segment v-model="currentType" value="expense">
        <ion-segment-button value="expense">
          <ion-label>Расходы</ion-label>
        </ion-segment-button>
        <ion-segment-button value="income">
          <ion-label>Доходы</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div class="ion-margin-top" v-if="isLoading">
        <ion-spinner name="crescent" />
      </div>

      <ion-list v-else>
        <ion-item
          v-for="category in categories"
          :key="category.id"
          lines="full"
        >
          <ion-label>
            <h2>{{ category.name }}</h2>
            <p v-if="category.subcategories?.length">
              <ion-note class="subcategories">
                {{ category.subcategories.map((s) => s.name).join(' • ') }}
              </ion-note>
            </p>
          </ion-label>
        </ion-item>

        <ion-item v-if="!categories.length && !isLoading" lines="none">
          <ion-label>
            <p>Нет категорий для отображения.</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.subcategories {
  white-space: normal;
}
</style>

