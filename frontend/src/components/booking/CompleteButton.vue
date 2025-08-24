<script setup>
import { useBookingStore } from '@/composables/useBooking'
import { storeToRefs } from 'pinia'
import { useError } from '@/composables/useError'
import api from '@/frontend-api-helper'

const bookingStore = useBookingStore()
const { bookingDetails } = storeToRefs(bookingStore)

const { handleApiError } = useError()

// API
const handleBooking = async () => {
  if(!bookingDetails.bookingSuccess) {
    try {
      console.log("AccommID: ", bookingDetails.value.accommodationId);

      const result = await api.post(`/accommodations/:${bookingDetails.value.accommodationId}/bookings_temp`, {
        room_id : bookingDetails.roomId,
        check_in_date: bookingDetails.checkInDate,
        check_out_date: bookingDetails.checkOutDate,
        total_price: bookingDetails.price
      });

      if (result.success) {
        console.log('Booking successful:', result.message);
        bookingStore.completeBooking();
      }

      else {
        console.error('Booking failed:', result.message);
        handleApiError(result);
      }
    }

    catch (error) {
      handleApiError(error);
    }
  }

  else {
    router.push({ path: '/' })
  }
}

</script>

<template>
  <div class="btn-container">
    <button class="btn" @click="handleBooking">
      {{ bookingStore.bookingSuccess ? 'Return to Home Page' : 'Complete Booking' }}
    </button>
  </div>
</template>

<style scoped>
.btn-container {
  display: flex;
  justify-content: center;
  padding: 3em;
}

.btn {
  background: #2563eb;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: background 0.2s, transform 0.1s;
}

.btn:hover {
  background: #1D4ED8;
}
</style>
