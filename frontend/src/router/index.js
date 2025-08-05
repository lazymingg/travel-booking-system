import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      component: () => import('../views/User_info.vue'),
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: () => import('../views/HomePage.vue'),
    }
  ],
})

export default router
