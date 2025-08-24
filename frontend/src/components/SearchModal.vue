<template>
  <!-- Search Section -->
  <section class="search_section">
    <div class="search_container">
      <div class="search_form">
        <div class="form_group">
          <label>Destination</label>
          <input type="text" v-model="search_data.destination" placeholder="Ho Chi Minh City">
        </div>
        <div class="form_group">
          <label>Check-in date</label>
          <input type="date" v-model="search_data.checkin">
        </div>
        <div class="form_group">
          <label>Check-out date</label>
          <input type="date" v-model="search_data.checkout">
        </div>
        <div class="form_actions">
          <button class="action_button" @click="toggle_filter">
            <img class="button_icon" src="../assets/hamburger_button_icon.svg" alt="Hamburger button icon">
          </button>
          <button class="action_button" @click.prevent="apply_filters">
            <img class="button_icon" src="../assets/search_icon.svg" alt="Search icon">
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Filter Popup Overlay -->
  <div v-if="show_filter" class="filter-popup">
    <!-- Cột 1: Price / Bed / Rating -->
    <div class="filter-section">
      <div class="attribute">
        <h3>Price per day</h3>
        <Slider
          v-model="filters.price_range"
          :min="0"
          :max="5000"
          :interval="10"
          :tooltip="'always'"
          :lazy="true"
          :dot-size="10"
          :height="4"
          :enable-cross="false"
          :piecewise="true"
          :piecewise-label="true"
        />
      </div>


      <div class="attribute">
        <h3>Bed quantity</h3>
        <Slider
          v-model="filters.bed_range"
          :min="1"
          :max="6"
          :interval="1"
          :tooltip="'always'"
          :lazy="true"
          :dot-size="10"
          :height="4"
          :enable-cross="false"
          :piecewise="true"
          :piecewise-label="true"
        />
      </div>

  <!-- accommodation type filter removed per request -->
    </div>

    <!-- Cột 2: Amenities -->
    <div class="filter-section">
      <div class="attribute">
        <h3>Amenities</h3>
        <div v-for="amenity in amenities" :key="amenity">
          <label><input type="checkbox" :value="amenity" v-model="filters.selected_amenities"> {{ amenity }}</label>
        </div>
      </div>
    </div>

    <!-- Cột 3: Accommodation Types -->
    <div class="filter-section">
      <div class="attribute">
        <h3>Rating</h3>
        <div>
          <label><input type="radio" value="0" v-model="filters.selected_ratings"> ≥ 0.0 </label><br>
          <label><input type="radio" value="1" v-model="filters.selected_ratings"> ≥ 1.0 </label><br>
          <label><input type="radio" value="2" v-model="filters.selected_ratings"> ≥ 2.0 </label><br>
          <label><input type="radio" value="3" v-model="filters.selected_ratings"> ≥ 3.0 </label><br>
          <label><input type="radio" value="4" v-model="filters.selected_ratings"> ≥ 4.0 </label><br>
          <label><input type="radio" value="5" v-model="filters.selected_ratings"> 5.0 </label>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'

export default {
  name: 'SearchModal',
  components: { Slider },
  emits: ['apply-filters'],
  data() {
    return {
      show_filter: false,
      search_data: {
        destination: 'Ho Chi Minh City',
        checkin: '',
        checkout: ''
      },
      filters: {
        price_range: [0, 5000],
        bed_range: [1, 6],
        selected_ratings: null,
        selected_amenities: []
      },
      amenities: [
  "Swimming pool",
  "Restaurant",
  "Sauna",
  "Smoking room",
  "Golf course",
  "Parking lot",
  "Gym",
  "Free Wifi",
  "Spa"
],
  // accommodation_types removed
    }
  },
  methods: {
    toggle_filter() {
      this.show_filter = !this.show_filter;
    },

    get_selected_filters() {
      return {
        destination: this.search_data.destination,
        checkin: this.search_data.checkin,
        checkout: this.search_data.checkout,
        price_range: this.filters.price_range,
        bed_range: this.filters.bed_range,
  // accommodation_type removed
        amenities: this.filters.selected_amenities,
        rating: this.filters.selected_ratings
      };
    },

    apply_filters() {
      const selected_filters = this.get_selected_filters()
      console.log('Selected Filters:', selected_filters);
      this.$emit('apply-filters', selected_filters)
      this.$router.push('/accommodations');
    }
  }
}
</script>

<style scoped>
/* Search Section */
.search_section {
  background-color: #F9FAFB;
  padding: 2rem;
  height: 80px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center; /* căn ngang */
  align-items: center;     /* căn dọc */
  margin-bottom: 10px;
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
  overflow: hidden;
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

.action_button:hover .button_icon {
  transform: scale(1.2); /* phóng to 20% khi hover */
}

/* Filter popup */
.filter-popup {
  background: #F9FAFB;
  border: 2px solid #2563EB;
  border-radius: 5px;
  margin-top: 0;  /* sát dưới search_form */
  margin-bottom: 10px;
  padding: 20px;

  width: 83.33vw; /* bằng search_form */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr; /* 3 cột chia đều */
  gap: 100px;

  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  animation: slideDown 0.3s ease;
}

.filter-section .attribute {
  margin-bottom: 20px;
}

.filter-section .attribute h3 {
  font-size: 1rem;
  font-weight: bold;
}

.slider-target {
  width: 100%; /* Đảm bảo slider chiếm toàn bộ chiều rộng */
  margin-top: 40px; /* Khoảng cách trên slider */
  margin-bottom: 20px; /* Khoảng cách dưới slider */
}

:deep(.slider-tooltip) {
  font-size: 0.75rem;
}

:deep(.slider-base) {
  height: 0.3rem;
}


@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>