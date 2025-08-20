<template>
  <div v-if="show" class="error-overlay" @click="closeError">
    <div class="error-modal" @click.stop>
      <div class="error-header">
        <h3>❌ Lỗi</h3>
        <button class="close-btn" @click="closeError">×</button>
      </div>
      <div class="error-content">
        <p>{{ message }}</p>
        <div v-if="details" class="error-details">
          <details>
            <summary>Chi tiết lỗi</summary>
            <pre>{{ details }}</pre>
          </details>
        </div>
      </div>
      <div class="error-footer">
        <button class="ok-btn" @click="closeError">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Có lỗi xảy ra'
  },
  details: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const closeError = () => {
  emit('close')
}
</script>

<style scoped>
.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.error-modal {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.error-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #dc2626;
  color: white;
  border-radius: 8px 8px 0 0;
}

.error-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.error-content {
  padding: 20px;
}

.error-content p {
  margin: 0 0 16px 0;
  font-size: 16px;
  line-height: 1.5;
}

.error-details {
  margin-top: 16px;
}

.error-details summary {
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 8px;
}

.error-details pre {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.error-footer {
  padding: 16px 20px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}

.ok-btn {
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.ok-btn:hover {
  background-color: #b91c1c;
}
</style>
