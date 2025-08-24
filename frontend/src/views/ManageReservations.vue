<script setup>
import { ref, computed, onMounted } from 'vue'
import pendingSvg from '@/assets/manageReservationIcons/status/pendingStatus.svg'
import completedSvg from '@/assets/manageReservationIcons/status/completedStatus.svg'
import confirmedSvg from '@/assets/manageReservationIcons/status/confirmedStatus.svg'
import cancelledSvg from '@/assets/manageReservationIcons/status/cancelledStatus.svg'
import deleteSvg from '@/assets/manageReservationIcons/buttons/deleteButton.svg'
import confirmSvg from '@/assets/manageReservationIcons/buttons/confirmButton.svg'
import declineSvg from '@/assets/manageReservationIcons/buttons/declineButton.svg'
import editSvg from '@/assets/manageReservationIcons/buttons/editButton.svg'

import HeaderModal from '../components/HeaderModal.vue'
import FooterModal from '../components/FooterModal.vue'
import ReservationFilter from '../components/reservations/ReservationFilter.vue'
import DeleteReservationModal from '../components/reservations/DeleteReservationModal.vue'
import EditReservationModal from '../components/reservations/EditReservationModal.vue'

import api from '@/frontend-api-helper.js'

const reservations = ref([])
const loading = ref(false)
const error = ref(null)

const activeTab = ref('all')
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedReservation = ref(null)

const statusMap = {
  completed: { bg: '#F3F4F6', color: '#374151', text: 'Completed', svg: completedSvg },
  confirmed: { bg: '#dcfce7', color: '#22C55E', text: 'Confirmed', svg: confirmedSvg },
  pending: { bg: '#FEF3C7', color: '#F59E0B', text: 'Pending', svg: pendingSvg },
  cancelled: { bg: '#fee2e2', color: '#EF4444', text: 'Cancelled', svg: cancelledSvg },
}

const fetchReservations = async (status = 'all') => {
  try {
    loading.value = true
    error.value = null
    const params = status !== 'all' ? `?status=${status}` : ''
    const result = await api.get(`/owners/bookings${params}`)
    if (result.success) {
      reservations.value = result.data
      console.log('Reservations fetched:', reservations.value)
    } else {
      throw new Error(result.message || 'Unknown error')
    }
  } catch (err) {
    error.value = 'Can not upload the reservations: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReservations('all')
})

const handleConfirm = async (reservation) => {
  try {
    loading.value = true
    error.value = null
    const result = await api.put(`/owners/bookings/${reservation.booking_id}/confirm`)
    if (!result.success) throw new Error(result.message || 'Unknown error')
    await fetchReservations('confirmed')
    activeTab.value = 'confirmed'
    
  } catch (err) {
    error.value = 'Can not confirm: ' + err.message
  } finally {
    loading.value = false
  }
}

const handleSave = async (updated) => {
  try {
    loading.value = true
    error.value = null
    const result = await api.put(`/owners/bookings/${updated.booking_id}`, {
      status: updated.status,
      check_in_date: updated.check_in_date,
      check_out_date: updated.check_out_date,
      total_price: updated.total_price
    })
    if (!result.success) throw new Error(result.message || 'Unknown error')
    await fetchReservations(updated.status)
    showEditModal.value = false
    activeTab.value = updated.status
  } catch (err) {
    error.value = 'Can not update: ' + err.message
  } finally {
    loading.value = false
  }
}

const handleDelete = async (updated) => {
  try {
    loading.value = true
    error.value = null
    const result = await api.put(`/owners/bookings/${updated.booking_id}/cancel`)
    if (!result.success) throw new Error(result.message || 'Unknown error')
    await fetchReservations('cancelled')
    showDeleteModal.value = false
    activeTab.value = 'cancelled'
  } catch (err) {
    error.value = 'Can not cancel: ' + err.message
  } finally {
    loading.value = false
  }
}

const handleDecline = async (reservation) => {
  try {
    loading.value = true
    error.value = null
    const result = await api.delete(`/owners/bookings/${reservation.booking_id}`)
    if (!result.success) throw new Error(result.message || 'Unknown error')
    await fetchReservations(activeTab.value)
  } catch (err) {
    error.value = 'Can not decline: ' + err.message
  } finally {
    loading.value = false
  }
}

const filteredReservations = computed(() => {
  if (activeTab.value === 'all') return reservations.value
  return reservations.value.filter(r => r.status === activeTab.value)
})


