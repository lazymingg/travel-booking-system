<script setup>
const props = defineProps({ status: String })
// Import your SVGs here
import pendingSvg from '@/assets/pendingStatus.svg'
import completedSvg from '@/assets/completedStatus.svg'
import confirmedSvg from '@/assets/confirmedStatus.svg'
import cancelledSvg from '@/assets/cancelledStatus.svg'

const statusMap = {
  completed: { bg: '#F3F4F6', color: '#374151', text: 'Completed', svg: completedSvg },
  confirmed: { bg: '#dcfce7', color: '#22C55E', text: 'Confirmed', svg: confirmedSvg },
  pending: { bg: '#FEF3C7', color: '#F59E0B', text: 'Pending', svg: pendingSvg },
  cancelled: { bg: '#fee2e2', color: '#EF4444', text: 'Cancelled', svg: cancelledSvg },
}
const badge = statusMap[props.status] || statusMap.completed
</script>
<template>
  <span class="status-badge" :style="{ background: badge.bg, color: badge.color }">
    <img :src="badge.svg" alt="Status" class="svg-icon" />
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
.svg-icon {
  width: 1.5em; /* Increased size */
  height: 1.5em;
  vertical-align: middle;
  margin-right: 0.5em;
}
</style>