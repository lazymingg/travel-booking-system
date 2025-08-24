<template>
  <div
    :class="['accommodation_card', { clickable: props.clickable }]"
    @click="handleCardClick"
    @keydown.enter.prevent="handleCardClick"
    @keydown.space.prevent="handleCardClick"
    :role="props.clickable ? 'button' : undefined"
    :tabindex="props.clickable ? 0 : -1"
    :aria-label="props.accommodation?.name || 'accommodation card'"
  >
    <div class="card_image">
      <img class="accommodation_image" :src="imageSrc" :alt="props.accommodation.name">
    </div>
    <div class="card_content">
      <h3 class="accommodation_name">{{ props.accommodation.name }}</h3>
      <p class="accommodation_address">{{ props.accommodation.address }}, {{ props.accommodation.city }}, {{ props.accommodation.country }}</p>
      
      <div class="accommodation_details">
        <span class="type_badge">{{ props.accommodation.type }}</span>
        <span v-if="props.showStatus" class="status_badge" :class="props.accommodation.status">{{ props.accommodation.status }}</span>
      </div>
      
      <div class="stats">
        <div class="rating">
          <span class="rating_badge">{{ Number(props.accommodation.rating || 0).toFixed(1) }}</span>
          <span class="rating_text">{{ props.accommodation.reviews || 0 }} reviews</span>
        </div>
        <div class="room_info">
          <span>{{ props.accommodation.room_count || 0 }} rooms</span>
        </div>
      </div>
      
      <div class="price_range">
        <template v-if="props.accommodation.min_price && props.accommodation.max_price">
          Price: ${{ props.accommodation.min_price }} - ${{ props.accommodation.max_price }} per day
        </template>
        <template v-else-if="props.accommodation.price">
          Price: ${{ props.accommodation.price }} per day
        </template>
      </div>
      
      <!-- Action buttons slot for different use cases -->
      <div v-if="$slots.actions" class="card_actions">
        <slot name="actions" :accommodation="props.accommodation"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  accommodation: {
    type: Object,
    required: true
  },
  showStatus: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  }
})
import { computed } from 'vue'
import convertImagePath from '@/utils/imagePath.js'

const imageSrc = computed(() => convertImagePath(props.accommodation?.image))

const emit = defineEmits(['click'])

function handleCardClick() {
  if (props.clickable) {
    emit('click', props.accommodation)
  }
}
</script>

<style scoped>
.accommodation_card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.accommodation_card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.accommodation_card.clickable {
  cursor: pointer;
}

.card_image {
  height: 200px;
  background-color: #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.accommodation_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card_content {
  padding: 1.25rem;
}

.accommodation_name {
  color: #1D4ED8;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.accommodation_address {
  color: #6B7280;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.accommodation_details {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.type_badge {
  background-color: #EBF5FF;
  color: #1D4ED8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status_badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status_badge.approved {
  background-color: #D1FAE5;
  color: #065F46;
}

.status_badge.pending {
  background-color: #FEF3C7;
  color: #92400E;
}

.status_badge.rejected {
  background-color: #FEE2E2;
  color: #991B1B;
}

.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating_badge {
  background-color: #FACC15;
  color: #2563EB;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.rating_text {
  color: #4B5563;
  font-size: 0.8rem;
}

.room_info {
  color: #4B5563;
  font-size: 0.85rem;
}

.price_range {
  color: #1D4ED8;
  font-weight: 600;
  font-size: 0.9rem;
}

.card_actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
}

/* Responsive Design */
@media (max-width: 480px) {
  .accommodation_details {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
