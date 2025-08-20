<script setup>
// const axious = require('axios');
import HeaderModal from '@/components/HeaderModal.vue';
import FooterModal from '@/components/FooterModal.vue';


import { ref, computed } from 'vue'
import ReservationFilter from '../components/reservations/ReservationFilter.vue'
import ReservationCard from '../components/reservations/ReservationCard.vue'
import DeleteReservationModal from '../components/reservations/DeleteReservationModal.vue'
import EditReservationModal from '../components/reservations/EditReservationModal.vue'

const reservations = ref([
  { id: 'R001', hotel: 'Grand Palace Hotel', guest: 'Alice Nguyen', adults: 2, children: 1, checkIn: '2024-07-01', checkOut: '2024-07-05', total: 500, requirements: 'Late check-in, vegan meals', status: 'pending' },
  { id: 'R002', hotel: 'Sunrise Resort', guest: 'Bob Tran', adults: 1, children: 0, checkIn: '2024-07-10', checkOut: '2024-07-12', total: 300, requirements: '', status: 'confirmed' },
  { id: 'R003', hotel: 'Ocean View Inn', guest: 'Carol Le', adults: 2, children: 2, checkIn: '2024-06-20', checkOut: '2024-06-25', total: 700, requirements: 'Baby crib', status: 'cancelled' },
  { id: 'R004', hotel: 'Mountain Retreat', guest: 'David Pham', adults: 1, children: 0, checkIn: '2024-05-15', checkOut: '2024-05-18', total: 400, requirements: '', status: 'completed' },
])

const activeTab = ref('all')
const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedReservation = ref(null)

const filteredReservations = computed(() => {
  if (activeTab.value === 'all') return reservations.value
  return reservations.value.filter(r => r.status === activeTab.value)
})

const totalRevenue = computed(() => {
  return reservations.value
    .filter(r => r.status === 'confirmed' || r.status === 'completed')
    .reduce((sum, r) => sum + r.total, 0)
})

// Confirm pending reservation (pending → confirmed) and switch to confirmed tab
function handleConfirm(reservation) {
  const idx = reservations.value.findIndex(r => r.id === reservation.id)
  if (idx !== -1) {
    reservations.value[idx].status = 'confirmed'
    // Auto switch to confirmed tab to show the updated reservation
    activeTab.value = 'confirmed'
    console.log(`Reservation ${reservation.id} confirmed and moved to Confirmed filter`)
  }
}

// Decline pending reservation (removes from list)
function handleDecline(reservation) {
  reservations.value = reservations.value.filter(r => r.id !== reservation.id)
  console.log(`Reservation ${reservation.id} declined and removed`)
}

// Cancel confirmed reservation (confirmed → cancelled) and switch to cancelled tab
function handleDelete(reservation) {
  const idx = reservations.value.findIndex(r => r.id === reservation.id)
  if (idx !== -1) {
    reservations.value[idx].status = 'cancelled'
    // Auto switch to cancelled tab to show the updated reservation
    activeTab.value = 'cancelled'
    console.log(`Reservation ${reservation.id} cancelled and moved to Cancelled filter`)
  }
}

function openDeleteModal(reservation) {
  selectedReservation.value = { ...reservation }
  showDeleteModal.value = true
}

function openEdit(reservation) {
  selectedReservation.value = { ...reservation }
  showEditModal.value = true
}

function confirmDelete(id) {
  const reservation = reservations.value.find(r => r.id === id)
  if (reservation) {
    handleDelete(reservation)
  }
  showDeleteModal.value = false
}

function handleSave(updated) {
  const idx = reservations.value.findIndex(r => r.id === updated.id)
  if (idx !== -1) {
    const oldStatus = reservations.value[idx].status
    reservations.value[idx] = { ...updated }

    // Auto switch to the new status tab if status changed
    if (oldStatus !== updated.status) {
      activeTab.value = updated.status
    }

    console.log(`Reservation ${updated.id} updated and moved to ${updated.status} filter`)
  }
  showEditModal.value = false
}

function handleContact(reservation) {
  console.log('Contacting guest:', reservation.guest)
  // Add your contact logic here
}
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
      <ReservationCard
        v-for="reservation in filteredReservations"
        :key="reservation.id"
        :reservation="reservation"
        @confirm="handleConfirm"
        @decline="handleDecline"
        @edit="openEdit"
        @delete="openDeleteModal"
        @contact="handleContact"
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
