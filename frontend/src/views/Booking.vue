<script setup>
import { useBookingStore } from '@/composables/useBooking'
import { onUnmounted } from 'vue'

import ProgressBar from '@/components/booking/ProgressBar.vue'
import NavigationArrow from '@/components/booking/NavigationArrow.vue'
import SelectionPage from '@/components/booking/SelectionPage.vue'
import ConfirmationPage from '@/components/booking/ConfirmationPage.vue'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'

const bookingStore = useBookingStore()

// onUnmounted(() => {
//   bookingStore.resetBooking()
// })
</script>

<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <HeaderModal/>
    </div>

    <!-- Progress bar -->
    <ProgressBar 
      :currentStep="bookingStore.currentStep"
      :success="bookingStore.bookingSuccess" 
    />

    <!-- Nội dung theo step -->
    <div class="step-content">
      <div v-if="bookingStore.currentStep === 1">
        <SelectionPage/>
      </div>
      <div v-else-if="bookingStore.currentStep === 2">
        <ConfirmationPage/>
      </div>
    </div>

    <!-- Navigation buttons -->
    <NavigationArrow 
        class="nav-arrow"
        :currentStep="bookingStore.currentStep"
        :totalSteps="bookingStore.totalSteps"
        @prev="bookingStore.prevStep"
        @next="bookingStore.nextStep"
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
