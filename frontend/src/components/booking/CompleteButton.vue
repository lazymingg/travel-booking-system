<script setup>
const props = defineProps({
  bookingSuccess: { type: Boolean, required: true }
})

const emit = defineEmits(['booking-success'])

const handleClick = () => {
  if (!props.bookingSuccess) {
    // Emit để báo cho cha là booking thành công
    emit('booking-success')
  } else {
    // Navigate về home
    window.location.href = '/home-page'
  }
}
</script>

<template>
  <div class="btn-container">
    <button class="btn" @click="handleClick">
      {{ props.bookingSuccess ? 'Return to Home Page' : 'Complete Booking' }}
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
