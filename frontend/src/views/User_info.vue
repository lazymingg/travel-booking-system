<template>
  <HeaderModal/>
  
  <!-- Modern Layout với Global CSS -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container">
      
      <!-- Hero Section với Avatar lớn -->
      <div class="text-center mb-12">
        <div class="relative inline-block">
          <div class="avatar-large">
            {{ userInfo.full_name.charAt(0) }}
          </div>
          <div class="status-indicator"></div>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mt-4">{{ userInfo.full_name }}</h1>
        <div class="role-badge-large">{{ roleDisplay }}</div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="card max-w-2xl mx-auto">
        <div class="card-body text-center py-12">
          <div class="loading-spinner mx-auto mb-4"></div>
          <p class="text-gray-600">Downloading information...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card max-w-2xl mx-auto border-red-200">
        <div class="card-body text-center py-12">
          <div class="text-6xl mb-4">⚠️</div>
          <h3 class="text-xl font-semibold text-red-600 mb-4">Error detected</h3>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <button @click="fetchUserInfo" class="btn btn-primary">
            <span class="btn-icon">🔄</span>
            Try again
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        
        <!-- Left Column - Thông tin cá nhân -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Personal Information Card -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-xl font-semibold flex items-center gap-2">
                <span class="text-2xl">👤</span>
                Personal information
              </h3>
            </div>
            <div class="card-body">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="info-item-modern">
                  <label class="info-label">Full name</label>
                  <div class="info-value-modern">{{ userInfo.full_name }}</div>
                </div>
                <div class="info-item-modern">
                  <label class="info-label">Email</label>
                  <div class="info-value-modern">{{ userInfo.email }}</div>
                </div>
                <div class="info-item-modern">
                  <label class="info-label">Phone number</label>
                  <div class="info-value-modern">{{ userInfo.phone_number }}</div>
                </div>
                <div class="info-item-modern">
                  <label class="info-label">Address</label>
                  <div class="info-value-modern">{{ userInfo.address }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Information Card -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-xl font-semibold flex items-center gap-2">
                <span class="text-2xl">📊</span>
                Account information
              </h3>
            </div>
            <div class="card-body">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="info-item-modern">
                  <label class="info-label">Created date</label>
                  <div class="info-value-modern">{{ formatDate(userInfo.created_at) }}</div>
                </div>
                <div class="info-item-modern">
                  <label class="info-label">Latest-update date</label>
                  <div class="info-value-modern">{{ formatDate(userInfo.updated_at) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Actions -->
        <div class="space-y-6">
          
          <!-- Owner Actions (nếu là owner) -->
          <div v-if="isOwner" class="card gradient-owner">
            <div class="card-header">
              <h3 class="text-xl font-semibold text-white flex items-center gap-2">
                <span class="text-2xl"></span>
                Function
              </h3>
            </div>
            <div class="card-body space-y-3">
              <router-link to="/owner-accommodations" class="btn btn-white w-full">
                <span class="btn-icon">🏠</span>
                My accommodations
              </router-link>
              <router-link to="/manage-reservations" class="btn btn-white w-full">
                <span class="btn-icon">📅</span>
                Manage reservations
              </router-link>
              <router-link to="/upload-accommodation" class="btn btn-white w-full">
                <span class="btn-icon">➕</span>
                Add a new accommodation
              </router-link>
            </div>
          </div>

          <!-- Account Actions -->
          <div class="card">
            <div class="card-header">
              <h3 class="text-xl font-semibold flex items-center gap-2">
                <span class="text-2xl"></span>
                Account management
              </h3>
            </div>
            <div class="card-body space-y-3">
              <button @click="showEditModal = true" class="btn btn-primary w-full">
                <span class="btn-icon">✏️</span>
                Edit profile
              </button>
              
              <button @click="manageBookings" class="btn btn-secondary w-full">
                <span class="btn-icon">📋</span>
                My bookings
              </button>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="card border-red-200">
            <div class="card-header bg-red-50">
              <h3 class="text-xl font-semibold text-red-600 flex items-center gap-2">
                <span class="text-2xl"></span>
                Security
              </h3>
            </div>
            <div class="card-body space-y-3">
              <button @click="handleLogout" class="btn btn-warning w-full">
                <span class="btn-icon">🚪</span>
                Sign out
              </button>
              
              <button @click="showDeleteModal = true" class="btn btn-danger w-full">
                <span class="btn-icon">🗑️</span>
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modern Modal System -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content max-w-2xl" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">✏️ Cập nhật thông tin</h3>
          <button @click="closeEditModal" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <EditProfileModal 
            :show="showEditModal"
            :userInfo="userInfo"
            @close="closeEditModal"
            @update="handleUpdateProfile"
          />
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content max-w-lg" @click.stop>
        <div class="modal-header bg-red-50">
          <h3 class="modal-title text-red-600">⚠️ Xác nhận xóa tài khoản</h3>
          <button @click="closeDeleteModal" class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <DeleteAccountModal
            :show="showDeleteModal"
            @close="closeDeleteModal"
            @delete="handleDeleteAccount"
          />
        </div>
      </div>
    </div>
  </div>
  
  <FooterModal/>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import EditProfileModal from '@/components/EditProfileModal.vue'
import DeleteAccountModal from '@/components/DeleteAccountModal.vue'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'
import api from '@/frontend-api-helper.js'
import { useUserStore } from '../../stores/user.js'
import { storeToRefs } from 'pinia'

const router = useRouter()
const userStore = useUserStore()
const { isOwner } = storeToRefs(userStore)

// State

const userInfo = reactive({
  user_id: null,
  full_name: '',
  email: '',
  phone_number: '',
  address: '',
  role: '',
  created_at: '',
  updated_at: ''
})



const showEditModal = ref(false)
const showDeleteModal = ref(false)
const loading = ref(true)
const error = ref(null)

// Computed
const roleDisplay = computed(() => {
  const roleMap = {
    'customer': 'Customer',
    'admin': 'Administrator',
    'staff': 'Staff'
  }
  return roleMap[userInfo.role] || userInfo.role
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// API
const fetchUserInfo = async () => {
  try {
    loading.value = true;
    error.value = null;

    const result = await api.get('/users/');

    console.log('Fetch user info result:', result);
    if (result.success) {
      Object.assign(userInfo, result.data);
    } else {
      throw new Error(result.error || result.message || 'Unknown error');
    }

  } catch (err) {
    error.value = 'Không thể tải thông tin người dùng: ' + (err.message || 'Unknown error');
    const msg = (err.message || '').toLowerCase();
    
    if (msg.includes('401') || msg.includes('please login') || msg.includes('unauthorized')) {
      router.push('/login');
    }
  } finally {
    loading.value = false;
  }
};

// Actions
const handleUpdateProfile = async (updatedData) => {
  try {
    loading.value = true
    error.value = null
    
    // Sử dụng endpoint phù hợp với backend
    // Backend sử dụng session để xác định user_id, nên có thể dùng ID từ userInfo hoặc endpoint cố định
    const endpoint = userInfo.user_id ? `/users/${userInfo.user_id}` : '/users/me'
    
    const result = await api.put(endpoint, {
      full_name: updatedData.full_name,
      email: updatedData.email,
      phone_number: updatedData.phone_number,
      address: updatedData.address,
      role: updatedData.role
    })

    console.log('Update profile result:', result)

    if (result.success) {
      // Cập nhật dữ liệu local
      Object.assign(userInfo, updatedData)
      
      // Cập nhật dữ liệu trong Pinia store nếu cần
      if (userStore.user) {
        userStore.user = { ...userStore.user, ...updatedData }
      }
      
      alert('Cập nhật thông tin thành công!')
      showEditModal.value = false
    } else {
      error.value = result.message || result.error || 'Có lỗi xảy ra khi cập nhật thông tin'
      alert('Lỗi: ' + error.value)
    }
  } catch (err) {
    console.error('Update profile error:', err)
    error.value = 'Không thể kết nối đến server. Vui lòng thử lại.'
    alert('Lỗi: ' + error.value)
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  try {
    const confirmLogout = confirm('Bạn có chắc chắn muốn đăng xuất?')
    if (!confirmLogout) return

    // Gọi API đăng xuất (nếu có)
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.warn('Logout API error:', err)
      // Tiếp tục đăng xuất local ngay cả khi API lỗi
    }

    // Xóa thông tin user khỏi store
    userStore.logout()
    
    // Chuyển hướng về trang chủ
    router.push('/')
    
  } catch (err) {
    console.error('Logout error:', err)
    // Vẫn thực hiện đăng xuất local nếu có lỗi
    userStore.logout()
    router.push('/')
  }
}

const manageBookings = () => {
  alert('Chuyển đến trang quản lý đặt chỗ...')
}

const handleDeleteAccount = () => {
  alert('Tài khoản đã được xóa!')
}

// Modal helpers
const closeEditModal = () => {
  showEditModal.value = false
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
}

// Lifecycle
onMounted(fetchUserInfo)
</script>

<style scoped>
/* ==========================================
   MODERN USER PROFILE - CUSTOM STYLES
   ========================================== */

/* Custom gradients and modern elements */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #f0f9ff, #e0e7ff);
}

.min-h-screen {
  min-height: 100vh;
}

/* Large Avatar with status indicator */
.avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 10px 25px rgba(29, 78, 216, 0.3);
  border: 4px solid white;
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: var(--success-green);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.role-badge-large {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-6);
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-top: var(--spacing-4);
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
}

/* Grid system */
.grid {
  display: grid;
}

.lg\\:grid-cols-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.lg\\:col-span-2 {
  grid-column: span 2;
}

.md\\:grid-cols-2 {
  grid-template-columns: 1fr 1fr;
}

.gap-6 {
  gap: var(--spacing-6);
}

.gap-8 {
  gap: var(--spacing-8);
}

.space-y-3 > * + * {
  margin-top: var(--spacing-3);
}

.space-y-6 > * + * {
  margin-top: var(--spacing-6);
}

/* Modern info items */
.info-item-modern {
  padding: var(--spacing-4);
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--primary-blue);
  transition: all var(--transition-fast);
}

.info-item-modern:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.info-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--gray-600);
  margin-bottom: var(--spacing-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value-modern {
  font-size: var(--font-size-base);
  color: var(--gray-800);
  font-weight: 600;
  word-break: break-word;
}

/* Special gradient cards */
.gradient-owner {
  background: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  color: white;
}

.gradient-owner .card-header,
.gradient-owner .card-body {
  background: transparent;
}

/* White button for gradient backgrounds */
.btn-white {
  background: rgba(255, 255, 255, 0.9);
  color: var(--gray-800);
  backdrop-filter: blur(10px);
}

.btn-white:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Utility classes */
.w-full {
  width: 100%;
}

.max-w-2xl {
  max-width: 42rem;
}

.max-w-lg {
  max-width: 32rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-4 {
  margin-bottom: var(--spacing-4);
}

.mb-6 {
  margin-bottom: var(--spacing-6);
}

.mb-12 {
  margin-bottom: var(--spacing-12);
}

.mt-4 {
  margin-top: var(--spacing-4);
}

.py-8 {
  padding-top: var(--spacing-8);
  padding-bottom: var(--spacing-8);
}

.py-12 {
  padding-top: var(--spacing-12);
  padding-bottom: var(--spacing-12);
}

.text-3xl {
  font-size: var(--font-size-3xl);
}

.text-xl {
  font-size: var(--font-size-xl);
}

.text-6xl {
  font-size: 4rem;
}

.border-red-200 {
  border-color: #fecaca;
}

.bg-red-50 {
  background-color: #fef2f2;
}

.text-red-600 {
  color: #dc2626;
}

.text-gray-600 {
  color: var(--gray-600);
}

.text-gray-800 {
  color: var(--gray-800);
}

/* Enhanced modal styling */
.modal-content.max-w-2xl {
  max-width: 42rem;
}

.modal-content.max-w-lg {
  max-width: 32rem;
}

/* Responsive design */
@media (max-width: 1024px) {
  .lg\\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .lg\\:col-span-2 {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .avatar-large {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: var(--font-size-2xl);
  }
  
  .py-8 {
    padding-top: var(--spacing-4);
    padding-bottom: var(--spacing-4);
  }
  
  .gap-8 {
    gap: var(--spacing-4);
  }
}

/* Animation enhancements */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: slideUp 0.3s ease-out;
}

.card:nth-child(2) {
  animation-delay: 0.1s;
}

.card:nth-child(3) {
  animation-delay: 0.2s;
}

/* Loading state enhancement */
.loading-spinner {
  width: 40px;
  height: 40px;
  border-width: 4px;
}
</style>
