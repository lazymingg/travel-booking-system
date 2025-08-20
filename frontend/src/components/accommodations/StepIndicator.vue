<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true
  },
  totalSteps: {
    type: Number,
    required: true
  }
})

defineEmits(['step-click'])

const stepLabels = ['Place detail', 'Room(s) detail', 'Price setting', 'Confirmation']
</script>

<template>
  <div class="step-indicator">
    <div class="steps-container">
      <div
        v-for="step in totalSteps"
        :key="step"
        class="step-item"
        :class="{
          'active': step === currentStep,
          'completed': step < currentStep
        }"
        @click="$emit('step-click', step)"
      >
        <div class="step-circle">{{ step }}</div>
        <div class="step-label">{{ stepLabels[step - 1] }}</div>
        <div v-if="step < totalSteps" class="step-line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-indicator {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  flex: 1;
  max-width: 150px;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.step-item.active .step-circle {
  background: #3b82f6;
  color: white;
}

.step-item.completed .step-circle {
  background: #3b82f6;
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.step-item.active .step-label {
  color: #3b82f6;
  font-weight: 600;
}

.step-line {
  position: absolute;
  top: 20px;
  left: 60%;
  right: -40%;
  height: 2px;
  background: #e5e7eb;
  z-index: -1;
}

.step-item.completed .step-line {
  background: #3b82f6;
}
</style>

