<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'add-room', 'remove-room'])

const data = ref(props.modelValue)

function updateData() {
  emit('update:modelValue', data.value)
}

function handleImageUpload(event, roomId) {
  const file = event.target.files[0]
  if (file) {
    const room = data.value.rooms.find(r => r.id === roomId)
    if (room) {
      room.detailImage = file
      updateData()
    }
  }
}

function addRoom() {
  emit('add-room')
}

function removeRoom(roomId) {
  if (data.value.rooms.length > 1) {
    emit('remove-room', roomId)
  }
}
</script>

<template>
  <div class="room-detail-step">
    <div v-for="room in data.rooms" :key="room.id" class="room-section">
      <div class="room-header">
        <h3>{{ room.name }}</h3>
        <button
          v-if="data.rooms.length > 1"
          @click="removeRoom(room.id)"
          class="remove-room-btn"
        >
          ×
        </button>
      </div>

      <div class="room-grid">
        <div class="room-form">
          <div class="form-group">
            <label>Human capacity:</label>
            <input
              v-model="room.humanCapacity"
              type="text"
              placeholder="EX: 4"
              @input="updateData"
            />
          </div>

          <div class="form-group">
            <label>Number of bed(s):</label>
            <input
              v-model="room.numberOfBeds"
              type="text"
              placeholder="EX: 2"
              @input="updateData"
            />
          </div>

          <div class="form-group">
            <label>Room condition and adminities:</label>
            <input
              v-model="room.roomConditions"
              type="text"
              placeholder="EX: mini beds, AC, windows,..."
              @input="updateData"
            />
          </div>

          <div class="form-group">
            <label>Restroom condition and adminities</label>
            <input
              v-model="room.restroomConditions"
              type="text"
              placeholder="EX: 2 restroom, 1 bath, 1 shower,..."
              @input="updateData"
            />
          </div>

          <div class="form-group">
            <label>Other condition, amenities, notes</label>
            <input
              v-model="room.otherConditions"
              type="text"
              placeholder="EX: lorem ipsum,..."
              @input="updateData"
            />
          </div>
        </div>

        <div class="image-section">
          <label class="image-label">Detailed image of the room</label>
          <div class="image-upload-area">
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload($event, room.id)"
              class="file-input"
              :id="`room-upload-${room.id}`"
            />
            <label :for="`room-upload-${room.id}`" class="upload-placeholder">
              <div class="upload-icon">
                <div class="circle"></div>
                <div class="triangle"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="add-room-section">
      <button @click="addRoom" class="add-room-btn">
        <span class="plus-icon">+</span>
        Add more room
      </button>
    </div>
  </div>
</template>

<style scoped>
.room-detail-step {
  padding: 1rem 0;
}

.room-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.room-section:last-of-type {
  border-bottom: none;
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.room-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.remove-room-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #ef4444;
  background: #fef2f2;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  line-height: 1;
}

.room-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}

.room-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.form-group input::placeholder {
  color: #9ca3af;
}

.image-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-label {
  font-weight: 500;
  color: #374151;
  text-align: center;
}

.image-upload-area {
  position: relative;
}

.file-input {
  display: none;
}

.upload-placeholder {
  display: block;
  width: 200px;
  height: 200px;
  border: 2px solid #d1d5db;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  transition: all 0.2s;
  margin: 0 auto;
}

.upload-placeholder:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.upload-icon {
  position: relative;
  width: 60px;
  height: 60px;
}

.circle {
  width: 20px;
  height: 20px;
  border: 2px solid #6b7280;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 20px;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 30px solid #6b7280;
  position: absolute;
  bottom: 0;
  left: 10px;
}

.add-room-section {
  text-align: center;
  margin-top: 2rem;
}

.add-room-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px dashed #d1d5db;
  background: transparent;
  color: #6b7280;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.add-room-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.plus-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6b7280;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.add-room-btn:hover .plus-icon {
  background: #3b82f6;
}

@media (max-width: 768px) {
  .room-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
