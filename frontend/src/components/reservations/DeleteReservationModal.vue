<script setup>
import { computed } from 'vue'
import trashSvg from '@/assets/manageReservationIcons/buttons/deleteButton.svg'
import warningSvg from '@/assets//manageReservationIcons/warning.svg'

const props = defineProps({ reservation: Object })
const emit = defineEmits(['close', 'delete'])
const details = computed(() => props.reservation || {})
</script>
<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <!-- Header: circle avatar on the left, title group on the right -->
      <div class="title-header-row">
        <div class="circle-avatar">
          <img :src="trashSvg" alt="Cancel" class="circle-icon" />
        </div>
        <div class="title-group">
          <h2 class="modal-title">Cancel reservation</h2>
          <div class="warning-row">
            <p class="warning-text">
              This action <strong>cannot be undone</strong>.
            </p>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="guest-info-box">
          <div><strong>Guest:</strong> {{ details.guest_name }}</div>
          <div><strong>Hotel:</strong> {{ details.accommodation_name }}</div>
          <div><strong>Dates:</strong> {{ details.check_in_date }} → {{ details.check_out_date }}</div>
          <div><strong>Total:</strong> ${{ details.total_price }}</div>
        </div>
        <div class="warning-section">
          <div class="warning-section-row">
            <img :src="warningSvg" alt="Action" class="action-svg" />
            <ul>
              <li>Move reservation to cancelled status</li>
              <li>Send cancellation notification to the guest</li>
              <li>Process refunds according to cancellation policy</li>
              <li>Reservation will appear in Cancelled filter</li>
            </ul>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="$emit('close')" class="btn btn-secondary">Keep Confirmed</button>
          <button @click="$emit('delete', details.booking_id)" class="btn btn-danger">Cancel Reservation</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title-header-row {
  display: flex;
  align-items: center;
  gap: 1.5em;
  margin-bottom: 1.5em;
  /* Make sure the row is horizontally centered in the modal */
  justify-content: flex-start;
}

.circle-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  border-radius: 50%;
  width: 5em;
  height: 5em;
  flex-shrink: 0;
  /* Center vertically relative to the group */
  margin-right: 0.5 em;
}

.circle-icon {
  width: 3.5em;
  height: 3.5em;
  display: block;
}

.title-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 0.5rem;
}

.warning-row {
  margin-bottom: 0.5em;
}

.warning-text {
  color: #F59E0B;
  font-weight: 600;
  margin-bottom: 0;
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

.warning-section-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75em;
}

.action-svg {
  width: 2.0em;
  height: 2.0em;
  margin-top: 0.25em;
}

.warning-section ul {
  margin: 0;
  padding-left: 1.25rem;
}

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