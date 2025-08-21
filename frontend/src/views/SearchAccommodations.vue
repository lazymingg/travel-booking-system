<template>
  <!-- Header -->
  <HeaderModal/>
  <!-- Search section -->
   <SearchModal @apply-filters="handle_apply_filters"/>
  <!-- Main content -->
  <main class="main_content">
    <div class="content_layout">
      <div class="accommodations_grid">
        <div v-for="(accommodation, index) in displayed_accommodations" :key="index" class="accommodation_card">
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

      <div class="more_results">
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

const filters = ref(null)

function get_accommodations(accommodations_list) {
  return accommodations_list
}

const default_accommodations = ref([
  {
    id: "ac1",
    image: heroImg,
    name: 'Sunrise Hotel',
    address: 'District 1, Ho Chi Minh City',
    rating: 4.5,
    reviews: '234',
    price: 120,
    beds: 2,
    type: 'Hotel',
    amenities: ['Free Wifi', 'Swimming pool', 'Gym']
  },
  {
    id: "ac2",
    image: heroImg,
    name: 'Green Hostel',
    address: 'District 3, Ho Chi Minh City',
    rating: 4.0,
    reviews: '150',
    price: 60,
    beds: 1,
    type: 'Hostel',
    amenities: ['Free Wifi', 'Parking lot']
  },
  {
    id: "ac3",
    image: heroImg,
    name: 'Sea Breeze Resort',
    address: 'Vung Tau, Ba Ria-Vung Tau',
    rating: 4.8,
    reviews: '310',
    price: 300,
    beds: 3,
    type: 'Resort',
    amenities: ['Swimming pool', 'Spa', 'Restaurant']
  },
  {
    id: "ac4",
    image: heroImg,
    name: 'City Homestay',
    address: 'District 2, Ho Chi Minh City',
    rating: 4.2,
    reviews: '89',
    price: 80,
    beds: 2,
    type: 'Homestay',
    amenities: ['Free Wifi', 'Parking lot', 'Breakfast']
  },
  {
    id: "ac5",
    image: heroImg,
    name: 'Luxury Hotel Saigon',
    address: 'District 1, Ho Chi Minh City',
    rating: 5.0,
    reviews: '512',
    price: 400,
    beds: 2,
    type: 'Hotel',
    amenities: ['Swimming pool', 'Spa', 'Gym', 'Restaurant']
  },
  {
    id: "ac6",
    image: heroImg,
    name: 'Budget Hostel',
    address: 'District 4, Ho Chi Minh City',
    rating: 3.8,
    reviews: '64',
    price: 50,
    beds: 1,
    type: 'Hostel',
    amenities: ['Free Wifi', 'Smoking room']
  },
  {
    id: "ac7",
    image: heroImg,
    name: 'Sunrise Hotel',
    address: 'District 1, Ho Chi Minh City',
    rating: 4.5,
    reviews: '234',
    price: 120,
    beds: 2,
    type: 'Hotel',
    amenities: ['Free Wifi', 'Swimming pool', 'Gym']
  },
  {
    id: "ac8",
    image: heroImg,
    name: 'Green Hostel',
    address: 'District 3, Ho Chi Minh City',
    rating: 4.0,
    reviews: '150',
    price: 60,
    beds: 1,
    type: 'Hostel',
    amenities: ['Free Wifi', 'Parking lot']
  },
  {
    id: "ac9",
    image: heroImg,
    name: 'Sea Breeze Resort',
    address: 'Vung Tau, Ba Ria-Vung Tau',
    rating: 4.8,
    reviews: '310',
    price: 300,
    beds: 3,
    type: 'Resort',
    amenities: ['Swimming pool', 'Spa', 'Restaurant']
  },
  {
    id: "ac10",
    image: heroImg,
    name: 'City Homestay',
    address: 'District 2, Ho Chi Minh City',
    rating: 4.2,
    reviews: '89',
    price: 80,
    beds: 2,
    type: 'Homestay',
    amenities: ['Free Wifi', 'Parking lot', 'Breakfast']
  },
  {
    id: "ac11",
    image: heroImg,
    name: 'Luxury Hotel Saigon',
    address: 'District 1, Ho Chi Minh City',
    rating: 5.0,
    reviews: '512',
    price: 400,
    beds: 2,
    type: 'Hotel',
    amenities: ['Swimming pool', 'Spa', 'Gym', 'Restaurant']
  },
  {
    id: "ac12",
    image: heroImg,
    name: 'Budget Hostel',
    address: 'District 4, Ho Chi Minh City',
    rating: 3.8,
    reviews: '64',
    price: 50,
    beds: 1,
    type: 'Hostel',
    amenities: ['Free Wifi', 'Smoking room']
  }
])

const accom_list = get_accommodations([])
const all_accommodations = ref(
  accom_list.length === 0 ? default_accommodations : accom_list

)

const accommodations = computed(() => {
  if (!filters.value) return all_accommodations.value

  let dest = filters.value.destination.trim().toLowerCase()

  return all_accommodations.value.filter(acc => {
    let address = acc.address.toLowerCase()
    let name = acc.name.toLowerCase()
    if (filters.value.destination && !(
        address.includes(dest) ||  // địa chỉ chứa từ khóa
        name.includes(dest) ||     // tên chứa từ khóa
        dest.includes(name) ||    // từ khóa chứa tên accommodation
        dest.includes(address)    // từ khóa chứa địa chỉ
      )) {
      return false
    }
    // lọc price
    if (acc.price < filters.value.price_range[0] || acc.price > filters.value.price_range[1]) {
      return false
    }
    // lọc bed
    if (acc.beds < filters.value.bed_range[0] || acc.beds > filters.value.bed_range[1]) {
      return false
    }
    // lọc type
    if (filters.value.accommodation_type && acc.type !== filters.value.accommodation_type) {
      return false
    }
    // lọc rating
    if (filters.value.rating && acc.rating < Number(filters.value.rating)) {
      return false
    }
    // lọc amenities
    if (filters.value.amenities?.length > 0) {
      for (let a of filters.value.amenities) {
        if (!acc.amenities.includes(a)) return false
      }
    }
    return true
  })
}
)

const display_count = ref(6)

const displayed_accommodations = computed(() => {
  return accommodations.value.slice(0, display_count.value)
})

function loadMore() {
  display_count.value += 6
}

// kiểm tra xem đã hết danh sách chưa
const isEndOfList = computed(() => {
  return display_count.value >= accommodations.value.length
})

function get_accommodation_cards() {
  return all_accommodations.value
}

// Hàm này in nè
const handle_apply_filters = (selectedFilters) => {
  filters.value = selectedFilters
  console.log("Filters applied:", selectedFilters)
  console.log(get_accommodation_cards())
}

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
