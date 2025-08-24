<script setup>
import { ref, watch } from 'vue'
import calendarSvg from '@/assets//manageReservationIcons/edit_Check_in_out.svg' 
import moneySvg from '@/assets//manageReservationIcons/money.svg'

const props = defineProps({ reservation: Object })
const emit = defineEmits(['save', 'close'])

const form = ref({
  status: props.reservation.status,
  check_in_date: props.reservation.check_in_date,
  check_out_date: props.reservation.check_out_date,
  total_price: props.reservation.total_price,
  booking_id: props.reservation.booking_id
})

watch(() => props.reservation, (newVal) => {
  form.value = {
    status: newVal.status,
    check_in_date: newVal.check_in_date,
    check_out_date: newVal.check_out_date,
    total_price: newVal.total_price,
    booking_id: newVal.booking_id
  }
})

function save() {
  emit('save', { ...form.value }
  )
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Edit Reservation</h2>
        <button @click="$emit('close')" class="close-btn">&times;</button>
      </div>
      <form @submit.prevent="save">
        <div class="form-group">
          <label class="form-label">Status</label>
          <select v-model="form.status" class="form-input">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <img :src="calendarSvg" alt="Check-in" class="svg-label" />
              Check-in
            </label>
            <input type="date" v-model="form.check_in_date" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">
              <img :src="calendarSvg" alt="Check-out" class="svg-label" />
              Check-out
            </label>
            <input type="date" v-model="form.check_out_date" class="form-input" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">
            <img :src="moneySvg" alt="Total" class="svg-label" />
            Total amount
          </label>
          <input type="number" min="0" v-model="form.total_price" class="form-input" />
        </div>
        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.svg-label {
  width: 1.25em;
  height: 1.25em;
  vertical-align: middle;
  margin-right: 0.5em;
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
  box-shadow: 0 8px 32px rgba(30,64,175,0.2);
  padding: 2rem;
  max-width: 550px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E5E7EB;
}
.modal-header h2 {
  color: #374151;
  font-size: 1.5rem;
  font-weight: bold;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #6B7280;
  cursor: pointer;
  transition: color 0.2s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.close-btn:hover {
  color: #1E40AF;
  background: #DBEAFE;
}
.form-group {
  margin-bottom: 1.25rem;
}
.form-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}
.form-input, .form-textarea {
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: #fff;
  color: #374151;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #1E40AF;
  box-shadow: 0 0 0 3px rgba(30,64,175,0.1);
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-row .form-group {
  flex: 1;
}
.form-textarea {
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
}
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
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
  transition: all 0.2s;
}
.btn-primary {
  background: #1E40AF;
  color: #fff;
}
.btn-primary:hover {
  background: #1e3a8a;
  transform: translateY(-1px);
}
.btn-secondary {
  background: #E5E7EB;
  color: #374151;
}
.btn-secondary:hover {
  background: #d1d5db;
}
</style>