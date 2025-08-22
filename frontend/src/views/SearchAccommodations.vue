<template>
  <!-- Header -->
  <HeaderModal/>
  <!-- Search section -->
   <SearchModal @apply-filters="handleApplyFilters"/>
  <!-- Main content -->
  <main class="main_content">
    <div class="content_layout">
      <!-- Loading state -->
      <div v-if="loading" class="loading-state">
        <p>Searching accommodations...</p>
      </div>
      
      <!-- Error state -->
      <div v-if="error" class="error-state">
        <p>{{ error }}</p>
      </div>

      <!-- Results -->
      <div v-if="!loading && !error" class="accommodations_grid">
        <div v-for="accommodation in displayedAccommodations" :key="accommodation.id" class="accommodation_card">
          <div class="card_image">
            <img class="accommodation_image" :src="accommodation.image" alt="Accommodation image">
          </div>
          <div class="card_content">
            <h3 class="accommodation_name">{{ accommodation.name }}</h3>
            <p class="accommodation_address">{{ accommodation.address }}</p>
            <div class="rating">
              <span class="rating_badge">{{ Number(accommodation.rating).toFixed(1) }}</span>
              <span class="rating_text">{{ accommodation.reviews }} ratings</span>
            </div>
            <div class="price">Price: {{ Number(accommodation.price).toFixed(2) }}$ per day</div>
          </div>
        </div>
      </div>

      <!-- No results message -->
      <div v-if="!loading && !error && accommodations.length === 0" class="no-results">
        <p>No accommodations found matching your search criteria.</p>
      </div>

      <!-- Load more / End of list -->
      <div v-if="!loading && !error && accommodations.length > 0" class="more_results">
        <template v-if="!isEndOfList">
          <button class="more_button" @click="loadMore">
            More results
          </button>
        </template>
        <template v-else>
          <p class="end_list_text">End of list</p>
        </template>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <FooterModal/>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'
import SearchModal from '@/components/SearchModal.vue'
import heroImg from "@/assets/hero-img-singin.jpg"
import api from '@/frontend-api-helper.js'

const accommodations = ref([])
const filters = ref({})
const loading = ref(false)
const error = ref('')
const displayCount = ref(6)

// Mapping amenities string sang ID (giả định dựa trên DB Amenities table - bạn cần kiểm tra và update ID thực tế)
const amenitiesMap = {
  "Swimming pool": 1,
  "Restaurant": 2,
  "Sauna": 3,
  "Smoking room": 4,
  "Golf course": 5,
  "Parking lot": 6,
  "Gym": 7,
  "Free Wifi": 8,
  "Spa": 9
}

async function fetchAccommodations(params = {}) {
  loading.value = true
  error.value = ''
  try {
    //map params từ filters sang backend query params
    const queryParams = {}
    if (params.destination) {
      //giả định destination là city (hoặc address - bạn có thể split nếu cần)
      queryParams.city = params.destination
    }
    if (params.checkin) queryParams.check_in_date = params.checkin
    if (params.checkout) queryParams.check_out_date = params.checkout
    if (params.price_range) {
      queryParams.min_price = params.price_range[0]
      queryParams.max_price = params.price_range[1]
    }
    if (params.bed_range) {
      queryParams.min_beds = params.bed_range[0]  //backend chỉ hỗ trợ min_beds, không max
    }
  // accommodation_type filter removed per request
  if (params.rating) queryParams.min_rating = params.rating
    if (params.amenities?.length > 0) {
      // Map amenities strings sang IDs và join comma-separated
      queryParams.amenities = params.amenities
        .map(amenity => amenitiesMap[amenity])
        .filter(id => id !== undefined)
        .join(',')
    }

    // Build query string
    const query = new URLSearchParams()
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] !== null && queryParams[key] !== undefined && queryParams[key] !== '') {
        query.append(key, queryParams[key])
      }
    })

    const endpoint = `/accommodations/search${query.toString() ? '?' + query.toString() : ''}`
    const result = await api.get(endpoint)
    console.log('Search result:', result)
    if (result.success && Array.isArray(result.data)) {
      accommodations.value = result.data.map(item => ({
        id: item.accommodation_id,
        name: item.name,
        address: `${item.address}${item.city ? ', ' + item.city : ''}${item.country ? ', ' + item.country : ''}`,
        rating: item.avg_rating || 0,
        reviews: item.review_count || 0,
        price: item.min_room_price || 0,
        beds: item.max_beds || 1,
        type: item.accommodation_type,
        image: item.images?.[0] || heroImg
      }))
    } else {
      accommodations.value = []
    }
  } catch (err) {
    console.error('Search failed:', err)
    error.value = err.message || 'Failed to search accommodations'
    accommodations.value = []
  } finally {
    loading.value = false
  }
}

function handleApplyFilters(selectedFilters) {
  filters.value = selectedFilters
  displayCount.value = 6 // Reset display count on new search
  fetchAccommodations(selectedFilters)
}

function loadMore() {
  displayCount.value += 6
}

const displayedAccommodations = computed(() => 
  accommodations.value.slice(0, displayCount.value)
)

const isEndOfList = computed(() => 
  displayCount.value >= accommodations.value.length
)
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

.accommodations_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.accommodation_card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.accommodation_card:hover {
  transform: translateY(-2px);
}

.card_image {
  height: 200px;
  background-color: #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder_image {
  font-size: 3rem;
  color: #9CA3AF;
}

.accommodation_image {
  width: 100%;
  height: 100%;
  object-fit: cover;   /* hoặc contain tùy nhu cầu */
  border-radius: 0;
}

.card_content {
  padding: 1rem;
}

.accommodation_name {
  color: #2563EB;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.accommodation_address {
  color: #4B5563;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating_badge {
  background-color: #FACC15;
  color: #2563EB;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.rating_text {
  color: #4B5563;
  font-size: 0.8rem;
}

.price {
  color: #1D4ED8;
  font-weight: bold;
}

.more_results {
  text-align: center;
}

.more_button {
  background-color: white;
  color: #2563EB;
  border: 2px solid #2563EB;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.more_button:hover {
  background-color: #FACC15;
  font-weight: bold;
  transition: all 0.2s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .accommodations_grid {
    grid-template-columns: 1fr;
  }

  .footer_content {
    grid-template-columns: repeat(2, 1fr);
  }
}

.end_list_text {
  font-size: large;
  font-weight: bold;
  color: #cccaca;
}

@media (max-width: 480px) {
  .footer_content {
    grid-template-columns: 1fr;
  }
}
</style>
