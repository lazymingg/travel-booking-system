<template>
  <div class="main-bg">
    <!-- Hero Section - Three Regions -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Khám Phá <span class="highlight">Việt Nam</span>
        </h1>
        <p class="hero-subtitle">
          Từ núi rừng Tây Bắc đến bãi biển miền Nam, hãy cùng chúng tôi khám phá vẻ đẹp ba miền Tổ quốc
        </p>
      </div>

      <!-- Three Regions Grid -->
      <div class="regions-grid">
        <!-- Miền Bắc -->
        <div class="region-card" @click="selectRegion('north')">
          <div class="region-image">
            <div class="placeholder-image north-bg"></div>
            <div class="region-overlay">
              <h3 class="region-title">Miền Bắc</h3>
              <p class="region-cities">Hà Nội • Hạ Long • Sapa</p>
            </div>
            <div class="favorite-btn" @click.stop="toggleFavorite('north')">
            </div>
          </div>
          <div class="region-info">
            <p class="region-description">
              Khám phá vẻ đẹp hùng vĩ của núi rừng Tây Bắc, phố cổ Hà Nội và vịnh Hạ Long kỳ vĩ
            </p>
            <div class="region-footer">
              <span class="region-price">Từ 1.200.000đ</span>
              <button class="explore-btn">Khám phá</button>
            </div>
          </div>
        </div>

        <!-- Miền Trung -->
        <div class="region-card" @click="selectRegion('central')">
          <div class="region-image">
            <div class="placeholder-image central-bg"></div>
            <div class="region-overlay">
              <h3 class="region-title">Miền Trung</h3>
              <p class="region-cities">Huế • Hội An • Đà Nẵng</p>
            </div>
            <div class="favorite-btn" @click.stop="toggleFavorite('central')">
            </div>
          </div>
          <div class="region-info">
            <p class="region-description">
              Trải nghiệm di sản văn hóa thế giới, phố cổ Hội An và bãi biển tuyệt đẹp Đà Nẵng
            </p>
            <div class="region-footer">
              <span class="region-price">Từ 980.000đ</span>
              <button class="explore-btn">Khám phá</button>
            </div>
          </div>
        </div>

        <!-- Miền Nam -->
        <div class="region-card" @click="selectRegion('south')">
          <div class="region-image">
            <div class="placeholder-image south-bg"></div>
            <div class="region-overlay">
              <h3 class="region-title">Miền Nam</h3>
              <p class="region-cities">TP.HCM • Cần Thơ • Phú Quốc</p>
            </div>
            <div class="favorite-btn" @click.stop="toggleFavorite('south')">
            </div>
          </div>
          <div class="region-info">
            <p class="region-description">
              Khám phá sự năng động của Sài Gòn, đồng bằng sông Cửu Long và đảo ngọc Phú Quốc
            </p>
            <div class="region-footer">
              <span class="region-price">Từ 850.000đ</span>
              <button class="explore-btn">Khám phá</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="filter-section">
      <div class="filter-container">
        <h2 class="filter-title">Tìm kiếm chuyến đi của bạn</h2>
        
        <form @submit.prevent="handleSearch" class="search-form">
          <div class="form-row">
            <div class="form-group">
              <label for="destination">Điểm đến</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <select id="destination" v-model="searchForm.destination">
                  <option value="">Chọn điểm đến</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="halong">Hạ Long</option>
                  <option value="sapa">Sapa</option>
                  <option value="hue">Huế</option>
                  <option value="hoian">Hội An</option>
                  <option value="danang">Đà Nẵng</option>
                  <option value="hcmc">TP. Hồ Chí Minh</option>
                  <option value="cantho">Cần Thơ</option>
                  <option value="phuquoc">Phú Quốc</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="checkin">Ngày đi</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input type="date" id="checkin" v-model="searchForm.checkIn" />
              </div>
            </div>

            <div class="form-group">
              <label for="checkout">Ngày về</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input type="date" id="checkout" v-model="searchForm.checkOut" />
              </div>
            </div>

            <div class="form-group">
              <label for="guests">Số khách</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <select id="guests" v-model="searchForm.guests">
                  <option value="">Chọn số khách</option>
                  <option value="1">1 khách</option>
                  <option value="2">2 khách</option>
                  <option value="3">3 khách</option>
                  <option value="4">4 khách</option>
                  <option value="5+">5+ khách</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="invisible-label">Tìm kiếm</label>
              <button type="submit" class="search-btn">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- Slogan Section -->
    <section class="slogan-section">
      <div class="slogan-content">
        <h2 class="slogan-title">"Việt Nam - Điểm đến của trái tim"</h2>
        <p class="slogan-text">
          Mỗi chuyến đi là một câu chuyện, mỗi điểm đến là một kỷ niệm. Hãy để chúng tôi đồng hành cùng bạn khám phá
          vẻ đẹp bất tận của đất nước hình chữ S.
        </p>
        <div class="slogan-actions">
          <button class="primary-btn">Bắt đầu hành trình</button>
          <button class="secondary-btn">Xem video giới thiệu</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const searchForm = reactive({
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: ''
})

