<script setup>
import { ref } from 'vue'

// Sample data - you can make these props or reactive data
const checkInDate = ref('13/08/2025')
const checkInTime = ref('12:00')
const checkOutDate = ref('13/08/2025')
const checkOutTime = ref('12:00')
const lengthOfStay = ref('3 days')
const selection = ref('1 rooms for 2 people')
const description = ref('Two-bedrooms apartment with balcony')
const originalPrice = ref('$ 250')
const discount = ref('- $ 30')
const totalAmount = ref('$ 220')
</script>

<template>
  <div class="booking-details-card">
    <div class="card-header">
      <h2 class="card-title">Your booking details</h2>
      <div class="title-underline"></div>
    </div>

    <div class="card-content">
      <!-- Check in/out dates -->
      <div class="datetime-section">
        <div class="datetime-field">
          <label class="datetime-label">Check in</label>
          <input type="text" class="datetime-input" :value="checkInDate" readonly>
          <input type="text" class="datetime-input" :value="checkInTime" readonly>
        </div>
        <div class="datetime-field">
          <label class="datetime-label">Check out</label>
          <input type="text" class="datetime-input" :value="checkOutDate" readonly>
          <input type="text" class="datetime-input" :value="checkOutTime" readonly>
        </div>
      </div>

      <!-- Length of stay -->
      <div class="stay-section">
        <label class="stay-label">Total length of stay</label>
        <input type="text" class="stay-input" :value="lengthOfStay" readonly>
      </div>

      <div class="section-divider"></div>

      <!-- Selection details -->
      <div class="selection-section">
        <label class="selection-label">Your selection</label>
        <input type="text" class="selection-input" :value="selection" readonly>
      </div>

      <!-- Description -->
      <div class="description-section">
        <label class="description-label">Description</label>
        <textarea class="description-textarea" :value="description" readonly></textarea>
      </div>

      <div class="section-divider"></div>

      <!-- Pricing -->
      <div class="pricing-section">
        <div class="price-row">
          <div class="price-field">
            <label class="price-label">Original price</label>
            <input type="text" class="price-input" :value="originalPrice" readonly>
          </div>
          <div class="price-field">
            <label class="price-label">Your discount</label>
            <input type="text" class="price-input discount" :value="discount" readonly>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="total-section">
        <div class="total-content">
          <span class="total-label">Total</span>
          <div class="total-right">
            <span class="total-amount">{{ totalAmount }}</span>
            <span class="total-note">* including taxes and charges</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.booking-details-card {
  border: 2px solid #4285f4;
  border-radius: 8px;
  background: white;
  max-width: 400px;
  font-family: Arial, sans-serif;
}

.card-header {
  padding: 20px 20px 10px 20px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
}

.title-underline {
  height: 3px;
  background: #333;
  width: 100%;
  margin-bottom: 20px;
}

.card-content {
  padding: 0 20px 20px 20px;
}

.datetime-section {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.datetime-field {
  flex: 1;
}

.datetime-label, .stay-label, .selection-label, .description-label, .price-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
}

.datetime-input, .stay-input, .selection-input, .price-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: #f9f9f9;
  box-sizing: border-box;
}

.stay-section {
  margin-bottom: 20px;
}

.section-divider {
  height: 2px;
  background: #333;
  margin: 20px 0;
}

.selection-section {
  margin-bottom: 20px;
}

.description-section {
  margin-bottom: 20px;
}

.description-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: #f9f9f9;
  resize: none;
  height: 60px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.pricing-section {
  margin-bottom: 20px;
}

.price-row {
  display: flex;
  gap: 15px;
}

.price-field {
  flex: 1;
}

.price-input.discount {
  color: #e74c3c;
}

.total-section {
  background: #ffc107;
  margin: 0 -20px -20px -20px;
  border-radius: 0 0 6px 6px;
  padding: 15px 20px;
}

.total-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.total-right {
  text-align: right;
}

.total-amount {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
}

.total-note {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}
</style>