<template>
  <div class="page">
    <h2 class="title">Tạo mới Accommodation (Thu thập trước, Submit một lần)</h2>
    <p class="subtitle">Mọi dữ liệu (thông tin & ảnh) chỉ được gửi lên server khi bạn bấm <b>Submit tất cả</b>.</p>

    <!-- Step navigation (clickable) -->
    <div class="steps">
      <button :class="['step', step===1 ? 'active' : accomReady ? 'done' : '']" @click="goToStep(1)">1. Accommodation</button>
      <button :class="['step', step===2 ? 'active' : '']" @click="goToStep(2)">2. Rooms & Submit</button>
    </div>

    <!-- ===== Step 1: Accommodation ===== -->
    <section v-show="step === 1" class="card">
      <h3>Thông tin Accommodation</h3>
      <div class="form-grid">
        <label>
          <span>Tên *</span>
          <input v-model.trim="accommodation.name" required />
        </label>
        <label>
          <span>Địa chỉ *</span>
          <input v-model.trim="accommodation.address" required />
        </label>
        <label>
          <span>Thành phố *</span>
          <input v-model.trim="accommodation.city" required />
        </label>
        <label>
          <span>Loại accommodation *</span>
          <input v-model.trim="accommodation.accommodation_type" required />
        </label>
        <label class="full">
          <span>Mô tả</span>
          <textarea v-model.trim="accommodation.description" rows="3"></textarea>
        </label>
      </div>

      <div class="uploader">
        <div class="uploader-header">
          <h4>Ảnh accommodation *</h4>
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

      <div class="actions">
        <button class="secondary" :disabled="!canProceedRooms" @click="goToStep(2)">Tiếp tục: Rooms →</button>
      </div>
    </section>

    <!-- ===== Step 2: Rooms & Submit ===== -->
    <section v-show="step === 2" class="card">
      <div class="header-row">
        <h3>Thêm các Phòng</h3>
        <div class="spacer"></div>
        <button class="secondary" @click="addRoom">+ Thêm phòng</button>
      </div>

      <div v-if="!rooms.length" class="hint">Bạn có thể submit chỉ accommodation (không bắt buộc phải có phòng). Nếu thêm phòng, mỗi phòng phải có thông tin & ít nhất 1 ảnh.</div>

      <div v-for="(room, index) in rooms" :key="index" class="room">
        <div class="room-head">
          <h4>Room {{ index + 1 }}</h4>
          <button class="danger outline" @click="removeRoom(index)">❌ Xóa</button>
        </div>

        <div class="form-grid">
          <label>
            <span>Số khách *</span>
            <input type="number" min="1" v-model.number="room.number_guest" />
          </label>
          <label>
            <span>Giá/ngày (VND) *</span>
            <input type="number" min="0" v-model.number="room.price_per_day" />
          </label>
          <label>
            <span>Số giường *</span>
            <input type="number" min="1" v-model.number="room.number_bed" />
          </label>
          <label class="full">
            <span>Mô tả</span>
            <textarea rows="2" v-model.trim="room.description"></textarea>
          </label>
        </div>

        <div class="uploader">
          <div class="uploader-header">
            <h4>Ảnh phòng *</h4>
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

      <div class="actions">
        <button class="secondary" @click="goToStep(1)">← Quay lại Accommodation</button>
        <button :disabled="!isAllValid || isSubmittingAll" @click="submitAll">
          {{ isSubmittingAll ? 'Đang gửi...' : 'Submit tất cả' }}
        </button>
      </div>

      <!-- Progress area -->
      <div v-if="submitLog.length" class="progress">
        <h4>Tiến trình</h4>
        <ul>
          <li v-for="(line, i) in submitLog" :key="i">{{ line }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

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
.page { max-width: 980px; margin: 0 auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; }
.title { margin: .2rem 0; }
.subtitle { color: #6b7280; margin: 0; }

.steps { display: flex; gap: .5rem; margin-top: .25rem; }
.step { padding: .45rem .8rem; border-radius: 999px; border: 1px solid #e5e7eb; background: #f9fafb; color: #374151; cursor: pointer; }
.step.active { background: #2563eb; color: white; border-color: #2563eb; }
.step.done { background: #10b981; color: white; border-color: #10b981; }

.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,.04); }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: .8rem; }
.form-grid .full { grid-column: 1 / -1; }
label { display: flex; flex-direction: column; gap: .25rem; font-size: .92rem; }
input, textarea { padding: .55rem .6rem; border: 1px solid #d1d5db; border-radius: 8px; outline: none; }
input:focus, textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }

.uploader { margin-top: .8rem; }
.uploader-header { display: flex; align-items: center; gap: 1rem; }
.hint { color: #6b7280; font-size: .9rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: .6rem; margin-top: .6rem; }
.thumb { position: relative; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; background: #f9fafb; }
.thumb img { width: 100%; height: 110px; object-fit: cover; display: block; }
.thumb .remove { position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,.65); color: white; border: none; border-radius: 999px; width: 22px; height: 22px; line-height: 22px; text-align: center; cursor: pointer; }

.actions { margin-top: 1rem; display: flex; gap: .6rem; }
button { padding: .6rem .95rem; border-radius: 9px; border: 1px solid #d1d5db; background: #111827; color: #fff; cursor: pointer; }
button.secondary { background: #374151; }
button.danger { background: #ef4444; border-color: #ef4444; }
button.danger.outline { background: transparent; color: #ef4444; border: 1px solid #ef4444; }
button[disabled] { opacity: .6; cursor: not-allowed; }

.header-row { display: flex; align-items: center; gap: .8rem; margin-bottom: .4rem; }
.spacer { flex: 1; }
.room { border: 1px dashed #e5e7eb; border-radius: 12px; padding: .9rem; margin: .9rem 0; }
.room-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: .4rem; }
.inline-valid { margin-top: .4rem; font-size: .9rem; }
.inline-valid .ok { color: #10b981; }
.inline-valid .bad { color: #ef4444; }

.progress { margin-top: 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: .8rem; }
.progress ul { margin: .4rem 0 0; padding-left: 1rem; }
</style>