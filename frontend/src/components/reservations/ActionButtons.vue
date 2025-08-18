<script setup>
const props = defineProps({ status: String })
const emit = defineEmits(['confirm', 'decline', 'edit', 'delete', 'contact'])
import deleteSvg from '@/assets/manageReservationIcons/buttons/deleteButton.svg'
import confirmSvg from '@/assets/manageReservationIcons/buttons/confirmButton.svg'
import declineSvg from '@/assets/manageReservationIcons/buttons/declineButton.svg'
import contactSvg from '@/assets/manageReservationIcons/buttons/contactButton.svg'
import editSvg from '@/assets/manageReservationIcons/buttons/editButton.svg'


</script>
<template>
  <div class="card-actions">
    <!-- Pending Status Buttons -->
    <template v-if="status === 'pending'">
      <button class="btn btn-success" @click="$emit('confirm')" title="Move to Confirmed">
        <img :src="confirmSvg" alt="Confirm" class="svg-icon" /> Confirm
      </button>
      <button class="btn btn-danger" @click="$emit('decline')" title="Remove reservation">
        <img :src="declineSvg" alt="Decline" class="svg-icon" /> Decline
      </button>
      <button class="btn btn-primary" @click="$emit('edit')" title="Edit reservation details">
        <img :src="editSvg" alt="Edit" class="svg-icon" /> Edit
      </button>
      <button class="btn btn-secondary" @click="$emit('contact')" title="Contact guest">
        <img :src="contactSvg" alt="Contact" class="svg-icon" /> Contact Guest
      </button>
    </template>
    <!-- Confirmed Status Buttons -->
    <template v-else-if="status === 'confirmed'">
      <button class="btn btn-danger" @click="$emit('delete')" title="Move to Cancelled">
        <img :src="deleteSvg" alt="Delete" class="svg-icon" /> Delete
      </button>
      <button class="btn btn-primary" @click="$emit('edit')" title="Edit reservation details">
        <img :src="editSvg" alt="Edit" class="svg-icon" /> Edit
      </button>
      <button class="btn btn-secondary" @click="$emit('contact')" title="Contact guest">
        <img :src="contactSvg" alt="Contact" class="svg-icon" /> Contact Guest
      </button>
    </template>
    <!-- Completed & Cancelled Status Buttons -->
    <template v-else>
      <button class="btn btn-primary" @click="$emit('edit')" title="Edit reservation details">
        <img :src="editSvg" alt="Edit" class="svg-icon" /> Edit
      </button>
      <button class="btn btn-secondary" @click="$emit('contact')" title="Contact guest">
        <img :src="contactSvg" alt="Contact" class="svg-icon" /> Contact Guest
      </button>
    </template>
  </div>
</template>
<style scoped>
.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.2s, color 0.2s, transform 0.1s;
}
.btn:hover {
  transform: translateY(-1px);
}
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  margin-right: 0.5em;
}
.btn-primary {
  background: #1E40AF;
  color: #fff;
}
.btn-primary:hover {
  background: #1e3a8a;
}
.btn-success {
  background: #22C55E;
  color: #fff;
}
.btn-success:hover {
  background: #16a34a;
}
.btn-secondary {
  background: #E5E7EB;
  color: #374151;
}
.btn-secondary:hover {
  background: #d1d5db;
}
.btn-danger {
  background: #EF4444;
  color: #fff;
}
.btn-danger:hover {
  background: #dc2626;
}
</style>