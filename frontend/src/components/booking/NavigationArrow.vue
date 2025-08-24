<script setup>
import previous from '@/assets/bookingIcon/leftArrow.svg'
import next from '@/assets/bookingIcon/rightArrow.svg'

import { useBookingStore } from '@/composables/useBooking'

const bookingStore = useBookingStore()
</script>

<template>
  <div class="nav-container">
    <!-- Previous arrow -->
    <button
      class="btn btn-nav"
      :disabled="bookingStore.currentStep === 1 || bookingStore.bookingSuccess"
      @click="bookingStore.prevStep"
      aria-label="Previous step"
      title="Previous"
    >
      <img :src="previous" alt="Previous Step" class="nav-icon">
    </button>

    <span class="step-indicator">Step {{ bookingStore.currentStep }} / {{ bookingStore.totalSteps }}</span>

    <!-- Next arrow -->
    <button
      class="btn btn-nav"
      :disabled="bookingStore.currentStep === bookingStore.totalSteps"
      @click="bookingStore.nextStep"
      aria-label="Next step"
      title="Next"
    >
      <img :src="next" alt="Next Step" class="nav-icon">
    </button>
  </div>
</template>

<style scoped>
/* Layout */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem auto 0 auto;
  width: fit-content;
}

/* Step text */
.step-indicator {
  font-size: 14px;
  color: #374151;
  user-select: none;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: #e5e7eb;
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.1s ease, opacity 0.2s ease;
}

.btn:hover {
  background: #d1d5db;
}

.btn:active {
  transform: translateY(1px);
}

/* Navigation Button */
.btn-nav {
  background: #2563eb;
  color: #ffffff;
}

.btn-nav:hover {
  background: #1d4ed8;
}

/* Disabled state */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.nav-icon {
  width: 20px;
  height: 20px;
  display: block;
}
</style>
