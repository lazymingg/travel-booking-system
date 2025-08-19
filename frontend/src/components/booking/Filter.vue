<script setup>
import { ref, reactive , watch } from 'vue'

const emit = defineEmits(['filter'])

const showChangeSearch = ref(false)

const filterData = reactive({
  checkInDate: '13/08/2025', 
  checkInTime: '12:00',
  checkOutDate: '15/08/2025 - 12:00',
  checkOutTime: '12:00',
  guests: '2 person'
})

const applyFilter = () => {
  emit('filter', { ...filterData })
  showChangeSearch.value = false
}
</script>

<template>
  <div class="search-container">
    <h2 class="title">Select your option</h2>
    
    <div class="summary-box">
      <div class="summary-item">
        {{ filterData.checkInDate }} - {{ filterData.checkInTime }}
      </div>
      <div class="summary-item">
        {{ filterData.checkOutDate }} - {{ filterData.checkOutTime }}
      </div>
      <div class="summary-item">
        {{ filterData.guests }}
      </div>
      <button 
        @click="showChangeSearch = !showChangeSearch"
        class="btn btn-primary"
      >
        Change search
      </button>
    </div>

    <!-- Change Search Form -->
    <div v-if="showChangeSearch" class="form-box">
      <div class="form-grid">
        <div>
          <label class="label">Check-in Date</label>
          <input 
            v-model="filterData.checkInDate" 
            type="date" 
            class="input"
          />
          <input 
            v-model="filterData.checkInTime" 
            type="time" 
            class="input"
          />
        </div>
        <div>
          <label class="label">Check-out Date</label>
          <input 
            v-model="filterData.checkOutDate" 
            type="date" 
            class="input"
          />
          <input 
            v-model="filterData.checkOutTime" 
            type="time" 
            class="input"
          />
        </div>
        <div>
          <label class="label">Guests</label>
          <div class="input-wrapper">
            <input
            v-model="filterData.guests"
            type="number"
            min="0"
            class="input"
            >
            </input>
            <span class="suffix">person</span>
          </div>
        </div>
      </div>
      <div class="button-group">
        <button 
          @click="applyFilter"
          class="btn btn-primary"
        >
          Apply Filter
        </button>
        <button 
          @click="showChangeSearch = false"
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.summary-box {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.summary-item {
  background-color: #2563eb; /* blue-600 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.form-box {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb; /* gray-200 */
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 6px;
  outline: none;
}

.input:focus {
  border-color: #2563eb; /* blue-500 */
}

.button-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #d1d5db;
  color: #374151;
}

.btn-secondary:hover {
  background: #9ca3af;
}

.input-wrapper {
  position: relative;
  /* display: inline-block; */
}

.input-wrapper .suffix {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* không cho click vào suffix */
  color: #555;
  font-size: 14px;
}
</style>
