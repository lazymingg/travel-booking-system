import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  const currentStep = ref(1)
  const totalSteps = ref(2)
  const bookingSuccess = ref(false)

  function nextStep() {
    if (currentStep.value < totalSteps.value) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function completeBooking() {
    bookingSuccess.value = true
  }

  return {
    currentStep,
    totalSteps,
    bookingSuccess,
    nextStep,
    prevStep,
    completeBooking,
  }
})
