<script setup>
import UserInputForm from '@/components/booking/UserInputForm.vue';
import BookingDetailForm from './BookingDetailForm.vue';
</script>

<template>
    <div id="container">
        <div id="input-form">
            <UserInputForm/>
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

#input-form {
  max-width: 30%;
  padding: 1em;
  box-sizing: border-box;
}

#booking-form {
  max-width: 70%;
  padding: 1em;
  box-sizing: border-box;
}
</style>
