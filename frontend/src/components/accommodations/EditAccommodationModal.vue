<script setup>
import { ref, watch } from 'vue'
import { defineEmits } from 'vue'

const props = defineProps({
  accommodation: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'save'])

const form = ref({ ...props.accommodation })

watch(() => props.accommodation, (newAccommodation) => {
  form.value = { ...newAccommodation }
}, { immediate: true })

function handleSubmit() {
  if (form.value.name && form.value.city && form.value.price > 0) {
    emit('save', { ...form.value })
  }
}
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Edit Property</h3>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label>Property Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="Enter property name"
          />
        </div>

        <div class="form-group">
          <label>City</label>
          <input
            v-model="form.city"
            type="text"
            required
            placeholder="Enter city"
          />
        </div>

        <div class="form-group">
          <label>Price (VND)</label>
          <input
            v-model.number="form.price"
            type="number"
            required
            min="0"
            placeholder="Enter price"
          />
        </div>

        <div class="form-group">
          <label>Rating</label>
          <input
            v-model.number="form.rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
          />
        </div>

        <div class="modal-actions">
          <button type="button" class="cancel-btn" @click="emit('close')">
            Cancel
          </button>
          <button type="submit" class="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6B7280;
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn, .save-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn {
  background: #F3F4F6;
  color: #374151;
}

.save-btn {
  background: #3B82F6;
  color: white;
}

.save-btn:hover {
  background: #2563EB;
}
</style>
