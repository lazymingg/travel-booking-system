<script setup>
import check from '@/assets/bookingIcon/check.svg'

defineProps({
  currentStep: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="progress-wrapper">
    <div class="progress-container">
      <div class="progress-steps">
        <!-- Step 1 -->
        <div class="step">
          <div class="step-circle" :class="{ active: currentStep >= 1 }">
            <span v-if="currentStep > 1">
              <img :src="check" alt="check" class="check-icon">
            </span>
            <span v-else>1</span>
          </div>
          <span class="step-label">Selection</span>
        </div>

        <!-- Line 1-2 -->
        <div class="step-line" :class="{ active: currentStep >= 2 }"></div>

        <!-- Step 2 -->
        <div class="step">
          <div class="step-circle" :class="{ active: currentStep >= 2 }">
            <span v-if="currentStep > 2">
              <img :src="check" alt="check" class="check-icon">
            </span>
            <span v-else>2</span>
          </div>
          <span class="step-label">Your details</span>
        </div>

        <!-- Line 2-3 -->
        <div class="step-line" :class="{ active: currentStep >= 3 }"></div>

        <!-- Step 3 -->
        <div class="step">
          <div class="step-circle" :class="{ active: currentStep >= 3 }">
            3
          </div>
          <span class="step-label">Confirmation</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-wrapper {
  background-color: #fff;
  padding: 2rem 0; /* py-8 */
}

.progress-container {
  max-width: 64rem; /* max-w-4xl */
  margin: 0 auto;
}

.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-circle {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
  background-color: #d1d5db; /* bg-gray-300 */
}

.step-circle.active {
  background-color: #2563eb; /* bg-blue-600 */
}

.step-label {
  margin-top: 0.75rem; /* mt-3 */
  font-size: 1.125rem; /* text-lg */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
}

.step-line {
  width: 8rem;  /* w-32 */
  height: 0.25rem; /* h-1 */
  margin: 0 1rem; /* mx-4 */
  background-color: #d1d5db; /* bg-gray-300 */
}

.step-line.active {
  background-color: #2563eb; /* bg-blue-600 */
}

.check-icon{
  max-width: 35px;
  display: flex;
  align-items: center;
  fill: #fff;
}
</style>
