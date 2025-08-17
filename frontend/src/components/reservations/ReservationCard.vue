<script setup>
import StatusBadge from './StatusBadge.vue'
import ActionButtons from './ActionButtons.vue'
const props = defineProps({ reservation: Object })
const emit = defineEmits(['confirm', 'decline', 'edit', 'delete', 'contact'])
</script>
<template>
  <div class="reservation-card">
    <div class="card-header">
      <div class="hotel-status-row">
        <span class="hotel-name">{{ reservation.hotel }}</span>
        <StatusBadge :status="reservation.status" />
      </div>
    </div>
    <div class="card-body">
      <div class="info-row"><span class="info-label">Guest:</span><span class="info-value">{{ reservation.guest }}</span></div>
      <div class="info-row"><span class="info-label">Adults/Children:</span><span class="info-value">{{ reservation.adults }}/{{ reservation.children }}</span></div>
      <div class="info-row"><span class="info-label">Dates:</span><span class="info-value">{{ reservation.checkIn }} → {{ reservation.checkOut }}</span></div>
      <div class="info-row"><span class="info-label">Total:</span><span class="info-value total-amount">${{ reservation.total }}</span></div>
      <div v-if="reservation.requirements" class="special-req"><i class="fas fa-info-circle"></i>{{ reservation.requirements }}</div>
    </div>
    <div class="card-footer">
      <div class="reservation-id">#{{ reservation.id }}</div>
      <ActionButtons 
        :status="reservation.status" 
        @confirm="$emit('confirm', reservation)"
        @decline="$emit('decline', reservation)" 
        @edit="$emit('edit', reservation)" 
        @delete="$emit('delete', reservation)"
        @contact="$emit('contact', reservation)"
      />
    </div>
  </div>
</template>
<style scoped>
.reservation-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(30,64,175,0.08);
  border: 1px solid #E5E7EB;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  position: relative;
}
.card-header {
  margin-bottom: 1rem;
}
.hotel-status-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.hotel-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  flex-grow: 1;
}
.card-body {
  margin-bottom: 1rem;
}
.info-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}
.info-label {
  color: #6B7280;
  font-weight: 500;
  min-width: 120px;
}
.info-value {
  color: #374151;
  font-weight: 500;
}
.total-amount {
  color: #22C55E;
  font-weight: bold;
}
.special-req {
  background: #DBEAFE;
  color: #1E40AF;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
}
.reservation-id {
  font-size: 0.95rem;
  color: #6B7280;
  font-weight: 500;
}
</style>y