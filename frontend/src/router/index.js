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
      path: '/accommodations',
      name: 'accommodations',
      component: () => import('../views/SearchAccommodations.vue'),
    },
    {
      path: '/home-page',
      name: 'HomePage',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/manage-reservations',
      name: 'ManageReservations',
      component: () => import('../views/ManageReservations.vue'),
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: () => import('../views/AboutUs.vue'),
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
    }
  ],
})

export default router
