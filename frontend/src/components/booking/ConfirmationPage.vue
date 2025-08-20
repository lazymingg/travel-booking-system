<script setup>
import { ref } from 'vue'

import BookingSummary from '@/components/booking/BookingSummary.vue'
import CompleteButton from '@/components/booking/CompleteButton.vue'

// Receive from the Booking.vue
const emit = defineEmits(['booking-success'])
const bookingSuccess = ref(false)

const handleBookingSuccess = () => {
    bookingSuccess.value = true

    // Send to the Booking.vue
    emit('booking-success')
}
</script>

<template>
  <div id="summary-form">
    <!-- Chỉ hiển thị BookingSummary khi chưa success -->
    <BookingSummary v-if="!bookingSuccess"/>
    <!-- Hiển thị chữ khi success -->
    <div v-else class="success-text">
      Booking Successfully
    </div>
  </div>

  <div id="btn-complete">
    <CompleteButton 
      :booking-success="bookingSuccess"
      @booking-success="handleBookingSuccess"
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
