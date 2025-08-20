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
      path: '/manage-reservations',
      name: 'ManageReservations',
      component: () => import('../views/ManageReservations.vue'),
    },
    {
      path: '/manage-accommodation',
      name: 'ManageAccommodation',
      component: () => import('../views/ManageAccommodation.vue'),
    },
    {
      path: '/upload-accommodation',
      name: 'UploadAccommodation',
      component: () => import('../views/UploadAccommodation.vue'),
    },
    {
      path: '/user-dashboard',
      name: 'User Dashboard',
      component: () => import('../views/Dashboard.vue'),
    }
  ],
})

export default router
