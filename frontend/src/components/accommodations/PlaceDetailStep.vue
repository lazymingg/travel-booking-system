<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue'
import api from '@/frontend-api-helper.js'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const data = ref(props.modelValue)
const previewSrc = ref(null)

function revokePreview() {
  if (previewSrc.value) {
    URL.revokeObjectURL(previewSrc.value)
    previewSrc.value = null
  }
}

watch(() => data.value.thumbnailImage, (val) => {
  revokePreview()
  if (val instanceof File) {
    previewSrc.value = URL.createObjectURL(val)
  } else if (typeof val === 'string' && val) {
    // If parent passes a string URL
    previewSrc.value = val
  }
})

onUnmounted(() => {
  revokePreview()
})

function updateData() {
  emit('update:modelValue', data.value)
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    data.value.thumbnailImage = file
    updateData()
  }
}

const amenitiesList = ref([])
const loading = ref(true)

const accommodationTypes = [
  'Hotel',
  'Hostel', 
  'Resort',
  'Homestay'
]

const fetchAmenities = async () => {
  try {
    const result = await api.get('/amenities')
    if (result.success) {
      amenitiesList.value = result.data 
      console.log(amenitiesList.value)
    } else {
      console.error('Failed to fetch amenities:', result.message)
      amenitiesList.value = []
    }
  } catch (error) {
    console.error('Error fetching amenities:', error)
    amenitiesList.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAmenities()
})

if (!data.value.amenities) {
  data.value.amenities = []
}
if (!data.value.accommodationType) {
  data.value.accommodationType = ''
}

</script>

<template>
  <div class="place-detail-step">
    <div class="form-grid">
      <div class="form-section">
        <div class="form-group">
          <label>Your accommodation name</label>
          <input
            v-model="data.name"
            type="text"
            placeholder="EX: ABC"
            @input="updateData"
          />
        </div>

        <div class="form-group">
          <label>Accommodation type</label>
          <div class="radio-group">
            <div 
              v-for="type in accommodationTypes" 
              :key="type"
              class="radio-item"
            >
              <input 
                :id="type"
                v-model="data.accommodationType"
                type="radio" 
                :value="type"
                @change="updateData"
              />
              <label :for="type" class="radio-label">{{ type }}</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>City / Province</label>
          <input
            v-model="data.city"
            type="text"
            placeholder="EX: Hà Nội, TP HCM,..."
            @input="updateData"
          />
        </div>

        <div class="form-group">
          <label>Địa chỉ chi tiết</label>
          <input
            v-model="data.address"
            type="text"
            placeholder="123 street 456, ward KLAS,..."
            @input="updateData"
          />
        </div>

        <div class="form-group">
          <label>Amenities</label>
          <div class="checkbox-group">
            <div 
              v-for="amenity in amenitiesList" 
              :key= "amenity.amenity_id|| amenity.name"
              class="checkbox-item"
            >
              <input 
                :id="`amenity-${amenity.amenity_id || amenity.id || amenity.name}`"
                v-model="data.amenities"
                type="checkbox" 
                :value="amenity.name"
                @change="updateData"
              />
              <label :for="`amenity-${amenity.name}`" class="checkbox-label">{{ amenity.name }}</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Các chi tiết khác</label>
          <input
            v-model="data.otherDetails"
            type="text"
            placeholder="Ex:"
            @input="updateData"
          />
        </div>
      </div>

      <div class="image-section">
        <label class="image-label">Thumbnail image of the place</label>
        <div class="image-upload-area">
          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="file-input"
            id="thumbnail-upload"
          />
          <label for="thumbnail-upload" class="upload-placeholder">
            <template v-if="previewSrc">
              <img :src="previewSrc" alt="Thumbnail preview" class="preview-img" />
            </template>
            <template v-else>
              <div class="upload-icon">
                <div class="circle"></div>
                <div class="triangle"></div>
              </div>
            </template>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.place-detail-step {
  padding: 1rem 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}

.form-section {
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

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
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

.radio-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.radio-item input[type="radio"] {
  width: auto;
  margin: 0;
}

.radio-label {
  font-weight: normal;
  color: #374151;
  cursor: pointer;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-item input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.checkbox-label {
  font-weight: normal;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

</style>
