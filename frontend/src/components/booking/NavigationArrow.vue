<script setup>
import previous from '@/assets/bookingIcon/leftArrow.svg'
import next from '@/assets/bookingIcon/rightArrow.svg'

const props = defineProps({
  currentStep: { type: Number, required: true },
  totalSteps:  { type: Number, required: true }
})

const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="nav-container">
    <!-- Previous arrow -->
    <button
      class="btn btn-prev"
      :disabled="props.currentStep === 1"
      @click="emit('prev')"
      aria-label="Previous step"
      title="Previous"
    >
      <img :src="previous" alt="Previous Step" class="nav-icon">
    </button>

    <span class="step-indicator">Step {{ props.currentStep }} / {{ props.totalSteps }}</span>

    <!-- Next arrow -->
    <button
      class="btn btn-next"
      :disabled="props.currentStep === props.totalSteps"
      @click="emit('next')"
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
  justify-content: space-between;
  gap: 16px;
  padding: 0 30em;
  margin: 0;
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
  background: #e5e7eb; /* xám nhạt */
  color: #111827;      /* xám rất đậm */
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.1s ease, opacity 0.2s ease;
}

.btn:hover {
  background: #d1d5db; /* xám hơn khi hover */
}

.btn:active {
  transform: translateY(1px);
}

/* Primary (next) */
.btn-next {
  background: #2563eb;    /* xanh dương */
  color: #ffffff;
}

.btn-next:hover {
  background: #1d4ed8;    /* xanh dương đậm hơn khi hover */
}

/* Disabled state */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* (Nếu dùng SVG icon thay cho text arrow) */
.nav-icon {
  width: 20px;
  height: 20px;
  display: block;
}
</style>
