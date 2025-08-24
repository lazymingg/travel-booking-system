<template>
  <HeaderModal />
  <div class="main-bg">
    <div class="main-container">
      <div class="profile-section">
        <div class="profile-header">
          <div class="avatar-section">
            <div class="avatar">
              <span class="avatar-text">{{ userInfo.full_name.charAt(0) }}</span>
            </div>
            <h2 class="profile-title">Thông tin cá nhân</h2>
          </div>
        </div>

        <div class="profile-content">
          <div v-if="loading" class="loading-state">
            <p>Đang tải thông tin...</p>
          </div>

          <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
            <button @click="fetchUserInfo" class="btn btn-primary">Thử lại</button>
          </div>

          <div v-else class="info-grid">
            <div class="info-item">
              <label>Họ và tên</label>
              <div class="info-value">{{ userInfo.full_name }}</div>
            </div>

            <div class="info-item">
              <label>Email</label>
              <div class="info-value">{{ userInfo.email }}</div>
            </div>

            <div class="info-item">
              <label>Số điện thoại</label>
              <div class="info-value">{{ userInfo.phone_number }}</div>
            </div>

            <div class="info-item">
              <label>Địa chỉ</label>
              <div class="info-value">{{ userInfo.address }}</div>
            </div>

            <div class="info-item">
              <label>Vai trò</label>
              <div class="info-value role-badge">{{ roleDisplay }}</div>
            </div>

            <div class="info-item">
              <label>Ngày tạo tài khoản</label>
              <div class="info-value">{{ formatDate(userInfo.created_at) }}</div>
            </div>

            <div class="info-item">
              <label>Cập nhật lần cuối</label>
              <div class="info-value">{{ formatDate(userInfo.updated_at) }}</div>
            </div>
          </div>

          <div v-if="!loading && !error" class="action-buttons">
            <button @click="showEditModal = true" class="btn btn-primary">
              <span class="btn-icon">✏️</span>
              Cập nhật thông tin
            </button>

            <button @click="manageBookings" class="btn btn-secondary">
              <span class="btn-icon">📋</span>
              Quản lý đặt chỗ
            </button>

            <button @click="showSignoutModal = true" class="btn btn-secondary">
              <img class = "sign_out_icon" src="../assets/icon/sign_out_icon.svg" alt="sign out icon" />
              Sign out
            </button>

            <button @click="showDeleteModal = true" class="btn btn-danger">
              <span class="btn-icon">🗑️</span>
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal Component -->
    <EditProfileModal
      :show="showEditModal"
      :userInfo="userInfo"
      @close="showEditModal = false"
      @update="handleUpdateProfile"
    />

    <SignoutModal
      :show="showSignoutModal"
      @close="showSignoutModal = false"
      @signed_out="signoutAccount"/>

    <!-- Delete Account Modal Component -->
    <DeleteAccountModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @delete="handleDeleteAccount"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import EditProfileModal from '@/components/EditProfileModal.vue'
import DeleteAccountModal from '@/components/DeleteAccountModal.vue'
import api from '@/frontend-api-helper.js'
import HeaderModal from '@/components/HeaderModal.vue'
import SignoutModal from '@/components/SignoutModal.vue'

const router = useRouter()

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
const showSignoutModal = ref(false)
const loading = ref(true)
const error = ref(null)

// Computed
const roleDisplay = computed(() => {
  const roleMap = {
    'customer': 'Khách hàng',
    'admin': 'Quản trị viên',
    'staff': 'Nhân viên'
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
const handleUpdateProfile = (updatedData) => {
  Object.assign(userInfo, updatedData)
  alert('Cập nhật thông tin thành công!')
}

const manageBookings = () => {
  alert('Chuyển đến trang quản lý đặt chỗ...')
}

const signoutAccount = () => {
  alert('Chuyển đến trang đăng xuất!')
}

const handleDeleteAccount = () => {
  alert('Tài khoản đã được xóa!')
}

// Lifecycle
onMounted(fetchUserInfo)
</script>

<style scoped>
:root {
  font-size: 16px;
}

.main-bg {
  min-height: 100vh;
  width: 100vw;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 1.25rem; */
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  /* max-width: 100vw; */
  min-height: 60vh;
  /* background-color: #667eea; */
  /* border-radius: 2rem; */
  /* box-shadow: 0 0.5rem 2rem 0 rgba(31, 38, 135, 0.18); */
  /* backdrop-filter: blur(0.625rem); */
  /* -webkit-backdrop-filter: blur(0.625rem); */
  overflow: hidden;
}

.profile-section {
  width: 100%;
  padding: 2.5rem;
  /* background: yellow; */
  /* border-radius: 1.5rem; */
  /* box-shadow: 0 0.25rem 1.5rem 0 rgba(31, 38, 135, 0.10); */
  margin: 1.25rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
}

.avatar-text {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vt-c-white);
}

.profile-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
  /* theem vien */
  /* border-color: var(--color-border); */
  gap: 1.875rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  gap: 1.25rem;
}

.info-item {
  background: (--color-background);
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
}

.info-item label {
  display: block;
  font-size: 0.875rem;
  color: var(--vt-c-text-light-2);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.info-value {
  font-size: 1.1rem;
  color: var(--color-text);
  font-weight: 500;
}

.role-badge {
  display: inline-block;
  background: var(--color-border);
  color: var(--color-text);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 1rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  margin-top: 1.25rem;
  font-weight: 500;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 600;
}

.btn-primary {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.btn-primary:hover {
  transform: translateY(-0.125rem);
  background-color: var(--color-border);
}

.btn-secondary {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.btn-secondary:hover {
  transform: translateY(-0.125rem);
  background-color: var(--color-border);
}

.btn-danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: var(--vt-c-white);
}

.btn-danger:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 0.25rem 0.75rem rgba(255, 107, 107, 0.4);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 1.2rem;
  /* font-weight: 600; */
}

.sign_out_icon {
    width: 1.5rem;
    height: 1.5rem;
}

/* Responsive Design using rem */
@media (max-width: 48rem) { /* 768px */
  .main-container {
    margin: 0.625rem;
  }

  .profile-section {
    padding: 1.25rem;
    margin: 0.625rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    gap: 0.75rem;
  }

  .btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }

  .modal-content {
    width: 95%;
    margin: 0.625rem;
  }

  .profile-title {
    font-size: 1.5rem;
  }

  .avatar {
    width: 4rem;
    height: 4rem;
  }

  .avatar-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 30rem) { /* 480px */
  .main-bg {
    padding: 0.5rem;
  }

  .profile-section {
    padding: 1rem;
    margin: 0.5rem;
  }

  .info-item {
    padding: 1rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .modal-content {
    width: 98%;
    margin: 0.25rem;
  }

  .modal-header,
  .edit-form,
  .delete-content {
    padding: 1rem;
  }

  .modal-actions {
    padding: 1rem;
  }
}

@media (max-width: 20rem) { /* 320px */
  .profile-title {
    font-size: 1.25rem;
  }

  .info-value {
    font-size: 1rem;
  }

  .btn {
    font-size: 0.75rem;
  }
}

.loading-state, .error-state {
  text-align: center;
  padding: 2rem;
  color: var(--color-text);
}

.loading-state p {
  font-size: 1.2rem;
  color: var(--vt-c-text-light-2);
}

.error-state p {
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
</style>
