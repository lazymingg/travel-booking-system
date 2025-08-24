<template>
  <HeaderModal />
  <div class="page">
    <h2 class="title">Tạo mới Accommodation (Thu thập trước, Submit một lần)</h2>
    <p class="subtitle">Mọi dữ liệu (thông tin & ảnh) chỉ được gửi lên server khi bạn bấm <b>Submit tất cả</b>.</p>

    <div class="steps-container">
      <div :class="['step-item', step === 1 ? 'active' : accomReady ? 'done' : '']">
        <div class="step-circle" @click="goToStep(1)">1</div>
        <div class="step-label">Place detail</div>
      </div>
      <div class="step-line"></div>
      <div :class="['step-item', step === 2 ? 'active' : '']">
        <div class="step-circle" @click="goToStep(2)">2</div>
        <div class="step-label">Rooms & Submit</div>
      </div>
    </div>

    <h3 class="form-title-main">Upload your accommodation here</h3>

    <section v-show="step === 1" class="form-section">
      <div class="form-row">
        <div class="form-fields">
          <label>
            <span class="label">Your accommodation name</span>
            <input v-model.trim="accommodation.name" required placeholder="EX: ABC" />
          </label>
          <label>
            <span>Accommodation type*</span>
              <div class="radio-group">
                <label><input type="radio" v-model="accommodation.accommodation_type" value="hotel" required /> Khách sạn</label>
                <label><input type="radio" v-model="accommodation.accommodation_type" value="apartment" required /> Căn hộ</label>
                <label><input type="radio" v-model="accommodation.accommodation_type" value="house" required /> Nhà</label>
                <label><input type="radio" v-model="accommodation.accommodation_type" value="room" required /> Phòng</label>
              </div>
          </label>
          <label>
            <span class="label">City / Province</span>
            <input v-model.trim="accommodation.city" required placeholder="EX: Hà Nội, TP HCM,..." />
          </label>
          <label>
            <span class="label">Address</span>
            <input v-model.trim="accommodation.address" required placeholder="123 street 456, ward KLAS,..." />
          </label>
          <label class="full">
            <span class="label">Other notes</span>
            <textarea v-model.trim="accommodation.description" rows="3" placeholder="Ex:"></textarea>
          </label>
        </div>

        <div class="image-uploader-container">
          <div class="uploader">
            <div class="uploader-header">
              <span class="image-label">Thumbnail image of the place</span>
              <input type="file" multiple accept="image/*" @change="onAccomFilesChange" />
            </div>
            <div v-if="accomPreviews.length" class="grid">
              <div v-for="(src, i) in accomPreviews" :key="i" class="thumb">
                <img :src="src" alt="preview" />
                <button class="remove" @click="removeAccomImage(i)" title="Xóa ảnh">×</button>
              </div>
            </div>
            <p v-else class="hint">Hãy chọn ít nhất 1 ảnh để hoàn tất bước này.</p>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="arrow-button right" :disabled="!canProceedRooms" @click="goToStep(2)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </section>

    <section v-show="step === 2" class="form-section">
      <div class="header-row">
        <h3 class="form-title">Your room(s) detail information</h3>
        <button class="add-room-button" @click="addRoom">+ Add more room</button>
      </div>

      <p v-if="!rooms.length" class="hint">Bạn có thể submit chỉ accommodation (không bắt buộc phải có phòng). Nếu thêm phòng, mỗi phòng phải có thông tin & ít nhất 1 ảnh.</p>

      <div v-for="(room, index) in rooms" :key="index" class="room-card">
        <div class="room-header">
          <h4>Room {{ index + 1 }}</h4>
          <button class="danger-button" @click="removeRoom(index)">❌ Delete</button>
        </div>

        <div class="room-row">
          <div class="room-fields">
            <label>
              <span class="label">Human capacity:</span>
              <input type="number" min="1" v-model.number="room.number_guest" placeholder="EX: 4" />
            </label>
            <label>
              <span class="label">Number of bed(s):</span>
              <input type="number" min="1" v-model.number="room.number_bed" placeholder="EX: 2" />
            </label>
            <label>
              <span class="label">Price/day (VND) *</span>
              <input type="number" min="0" v-model.number="room.price_per_day" />
            </label>
            <label class="full">
              <span class="label">Description</span>
              <textarea rows="2" v-model.trim="room.description" placeholder="Ex: lorem ipsum,...."></textarea>
            </label>
          </div>
          <div class="image-uploader-container">
            <div class="uploader">
              <div class="uploader-header">
                <span class="image-label">Detailed image of the room</span>
                <input type="file" multiple accept="image/*" @change="(e) => onRoomFilesChange(e, index)" />
              </div>
              <div v-if="room.previews.length" class="grid">
                <div v-for="(src, j) in room.previews" :key="j" class="thumb">
                  <img :src="src" alt="room preview" />
                  <button class="remove" @click="removeRoomImage(index, j)" title="Xóa ảnh">×</button>
                </div>
              </div>
              <div v-else class="hint">Chưa chọn ảnh cho phòng này.</div>
              <div class="inline-valid">
                <span :class="isRoomValid(room) ? 'ok' : 'bad'">{{ isRoomValid(room) ? 'Phòng hợp lệ' : 'Thiếu thông tin/ảnh' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="arrow-button left" @click="goToStep(1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <button :disabled="!isAllValid || isSubmittingAll" @click="submitAll">
          {{ isSubmittingAll ? 'Đang gửi...' : 'Submit tất cả' }}
        </button>
      </div>

      <div v-if="submitLog.length" class="progress">
        <h4>Tiến trình</h4>
        <ul>
          <li v-for="(line, i) in submitLog" :key="i">{{ line }}</li>
        </ul>
      </div>
    </section>

  </div>
  <FooterModal />
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'

// ===== Steps =====
const step = ref(1)
function goToStep(s) { step.value = s }

// ===== Accommodation state =====
const accommodation = ref({
  name: '', address: '', city: '', description: '', accommodation_type: ''
})

const accomFiles = ref([])
const accomPreviews = ref([])
let accomObjectUrls = []

const requiredFilled = computed(() =>
  accommodation.value.name && accommodation.value.address && accommodation.value.city && accommodation.value.accommodation_type
)
const canProceedRooms = computed(() => requiredFilled.value && accomFiles.value.length > 0)
const accomReady = computed(() => canProceedRooms.value)

function onAccomFilesChange(e) {
  // clear old urls
  accomObjectUrls.forEach(URL.revokeObjectURL)
  accomObjectUrls = []

  const files = Array.from(e.target.files || [])
  accomFiles.value = files
  accomPreviews.value = files.map(f => {
    const u = URL.createObjectURL(f)
    accomObjectUrls.push(u)
    return u
  })
}
function removeAccomImage(i) {
  const url = accomPreviews.value[i]
  if (url) URL.revokeObjectURL(url)
  accomPreviews.value.splice(i, 1)
  accomFiles.value.splice(i, 1)
}

// ===== Rooms state =====
const rooms = ref([])
function addRoom() {
  rooms.value.push({
    number_guest: null,
    price_per_day: null,
    number_bed: null,
    description: '',
    files: [],
    previews: [],
    objectUrls: []
  })
}
function removeRoom(index) {
  rooms.value[index]?.objectUrls.forEach(URL.revokeObjectURL)
  rooms.value.splice(index, 1)
}
function onRoomFilesChange(e, idx) {
  const files = Array.from(e.target.files || [])
  const room = rooms.value[idx]
  room.objectUrls.forEach(URL.revokeObjectURL)
  room.objectUrls = []
  room.files = files
  room.previews = files.map(f => { const u = URL.createObjectURL(f); room.objectUrls.push(u); return u })
}
function removeRoomImage(roomIdx, imgIdx) {
  const room = rooms.value[roomIdx]
  const url = room.previews[imgIdx]
  if (url) URL.revokeObjectURL(url)
  room.previews.splice(imgIdx, 1)
  room.files.splice(imgIdx, 1)
}
function isRoomValid(room) {
  // Room is considered valid only if user added this room and filled requireds + has at least one image
  return !!room.number_guest && !!room.price_per_day && !!room.number_bed && room.files.length > 0
}

// ===== Global validation =====
const allRoomsValid = computed(() => rooms.value.every(isRoomValid))
const isAllValid = computed(() => canProceedRooms.value && allRoomsValid.value)

// ===== Submit-all pipeline =====
const isSubmittingAll = ref(false)
const submitLog = ref([])
function log(msg) { submitLog.value.push(msg) }

async function submitAll() {
  if (!isAllValid.value) return
  isSubmittingAll.value = true
  submitLog.value = []

  let accommodationId = null
  try {
    // 1) Create accommodation
    log('Tạo accommodation...')
    const res = await fetch('http://localhost:3000/accommodations', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify(accommodation.value)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.message || 'Lỗi tạo accommodation')
    accommodationId = data?.data?.accommodation_id
    if (!accommodationId) throw new Error('Không nhận được accommodation_id từ server')
    log('✔ Accommodation đã tạo.')

    // 2) Upload accommodation images
    log('Upload ảnh accommodation...')
    const fdA = new FormData()
    accomFiles.value.forEach(f => fdA.append('images', f))
    const imgRes = await fetch(`http://localhost:3000/accommodations/${accommodationId}/images`, {
      method: 'POST', body: fdA, credentials: 'include'
    })
    const imgData = await imgRes.json()
    if (!imgRes.ok) throw new Error(imgData?.message || 'Upload ảnh accommodation thất bại')
    log('✔ Ảnh accommodation đã upload.')

    // 3) For each room: create then upload images
    for (let i = 0; i < rooms.value.length; i++) {
      const r = rooms.value[i]
      log(`Tạo phòng #${i+1}...`)
      const rRes = await fetch(`http://localhost:3000/accommodations/${accommodationId}/rooms`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({
          number_guest: r.number_guest,
          price_per_day: r.price_per_day,
          number_bed: r.number_bed,
          description: r.description || ''
        })
      })
      const rData = await rRes.json()
      if (!rRes.ok) throw new Error(rData?.message || `Lỗi tạo phòng #${i+1}`)
      const roomId = rData?.data?.room_id
      if (!roomId) throw new Error(`Không nhận được room_id cho phòng #${i+1}`)
      log(`✔ Phòng #${i+1} đã tạo.`)

      log(`Upload ảnh phòng #${i+1}...`)
      const fdR = new FormData()
      r.files.forEach(f => fdR.append('images', f))
      const rImgRes = await fetch(`http://localhost:3000/accommodations/${accommodationId}/rooms/${roomId}/images`, {
        method: 'POST', body: fdR, credentials: 'include'
      })
      const rImgData = await rImgRes.json()
      if (!rImgRes.ok) throw new Error(rImgData?.message || `Upload ảnh phòng #${i+1} thất bại`)
      log(`✔ Ảnh phòng #${i+1} đã upload.`)
    }

    log('🎉 Hoàn tất! Accommodation và Rooms đã được tạo cùng ảnh.')
    alert('Tạo & upload thành công!')

    // Optional: reset form
    resetAll()
    step.value = 1

  } catch (err) {
    console.error(err)
    log(`❌ Lỗi: ${err.message || err}`)
    alert(err.message || 'Có lỗi xảy ra trong quá trình submit')
  } finally {
    isSubmittingAll.value = false
  }
}

function resetAll() {
  // revoke URLs
  accomObjectUrls.forEach(URL.revokeObjectURL)
  accomObjectUrls = []
  rooms.value.forEach(r => r.objectUrls.forEach(URL.revokeObjectURL))

  // reset states
  accommodation.value = { name: '', address: '', city: '', description: '', accommodation_type: '' }
  accomFiles.value = []
  accomPreviews.value = []
  rooms.value = []
}

onBeforeUnmount(() => {
  accomObjectUrls.forEach(URL.revokeObjectURL)
  rooms.value.forEach(r => r.objectUrls.forEach(URL.revokeObjectURL))
})
</script>

<style scoped>
/* GENERAL STYLES */
.page {
  max-width: 980px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: Arial, sans-serif;
  color: #333;
}
.title {
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
.subtitle {
  text-align: center;
  color: #888;
  margin-top: 0;
  margin-bottom: 2rem;
}

/* STEPS COMPONENT */
.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}
.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.step-item.active .step-circle {
  background-color: #007bff;
}
.step-item.done .step-circle {
  background-color: #28a745;
}
.step-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}
.step-line {
  height: 2px;
  width: 100px;
  background-color: #e0e0e0;
  margin: 0 -5px;
  position: relative;
}
.step-item.active + .step-line, .step-item.done + .step-line {
  background-color: #007bff;
}
.step-item.done + .step-line {
  background-color: #28a745;
}

