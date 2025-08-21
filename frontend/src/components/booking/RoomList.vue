<script setup>
import { ref, watch } from 'vue'
import api from '@/frontend-api-helper'

const loading = ref(false);
const error = ref(null);
const rooms = ref([])

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

    // const params = {
    //   check_in_date: props.filter.check_in_date,
    //   check_out_date: props.filter.check_out_date,
    //   number_guest: props.filter.number_guest
    // }

    const params = {
      check_in_date: '2025-08-20',
      check_out_date: '2025-08-24',
      number_guest: 2
    }

    console.log(params)

    const result = await api.get('/accommodations/${accommodationId}/available', params );
    console.log('Filter props:', props.filter)
    console.log('API result.data:', result.data)

    if (result.success) {
      // const roomsWithAmenities = await Promise.all(
      //   result.data.map(async (room) => {
      //     const amenities = await fetchAmenities(room.accommodation_id);
      //     return { ...room, amenities, selectedAmount: 0};
      //   })
      // );

      // rooms.value = roomsWithAmenities;
      console.log('Success:', result.message);
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

// const fetchAmenities = async (accommodationID) => {
//   try {
//     const res = await api.get(`/amenities`);
//     return res.success ? res.data : [];
//   } catch (err) {
//     error.value = 'Failed to load amenities: ' + err.message;
//     return [];
//   }
// };

watch(
  () => props.filter,
  () => fetchRooms(),
  { deep: true, immediate: true }
)
</script>

<template>
  <div>
    <div v-if="loading"> Loading rooms ...</div>
    <div v-else-if="error" class="error"> {{ error }} </div>
    <table class="room-table">
    <thead>
      <tr>
        <th>Room Type</th>
        <th>Booking Policy</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Total Price</th>
      </tr>
    </thead>
    <tbody>
      <!-- Nếu có rooms -->
      <tr v-for="room in rooms" :key="room.room_id">
        <!-- Room type -->
        <td>
          <div> {{ room.room_type }} </div>
          <small> {{ room.description }} </small>
        </td>

        <!-- Booking Policy -->jj n                                              
        <td>
          <div>
            Booking Policy
          </div>
        </td>

        <!-- Price -->
         <td>
          <div> {{ room.price_per_day }} </div>
         </td>

         <!-- Amount -->
         <td>
          <input 
            type="number" 
            min="0"
            v-model.number="room.selectedAmount"
          >
          <select v-model.number="room.selectedAmount">
            <option v-for="n in 5" :key="n-1" :value="n-1">{{ n-1 }}</option>
          </select>
         </td>

        <td>
          <button @click="$emit('reserve', room)">Reserve</button>
        </td>
      </tr>

      <!-- Nếu không có rooms -->
      <tr v-if="rooms.length === 0">
        <td colspan="8" class="empty">No rooms available</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<style scoped>
.room-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.room-table th, .room-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.room-table th {
  background-color: #f5f5f5;
}

.empty {
  text-align: center;
  font-style: italic;
  color: gray;
}

.error {
  color: red;
}
</style>