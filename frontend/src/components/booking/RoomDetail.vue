<script setup>
import greenCheck from '@/assets/bookingIcon/pros.svg'

import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/composables/useBooking'

const bookingStore = useBookingStore()

const props = defineProps({
  room: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['reserve']);
const priceNote = '* including taxes and charges';

const handleClickReserve = () => {
  console.log("Amen: ", props.room.amenities);
  console.log("Accom - Room: ", props.room.accommodationId)

  bookingStore.setBookingDetails({
    accommodationId: 15,
    roomId: props.room.id,
    numberBeds: props.room.numberBeds,
    numberGuests: props.room.numberGuests,
    description: props.room.description,
    amenities: props.room.amenities,
    price: props.room.price,
    checkInDate: props.room.checkInDate,
    checkOutDate: props.room.checkOutDate
  })

  bookingStore.nextStep()
}
</script>

<template>
  <div class="room-card">
    <table class="room-table">
      <tbody>
        <tr class="room-row">
          <!-- Room Type Column -->
          <td class="room-type-cell">
            <div class="room-info">
              <div class="guest-bed-info">
                <div class="info-item">Number of beds: {{ room.numberBeds }}</div>
                <div class="info-item">Number of guests: {{ room.numberGuests }}</div>
              </div>

              <div class="amenities-list">
                <div v-for="amenity in room.amenities" :key="amenity" class="amenity-item">
                  <img :src="greenCheck" alt="Green Check" class="check-icon">
                  {{ amenity }}
                </div>
              </div>
            </div>
          </td>

          <!-- Description Column -->
          <td class="description-cell">
            <div class="description-content">
              {{ room.description }}
            </div>
          </td>

          <!-- Price Column -->
          <td class="price-cell">
            <div class="price-info">
              <div class="current-price">{{ room.price }} VND</div>
              <div class="price-note">{{ priceNote }}</div>
            </div>
          </td>

          <!-- Reserve Column -->
          <td class="reserve-cell">
            <div class="reserve-section">
              <button @click="handleClickReserve" class="reserve-button">
                Reserve
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.room-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
}

.room-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.room-row {
  border-bottom: 1px solid #e5e7eb;
}

.room-type-cell {
  width: 35%;
  padding: 16px 12px;
  vertical-align: top;
  border-right: 1px solid #e5e7eb;
}

.description-cell {
  width: 30%;
  padding: 16px 12px;
  vertical-align: top;
  border-right: 1px solid #e5e7eb;
}

.price-cell {
  width: 20%;
  padding: 16px 12px;
  vertical-align: top;
  text-align: center;
  border-right: 1px solid #e5e7eb;
}

.reserve-cell {
  width: 15%;
  padding: 16px 12px;
  vertical-align: top;
  text-align: center;
}

.guest-bed-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.info-item {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.room-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.amenities-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0 auto;
}

.amenity-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #059669;
  line-height: 1.2;
}

.check-icon {
  width: 14px;
  height: 14px;
  margin-right: 6px;
  flex-shrink: 0;
}

.description-content {
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  text-align: left;
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.current-price {
  font-size: 18px;
  font-weight: bold;
  color: #111827;
}

.price-note {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
}

.reserve-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reserve-button {
  width: 80px;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  font-size: 13px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reserve-button:hover {
  background-color: #1d4ed8;
}
</style>
