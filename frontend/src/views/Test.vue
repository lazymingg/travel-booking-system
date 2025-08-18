<script setup>
import { ref } from 'vue'
import ProgressBar from '@/components/booking/ProgressBar.vue'
import NavigationArrow from '@/components/booking/NavigationArrow.vue'
import SelectionPage from '@/components/booking/SelectionPage.vue'
import DetailBookingPage from '@/components/booking/DetailBookingPage.vue'
import ConfirmationPage from '@/components/booking/ConfirmationPage.vue'

const currentStep = ref(1)
const totalSteps = 3

function handleNextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

function handlePrevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>

<template>
  <div>
    <!-- Progress bar -->
    <ProgressBar :currentStep="currentStep" />

    <!-- Nội dung theo step -->
    <div class="step-content">
      <div v-if="currentStep === 1">
        <SelectionPage/>
      </div>
      <div v-else-if="currentStep === 2">
        <DetailBookingPage/>
      </div>
      <div v-else-if="currentStep === 3">
        <ConfirmationPage/>
      </div>
    </div>

    <!-- Navigation buttons -->
    <NavigationArrow 
        :currentStep="currentStep"
        :totalSteps="totalSteps"
        @prev="handlePrevStep"
        @next="handleNextStep"
    />
  </div>
</template>

<style scoped>
.step-content {
  margin: 2rem 0;
  text-align: center;
}
</style>
