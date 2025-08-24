import { createRouter, createWebHistory } from 'vue-router'

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
    },
     {
      path: '/about-us',
      name: 'AboutUs',
      component: () => import('../views/AboutUs.vue'),
    },
    {
      path: '/admin-dashboard',
      name: 'AdminDashboard',
      component: () => import('../views/AdminDashboard.vue'),
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/Booking.vue'),
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: () => import('../views/DetailAccommodation.vue'),
    },
    {
<<<<<<< HEAD
      path: '/multer',
      name: 'MULTER',
      component: () => import('../views/Multer.vue'),
=======
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue'),
>>>>>>> 99f75c8e5e1e91b85afae5ff592fd6b0650b4c74
    }
  ],
})

export default router
