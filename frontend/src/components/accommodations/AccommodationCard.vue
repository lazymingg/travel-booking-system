<script setup>
defineProps({
  accommodation: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'view', 'delete'])

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}
</script>

<template>
  <div class="accom-card-container">
    <!-- Added fallback for missing images -->
    <img
      :src="accommodation.image || '/placeholder.svg?height=200&width=300'"
      :alt="accommodation.name"
      class="accom-card-image"
    />
    <div class="accom-card-text-container">
      <h3 class="accom-card-content-title">{{ accommodation.name }}</h3>
      <p class="accom-card-content-city">{{ accommodation.city }}</p>
      <p class="accom-card-content-rating">{{ accommodation.rating }}/5.0</p>
      <!-- Fixed currency format to match original -->
      <p class="accom-card-content-price">{{ Math.round(accommodation.price).toLocaleString('vi-VN') }} VND</p>

      <div class="accom-card-action-container">
        <button
          class="accom-card-action-btn edit-btn"
          @click="$emit('edit', accommodation)"
        >
          Edit
        </button>
        <button
          class="accom-card-action-btn view-btn"
          @click="$emit('view', accommodation)"
        >
          View
        </button>
        <button
          class="accom-card-action-btn delete-btn"
          @click="$emit('delete', accommodation)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accom-card-container {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.2s;
}

.accom-card-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.accom-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.accom-card-text-container {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.accom-card-content-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
  margin: 0;
}

.accom-card-content-city {
  color: #6B7280;
  font-size: 0.9rem;
  margin: 0;
}

.accom-card-content-rating {
  color: #F59E0B;
  font-weight: 600;
  margin: 0;
}

.accom-card-content-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #059669;
  margin: 0;
}

.accom-card-action-container {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.accom-card-action-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn {
  background: #3B82F6;
  color: white;
}

.edit-btn:hover {
  background: #2563EB;
}

.view-btn {
  background: #10B981;
  color: white;
}

.view-btn:hover {
  background: #059669;
}

.delete-btn {
  background: #EF4444;
  color: white;
}

.delete-btn:hover {
  background: #DC2626;
}
</style>

