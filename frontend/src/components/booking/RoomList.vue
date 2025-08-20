<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import api from '@/frontend-api-helper'

const router = useRouter()

const roomInfo = reactive({
  accommodation_id: null,
  room_id: null,
  room_type: '',
  price_per_day: null,
  capacity: 1,
  description: '',
  number_guest: null,
  is_available: null,
  available_date_start: '',
  available_date_end: '',  
  created_at: ''
})

const props = defineProps({
  rooms: {
    type: Array,
    default: () => []
  },
  checkInDate: {
    type: String, // 'YYYY-MM-DD'
    required: true
  },
  checkOutDate: {
    type: String, // 'YYYY-MM-DD'
    required: true
  },
  numberGuest: {
    type: Number,
    required: true
  }
})

const filteredRooms = computed(() => {
  return props.rooms.filter(room => {
    const start = new Date(room.available_date_start);
    const end = new Date(room.available_date_end);
    const checkIn = new Date(props.checkInDate);
    const checkOut = new Date(props.checkOutDate);

    const dateAvailable = checkIn >= start && checkOut <= end;
    const numberGuest = room.number_guest >= props.numberGuest;
    const isAvailable = room.is_available === 1;

    return dateAvailable && numberGuest && isAvailable;
  });
});

// API
const fetchUserInfo = async () => {
  try {
    loading.value = true;
    error.value = null;

    const result = await api.get('/bookings/available');

    if (result.success) {
      // Success - data có trong result.data
      // console.log('User info fetched successfully:', result.data);
      Object.assign(userInfo, result.data);
      console.log('Success:', result.message);
    } else {
      // Error - message có trong result.error hoặc result.message
      throw new Error(result.error || result.message || 'Unknown error');
    }

  } catch (err) {
    error.value = 'Không thể tải thông tin người dùng: ' + err.message;
    if (err.message.includes('401') || result.status === 401) {
      router.push('/booking');
    }
  } finally {
    loading.value = false;
  }
};

</script>

<template>
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
      <tr v-for="room in filteredRooms" :key="room.room_id">
        <td>{{ room.room_type }}</td>
        <td>{{ room.description }}</td>
        <td>
          <ul>
            <li v-for="(amenity, index) in room.amenities" :key="index">{{ amenity }}</li>
          </ul>
        </td>
        <td>{{ room.originalPrice }}</td>
        <td>{{ room.discountedPrice }}</td>
        <td>{{ room.discount }}</td>
        <td>{{ room.availability }}</td>
        <td>
          <button @click="$emit('reserve', room)">Reserve</button>
        </td>
      </tr>

      <!-- Nếu không có rooms -->
      <tr v-if="!props.rooms || props.rooms.length === 0">
        <td colspan="8" class="empty">No rooms available</td>
      </tr>
    </tbody>
  </table>
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
</style>