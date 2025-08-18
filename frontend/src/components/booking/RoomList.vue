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
      <tr v-for="room in rooms" :key="room.id">
        <td>{{ room.name }}</td>
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
      <tr v-if="!rooms || rooms.length === 0">
        <td colspan="8" class="empty">No rooms available</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  rooms: {
    type: Array,
    default: () => [] // đảm bảo luôn có mảng
  }
})
</script>

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
