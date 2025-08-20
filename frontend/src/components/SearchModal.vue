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
          <button class="action_button" @click="toggleFilter">
            <img class="button_icon" src="../assets/hamburger_button_icon.svg" alt="Hamburger button icon">
          </button>
          <button class="action_button">
            <img class="button_icon" src="../assets/search_icon.svg" alt="Search icon">
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Filter Popup Overlay -->
  <div v-if="showFilter" class="filter-popup">
    <!-- Cột 1: Price / Bed / Rating -->
    <div class="filter-section">
      <h3>Price per day ($)</h3>
      <div class="range-group">
        <input type="number" min="0" max="1000" v-model.number="filters.priceMin"> –
        <input type="number" min="0" max="1000" v-model.number="filters.priceMax">
      </div>

      <h3>Bed quantity</h3>
      <div class="range-group">
        <input type="number" min="1" max="6" v-model.number="filters.bedMin"> –
        <input type="number" min="1" max="6" v-model.number="filters.bedMax">
      </div>

      <h3>Rating</h3>
      <div>
        <label><input type="checkbox" value="0" v-model="filters.selectedRatings"> ≥ 0</label><br>
        <label><input type="checkbox" value="1" v-model="filters.selectedRatings"> ≥ 1</label><br>
        <label><input type="checkbox" value="2" v-model="filters.selectedRatings"> ≥ 2</label><br>
        <label><input type="checkbox" value="3" v-model="filters.selectedRatings"> ≥ 3</label><br>
        <label><input type="checkbox" value="4" v-model="filters.selectedRatings"> ≥ 4</label><br>
        <label><input type="checkbox" value="5" v-model="filters.selectedRatings"> = 5</label>
      </div>
    </div>

    <!-- Cột 2: Amenities -->
    <div class="filter-section">
      <h3>Amenities</h3>
      <div v-for="amenity in amenities" :key="amenity">
        <label><input type="checkbox" :value="amenity" v-model="filters.selectedAmenities"> {{ amenity }}</label>
      </div>
    </div>

    <!-- Cột 3: Accommodation Types -->
    <div class="filter-section">
      <h3>Accommodation type</h3>
      <div v-for="type in accommodationTypes" :key="type">
        <label><input type="checkbox" :value="type" v-model="filters.selectedTypes"> {{ type }}</label>
      </div>
    </div>
  </div>


</template>

<script>
import 'vue-slider-component/theme/default.css'

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
        priceMin: 0,
        priceMax: 1000,
        bedMin: 1,
        bedMax: 6,
        selectedRatings: [],
        selectedAmenities: [],
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
  width: 83.33vw;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 5px;
  margin: 0 auto;      /* căn giữa */
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
  font-family: sans-serif;
}

.form_group input:focus {
  outline: none;
  box-shadow: 0 0 0 1px #2563EB; /* hiệu ứng viền sáng xanh khi focus */
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

.action_button {
  background-color: #2563EB;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;   /* chiều ngang nút */
  height: 60px;  /* chiều cao nút */
  padding: 20px;    /* bỏ padding */
}

.action_button:hover {
  background-color: #FACC15;
  animation-delay: 3ms;
  box-shadow: 0 0 0 2px #2563EB; /* hiệu ứng viền sáng xanh khi focus */
}

.button_icon {
  width: 100%;
  height: 100%;
  object-fit: contain; /* đảm bảo không méo icon */
}

.button_icon {
  width: 100%;
  height: 100%;
  object-fit: contain; /* đảm bảo không méo icon */
  transition: transform 0.2s ease; /* thêm hiệu ứng mượt */
}

.button_icon {
  transition: transform 0.15s ease-out;
}

.action_button:hover .button_icon {
  transform: scale(1.2); /* phóng to 20% khi hover */
}


  
/* Filter popup */
.filter-popup {
  background: #F9FAFB;
  border: 2px solid #2563EB;
  border-radius: 5px;
  margin-top: 0;  /* sát dưới search_form */
  padding: 20px;

  width: 83.33vw; /* bằng search_form */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cột chia đều */
  gap: 20px;

  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  animation: slideDown 0.3s ease;
}

.filter-section h3 {
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: bold;
}

.filter-section label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.95rem;
  color: #374151;
}

</style>