function openDeleteModal(reservation) {
  selectedReservation.value = { ...reservation }
  showDeleteModal.value = true
}

function openEdit(reservation) {
  selectedReservation.value = { ...reservation }
  showEditModal.value = true
}

const totalRevenue = computed(() => {
  return reservations.value
    .filter(r => r.status === 'confirmed' || r.status === 'completed')
    .reduce((sum, r) => sum + (Number(r.total_price) || 0), 0)
})

</script>

<template>
    <HeaderModal/>
    
  <div class="page-wrapper">
    <!-- Section Title -->
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
      <div
        v-for="reservation in filteredReservations"
        :key="reservation.booking_id"
        class="reservation-card"
      >
        <div class="card-header">
          <div class="hotel-status-row">
            <span class="hotel-name">{{ reservation.accommodation_name }}</span>
            <span class="status-badge" :style="{ background: statusMap[reservation.status]?.bg, color: statusMap[reservation.status]?.color }">
              <img :src="statusMap[reservation.status]?.svg" alt="Status" class="svg-icon" />
              {{ statusMap[reservation.status]?.text || reservation.status }}
            </span>
          </div>
        </div>
        <div class="card-body">
          <div class="info-row"><span class="info-label">Guest:</span><span class="info-value">{{ reservation.user_name }}</span></div>
          <div class="info-row"><span class="info-label">Dates:</span><span class="info-value">{{ reservation.check_in_date }} → {{ reservation.check_out_date }}</span></div>
          <div class="info-row"><span class="info-label">Total:</span><span class="info-value total-amount">${{ reservation.total_price }}</span></div>
        </div>
        <hr class="card-divider" />
        <div class="card-footer">
          <div class="reservation-id">#{{ reservation.booking_id }}</div>
          <div class="card-actions">
            <template v-if="reservation.status === 'pending'">
              <button class="btn btn-success" @click="handleConfirm(reservation)" title="Move to Confirmed">
                <img :src="confirmSvg" alt="Confirm" class="svg-icon" /> Confirm
              </button>
              <button class="btn btn-danger" @click="handleDecline(reservation)" title="Remove reservation">
                <img :src="declineSvg" alt="Decline" class="svg-icon" /> Decline
              </button>
              <button class="btn btn-primary" @click="openEdit(reservation)" title="Edit reservation details">
                <img :src="editSvg" alt="Edit" class="svg-icon" /> Edit
              </button>
            </template>
            <template v-else-if="reservation.status === 'confirmed'">
              <button class="btn btn-danger" @click="openDeleteModal(reservation)" title="Move to Cancelled">
                <img :src="deleteSvg" alt="Delete" class="svg-icon" /> Cancel
              </button>
              <button class="btn btn-primary" @click="openEdit(reservation)" title="Edit reservation details">
                <img :src="editSvg" alt="Edit" class="svg-icon" /> Edit
              </button>
            </template>
            <template v-else>
              <button class="btn btn-primary" @click="openEdit(reservation)" title="Edit reservation details">
                <img :src="editSvg" alt="Edit" class="svg-icon" /> Edit
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <DeleteReservationModal
      v-if="showDeleteModal"
      :reservation="selectedReservation"
      @close="showDeleteModal = false"
      @delete="handleDelete"
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
.reservation-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(30,64,175,0.08);
  border: 1px solid #E5E7EB;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
}
.hotel-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.hotel-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E40AF;
}
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  margin-right: 0.5em;
}
.card-body {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.info-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.info-label {
  font-weight: 500;
  color: #6B7280;
}
.info-value {
  color: #374151;
}
.total-amount {
  font-weight: bold;
  color: #22C55E;
}
.special-req {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: #F59E0B;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}
.card-divider {
  border: none;
  border-top: 1px solid #E5E7EB;
  margin: 0.5rem 0 1rem 0;
}
.reservation-id {
  font-size: 0.95rem;
  color: #6B7280;
  font-weight: 500;
}
.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.2s, color 0.2s, transform 0.1s;
}
.btn:hover {
  transform: translateY(-1px);
}
.btn-primary {
  background: #1E40AF;
  color: #fff;
}
.btn-primary:hover {
  background: #1e3a8a;
}
.btn-success {
  background: #22C55E;
  color: #fff;
}
.btn-success:hover {
  background: #16a34a;
}
.btn-danger {
  background: #EF4444;
  color: #fff;
}
.btn-danger:hover {
  background: #dc2626;
}

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