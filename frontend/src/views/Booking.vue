<script setup>
import { ref } from 'vue'
import ProgressBar from '@/components/booking/ProgressBar.vue'
import NavigationArrow from '@/components/booking/NavigationArrow.vue'
import SelectionPage from '@/components/booking/SelectionPage.vue'
import DetailBookingPage from '@/components/booking/DetailBookingPage.vue'
import ConfirmationPage from '@/components/booking/ConfirmationPage.vue'

const currentStep = ref(1)
const totalSteps = 3
const bookingSuccess = ref(false)

function handleNextStep() {
  console.log('Before Next: ', currentStep.value)
  
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }

  console.log('After Next: ', currentStep.value)
}

function handlePrevStep() {
  console.log('Before Prev: ', currentStep.value)

  if (currentStep.value > 1) {
    currentStep.value--
  }

  console.log('After Prev: ', currentStep.value)
}

const completeBooking = () => {
  bookingSuccess.value = true
}
</script>

<template>
  <div>
    <!-- Progress bar -->
    <ProgressBar 
      :currentStep="currentStep"
      :success="bookingSuccess" 
    />

    <!-- Nội dung theo step -->
    <div class="step-content">
      <div v-if="currentStep === 1">
        <SelectionPage/>
      </div>
      <div v-else-if="currentStep === 2">
        <DetailBookingPage/>
      </div>
      <div v-else-if="currentStep === 3">
        <ConfirmationPage @booking-success="completeBooking"/>
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
