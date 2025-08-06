<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const regions = ref([
  {
    name: 'Miền Bắc ',
    cities: [
      {
        id: 1,
        name: 'Hà Nội'
      },
      {
        id: 2,
        name: 'Hải Phòng'
      },
      {
        id: 3,
        name: 'Quảng Ninh'
      },
      {
        id: 4,
        name: 'Lào Cai'
      },
      {
        id: 5,
        name: 'Hà Giang'
      },
      {
        id: 6,
        name: 'Sơn La'
      },
      {
        id: 7,
        name: 'Điện Biên'
      },
      {
        id: 8,
        name: 'Hòa Bình'
      },
      {
        id: 9,
        name: 'Thái Nguyên'
      },
      {
        id: 10,
        name: 'Nam Định'
      }
    ]
  },
  {
    name: 'Miền Trung',
    cities: [
      {
        id: 11,
        name: 'Đà Nẵng'
      },
      {
        id: 12,
        name: 'Huế'
      },
      {
        id: 13,
        name: 'Nha Trang'
      },
      {
        id: 14,
        name: 'Quảng Nam'
      },
      {
        id: 15,
        name: 'Quảng Ngãi'
      },
      {
        id: 16,
        name: 'Phú Yên'
      },
      {
        id: 17,
        name: 'Bình Định'
      },
      {
        id: 18,
        name: 'Khánh Hòa'
      },
      {
        id: 19,
        name: 'Quảng Bình'
      },
      {
        id: 20,
        name: 'Quảng Trị'
      }
    ],    
  },
  {
    name: 'Miền Nam',
    cities: [
      {
        id: 21,
        name: 'TP. Hồ Chí Minh'
      },
      {
        id: 22,
        name: 'Cần Thơ'
      },
      {
        id: 23,
        name: 'Đồng Nai'
      },
      {
        id: 24,
        name: 'Bình Dương'
      },
      {
        id: 25,
        name: 'Bà Rịa - Vũng Tàu'
      },
      {
        id: 26,
        name: 'Long An'
      },
      {
        id: 27,
        name: 'Tiền Giang'
      },
      {
        id: 28,
        name: 'Kiên Giang'
      },
      {
        id: 29,
        name: 'An Giang'
      },
      {
        id: 30,
        name: 'Bến Tre'
      }
    ]
  }
])
</script>