/* MAIN FORM STYLING */
.form-title-main {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1.5rem 0;
}
.form-section {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}
.form-row {
  display: flex;
  gap: 2rem;
}
.form-fields {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.image-uploader-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
label {
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
}
input, textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
}
input:focus, textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
}
.full {
  grid-column: 1 / -1;
}

/* UPLOADER STYLES */
.uploader {
  width: 100%;
}
.uploader-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.image-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.image-placeholder {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
}
.image-placeholder .icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}
.thumb {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb .remove {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  line-height: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.thumb .remove:hover {
  background-color: #dc3545;
}

/* ACTIONS & NAVIGATION */
.actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
}
.arrow-button {
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}
.arrow-button:hover {
  background-color: #f1f1f1;
}
.arrow-button svg {
  width: 20px;
  height: 20px;
  color: #333;
}
.arrow-button.left {
  transform: scaleX(1);
}
.arrow-button.right {
  transform: scaleX(1);
}
.arrow-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ROOMS SECTION */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.form-title {
  font-size: 1.8rem;
  font-weight: bold;
}
.add-room-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}
.add-room-button:hover {
  background-color: #0056b3;
}
.room-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #f1f1f1;
}
.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.room-header h4 {
  margin: 0;
}
.danger-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.danger-button:hover {
  background-color: #c82333;
}
.room-row {
  display: flex;
  gap: 2rem;
}
.room-fields {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.inline-valid {
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.inline-valid .ok {
  color: #28a745;
}
.inline-valid .bad {
  color: #dc3545;
}

.radio-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.radio-group label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;
}


</style>