<script setup>
import { computed } from 'vue'
const props = defineProps({ reservation: Object })
const emit = defineEmits(['close', 'delete'])
const details = computed(() => props.reservation || {})
</script>
<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-content">
          <i class="fas fa-ban cancel-icon"></i>
          <h2 class="modal-title">Cancel reservation</h2>
        </div>
      </div>
      <div class="modal-body">
        <p class="warning-text">This will move the reservation to cancelled status.</p>
        <div class="guest-info-box">
          <div><strong>Guest:</strong> {{ details.guest }}</div>
          <div><strong>Hotel:</strong> {{ details.hotel }}</div>
          <div><strong>Dates:</strong> {{ details.checkIn }} → {{ details.checkOut }}</div>
          <div><strong>Total:</strong> ${{ details.total }}</div>
        </div>
        <div class="warning-section">
          <ul>
            <li>Move reservation to cancelled status</li>
            <li>Send cancellation notification to the guest</li>
            <li>Process refunds according to cancellation policy</li>
            <li>Reservation will appear in Cancelled filter</li>
          </ul>
        </div>
        <div class="modal-actions">
          <button @click="$emit('close')" class="btn btn-secondary">Keep Confirmed</button>
          <button @click="$emit('delete', details.id)" class="btn btn-danger">Cancel Reservation</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(55,65,81,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-container {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(30,64,175,0.15);
  padding: 2rem;
  max-width: 500px;
  width: 90%;
}
.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}
.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.cancel-icon {
  color: #EF4444;
  font-size: 2rem;
}
.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
}
.warning-text {
  color: #F59E0B;
  font-weight: 600;
  margin-bottom: 1rem;
}
.guest-info-box {
  background: #F3F4F6;
  padding: 1rem;
  border-radius: 0.75rem;
  color: #374151;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.warning-section {
  background: #FEF9C3;
  border-left: 4px solid #FACC15;
  color: #B45309;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}
.warning-section ul {
  margin: 0;
  padding-left: 1.25rem;
}
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: background 0.2s, color 0.2s, transform 0.1s;
}
.btn:hover {
  transform: translateY(-1px);
}
.btn-danger {
  background: #EF4444;
  color: #fff;
}
.btn-danger:hover {
  background: #dc2626;
}
.btn-secondary {
  background: #E5E7EB;
  color: #374151;
}
.btn-secondary:hover {
  background: #d1d5db;
}
</style>