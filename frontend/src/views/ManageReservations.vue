<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'
import ReservationFilter from '../components/reservations/ReservationFilter.vue'
import ReservationCard from '../components/reservations/ReservationCard.vue'
import DeleteReservationModal from '../components/reservations/DeleteReservationModal.vue'
import EditReservationModal from '../components/reservations/EditReservationModal.vue'
import api from '@/frontend-api-helper.js'

const reservations = ref([])
const activeTab = ref('all')
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedReservation = ref(null)
const loading = ref(false)
const error = ref(null)

// Fetch reservations for owner accommodations (including bookings from other users)
const fetchReservations = async () => {
  try {
    loading.value = true
    error.value = null
    const statusParam = activeTab.value !== 'all' ? `?status=${activeTab.value}` : ''
    const result = await api.get(`/owners/bookings${statusParam}`)
    if (result.success) {
      reservations.value = result.data || []
    } else {
      throw new Error(result.message || 'Unknown error')
    }
  } catch (err) {
    error.value = 'Failed to load reservations: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReservations()
})

const handleConfirm = async (reservation) => {
  loading.value = true
  error.value = null
  const result = await api.put(`/owners/bookings/${reservation.booking_id}/confirm`)
  console.log('Confirming reservation:', result)
  console.log('Reservation ID:', reservation.status)
  if (result.success) {
    await fetchReservations()
    console.log('Reservation confirmed:', reservations)
    activeTab.value = 'confirmed'
  } else {
    error.value = result.message
  }
  loading.value = false

}

// Edit reservation (update fields and reload)
const handleSave = async (updated) => {
  loading.value = true
  error.value = null
  const result = await api.put(`/owners/bookings/${updated.booking_id}`, updated)
  if (result.success) {
    await fetchReservations()
    showEditModal.value = false // Close edit modal
  } else {
    error.value = result.message
  }
  loading.value = false
}

// Delete (move to cancelled status and close pop-up)
const confirmDelete = async (id) => {
  loading.value = true
  error.value = null
  const result = await api.put(`/owners/bookings/${id}/cancel`)
  if (result.success) {
    await fetchReservations()
    showDeleteModal.value = false // Close delete modal
    activeTab.value = 'cancelled'
  } else {
    error.value = result.message
  }
  loading.value = false
}

const handleDecline = async (reservation) => {
  loading.value = true
  error.value = null
  const result = await api.delete(`/owners/bookings/${reservation.booking_id}`)
  if (result.success) {
    await fetchReservations()
  } else {
    error.value = result.message
  }
  loading.value = false
}

// Open edit modal
const openEdit = (reservation) => {
  selectedReservation.value = { ...reservation }
  showEditModal.value = true
}

// Open delete modal
const openDeleteModal = (reservation) => {
  selectedReservation.value = { ...reservation }
  showDeleteModal.value = true
}

const filteredReservations = computed(() => {
  if (activeTab.value === 'all') return reservations.value
  return reservations.value.filter(r => r.status === activeTab.value)
})

const totalRevenue = computed(() => {
  return reservations.value
    .filter(r => r.status === 'confirmed' || r.status === 'completed')
    .reduce((sum, r) => sum + r.total_price, 0)
})
</script>

<template>
  <HeaderModal/>
  <div class="page-wrapper">
    <div class="section-title-row">
      <div>
        <h2 class="section-title">Manage Reservation</h2>
        <p class="section-subtitle">View and manage guest's reservations for your properties</p>
      </div>
      <div class="total-box">
        <span class="total-label">Total Revenue:</span>
        <span class="total-value">${{ totalRevenue }}</span>
      </div>
    </div>

    <!-- Tabs -->
    <ReservationFilter
      :reservations="reservations"
      :activeTab="activeTab"
      @changeTab="activeTab = $event"
    />

    <!-- Reservation List -->
    <div class="reservation-list">
      <ReservationCard
        v-for="reservation in filteredReservations"
        :key="reservation.booking_id"
        :reservation="reservation"
        @confirm="handleConfirm"
        @decline="handleDecline"
        @edit="openEdit"
        @delete="openDeleteModal"
      />
    </div>

    <!-- Modals -->
    <DeleteReservationModal
      v-if="showDeleteModal"
      :reservation="selectedReservation"
      @close="showDeleteModal = false"
      @delete="confirmDelete"
    />

    <EditReservationModal
      v-if="showEditModal"
      :reservation="selectedReservation"
      @close="showEditModal = false"
      @save="handleSave"
    />
  </div>
  <FooterModal/>
</template>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
}
.main-content {
  flex: 1;
  padding-bottom: 2rem;
}
.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  background: #f9fafb;
  min-height: 100vh;
}
.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 2px 8px rgba(30,64,175,0.08);
  border: 1px solid #E5E7EB;
}
.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 0.25rem;
}
.section-subtitle {
  color: #6B7280;
  font-size: 1.1rem;
}
.total-box {
  background: linear-gradient(135deg, #22C55E, #16a34a);
  color: #fff;
  padding: 1.25rem 2rem;
  border-radius: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(34,197,94,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 180px;
}
.total-label {
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.9;
}
.total-value {
  font-size: 1.75rem;
  font-weight: bold;
}
.reservation-list {
  margin-top: 1rem;
}
</style>
