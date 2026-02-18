import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string
    amount: number
    type: TransactionType
    categoryId: string
    subcategoryId?: string
    createdAt: string
    comment?: string
}

export const transactionsStore = defineStore('transactions', () => {
    const items = ref(<Transaction[]> []);

    const balance = computed(() => {
        return items.value.reduce(
            (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0
        )
    });

    const lastFive = computed(() => items.value.slice(0, 5))

    const addTransactions = (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
        items.value.unshift({
            ...tx,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        })
    }

    return {
        items,
        balance,
        lastFive,
        addTransactions
    }
})