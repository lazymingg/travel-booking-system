<script setup>
import { ref } from 'vue'

import BookingSummary from '@/components/booking/BookingSummary.vue'
import CompleteButton from '@/components/booking/CompleteButton.vue'

import { useBookingStore } from '@/composables/useBooking'

const bookingStore = useBookingStore()
</script>

<template>
  <div id="summary-form">
    <!-- Chỉ hiển thị BookingSummary khi chưa success -->
    <BookingSummary v-if="!bookingStore.bookingSuccess"/>
    
    <!-- Hiển thị chữ khi success -->
    <div v-else class="success-text">
      Booking Successfully
    </div>
  </div>

  <div id="btn-complete">
    <CompleteButton 
      :booking-success="bookingStore.bookingSuccess"
      @booking-success="bookingStore.completeBooking"
    />
  </div>
</template>

<style scoped>
.success-text {
  color: green;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
}
</style>
