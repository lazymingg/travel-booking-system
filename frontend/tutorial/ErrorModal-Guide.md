# 🚨 Hướng dẫn sử dụng ErrorModal Component

## 📝 Giới thiệu

ErrorModal là một component đơn giản để hiển thị lỗi toàn cục trong ứng dụng Vue. Nó được thiết kế để dễ sử dụng và tự động hiển thị lỗi từ API hoặc các lỗi khác.

## 🏗️ Cấu trúc

```
src/
├── components/ErrorModal.vue     # Component hiển thị modal
├── composables/useError.js      # Quản lý state và logic
└── App.vue                      # Mount global ErrorModal
```

## 🚀 Cách sử dụng

### 1. **Sử dụng tự động (Khuyến nghị)**

```vue
<script setup>
import { useError } from '@/composables/useError.js'

const { handleApiError } = useError()

const callAPI = async () => {
  try {
    const result = await api.post('/some-endpoint', data)
    // Handle success...
    if (!result.succes) {
        handleApiError(result)
    }
  } catch (error) {
    handleApiError(error) // ← Tự động hiển thị ErrorModal
  }
}
</script>
```

### 2. **Sử dụng thủ công**

```vue
<script setup>
import { useError } from '@/composables/useError.js'

const { displayError } = useError()

// Hiển thị lỗi đơn giản
const showError = () => {
  displayError('Có lỗi xảy ra!')
}

// Hiển thị lỗi với chi tiết
const showDetailedError = () => {
  displayError(
    'Không thể tải dữ liệu', 
    'Error 404: API endpoint not found'
  )
}
</script>

<template>
  <button @click="showError">Test lỗi đơn giản</button>
  <button @click="showDetailedError">Test lỗi chi tiết</button>
</template>
```

## 📋 API Reference

### **useError() Composable**

```javascript
const {
  showError,      // ref(Boolean) - Hiển thị modal hay không
  errorMessage,   // ref(String) - Message chính
  errorDetails,   // ref(String) - Chi tiết lỗi
  displayError,   // Function - Hiển thị lỗi thủ công
  clearError,     // Function - Đóng modal
  handleApiError  // Function - Xử lý lỗi API tự động
} = useError()
```

### **displayError(message, details)**

- **message** (String): Thông điệp lỗi chính
- **details** (String, optional): Chi tiết lỗi kỹ thuật

### **handleApiError(error)**

- **error** (Object): Error object từ API hoặc exception
- Tự động parse và hiển thị thông tin phù hợp

## 🎯 Ví dụ thực tế

### **1. Login Form**

```vue
<script setup>
import { ref } from 'vue'
import { useError } from '@/composables/useError.js'
import api from '@/api-helper.js'

const email = ref('')
const password = ref('')
const { handleApiError } = useError()

const handleLogin = async () => {
  try {
    const result = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    
    if (result.success) {
      // Handle success
      router.push('/dashboard')
    } else {
      throw new Error(result.error || 'Đăng nhập thất bại')
    }
  } catch (error) {
    handleApiError(error) // ← ErrorModal tự động hiện
  }
}
</script>
```
