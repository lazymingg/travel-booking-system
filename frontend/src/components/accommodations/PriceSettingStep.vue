<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const data = ref(props.modelValue)

function updateData() {
  emit('update:modelValue', data.value)
}

function updateRoomPrice(roomId, field, value) {
  const room = data.value.rooms.find(r => r.id === roomId)
  if (room) {
    if (!room.pricing) {
      room.pricing = {
        pricePerDay: 0,
        salePercentage: 10
      }
    }
    room.pricing[field] = value
    updateData()
  }
}

function calculateFinalAmount(room) {
  if (!room.pricing || !room.pricing.pricePerDay) return 0
  const commission = room.pricing.pricePerDay * 0.1 // 10% commission
  return room.pricing.pricePerDay - commission
}
</script>

<template>
  <div class="price-setting-step">
    <div class="check-in-section">
      <label>Choose a way for guest check in</label>
      <div class="radio-group">
        <label class="radio-option">
          <input
            type="radio"
            value="preservation"
            v-model="data.checkInMethod"
            @change="updateData"
          />
          Preservation / at the place
        </label>
      </div>
    </div>

    <div v-for="room in data.rooms" :key="room.id" class="room-pricing-section">
      <h3>{{ room.name }}</h3>

      <div class="pricing-grid">
        <div class="pricing-form">
          <div class="price-settings">
            <h4>Price settings:</h4>

            <div class="price-input-group">
              <label>Price per day</label>
              <div class="price-input">
                <input
                  type="number"
                  :value="room.pricing?.pricePerDay || ''"
                  @input="updateRoomPrice(room.id, 'pricePerDay', parseInt($event.target.value) || 0)"
                  placeholder="1,000,000"
                />
                <span class="currency">VND</span>
              </div>
            </div>

            <div class="commission-info">
              <p>WeGo will take 10% commission from customers' bookings. So the final amount you have will be shown below</p>
              <div class="final-amount">
                → The amount of money you get is: {{ calculateFinalAmount(room).toLocaleString() }} VND
              </div>
            </div>

            <div class="sale-settings">
              <h4>Sale of settings:</h4>
              <p>You will set the maximum promotion percentage you can make when WeGo decides to create a promotion event.</p>

              <div class="sale-input-group">
                <label>
                  <input
                    type="checkbox"
                    :checked="room.pricing?.saleEnabled || false"
                    @change="updateRoomPrice(room.id, 'saleEnabled', $event.target.checked)"
                  />
                  Sale of
                </label>
                <div class="sale-input">
                  <input
                    type="number"
                    :value="room.pricing?.salePercentage || 10"
                    @input="updateRoomPrice(room.id, 'salePercentage', parseInt($event.target.value) || 0)"
                    min="0"
                    max="100"
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="requirements-section">
          <div class="requirements-box">
            <h4>Other requirement you need guest to cooperate</h4>
            <div class="note-section">
              <label>Note if you have</label>
              <textarea
                :value="room.guestRequirements || ''"
                @input="updateRoomPrice(room.id, 'guestRequirements', $event.target.value)"
                placeholder="Enter any special requirements..."
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-setting-step {
  padding: 1rem 0;
}

.check-in-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.check-in-section > label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 1rem;
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.room-pricing-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.room-pricing-section:last-child {
  border-bottom: none;
}

.room-pricing-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}

.pricing-form h4 {
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.price-input-group {
  margin-bottom: 1.5rem;
}

.price-input-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.price-input {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
}

.price-input input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  outline: none;
}

.currency {
  padding: 0.75rem;
  background: #f9fafb;
  color: #6b7280;
  font-weight: 500;
}

.commission-info {
  background: #f0f9ff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.commission-info p {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 0.875rem;
}

.final-amount {
  font-weight: 600;
  color: #1d4ed8;
}

.sale-settings {
  margin-top: 1.5rem;
}

.sale-settings p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.5rem 0 1rem 0;
}

.sale-input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sale-input-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.sale-input {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 80px;
}

.sale-input input {
  width: 50px;
  padding: 0.5rem;
  border: none;
  outline: none;
  text-align: center;
}

.sale-input span {
  padding: 0.5rem;
  background: #f9fafb;
  color: #6b7280;
}

.requirements-section {
  display: flex;
  flex-direction: column;
}

.requirements-box {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.requirements-box h4 {
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
}

.note-section label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.note-section textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  resize: vertical;
  font-family: inherit;
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
