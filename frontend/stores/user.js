import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, 
    isLoggedIn: false,
  }),
  actions: {
    login(userData) {
        this.user = userData; 
        this.isLoggedIn = true;
        console.log('Logging in user:', this.user);
        console.log(this.isLoggedIn);
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    }
  },
  getters: {
    userName: (state) => state.user ? state.user.name : null,
  },
  persist: true
})