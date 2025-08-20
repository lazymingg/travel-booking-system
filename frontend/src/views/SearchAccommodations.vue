<template>
  <!-- Header -->
  <HeaderModal/>
  <!-- Search section -->
   <SearchModal/>
  <!-- Main content -->
  <main class="main_content">
    <div class="content_layout">
      <div class="accommodations_grid">
        <div v-for="(accommodation, index) in accommodations" :key="index" class="accommodation_card">
          <div class="card_image">
            <img class="accommodation_image" :src="accommodation.image" alt="Accommodation image">
          </div>
          <div class="card_content">
            <h3 class="accommodation_name">{{ accommodation.name }}</h3>
            <p class="accommodation_address">{{ accommodation.address }}</p>
            <div class="rating">
              <span class="rating_badge">{{ accommodation.rating }}</span>
              <span class="rating_text">{{ accommodation.reviews }} ratings</span>
            </div>
            <div class="price">Price: {{ accommodation.price }}</div>
          </div>
        </div>
      </div>

      <div class="more_results">
        <button class="more_button">More results</button>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <FooterModal/>
</template>

<script>
import HeaderModal from '@/components/HeaderModal.vue';
import FooterModal from '@/components/FooterModal.vue';
import SearchModal from '@/components/SearchModal.vue';
import heroImg from "@/assets/hero-img-singin.jpg";
export default {
  name: 'SearchAccommodation',
  components: {
    HeaderModal,
    SearchModal,
    FooterModal
  },
  data() {
    return {
      accommodations: Array(16).fill().map((_, i) => ({
        image: heroImg,
        name: 'Accommodation name',
        address: 'Type address here',
        rating: '4.8',
        reviews: '123,000',
        price: 'xxx,000 vnd / hour'
      }))
    }
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    closeFilter() {
      this.showFilter = false;
    }
  }
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

@media (max-width: 480px) {
  .footer_content {
    grid-template-columns: 1fr;
  }
}
</style>
