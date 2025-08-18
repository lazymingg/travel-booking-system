<script setup>
const props = defineProps({
  reservations: Array,
  activeTab: String,
})
const emit = defineEmits(['changeTab'])
const tabs = [
  { label: 'All reservations', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]
function getCount(tab) {
  if (tab.value === 'all') return props.reservations.length
  return props.reservations.filter(r => r.status === tab.value).length
}
</script>
<template>
  <div class="tabs-container">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tab-btn', activeTab === tab.value ? 'tab-active' : 'tab-inactive']"
      @click="emit('changeTab', tab.value)"
    >
      {{ tab.label }}
      <span class="tab-count">({{ getCount(tab) }})</span>
    </button>
  </div>
</template>
<style scoped>
.tabs-container {
  display: flex;
  gap: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 2rem;
}
.tab-btn {
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.75rem 0;
  cursor: pointer;
  color: #6B7280;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  transition: color 0.2s, border-color 0.2s;
}
.tab-active {
  color: #1E40AF;
  border-bottom: 2px solid #1E40AF;
  font-weight: 600;
}
.tab-inactive:hover {
  color: #374151;
}
.tab-count {
  font-size: 0.95em;
  margin-left: 0.25em;
  color: #6B7280;
}
</style>