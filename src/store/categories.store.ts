import { defineStore } from "pinia"
import { ref } from "vue"

export type CategoryType = 'income' | 'expense'

// тестовые данные пока нет бэкенда
export const defaultCategories = [
  {
    id: 'home',
    name: 'Дом',
    type: 'expense' as CategoryType,
    subcategories: [
      { id: 'products', name: 'Продукты' },
      { id: 'cafe', name: 'Кафе / доставка' },
      { id: 'cleaning', name: 'Бытовая химия' },
      { id: 'rent', name: 'Аренда / ипотека' },
      { id: 'utilities', name: 'Коммунальные услуги' },
      { id: 'internet', name: 'Интернет / ТВ' },
      { id: 'repair', name: 'Ремонт' },
    ],
  },
  {
    id: 'car',
    name: 'Автомобиль',
    type: 'expense' as CategoryType,
    subcategories: [
      { id: 'fuel', name: 'Топливо' },
      { id: 'service', name: 'Обслуживание' },
      { id: 'insurance', name: 'Страховка' },
      { id: 'parking', name: 'Парковка' },
      { id: 'fines', name: 'Штрафы' },
      { id: 'wash', name: 'Мойка' },
    ],
  },
  {
    id: 'fun',
    name: 'Отдых',
    type: 'expense' as CategoryType,
    subcategories: [
      { id: 'travel', name: 'Путешествия' },
      { id: 'cinema', name: 'Кино / театр' },
      { id: 'subscriptions', name: 'Подписки' },
      { id: 'hobby', name: 'Хобби' },
    ],
  },
  {
    id: 'shopping',
    name: 'Покупки',
    type: 'expense' as CategoryType,
    subcategories: [
      { id: 'clothes', name: 'Одежда' },
      { id: 'shoes', name: 'Обувь' },
      { id: 'electronics', name: 'Электроника' },
      { id: 'marketplace', name: 'Маркетплейсы' },
    ],
  },
  {
    id: 'health',
    name: 'Здоровье',
    type: 'expense' as CategoryType,
    subcategories: [
      { id: 'pharmacy', name: 'Аптека' },
      { id: 'doctors', name: 'Врачи' },
      { id: 'sport', name: 'Спорт' },
    ],
  },
  {
    id: 'income',
    name: 'Доход',
    type: 'income' as CategoryType,
    subcategories: [
      { id: 'salary', name: 'Зарплата' },
      { id: 'freelance', name: 'Фриланс' },
      { id: 'bonus', name: 'Бонусы' },
      { id: 'gift', name: 'Подарки' },
      { id: 'interest', name: 'Проценты' },
    ],
  },
]

export const categoriesStore = defineStore('categories', () => {
  const categories = ref(defaultCategories);

  const getCategories = async (type: CategoryType) => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return categories.value.filter(c => c.type === type);
  }

  const getById = (id: string) =>
    categories.value.find(c => c.id === id)

  return {
    categories,
    getCategories,
    getById,
  }
})