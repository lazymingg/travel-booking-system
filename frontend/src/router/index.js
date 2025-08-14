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
      path: '/',
      name: 'HomePage',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/accomodationDetail',
      name: 'accommodationDetail',
      component: () => import('../views/Accommodation_detail.vue'),
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/Booking.vue'),
    },
  ],
})

export default router
