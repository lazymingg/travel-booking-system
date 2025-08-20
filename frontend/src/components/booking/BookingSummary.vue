<script setup>
const props = defineProps({
  checkIn: {
    type: String,
    default: '13/08/2025'
  },
  checkOut: {
    type: String,
    default: '15/08/2025'
  },
  selection: {
    type: String,
    default: '1 rooms for 2 people'
  },
  description: {
    type: String,
    default: 'Two-bedrooms apartment with balcony'
  },
  price: {
    type: String,
    default: '$ 200'
  }
})
</script>

<template>
  <div class="booking-summary">
    <h2 class="booking-title">Your booking</h2>
    <div class="booking-divider"></div>
    
    <div class="booking-row">
      <label class="booking-label">Check in</label>
      <div class="booking-inputs">
        <input type="text" class="booking-input" :value="checkIn" readonly />
      </div>
    </div>
    
    <div class="booking-row">
      <label class="booking-label">Check out</label>
      <div class="booking-inputs">
        <input type="text" class="booking-input" :value="checkOut" readonly />
      </div>
    </div>
    
    <div class="booking-row">
      <label class="booking-label">Your selection</label>
      <input type="text" class="booking-input full-width" :value="selection" readonly />
    </div>
    
    <div class="booking-row">
      <label class="booking-label">Description</label>
      <textarea class="booking-textarea" :value="description" readonly></textarea>
    </div>
    
    <div class="price-section">
      <span class="price-label">Price</span>
      <span class="price-amount">{{ price }}</span>
    </div>
  </div>
</template>

<style scoped>
.booking-summary {
  border: 2px solid #4285f4;
  background: white;
  padding: 30px;
  max-width: 500px;
  margin: 0 auto;
}

.booking-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
}

.booking-divider {
  width: 100%;
  height: 3px;
  background: #333;
  margin-bottom: 25px;
}

.booking-row {
  margin-bottom: 20px;
}

.booking-label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.booking-inputs {
  display: flex;
  gap: 10px;
}

.booking-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background: #f9f9f9;
  flex: 1;
}

.booking-input.full-width {
  width: 100%;
}

.booking-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background: #f9f9f9;
  resize: none;
  height: 60px;
  font-family: inherit;
}

.price-section {
  background: #ffc107;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.price-label {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.price-amount {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}
</style>