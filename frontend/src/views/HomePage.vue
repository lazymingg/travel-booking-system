<template>
  <div class="wego-app">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <div class="logo-section">
          <div class="logo-circle"></div>
          <span class="logo-text">WeGo</span>
        </div>
        <nav class="navigation">
          <a href="#" class="nav-link">Giới thiệu</a>
          <a href="#" class="nav-link">Đăng nhập</a>
          <a href="#" class="nav-link">Đăng ký</a>
          <div class="profile-icon">
            <svg class="profile-svg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
        </nav>
      </div>
    </header>

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

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="logo-circle"></div>
              <span class="logo-text">WeGo</span>
            </div>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599-.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-info">
            <h4 class="footer-title">Thông tin liên hệ</h4>
            <p class="footer-text">
              227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Việt Nam
            </p>
          </div>
          <div class="footer-address">
            <h4 class="footer-title">Địa chỉ</h4>
            <p class="footer-text">
              Ghi chú gì đó không biết
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cities = ref([
  {
    name: 'Thành phố Hồ Chí Minh',
    hotels: [
      {
        id: 1,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 2,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 3,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 4,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      }
    ]
  },
  {
    name: 'Thành phố Đà Nẵng',
    hotels: [
      {
        id: 5,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 6,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 7,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 8,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      }
    ]
  },
  {
    name: 'Thành phố Huế',
    hotels: [
      {
        id: 9,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 10,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 11,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 12,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      }
    ]
  },
  {
    name: 'Thành phố Vũng Tàu',
    hotels: [
      {
        id: 13,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 14,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 15,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      },
      {
        id: 16,
        name: 'Khách sạn của TKin nè bà con ơi',
        rating: '5',
        location: 'Quận 1, TP HCM',
        reviews: '123,000',
        price: '100,000 / h'
      }
    ]
  }
])
</script>

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

/* Header Styles */
.header {
  background-color: #57534e;
  color: white;
  padding: 12px 16px;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-circle {
  width: 32px;
  height: 32px;
  background-color: #a8a29e;
  border-radius: 50%;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 24px;
}

@media (max-width: 768px) {
  .navigation {
    display: none;
  }
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #d6d3d1;
}

.profile-icon {
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-svg {
  width: 20px;
  height: 20px;
  color: #57534e;
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

/* Footer */
.footer {
  background-color: #292524;
  color: white;
  margin-top: 64px;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  color: #a8a29e;
  transition: color 0.2s;
}

.social-link:hover {
  color: white;
}

.social-icon {
  width: 24px;
  height: 24px;
}

.footer-title {
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-text {
  color: #a8a29e;
  font-size: 14px;
}
</style>