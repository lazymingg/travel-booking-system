<template>
  <!-- Search Section -->
  <section class="search_section">
    <div class="search_container">
      <div class="search_form">
        <div class="form_group">
          <label>Destination</label>
          <input type="text" v-model="searchData.destination" placeholder="Ho Chi Minh City">
        </div>
        <div class="form_group">
          <label>Check-in date</label>
          <input type="date" v-model="searchData.checkin">
        </div>
        <div class="form_group">
          <label>Check-out date</label>
          <input type="date" v-model="searchData.checkout">
        </div>
        <div class="form_actions">
          <button class="search_button" @click="toggleFilter">
            <img class="button_icon" src="../assets/hamburger_button_icon.svg" alt="Hamburger button icon">
          </button>
          <button class="search_button">
            <img class="button_icon" src="../assets/search_icon.svg" alt="Search icon">
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Filter Popup Overlay -->
  <div v-if="showFilter" class="filter_overlay" @click="closeFilter">
    <div class="filter_popup" @click.stop>
      <div class="filter_header">
        <h3>Advanced Filters</h3>
        <button class="close_btn" @click="closeFilter">×</button>
      </div>
      <div class="filter_content">
        <!-- Price Range -->
        <div class="filter_group">
          <h4>Price per day</h4>
          <div class="price_range">
            <span>0 vnd - 500,000,000 vnd</span>
            <input type="range" v-model="filters.priceRange" min="0" max="500000000" class="slider">
          </div>
        </div>

        <!-- Bed Quantity -->
        <div class="filter_group">
          <h4>Bed quantity</h4>
          <div class="bed_range">
            <span>1 - 4</span>
            <input type="range" v-model="filters.bedQuantity" min="1" max="4" class="slider">
          </div>
        </div>

        <!-- Rating -->
        <div class="filter_group">
          <h4>Rating</h4>
          <div class="rating_options">
            <label v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="radio_option">
              <input type="radio" :value="rating" v-model="filters.rating" name="rating">
              <span>{{ rating }}.0</span>
            </label>
          </div>
        </div>

        <!-- Amenities -->
        <div class="filter_group">
          <h4>Amenities</h4>
          <div class="checkbox_group">
            <label v-for="amenity in amenities" :key="amenity" class="checkbox_option">
              <input type="checkbox" :value="amenity" v-model="filters.selectedAmenities">
              <span>{{ amenity }}</span>
            </label>
          </div>
        </div>

        <!-- Meals -->
        <div class="filter_group">
          <h4>Meals available</h4>
          <div class="checkbox_group">
            <label v-for="meal in meals" :key="meal" class="checkbox_option">
              <input type="checkbox" :value="meal" v-model="filters.selectedMeals">
              <span>{{ meal }}</span>
            </label>
          </div>
        </div>

        <!-- Accommodation Type -->
        <div class="filter_group">
          <h4>Accommodation type</h4>
          <div class="checkbox_group">
            <label v-for="type in accommodationTypes" :key="type" class="checkbox_option">
              <input type="checkbox" :value="type" v-model="filters.selectedTypes">
              <span>{{ type }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchModal',
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
      accommodationTypes: ['Hotel', 'Hostel', 'Resort', 'Homestay']
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
/* Search Section */
.search_section {
  background-color: #F9FAFB;
  padding: 2rem;
  height: 80px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center; /* căn ngang */
  align-items: center;     /* căn dọc */
}

.search_container {
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  justify-content: center; /* căn ngang */
  align-items: center;     /* căn dọc */
}

.search_form {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 5px;
  align-items: end;
}

.form_group {
  height: 60px;

  padding: 0.2rem 0.75rem;
  display: flex;
  flex-direction: column; 
  border: 1px #1D4ED8 solid;
  border-radius: 5px;
  background-color: #FFFFFF;
}

.form_group label {
  font-size: 0.9rem;
  color: #4B5563;
}

.form_group input {
  padding: 5px;
  border:none;
  outline:none;
  border-radius: 4px;
  font-size: 1rem;
}

.form_group input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #2563EB; /* hiệu ứng viền sáng xanh khi focus */
}

.form_actions {
  display: flex;
  gap: 5px;
}

.filter_btn {
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

.search_button {
  background-color: #2563EB;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;   /* chiều ngang nút */
  height: 60px;  /* chiều cao nút */
  padding: 15px;    /* bỏ padding */
}

.button_icon {
  width: 100%;
  height: 100%;
  object-fit: contain; /* đảm bảo không méo icon */
}

/* Filter Popup Overlay */
.filter_overlay {
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

.filter_popup {
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

.filter_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.filter_header h3 {
  margin: 0;
  color: #111827;
  font-size: 1.1rem;
}

.close_btn {
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

.close_btn:hover {
  color: #111827;
}

.filter_popup .filter_content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter_popup .filter_group {
  margin-bottom: 0;
}
</style>