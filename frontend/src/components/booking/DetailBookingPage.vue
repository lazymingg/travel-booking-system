<script setup>
import UserInpurForm from '@/components/booking/UserInpurForm.vue';
import BookingDetailForm from './BookingDetailForm.vue';
</script>

<template>
    <div id="container">
        <div id="input-form">
            <UserInpurForm/>
        </div>
        <div id="booking-form">
            <BookingDetailForm/>
        </div>
    </div>
    
</template>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: flex-start;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* Input form nhỏ hơn (30%) */
#input-form {
  max-width: 30%;
  padding: 1em;
  box-sizing: border-box;
}

/* Booking form lớn hơn (70%) */
#booking-form {
  max-width: 70%;
  padding: 1em;
  box-sizing: border-box;
}
</style>
