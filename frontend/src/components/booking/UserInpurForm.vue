<template>
  <div class="form-grid">
    <div class="form-group">
      <label class="form-label">
        Full name <span class="required">*</span>
      </label>
      <input 
        v-model="formData.fullName"
        type="text" 
        class="form-input"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label">
        Email <span class="required">*</span>
      </label>
      <input 
        v-model="formData.email"
        type="email" 
        class="form-input"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label">
        Address <span class="required">*</span>
      </label>
      <input 
        v-model="formData.address"
        type="text" 
        class="form-input"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label">
        Phone number <span class="required">*</span>
      </label>
      <input 
        v-model="formData.phone"
        type="tel" 
        class="form-input"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label">
        Payment method <span class="required">*</span>
      </label>
      <select 
        v-model="formData.paymentMethod"
        class="form-input"
        required
      >
        <option value="">Select payment method</option>
        <option value="credit-card">Credit Card</option>
        <option value="debit-card">Debit Card</option>
        <option value="paypal">PayPal</option>
        <option value="bank-transfer">Bank Transfer</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const formData = reactive({
  fullName: '',
  email: '',
  address: '',
  phone: '',
  paymentMethod: ''
})

watch(formData, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>

<style scoped>
/* Layout tổng */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;            /* tương đương space-y-6 */
}

/* Nhóm field */
.form-group {
  display: flex;
  flex-direction: column;
}

/* Nhãn */
.form-label {
  font-size: 0.95rem;     /* text-sm-ish */
  font-weight: 600;       /* font-medium */
  margin-bottom: 0.5rem;  /* mb-2 */
  color: #111827;         /* xám rất đậm */
}

/* Dấu * bắt buộc */
.required {
  color: #ef4444;         /* đỏ */
}

/* Input & Select dùng chung */
.form-input {
  width: 100%;
  padding: 0.75rem;       /* p-3 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem;  /* rounded */
  font-size: 1rem;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #3b82f6;  /* blue-500 */
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15); /* hiệu ứng focus */
}

/* Tinh chỉnh cho select (nếu cần) */
/* .form-input[type="select"] { } */
</style>
