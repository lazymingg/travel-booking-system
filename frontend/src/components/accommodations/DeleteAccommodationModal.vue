<script setup>
defineProps({
  accommodation: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'delete'])
</script>

<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Delete Property</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>

      <div class="modal-body">
        <p>Are you sure you want to delete <strong>{{ accommodation.name }}</strong>?</p>
        <p class="warning-text">This action cannot be undone.</p>
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" @click="$emit('close')">
          Cancel
        </button>
        <button class="delete-btn" @click="$emit('delete', accommodation.id)">
          Delete Property
        </button>
      </div>
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
  max-width: 400px;
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

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin-bottom: 1rem;
}

.warning-text {
  color: #EF4444;
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e5e5;
}

.cancel-btn, .delete-btn {
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

.delete-btn {
  background: #EF4444;
  color: white;
}

.delete-btn:hover {
  background: #DC2626;
}
</style>