<template>
  <div class="wego-app">
    <Header />
    
    <!-- Search Form -->
    <div class="search-section">
      <div class="search-container">
        <div class="search-form">
          <div class="search-fields">
            <div class="search-field">
              <div class="field-label">Điểm đến:</div>
              <div class="field-value">Q1, TP. HCM</div>
            </div>
            <div class="search-field">
              <div class="field-label">Nhận phòng:</div>
              <div class="field-value">dd/mm/yyyy</div>
            </div>
            <div class="search-field">
              <div class="field-label">Trả phòng:</div>
              <div class="field-value">dd/mm/yyyy</div>
            </div>
          </div>
          <div class="search-buttons">
            <button class="search-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button class="search-btn">
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Hotel -->
    <div class="featured-section">
      <div class="featured-container">
        <button class="carousel-btn carousel-btn-left">
          <svg class="carousel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="carousel-btn carousel-btn-right">
          <svg class="carousel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <div class="featured-card">
          <div class="featured-icon">
            <svg class="mountain-icon-large" fill="currentColor" viewBox="0 0 200 120">
              <polygon points="60,80 100,40 140,80" />
              <polygon points="100,80 140,40 180,80" />
            </svg>
          </div>
          <h2 class="featured-title">Khách sạn của TKin nè bà con ơi</h2>
          <div class="featured-rating">
            <span class="star">★</span>
            <span class="rating-text">5 Quận 1, TP HCM</span>
          </div>
          <p class="featured-reviews">123,000 lượt đánh giá</p>
          <div class="featured-price">Giá: 100,000 / h</div>
        </div>
      </div>
    </div>

    <!-- City Sections -->
    <div class="cities-section">
      <div v-for="city in cities" :key="city.name" class="city-section">
        <h3 class="city-title">{{ city.name }}</h3>
        <div class="hotels-container">
          <button class="carousel-btn carousel-btn-left">
            <svg class="carousel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button class="carousel-btn carousel-btn-right">
            <svg class="carousel-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div class="hotels-grid">
            <div v-for="hotel in city.hotels" :key="hotel.id" class="hotel-card">
              <div class="hotel-icon">
                <svg class="mountain-icon" fill="currentColor" viewBox="0 0 200 120">
                  <polygon points="60,80 100,40 140,80" />
                  <polygon points="100,80 140,40 180,80" />
                </svg>
              </div>
              <div class="hotel-info">
                <h4 class="hotel-name">{{ hotel.name }}</h4>
                <div class="hotel-rating">
                  <span class="star">★</span>
                  <span class="hotel-location">{{ hotel.rating }} {{ hotel.location }}</span>
                </div>
                <p class="hotel-reviews">{{ hotel.reviews }} lượt đánh giá</p>
                <div class="hotel-price">Giá: {{ hotel.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wego-app {
  min-height: 100vh;
  background-color: #d6d3d1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Search Section */
.search-section {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

@media (min-width: 768px) {
  .search-form {
    flex-direction: row;
  }
}

.search-fields {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .search-fields {
    grid-template-columns: repeat(3, 1fr);
  }
}

.search-field {
  background-color: #d6d3d1;
  padding: 12px 16px;
  text-align: center;
}

.field-label {
  font-size: 14px;
  color: #57534e;
}

.field-value {
  font-weight: 600;
}

.search-buttons {
  display: flex;
  gap: 8px;
}

.search-btn {
  background-color: #44403c;
  color: white;
  padding: 12px 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #292524;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Featured Section */
.featured-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px;
}

.featured-container {
  position: relative;
  background-color: #a8a29e;
  border-radius: 8px;
  overflow: hidden;
}

.featured-card {
  background-color: #292524;
  color: white;
  padding: 32px;
  text-align: center;
}

.featured-icon {
  margin-bottom: 24px;
}

.mountain-icon-large {
  width: 128px;
  height: 80px;
  color: #a8a29e;
  margin: 0 auto;
}

.featured-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.featured-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.star {
  color: #fbbf24;
}

.rating-text {
  margin-left: 4px;
  font-size: 14px;
}

.featured-reviews {
  font-size: 14px;
  color: #d6d3d1;
  margin-bottom: 16px;
}

.featured-price {
  font-size: 24px;
  font-weight: bold;
}

/* Cities Section */
.cities-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.city-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.city-title {
  font-size: 20px;
  font-weight: 600;
  color: #292524;
}

.hotels-container {
  position: relative;
}

.hotels-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .hotels-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .hotels-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.hotel-card {
  background-color: #a8a29e;
  border-radius: 8px;
  overflow: hidden;
}

.hotel-icon {
  background-color: #292524;
  padding: 24px;
  text-align: center;
}

.mountain-icon {
  width: 80px;
  height: 48px;
  color: #a8a29e;
  margin: 0 auto;
}

.hotel-info {
  background-color: #292524;
  color: white;
  padding: 16px;
}

.hotel-name {
  font-weight: 600;
  margin-bottom: 8px;
}

.hotel-rating {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.hotel-location {
  margin-left: 4px;
  font-size: 14px;
}

.hotel-reviews {
  font-size: 12px;
  color: #d6d3d1;
  margin-bottom: 12px;
}

.hotel-price {
  font-size: 18px;
  font-weight: bold;
}

/* Carousel Buttons */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s;
}

.carousel-btn:hover {
  background-color: white;
}

.carousel-btn-left {
  left: -16px;
}

.carousel-btn-right {
  right: -16px;
}

.carousel-icon {
  width: 24px;
  height: 24px;
}
</style>