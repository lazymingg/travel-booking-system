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
    ,
    async validateSession(apiClient) {
      // apiClient is optional; pass frontend-api-helper.js instance from callers
      console.log('Validating user session...')
      try {
        if (!apiClient) return false
        const res = await apiClient.get('/auth/me')
        console.log('Session valid for user:', res.data)
        if (res.success && res.data.user) {
          // Optionally sync user data with store
          // this.user = res.data.name
          this.isLoggedIn = true
          return true
        }
      } catch (e) {
        // ignore network errors here
      }
      // fallback: clear user
      this.user = null
      this.isLoggedIn = false
      return false
    }
  },
  getters: {
    userName: (state) => state.user ? state.user.name : null,
  },
  persist: true
})