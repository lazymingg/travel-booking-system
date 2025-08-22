<script setup>
import { ref, watch } from 'vue'
import api from '@/frontend-api-helper'
import { useBooking } from '@/composables/useBooking'

import RoomDetail from '@/components/booking/RoomDetail.vue';

const loading = ref(false);
const error = ref(null);
const rooms = ref([])
const reserveComplete = ref(false)
const emit = defineEmits(['reserve-RoomList'])
const { setBookingDetails } = useBooking();

const props = defineProps({
  filter: {
    type: Object,
    required: true
  }
})

// API
const fetchRooms = async () => {
  try {
    loading.value = true;
    error.value = null;

    const accommodationId = props.filter.accommodation_id

    const params = {
      check_in_date: props.filter.check_in_date,
      check_out_date: props.filter.check_out_date,
      number_guest: props.filter.number_guest
    }

    // build query string
    const qs = new URLSearchParams(params).toString();
    const result = await api.get(`/accommodations/${accommodationId}/available?${qs}`);

    console.log("Fetch room: ", result.data)

    if (result.success) {
      console.log('Success load rooms:', result.message);
      const amenitiesList = fetchAmenity(accommodationId);

      let amenities = [];
      if (amenitiesList.success) {
        amenities = amenitiesList.data || [];
      }

      rooms.value = (result.data || []).map(room => ({
        id: room.room_id,
        numberOfBeds: room.number_bed || 0,
        numberOfGuests: room.number_guest || 0,
        description: room.description || '',
        amenities: amenities || [],
        price: room.price_per_day || 0
      }))
    } 
    
    else {
      throw new Error(result.error || result.message || 'Unknown error');
    }

  } catch (err) {
    error.value = 'Failed to load rooms: ' + err.message;
  } finally {
    loading.value = false;
  }
};

const fetchAmenity = async (accommodationId) => {
  try {
    loading.value = true;
    error.value = null;
    
    const result = await api.get(`/accommodations/${accommodationId}/amenities`);

    if (result.success) {
      console.log('Success load amenities: ', result.message);
    }

    else {
      throw new Error(result.error || result.message || 'Unknown error');
    }
  }

  catch (err) {
    error.value = 'Failed to load amenities: ', err.message;
  }

  finally {
    loading.value = true;
  }
};

// Action
const handleReserve = (roomData) => {
  reserveComplete.value = true;
  
  // Store booking details in our composable
  setBookingDetails({
    accommodationId: props.filter.accommodation_id,
    roomId: roomData.roomId,
    checkInDate: props.filter.check_in_date,
    checkOutDate: props.filter.check_out_date,
    totalPrice: roomData.totalPrice,
    numberOfGuests: props.filter.number_guest
  });
  
  emit('reserve-RoomList', roomData);
  reserveComplete.value = false;
}

watch(
  () => props.filter,
  () => fetchRooms(),
  { deep: true, immediate: true }
)
</script>

<template>
  <div>
    <table class="room-table">
      <thead>
        <tr class="header-row">
          <th class="header-room-type">Room Type</th>
          <th class="header-detail">Detail</th>
          <th class="header-price">Price</th>
          <th class="header-reserve">Reserve</th>
        </tr>
      </thead>
    </table>

    <RoomDetail
      v-for="room in rooms"
      :key="room.room_id"
      :room="room"
      @reserve="handleReserve"
    />
    <div v-if="rooms.length === 0" class="empty">
      No rooms available
    </div>
  </div>
</template>

<style scoped>
.room-table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
  margin-left: auto;
  margin-right: auto;
}

.header-row {
  background-color: #f8f9fa;
}

.header-room-type {
  width: 35%;
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  background-color: #f5f5f5;
}

.header-detail {
  width: 30%;
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  background-color: #f5f5f5;
}

.header-price {
  width: 20%;
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  background-color: #f5f5f5;
}

.header-reserve {
  width: 15%;
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  background-color: #f5f5f5;
}

.empty {
  text-align: center;
  font-style: italic;
  color: gray;
  padding: 20px;
}

.error {
  color: red;
}
</style>
