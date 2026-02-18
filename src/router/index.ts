import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  { 
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { requestGuest: true }
  },
  { 
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: { requestGuest: true}
  },
  { 
    path: '/dash',
    name: 'dash',
    component: () => import('@/views/DashboardPage.vue'),
    meta: { requiresAuth: true }
  }, 
  { 
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/CategoriesPage.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/TransactionsPage.vue'),
    meta: { requiresAuth: true }
  }, 

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // if (!authStore.user) {
  //   authStore.initializeAuth();
  // }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dash');
  } else {
    next()
  }

  next();
})

export default router
