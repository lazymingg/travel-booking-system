<template>
  <header-modal/>
  <search-modal/>
    <!-- Image Gallery -->
    <section class="gallery-section">
      <div class="container">
        <div class="gallery">
          <div class="main-image">
            <img :src="accommodation.mainImage" :alt="accommodation.name">
          </div>
          <div class="thumbnail-grid">
            <div 
              v-for="(image, index) in accommodation.thumbnails" 
              :key="index"
              class="thumbnail"
              :class="{ 'more-images': index === 3 }"
            >
              <img :src="image" :alt="`${accommodation.name} image ${index + 1}`">
              <div v-if="index === 3" class="more-overlay">
                <span>{{ accommodation.totalImages - 4 }}+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accommodation Info -->
    <section class="info-section">
      <div class="container">
        <h1 class="accommodation-name">{{ accommodation.name }}</h1>
        
        <!-- About Us -->
        <div class="info-card">
          <h3 class="info-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            About us
          </h3>
          <p class="info-description">{{ accommodation.description }}</p>
        </div>

        <!-- Address -->
        <div class="info-card">
          <h3 class="info-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Address
          </h3>
          <p class="address">{{ accommodation.address }}</p>
        </div>

        <!-- Facilities -->
        <div class="info-card">
          <h3 class="info-title">Facilities</h3>
          <div class="facilities-grid">
            <div 
              v-for="facility in accommodation.facilities" 
              :key="facility.name"
              class="facility-item"
            >
              <span class="facility-icon" v-html="facility.icon"></span>
              <span class="facility-name">{{ facility.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rooms Section -->
    <section class="rooms-section">
      <div class="container">
        <h2 class="section-title">Rooms</h2>
        <div class="rooms-list">
          <div 
            v-for="(room, index) in accommodation.rooms" 
            :key="index"
            class="room-card"
          >
            <h3 class="room-title">Room {{ index + 1 }}</h3>
            <div class="room-content">
              <div class="room-image">
                <img :src="room.image" :alt="`Room ${index + 1}`">
                <span class="image-count">{{ room.imageCount }}+</span>
              </div>
              <div class="room-details">
                <h4>Room Details</h4>
                <ul class="room-features">
                  <li v-for="detail in room.details" :key="detail">{{ detail }}</li>
                </ul>
              </div>
              <div class="room-guests">
                <h4>Guests number</h4>
                <p>{{ room.maxGuests }}</p>
              </div>
              <div class="room-price">
                <h4>Price</h4>
                <p class="price">{{ formatPrice(room.price) }}</p>
                <p class="price-unit">per hour</p>
                <button class="book-btn">Book now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ratings Section -->
    <section class="ratings-section">
      <div class="container">
        <h2 class="section-title">Ratings</h2>
        <div class="ratings-list">
          <div 
            v-for="(rating, index) in accommodation.ratings" 
            :key="index"
            class="rating-card"
          >
            <div class="rating-header">
              <span class="user-icon">#</span>
              <span class="username">{{ rating.username }}</span>
              <div class="rating-stars">
                <span class="rating-score">{{ rating.score }}</span>
                <div class="stars">
                  <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= rating.score }">★</span>
                </div>
              </div>
            </div>
            <p class="rating-comment">{{ rating.comment }}</p>
            <div class="rating-images">
              <img 
                v-for="(image, imgIndex) in rating.images" 
                :key="imgIndex"
                :src="image" 
                :alt="`Rating image ${imgIndex + 1}`"
                class="rating-image"
              >
              <div v-if="rating.totalImages > rating.images.length" class="more-rating-images">
                {{ rating.totalImages - rating.images.length }}+
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  <footer-modal/>
</template>

<script setup>
import HeaderModal from '@/components/HeaderModal.vue';
import FooterModal from '@/components/FooterModal.vue';
import SearchModal from '@/components/SearchModal.vue';
import { ref, onMounted } from 'vue'

// Props để nhận tên accommodation từ trang list
const props = defineProps({
  accommodationId: {
    type: String,
    default: 'default-accommodation'
  }
})

// Reactive data
const searchData = ref({
  destination: 'Ho Chi Minh City',
  checkIn: '',
  checkOut: ''
})

const accommodation = ref({
  name: "Accommodation's name",
  description: "Provide a brief description for this accommodation",
  address: "XX, Street XX, Ward XX, Province XX, City XX, Vietnam",
  mainImage: "/placeholder.svg?height=400&width=600",
  thumbnails: [
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200", 
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200"
  ],
  totalImages: 15,
  facilities: [
    { name: "Free wifi", icon: "📶" },
    { name: "Restaurant", icon: "🍽️" },
    { name: "Gym", icon: "💪" },
    { name: "Swimming pool", icon: "🏊" },
    { name: "Smoking room", icon: "🚬" },
    { name: "Sauna", icon: "🧖" },
    { name: "Parking lot", icon: "🚗" },
    { name: "Spa", icon: "💆" }
  ],
  rooms: [
    {
      image: "/placeholder.svg?height=100&width=100",
      imageCount: 10,
      details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
      maxGuests: 3,
      price: 100000
    },
    {
      image: "/placeholder.svg?height=100&width=100",
      imageCount: 10,
      details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
      maxGuests: 3,
      price: 100000
    },
    {
      image: "/placeholder.svg?height=100&width=100",
      imageCount: 10,
      details: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
      maxGuests: 3,
      price: 100000
    }
  ],
  ratings: [
    {
      username: "User name",
      score: 4.5,
      comment: "Provide your comments here",
      images: [
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80"
      ],
      totalImages: 10
    },
    {
      username: "User name",
      score: 4.5,
      comment: "Provide your comments here",
      images: [
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80"
      ],
      totalImages: 10
    },
    {
      username: "User name",
      score: 4.8,
      comment: "Provide your comments here",
      images: [
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80"
      ],
      totalImages: 10
    }
  ]
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

onMounted(() => {
  // Load accommodation data based on accommodationId
  console.log('Loading accommodation:', props.accommodationId)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Header */
.header {
  background-color: #2563EB;
  color: white;
  padding: 16px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
}

.about-btn {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.about-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Search Section */
.search-section {
  background-color: #F9FAFB;
  padding: 24px 0;
}

.search-form {
  display: flex;
  gap: 16px;
  align-items: end;
  flex-wrap: wrap;
}

.search-field {
  flex: 1;
  min-width: 200px;
}

.search-field label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #374151;
}

.search-field input {
  width: 100%;
  padding: 12px;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  font-size: 14px;
}

.search-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  background-color: #1D4ED8;
}

/* Gallery */
.gallery-section {
  padding: 32px 0;
}

.gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  height: 400px;
}

.main-image {
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.thumbnail {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

/* Info Section */
.info-section {
  padding: 32px 0;
}

.accommodation-name {
  font-size: 32px;
  color: #2563EB;
  margin-bottom: 32px;
  text-align: center;
}

.info-card {
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
}

.info-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: #111827;
  margin-bottom: 16px;
}

.info-description, .address {
  color: #4B5563;
  line-height: 1.6;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.facility-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
}

.facility-icon {
  font-size: 18px;
}

/* Rooms Section */
.rooms-section {
  padding: 32px 0;
  background-color: #F9FAFB;
}

.section-title {
  font-size: 24px;
  color: #2563EB;
  margin-bottom: 24px;
}

.room-card {
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
}

.room-title {
  font-size: 20px;
  color: #111827;
  margin-bottom: 16px;
}

.room-content {
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 24px;
  align-items: start;
}

.room-image {
  position: relative;
}

.room-image img {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.image-count {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.room-details h4,
.room-guests h4,
.room-price h4 {
  font-size: 16px;
  color: #111827;
  margin-bottom: 8px;
}

.room-features {
  list-style: none;
  color: #4B5563;
}

.room-features li {
  margin-bottom: 4px;
}

.room-guests p {
  color: #4B5563;
  text-align: center;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #111827;
}

.price-unit {
  color: #4B5563;
  font-size: 14px;
  margin-bottom: 12px;
}

.book-btn {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.book-btn:hover {
  background-color: #1D4ED8;
}

/* Ratings Section */
.ratings-section {
  padding: 32px 0;
}

.rating-card {
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
}

.rating-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.user-icon {
  width: 32px;
  height: 32px;
  background-color: #FACC15;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.username {
  font-weight: 500;
  color: #111827;
}

.rating-stars {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-score {
  background-color: #FACC15;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #E5E5E5;
  font-size: 16px;
}

.star.filled {
  color: #FACC15;
}

.rating-comment {
  color: #4B5563;
  margin-bottom: 16px;
  line-height: 1.6;
}

.rating-images {
  display: flex;
  gap: 8px;
  align-items: center;
}

.rating-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.more-rating-images {
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

/* Footer */
.footer {
  background-color: #2563EB;
  color: white;
  padding: 32px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.footer-logo .logo-text {
  font-size: 24px;
  font-weight: bold;
}

.footer-info {
  display: flex;
  gap: 48px;
}

.footer-info h4 {
  margin-bottom: 12px;
  font-size: 16px;
}

.footer-info p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 8px;
}

.social-link {
  display: inline-block;
  font-size: 20px;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .main-image {
    height: 250px;
  }
  
  .thumbnail-grid {
    grid-template-columns: repeat(4, 1fr);
    height: 100px;
  }
  
  .room-content {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .search-form {
    flex-direction: column;
  }
  
  .search-field {
    min-width: 100%;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 24px;
  }
  
  .footer-info {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
