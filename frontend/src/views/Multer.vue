<template>
  <div class="form-container">
    <h2>Tạo Accommodation</h2>

    <!-- Accommodation Info -->
    <form @submit.prevent="createAccommodation">
      <input v-model="accommodation.name" placeholder="Tên accommodation" required />
      <input v-model="accommodation.address" placeholder="Địa chỉ" required />
      <input v-model="accommodation.city" placeholder="Thành phố" required />
      <input v-model="accommodation.description" placeholder="Mô tả" />
      <input v-model="accommodation.accommodation_type" placeholder="Loại accommodation" required />

      <button type="submit">Tạo Accommodation</button>
    </form>

    <!-- Upload accommodation images -->
    <div v-if="accommodationId">
      <h3>Upload ảnh cho accommodation</h3>
      <input type="file" multiple @change="onAccommodationFilesChange" />
      <button @click="uploadAccommodationImages">Upload Accommodation Images</button>
    </div>

    <!-- Rooms -->
    <div v-if="accommodationId">
      <h3>Rooms</h3>
      <div v-for="(room, index) in rooms" :key="index" class="room-block">
        <h4>Room {{ index + 1 }}</h4>
        <input v-model="room.number_guest" type="number" placeholder="Số khách" required />
        <input v-model="room.price_per_day" type="number" placeholder="Giá mỗi ngày" required />
        <input v-model="room.number_bed" type="number" placeholder="Số giường" required />
        <input v-model="room.description" placeholder="Mô tả" />

        <input type="file" multiple @change="(e) => onRoomFilesChange(e, index)" />

        <button @click="createRoom(index)">Tạo phòng</button>
        <button @click="removeRoom(index)">Xóa phòng</button>
      </div>

      <button @click="addRoom">+ Thêm phòng</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const accommodation = ref({
  name: "",
  address: "",
  city: "",
  description: "",
  accommodation_type: ""
});

const accommodationId = ref(null);
const accommodationFiles = ref([]);

const rooms = ref([]); // { number_guest, price_per_day, number_bed, description, files, room_id }

function onAccommodationFilesChange(e) {
  accommodationFiles.value = Array.from(e.target.files);
}

async function createAccommodation() {
  try {
    const res = await fetch("http://localhost:3000/accommodations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(accommodation.value)
    });
    const data = await res.json();
    if (res.ok) {
      accommodationId.value = data.data.accommodation_id;
      alert("Accommodation created!");
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error(err);
  }
}

async function uploadAccommodationImages() {
  if (!accommodationFiles.value.length) return alert("Chọn ảnh trước");
  const formData = new FormData();
  accommodationFiles.value.forEach(f => formData.append("images", f));

  const res = await fetch(
    `http://localhost:3000/accommodations/${accommodationId.value}/images`,
    {
      method: "POST",
      body: formData,
      credentials: "include"
    }
  );
  const data = await res.json();
  if (res.ok) alert("Upload accommodation images thành công");
  else alert("Error: " + data.message);
}

// Rooms
function addRoom() {
  rooms.value.push({
    number_guest: "",
    price_per_day: "",
    number_bed: "",
    description: "",
    files: [],
    room_id: null
  });
}

function removeRoom(index) {
  rooms.value.splice(index, 1);
}

function onRoomFilesChange(e, index) {
  rooms.value[index].files = Array.from(e.target.files);
}

async function createRoom(index) {
  const room = rooms.value[index];
  if (!room.number_guest || !room.price_per_day || !room.number_bed) {
    return alert("Điền đầy đủ thông tin phòng");
  }

  // Step 1: create room (POST /:accommodationId/rooms)
  const res = await fetch(
    `http://localhost:3000/accommodations/${accommodationId.value}/rooms`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        number_guest: room.number_guest,
        price_per_day: room.price_per_day,
        number_bed: room.number_bed,
        description: room.description
      })
    }
  );
  const data = await res.json();
  if (!res.ok) {
    alert("Error: " + data.message);
    return;
  }
  room.room_id = data.data.room_id;
  alert(`Room ${room.room_id} created!`);

  // Step 2: upload room images (if any)
  if (room.files.length) {
    const formData = new FormData();
    room.files.forEach(f => formData.append("images", f));

    const imgRes = await fetch(
      `http://localhost:3000/accommodations/${accommodationId.value}/rooms/${room.room_id}/images`,
      {
        method: "POST",
        body: formData,
        credentials: "include"
      }
    );
    const imgData = await imgRes.json();
    if (imgRes.ok) {
      alert(`Upload ảnh room ${room.room_id} thành công`);
    } else {
      alert("Error upload images: " + imgData.message);
    }
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.room-block {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>