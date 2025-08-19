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
  gap: 1.5rem;
}

/* Nhóm field */
.form-group {
  display: flex;
  flex-direction: column;
}

/* Dấu * bắt buộc */
.required {
  color: #ef4444;
}

/* Nhãn */
.form-label {
  font-size: 0.85rem; /* nhỏ hơn 0.95rem */
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #111827;
}

/* Input & Select dùng chung */
.form-input {
  width: 100%;
  padding: 0.5rem; /* nhỏ hơn 0.75rem */
  border: 1px solid #d1d5db;
  border-radius: 0.4rem;
  font-size: 0.9rem; /* nhỏ hơn 1rem */
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;
}


.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}
</style>