const favorites = reactive({
  north: false,
  central: false,
  south: false
})

const toggleFavorite = (region) => {
  favorites[region] = !favorites[region]
}

const selectRegion = (region) => {
  console.log('Selected region:', region)
}

const handleSearch = () => {
  console.log('Searching with:', searchForm)
  if (!searchForm.destination) {
    alert('Vui lòng chọn điểm đến')
    return
  }
  alert(`Tìm kiếm: ${searchForm.destination} từ ${searchForm.checkIn} đến ${searchForm.checkOut} cho ${searchForm.guests || '1'} khách`)
}
</script>

<style scoped>
:root {
  --color-primary: #1e40af;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #fbbf24;
  --color-secondary-hover: #f59e0b;
  --color-background: #ffffff;
  --color-background-soft: #f8fafc;
  --color-border: #e2e8f0;
  --color-border-hover: #cbd5e1;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-text-white: #ffffff;
}

.main-bg {
  min-height: 100vh;
  background: linear-gradient(to bottom, #dbeafe, #ffffff);
}

/* Hero Section */
.hero-section {
  padding: 48px 16px;
}

.hero-content {
  text-align: center;
  margin-bottom: 48px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
}

.highlight {
  color: var(--color-primary);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-light);
  max-width: 42rem;
  margin: 0 auto;
}

.regions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.region-card {
  background: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.region-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.region-image {
  position: relative;
  height: 256px;
  overflow: hidden;
}

.region-overlay {
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: var(--color-text-white);
}

.region-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.region-cities {
  font-size: 0.875rem;
  opacity: 0.9;
}

.region-info {
  padding: 24px;
}

.region-description {
  color: var(--color-text-light);
  margin-bottom: 16px;
  line-height: 1.5;
}

.region-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.region-price {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.explore-btn {
  padding: 8px 16px;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.explore-btn:hover {
  background: var(--color-primary);
  color: var(--color-text-white);
}

/* Filter Section */
.filter-section {
  padding: 48px 16px;
  background: var(--color-background);
}

.filter-container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 32px;
}

.filter-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 32px;
}

.search-form {
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
}

.invisible-label {
  color: transparent;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-light);
}

.form-group input,
.form-group select {
  padding: 12px 12px 12px 40px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  text-align: center;
}

.form-group input:focus,
.form-group select:focus {
  border-color: var(--color-primary);
}

.search-btn {
  width: 100%;
  padding: 12px 16px;
  background: var(--color-primary);
  color: var(--color-text-white);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* Slogan Section */
.slogan-section {
  padding: 80px 16px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: var(--color-text-white);
  position: relative;
  overflow: hidden;
}

.slogan-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.slogan-section:hover::before {
  opacity: 1;
}

.slogan-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.slogan-section:hover .slogan-content {
  transform: translateY(-5px);
}

.slogan-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.slogan-text {
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 32px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.slogan-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.primary-btn {
  padding: 12px 24px;
  background: var(--color-text-white);
  color: var(--color-primary);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.primary-btn:hover {
  background: var(--color-secondary);
  color: var(--color-text-white);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.secondary-btn {
  padding: 12px 24px;
  background: transparent;
  color: var(--color-text-white);
  border: 2px solid var(--color-text-white);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: var(--color-text-white);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.placeholder-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.3);
}


.region-card:hover .placeholder-image {
  transform: scale(1.1);
}


@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .regions-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .slogan-title {
    font-size: 1.75rem;
  }
  
  .slogan-text {
    font-size: 1rem;
  }
  
  .slogan-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-btn,
  .secondary-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>