import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue'
import SettingsPage from '@/views/SettingsPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import FinancialPage from '@/views/FinancialPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "Home",
    component: HomePage,
  },
  {
    path: "/financials",
    name: "Monetization",
    component: FinancialPage
  },
  {
    path: '/settings',
    name: "Settings",
    component: SettingsPage
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
