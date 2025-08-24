<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import api from '@/frontend-api-helper.js'
import { useError } from '@/composables/useError.js'
// Trong component Login.vue
import { useUserStore } from '../../stores/user.js'

const userStore = useUserStore()

const email = ref('')
const password = ref('')
const router = useRouter()
const { handleApiError } = useError()

const handleLogin = async () => {
  try {
    const result = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    if (result.success) {
      console.log('Login thành công:', result.message);
      router.push('/');
      // Lưu thông tin user vào store
      userStore.login({ name: result.data.full_name });
    } else {
      console.error('Login thất bại:', result.message);
      handleApiError(result);
    }
  } catch (error) {
    console.error('Login error:', error);
    handleApiError(error);
  }
};
</script>

<template>
  <div class="main-bg">
    <div class="main-container">
      <div class="sign-in-form">
        <h2 class="form-title">Đăng nhập</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Nhập email" />
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input type="password" id="password" v-model="password" placeholder="Nhập mật khẩu" />
          </div>
          <button type="submit" class="login-btn">Đăng nhập</button>
        </form>
      </div>
      <div class="hero-image">
        <img src="../assets/hero-img-signin.jpg" alt="Hero Image" class="hero-img" />
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}
.main-bg {
  min-height: 100vh;
  width: 100vw;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80vw;
  max-width: 80vw;
  min-height: 70vh;
  max-height: 80vh;
  /* background: rgba(255, 255, 255, 0.1); */
  border: 2px solid var(--color-border);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
}

.sign-in-form {
  flex: 1;
  min-width: 320px;
  max-width: 400px;
  padding: 48px 32px;
  /* background: rgba(255, 255, 255, 0.55); */
  /* border-radius: 24px; */
  /* box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.10); */
  margin: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-title {
  margin-bottom: 32px;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  letter-spacing: 1px;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-size: 1rem;
  color: #444;
}

input[type="email"],
input[type="password"] {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: rgba(255,255,255,0.8);
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
input[type="email"]:focus,
input[type="password"]:focus {
  border: 1.5px solid #7f53ac;
}

.login-btn {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  background: var(--color-border);
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(100, 125, 222, 0.15);
  transition: background 0.2s;
}
.login-btn:hover {
  background: var(--color-border-hover);
}

.hero-image {
  flex: 1;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.hero-img {
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  /* border-radius: 0 32px 32px 0; */
}

@media (max-width: 900px) {
  .main-container {
    flex-direction: column;
    width: 95vw;
    min-height: 90vh;
  }
  .hero-image {
    min-height: 200px;
    border-radius: 0 0 32px 32px;
  }
  .hero-img {
    border-radius: 0 0 32px 32px;
  }
}
</style>
