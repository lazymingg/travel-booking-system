import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, 
    isLoggedIn: false,
  }),
  actions: {
    login(userData) {
        this.user = userData; // Ví dụ: { id: 1, full_name: '...', email: '...', role: 'owner' }
        this.isLoggedIn = true;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      // Thêm lệnh chuyển hướng về trang đăng nhập nếu cần
      // router.push('/login'); 
    },
    async validateSession(apiClient) {
      // apiClient is optional; pass frontend-api-helper.js instance from callers
      console.log('Validating user session...')
      console.log('API Client:', apiClient)
      try {
        if (!apiClient) return false
        const res = await apiClient.get('/auth/me')
        if (res.success && res.data.user) {
          // Cập nhật dữ liệu user từ API
          console.log('Session valid, user:', res.data.user)
          this.user = res.data.user
          this.isLoggedIn = true
          return true
        }
      } catch (e) {
        // ignore network errors here
        console.error('Session validation error:', e)
      }
      // fallback: clear user
      this.user = null
      this.isLoggedIn = false
      return false
    }
  },
  getters: {
    // Tạo các getters để truy cập thông tin dễ dàng và an toàn
    userName: (state) => state.user ? state.user.full_name : null,
    userRole: (state) => state.user ? state.user.role : null,
    isOwner: (state) => state.user ? state.user.role === 'owner' : false,
    isAdmin: (state) => state.user ? state.user.role === 'admin' : false,
  },

  persist: true
})