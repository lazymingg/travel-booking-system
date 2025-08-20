<script setup>
import { ref, computed } from 'vue'
import StepIndicator from '../components/accommodations/StepIndicator.vue'
import PlaceDetailStep from '../components/accommodations/PlaceDetailStep.vue'
import RoomDetailStep from '../components/accommodations/RoomDetailStep.vue'
import PriceSettingStep from '../components/accommodations/PriceSettingStep.vue'
import ConfirmationStep from '../components/accommodations/ConfirmationStep.vue'

const currentStep = ref(1)
const totalSteps = 4

// Form data for all steps
const accommodationData = ref({
  // Place details
  name: '',
  type: '',
  city: '',
  address: '',
  otherDetails: '',
  thumbnailImage: null,

  // Room details
  rooms: [
    {
      id: 1,
      name: 'Room 1',
      humanCapacity: '',
      numberOfBeds: '',
      roomConditions: '',
      restroomConditions: '',
      otherConditions: '',
      detailImage: null
    }
  ],

  // Price settings
  checkInMethod: 'preservation',

  // Terms acceptance
  acceptTerms: false
})

const stepTitles = [
  'Upload your accommodation here',
  'Your room(s) detail information',
  'Price setting for your room(s)',
  'Finish your accommodation uploading'
]

const currentTitle = computed(() => stepTitles[currentStep.value - 1])

function validateStep1() {
  return accommodationData.value.name.trim() !== '' &&
         accommodationData.value.type.trim() !== '' &&
         accommodationData.value.city.trim() !== '' &&
         accommodationData.value.address.trim() !== ''
}

function validateStep2() {
  return accommodationData.value.rooms.every(room =>
    room.humanCapacity.trim() !== '' &&
    room.numberOfBeds.trim() !== '' &&
    room.roomConditions.trim() !== '' &&
    room.restroomConditions.trim() !== ''
  )
}

function validateStep3() {
  return accommodationData.value.rooms.every(room =>
    room.pricePerDay && room.pricePerDay > 0
  )
}

function validateCurrentStep() {
  switch(currentStep.value) {
    case 1: return validateStep1()
    case 2: return validateStep2()
    case 3: return validateStep3()
    case 4: return accommodationData.value.acceptTerms
    default: return true
  }
}

function nextStep() {
  if (!validateCurrentStep()) {
    alert('Please fill in all required fields before proceeding to the next step.')
    return
  }

  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function goToStep(step) {
  // Only allow going to previous steps or current step
  if (step <= currentStep.value && step >= 1) {
    currentStep.value = step
  }
}

function handleSubmit() {
  if (!accommodationData.value.acceptTerms) {
    alert('Please accept the terms and policies to complete your listing.')
    return
  }

  console.log('Submitting accommodation data:', accommodationData.value)
  // Navigate back to manage accommodation page
  navigateToManage()
}

function navigateToManage() {
  // In a real Vue app, you would use this.$router.push('/manage-accommodation')
  // For now, we'll use window.history or emit an event
  window.history.back()
}

function addRoom() {
  const newRoomId = accommodationData.value.rooms.length + 1
  accommodationData.value.rooms.push({
    id: newRoomId,
    name: `Room ${newRoomId}`,
    humanCapacity: '',
    numberOfBeds: '',
    roomConditions: '',
    restroomConditions: '',
    otherConditions: '',
    detailImage: null,
    pricePerDay: 0
  })
}

function removeRoom(roomId) {
  if (accommodationData.value.rooms.length > 1) {
    accommodationData.value.rooms = accommodationData.value.rooms.filter(room => room.id !== roomId)
  }
}
</script>

<template>
  <!-- Removed modal wrapper, made it a full page layout -->
  <div class="upload-page">
    <!-- Header with back button -->
    <div class="header-section">
      <button class="back-btn" @click="navigateToManage">
        ← Back to Manage Properties
      </button>
      <h1 class="page-title">{{ currentTitle }}</h1>
    </div>

    <!-- Step Indicator -->
    <StepIndicator
      :current-step="currentStep"
      :total-steps="totalSteps"
      @step-click="goToStep"
    />

    <!-- Step Content -->
    <div class="step-content">
      <PlaceDetailStep
        v-if="currentStep === 1"
        v-model="accommodationData"
      />

      <RoomDetailStep
        v-if="currentStep === 2"
        v-model="accommodationData"
        @add-room="addRoom"
        @remove-room="removeRoom"
      />

      <PriceSettingStep
        v-if="currentStep === 3"
        v-model="accommodationData"
      />

      <ConfirmationStep
        v-if="currentStep === 4"
        v-model="accommodationData"
        @submit="handleSubmit"
      />
    </div>

    <!-- Navigation Buttons -->
    <div class="navigation-buttons" v-if="currentStep < 4">
      <button
        class="nav-btn prev-btn"
        @click="prevStep"
        :disabled="currentStep === 1"
      >
        ← Previous
      </button>

      <button
        class="nav-btn next-btn"
        @click="nextStep"
        :class="{ 'disabled': !validateCurrentStep() }"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Updated to full page layout instead of modal */
.upload-page {
  min-height: 100vh;
  background: #f9fafb;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.back-btn {
  background: none;
  border: 1px solid #d1d5db;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
  text-align: center;
}

.step-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 500px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;
}

.nav-btn {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 2px solid #3b82f6;
  background: white;
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled):not(.disabled) {
  background: #3b82f6;
  color: white;
  transform: translateY(-1px);
}

.nav-btn:disabled,
.nav-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #d1d5db;
  color: #9ca3af;
}

.next-btn:not(.disabled) {
  background: #3b82f6;
  color: white;
}

.next-btn:not(.disabled):hover {
  background: #2563eb;
}
</style>
