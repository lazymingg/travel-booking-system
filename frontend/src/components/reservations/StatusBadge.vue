<script setup>
const props = defineProps({ status: String })
const statusMap = {
  completed: { bg: '#F3F4F6', color: '#374151', text: 'Completed', icon: 'fas fa-clock' }, // clock for completed
  confirmed: { bg: '#dcfce7', color: '#22C55E', text: 'Confirmed', icon: 'fas fa-check-circle' }, // tick with circle
  pending: { bg: '#FEF3C7', color: '#F59E0B', text: 'Pending', icon: 'fas fa-clock' }, // clock for pending
  cancelled: { bg: '#fee2e2', color: '#EF4444', text: 'Cancelled', icon: 'fas fa-times-circle' }, // x with circle
}
const badge = statusMap[props.status] || statusMap.completed
</script>
<template>
  <span class="status-badge" :style="{ background: badge.bg, color: badge.color }">
    <i :class="badge.icon" class="status-icon"></i>
    {{ badge.text }}
  </span>
</template>
<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
.status-icon {
  font-size: 0.875em;
}
</style>