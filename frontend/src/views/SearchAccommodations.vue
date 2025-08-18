<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <a class="logo" href="../">
          <img class="logo-icon" src="../assets/logo.svg" alt="Wego's logo">
        </a>
        <div class="header-right">
          <a href="#" class="about-link">About us</a>
          <div class="user-profile">
            <div class="profile-icon">👤</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Search Section -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-form">
          <div class="form-group">
            <label>Destination:</label>
            <input type="text" v-model="searchData.destination" placeholder="Ho Chi Minh City">
          </div>
          <div class="form-group">
            <label>Check-in date:</label>
            <input type="date" v-model="searchData.checkin">
          </div>
          <div class="form-group">
            <label>Check-out date:</label>
            <input type="date" v-model="searchData.checkout">
          </div>
          <div class="form-actions">
            <button class="filter-btn" @click="toggleFilter">
              <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <button class="search-btn">🔍</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Popup Overlay -->
    <div v-if="showFilter" class="filter-overlay" @click="closeFilter">
      <div class="filter-popup" @click.stop>
        <div class="filter-header">
          <h3>Advanced Filters</h3>
          <button class="close-btn" @click="closeFilter">×</button>
        </div>
        <div class="filter-content">
          <!-- Price Range -->
          <div class="filter-group">
            <h4>Price per day</h4>
            <div class="price-range">
              <span>0 vnd - 500,000,000 vnd</span>
              <input type="range" v-model="filters.priceRange" min="0" max="500000000" class="slider">
            </div>
          </div>

          <!-- Bed Quantity -->
          <div class="filter-group">
            <h4>Bed quantity</h4>
            <div class="bed-range">
              <span>1 - 4</span>
              <input type="range" v-model="filters.bedQuantity" min="1" max="4" class="slider">
            </div>
          </div>

          <!-- Rating -->
          <div class="filter-group">
            <h4>Rating</h4>
            <div class="rating-options">
              <label v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="radio-option">
                <input type="radio" :value="rating" v-model="filters.rating" name="rating">
                <span>{{ rating }}.0</span>
              </label>
            </div>
          </div>

          <!-- Amenities -->
          <div class="filter-group">
            <h4>Amenities</h4>
            <div class="checkbox-group">
              <label v-for="amenity in amenities" :key="amenity" class="checkbox-option">
                <input type="checkbox" :value="amenity" v-model="filters.selectedAmenities">
                <span>{{ amenity }}</span>
              </label>
            </div>
          </div>

          <!-- Meals -->
          <div class="filter-group">
            <h4>Meals available</h4>
            <div class="checkbox-group">
              <label v-for="meal in meals" :key="meal" class="checkbox-option">
                <input type="checkbox" :value="meal" v-model="filters.selectedMeals">
                <span>{{ meal }}</span>
              </label>
            </div>
          </div>

          <!-- Accommodation Type -->
          <div class="filter-group">
            <h4>Accommodation type</h4>
            <div class="checkbox-group">
              <label v-for="type in accommodationTypes" :key="type" class="checkbox-option">
                <input type="checkbox" :value="type" v-model="filters.selectedTypes">
                <span>{{ type }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

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
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-text">WeGo</span>
            <div class="logo-icon">✈️</div>
          </div>
        </div>
        <div class="footer-section">
          <h4>Contact us</h4>
          <div class="social-links">
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">💬</a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Address</h4>
          <p>227 Street Nguyen Van, Ward Cau Ong Lanh, Ho Chi Minh City, Vietnam</p>
        </div>
        <div class="footer-section">
          <a href="#" class="about-link">About us</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'WeGoBooking',
  data() {
    return {
      showFilter: false,
      searchData: {
        destination: 'Ho Chi Minh City',
        checkin: '',
        checkout: ''
      },
      filters: {
        priceRange: 250000000,
        bedQuantity: 2,
        rating: 5,
        selectedAmenities: ['Free Wifi', 'Smoking room'],
        selectedMeals: [],
        selectedTypes: []
      },
      amenities: ['Swimming pool', 'Parking lot', 'Restaurant', 'Gym', 'Sauna', 'Free Wifi', 'Smoking room', 'Spa', 'Golf course'],
      meals: ['Breakfast', 'Lunch', 'Dinner', 'Self sufficiency'],
      accommodationTypes: ['Hotel', 'Hostel', 'Resort', 'Homestay'],
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

#app {
  min-height: 1000vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  background-color: #2563EB;
  color: white;
  height: 12.5vh; /* 1/8 of screen height */
  display: flex;
  align-items: center;
  padding: 0 8.33;
}

.header-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  align-self: left;
  height: 7rem
}

.logo-icon {
  height: 100%;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.about-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.user-profile {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-icon {
  font-size: 1.2rem;
}

/* Search Section */
.search-section {
  background-color: white;
  padding: 2rem;
  height: 12.5vh;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
}

.search-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.9rem;
  color: #4B5563;
  margin-bottom: 0.5rem;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hamburger span {
  width: 18px;
  height: 2px;
  background-color: white;
}

.search-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
}

/* Filter Popup Overlay */
.filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 17vh; /* Position below header */
  padding-left: 2rem;
}

.filter-popup {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.filter-header h3 {
  margin: 0;
  color: #111827;
  font-size: 1.1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6B7280;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #111827;
}

.filter-popup .filter-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-popup .filter-group {
  margin-bottom: 0;
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

/* Footer */
.footer {
  background-color: #2563EB;
  color: white;
  height: 25vh; /* 1/4 of screen height */
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.footer-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
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
