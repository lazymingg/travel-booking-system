import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  const currentStep = ref(1);
  const totalSteps = ref(2);
  const bookingSuccess = ref(false);

  const bookingDetails = ref({
    accommodationId: 0,
    roomId: 0,
    ownerId: 0,
    numberBeds: 0,
    numberGuests: 0,
    description: '',
    amenities: [],
    price: 0,
    checkInDate: null,
    checkOutDate: null
  });

  function nextStep() {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++;
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }

  function completeBooking() {
    bookingSuccess.value = true;
  }

  function resetBooking() {
    bookingSuccess.value = false;
    currentStep.value = 1;
  }

  function setBookingDetails(details) {
    bookingDetails.value = { 
      ...bookingDetails.value, ...details 
    }
  }

  function setAccommodationId(id) {
    bookingDetails.value.accommodationId = id;
  }

  return {
    currentStep,
    totalSteps,
    bookingSuccess,
    bookingDetails,
    nextStep,
    prevStep,
    completeBooking,
    setBookingDetails,
    resetBooking,
    setAccommodationId
  }
})
