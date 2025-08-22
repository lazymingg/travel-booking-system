<script setup>
import { ref } from 'vue'
import { useBookingStore } from '@/composables/booking'

import ProgressBar from '@/components/booking/ProgressBar.vue'
import NavigationArrow from '@/components/booking/NavigationArrow.vue'
import SelectionPage from '@/components/booking/SelectionPage.vue'
import ConfirmationPage from '@/components/booking/ConfirmationPage.vue'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'

const bookingStore = useBookingStore()

const currentStep = ref(1)
const totalSteps = 2
const bookingSuccess = ref(false)

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

const completeBooking = () => {
  bookingSuccess.value = true
}
</script>

<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <HeaderModal/>
    </div>

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
        <ConfirmationPage @booking-success="completeBooking"/>
      </div>
    </div>

    <!-- Navigation buttons -->
    <NavigationArrow 
        class="nav-arrow"
        :currentStep="currentStep"
        :totalSteps="totalSteps"
        @prev="handlePrevStep"
        @next="handleNextStep"
    />

    <!-- Footer -->
    <FooterModal/>
  </div>
</template>

<style scoped>
.step-content {
  margin: 2rem 0;
  text-align: center;
}
.nav-arrow{
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
