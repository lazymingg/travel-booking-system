<template>
  <!-- Header -->
  <HeaderModal/>
  
  <!-- Main content -->
  <main class="main_content">
    <div class="content_layout">
      <h1 class="page_title">My Accommodations</h1>
      
      <!-- Loading state -->
      <div v-if="loading" class="loading-state">
        <p>Loading your accommodations...</p>
      </div>
      
      <!-- Error state -->
      <div v-if="error" class="error-state">
        <p>{{ error }}</p>
      </div>

      <!-- Results -->
      <div v-if="!loading && !error" class="accommodations_grid">
        <AccommodationCard 
          v-for="accommodation in displayedAccommodations" 
          :key="accommodation.id"
          :accommodation="accommodation"
          :show-status="true"
        >
          <template #actions="{ accommodation }">
            <div class="owner_actions">
              <button class="edit_btn" @click="editAccommodation(accommodation)">Edit</button>
              <button class="manage_btn" @click="manageAccommodation(accommodation)">Manage</button>
              <button class="view_btn" @click="viewAccommodationDetails(accommodation)">View</button>
            </div>
          </template>
        </AccommodationCard>
      </div>

      <!-- No results message -->
      <div v-if="!loading && !error && accommodations.length === 0" class="no-results">
        <p>You don't have any accommodations yet.</p>
        <button class="add_button" @click="$router.push('/uploadAccommodation')">Add Your First Accommodation</button>
      </div>

      <!-- Load more / End of list -->
      <div v-if="!loading && !error && accommodations.length > 0" class="more_results">
        <template v-if="!isEndOfList">
          <button class="more_button" @click="loadMore">
            Show More
          </button>
        </template>
        <template v-else>
          <p class="end_list_text">All accommodations shown</p>
        </template>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <FooterModal/>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'
import AccommodationCard from '@/components/AccommodationCard.vue'
const heroImg = '@/assets/hero-img-signin.jpg'
import api from '@/frontend-api-helper.js'
import { useError } from '@/composables/useError.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const accommodations = ref([])
const loading = ref(false)
const error = ref('')
const displayCount = ref(6)
const { handleApiError } = useError()

async function fetchOwnerAccommodations() {
  loading.value = true
  error.value = ''
  try {
    const result = await api.get('/owners/accommodations')
    
    if (result.success && Array.isArray(result.data)) {
      accommodations.value = result.data.map(item => ({
        id: item.accommodation_id,
        name: item.name,
        address: item.address,
        city: item.city,
        country: item.country,
        type: item.accommodation_type,
        status: item.status,
        description: item.description,
        rating: item.avg_rating || 0,
        reviews: item.review_count || 0,
        room_count: item.room_count || 0,
        min_price: item.min_price || 0,
        max_price: item.max_price || 0,
        image: item.thumbnail_image || heroImg
      }))
    } else {
      accommodations.value = []
    }
  } catch (err) {
    console.error('Failed to fetch owner accommodations:', err)
    error.value = 'Failed to load your accommodations'
    handleApiError(err)
    accommodations.value = []
  } finally {
    loading.value = false
  }
}

function loadMore() {
  displayCount.value += 6
}

function editAccommodation(accommodation) {
  // Navigate to edit page with accommodation ID
  console.log('Edit accommodation:', accommodation.id)
  // You can implement navigation to edit page here
  // this.$router.push(`/edit-accommodation/${accommodation.id}`)
}

function manageAccommodation(accommodation) {
  // Navigate to manage page (rooms, bookings, etc.)
  console.log('Manage accommodation:', accommodation.id)
  // You can implement navigation to manage page here
  // this.$router.push(`/manage-accommodation/${accommodation.id}`)
}

function viewAccommodationDetails(accommodation) {
  console.log('View details for accommodation:', accommodation.id)
  router.push(`/detail/${accommodation.id}`)
}

const displayedAccommodations = computed(() => 
  accommodations.value.slice(0, displayCount.value)
)

const isEndOfList = computed(() => 
  displayCount.value >= accommodations.value.length
)

onMounted(() => {
  fetchOwnerAccommodations()
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FFFFFF;
}

/* Main Content */
.main_content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.content_layout {
  width: 100%;
}

.page_title {
  color: #1D4ED8;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.loading-state, .error-state {
  text-align: center;
  padding: 2rem;
  color: #6B7280;
}

.error-state {
  color: #DC2626;
}

.accommodations_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Owner-specific action buttons */
.owner_actions {
  display: flex;
  gap: 0.5rem;
}

.edit_btn, .manage_btn, .view_btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.edit_btn {
  background-color: #3B82F6;
  color: white;
}

.edit_btn:hover {
  background-color: #2563EB;
}

.manage_btn {
  background-color: #10B981;
  color: white;
}

.manage_btn:hover {
  background-color: #059669;
}

.view_btn {
  background-color: #6B7280;
  color: white;
}

.view_btn:hover {
  background-color: #4B5563;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6B7280;
}

.add_button {
  background-color: #1D4ED8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.2s ease;
}

.add_button:hover {
  background-color: #1E40AF;
}

.more_results {
  text-align: center;
  margin-top: 2rem;
}

.more_button {
  background-color: white;
  color: #1D4ED8;
  border: 2px solid #1D4ED8;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.more_button:hover {
  background-color: #1D4ED8;
  color: white;
}

.end_list_text {
  font-size: 1rem;
  font-weight: 500;
  color: #9CA3AF;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main_content {
    padding: 1rem;
  }
  
  .accommodations_grid {
    grid-template-columns: 1fr;
  }
  
  .page_title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .accommodation_details {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
