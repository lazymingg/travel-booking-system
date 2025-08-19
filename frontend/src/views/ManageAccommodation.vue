<script setup>
import { ref, computed } from 'vue'
import AccommodationStats from '../components/accommodations/AccommodationStats.vue'
import AccommodationCard from '../components/accommodations/AccommodationCard.vue'
import EditAccommodationModal from '../components/accommodations/EditAccommodationModal.vue'
import DeleteAccommodationModal from '../components/accommodations/DeleteAccommodationModal.vue'

console.log('[v0] ManageAccommodation component loaded')

const accommodations = ref([
  {
    id: 'A001',
    name: 'Khách sạn continental',
    city: 'TPHCM',
    rating: 4.6,
    price: 1000000,
    image: '/placeholder.svg?height=200&width=300',
    totalBookings: 15,
    revenue: 15000000
  },
  {
    id: 'A002',
    name: 'Resort Paradise',
    city: 'Đà Nẵng',
    rating: 4.8,
    price: 1500000,
    image: '/placeholder.svg?height=200&width=300',
    totalBookings: 12,
    revenue: 18000000
  },
  {
    id: 'A003',
    name: 'Mountain Lodge',
    city: 'Sapa',
    rating: 4.4,
    price: 800000,
    image: '/placeholder.svg?height=200&width=300',
    totalBookings: 24,
    revenue: 19200000
  }
])

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedAccommodation = ref(null)
console.log('[v0] ManageAccommodation component loaded')

const stats = computed(() => {
  const result = {
    totalProperties: accommodations.value.length,
    totalRevenue: accommodations.value.reduce((sum, acc) => sum + acc.revenue, 0),
    totalBookings: accommodations.value.reduce((sum, acc) => sum + acc.totalBookings, 0),
    averageRating: accommodations.value.reduce((sum, acc) => sum + acc.rating, 0) / accommodations.value.length
  }
  console.log('[v0] Computed stats:', result)
  return result
})


function openAddModal() {
  //router.push('/upload-accommodation')
  window.location.href = '/upload-accommodation'
}

function openEditModal(accommodation) {
  selectedAccommodation.value = { ...accommodation }
  showEditModal.value = true
}

function openDeleteModal(accommodation) {
  selectedAccommodation.value = { ...accommodation }
  showDeleteModal.value = true
}

function handleEdit(updatedAccommodation) {
  const idx = accommodations.value.findIndex(acc => acc.id === updatedAccommodation.id)
  if (idx !== -1) {
    accommodations.value[idx] = { ...updatedAccommodation }
  }
  showEditModal.value = false
  console.log('Accommodation updated:', updatedAccommodation)
}

function handleDelete(accommodationId) {
  accommodations.value = accommodations.value.filter(acc => acc.id !== accommodationId)
  showDeleteModal.value = false
  console.log('Accommodation deleted:', accommodationId)
}

function handleView(accommodation) {
  console.log('Viewing accommodation:', accommodation)
  // Add your view logic here
}

</script>

<template>
  <div class="page-wrapper">
    <!-- Section Title -->
    <div class="section-title-row">
      <h2 class="section-title">Manage Properties</h2>
      <button class="add-properties-btn" @click="openAddModal">
        + Add Properties
      </button>
    </div>

    <!-- Statistics Cards -->
    <AccommodationStats :stats="stats" />

    <!-- Accommodation List -->
    <div class="list-accom-cards-container">
      <AccommodationCard
        v-for="accommodation in accommodations"
        :key="accommodation.id"
        :accommodation="accommodation"
        @edit="openEditModal"
        @view="handleView"
        @delete="openDeleteModal"
      />
    </div>

    <!-- Modals -->

    <EditAccommodationModal
      v-if="showEditModal"
      :accommodation="selectedAccommodation"
      @close="showEditModal = false"
      @save="handleEdit"
    />

    <DeleteAccommodationModal
      v-if="showDeleteModal"
      :accommodation="selectedAccommodation"
      @close="showDeleteModal = false"
      @delete="handleDelete"
    />
  </div>
</template>

<style scoped>

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
  align-items: center;
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

.add-properties-btn {
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(59,130,246,0.15);
}

.add-properties-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59,130,246,0.2);
}

.list-accom-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>
