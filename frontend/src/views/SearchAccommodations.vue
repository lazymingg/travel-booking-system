<template>
  <!-- Header -->
  <HeaderModal/>
  <!-- Search section -->
   <SearchModal/>
  <!-- Main content -->
  <main class="main-content">
    <div class="content-layout">
      <div class="accommodations-grid">
        <div v-for="(accommodation, index) in accommodations" :key="index" class="accommodation-card">
          <div class="card-image">
            <div class="placeholder-image">🏔️</div>
          </div>
          <div class="card-content">
            <h3 class="accommodation-name">{{ accommodation.name }}</h3>
            <p class="accommodation-address">{{ accommodation.address }}</p>
            <div class="rating">
              <span class="rating-badge">{{ accommodation.rating }}</span>
              <span class="rating-text">{{ accommodation.reviews }} ratings</span>
            </div>
            <div class="price">Price: {{ accommodation.price }}</div>
          </div>
        </div>
      </div>

      <div class="more-results">
        <button class="more-btn">More results</button>
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

<style>
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
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.content-layout {
  width: 100%;
}

.accommodations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.accommodation-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.accommodation-card:hover {
  transform: translateY(-2px);
}

.card-image {
  height: 200px;
  background-color: #4B5563;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  font-size: 3rem;
  color: #9CA3AF;
}

.card-content {
  padding: 1rem;
}

.accommodation-name {
  color: #2563EB;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.accommodation-address {
  color: #6B7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating-badge {
  background-color: #FACC15;
  color: #111827;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.rating-text {
  color: #6B7280;
  font-size: 0.8rem;
}

.price {
  color: #2563EB;
  font-weight: bold;
}

.more-results {
  text-align: center;
}

.more-btn {
  background-color: white;
  color: #2563EB;
  border: 2px solid #2563EB;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-form {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .filter-overlay {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .filter-popup {
    width: calc(100% - 2rem);
    max-width: 400px;
  }

  .accommodations-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
