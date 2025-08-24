<template>
  <header-modal/>
  <search-modal/>

  <!-- Image Gallery -->
  <section v-if="loading">
    <p>Loading accommodation...</p>
  </section>

  <section v-else-if="!accommodation">
    <p>Accommodation not found.</p>
  </section>

  <section v-if="accommodation.images.len !== 0">
  <section class="gallery_section">
    <div class="container">
      <div class="gallery">
        <!-- Ảnh to bên trái -->
        <div class="main_image" @click="openImagePopup(accommodation.images, 0)">
          <img :src="accommodation.images[0]" :alt="accommodation.name" />
        </div>

        <!-- 2 ảnh nhỏ bên phải -->
        <div class="side_images">
          <div
            v-for="(image, index) in accommodation.images.slice(1, 3)"
            :key="index"
            class="thumbnail"
            @click="openImagePopup(accommodation.images, index + 1)"
          >
            <img :src="image" :alt="`${accommodation.name} image ${index + 2}`" />

            <!-- Overlay ở ảnh thứ 3 trở đi -->
            <div
              v-if="index === 1 && accommodation.images.length > 3"
              class="more_overlay"
            >
              +{{ accommodation.images.length - 3 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Popup Gallery -->
  <div v-if="showImagePopup" class="popup_overlay" @click.self="closePopup">
    <button class="close_btn" @click="closePopup">✕</button>
    <div class="popup_content">
      <img :src="accommodation.images[current_image_index]" alt="Popup Image" />

      <!-- Điều hướng -->
      <button class="nav_btn prev" @click.stop="prevImage">‹</button>
      <button class="nav_btn next" @click.stop="nextImage">›</button>
    </div>
  </div>

    <!-- Accommodation Info -->
    <section class="info_section">
      <div class="container">
        <h1 class="accommodation_name">{{ accommodation.name }}</h1>
        
        <!-- About Us -->
        <div class="info_card">
          <h3 class="info_title">
            <img :src="info_icon" height="15rem"/>
            About us
          </h3>
          <p class="info_description">{{ accommodation.description }}</p>
        </div>

        <!-- Address -->
        <div class="info_card">
          <h3 class="info_title">
            <img :src="address_icon" height="15rem"/>
            Address
          </h3>
          <p class="address">{{ accommodation.address }}</p>
        </div>

        <!-- amenities -->
        <div class="info_card">
          <h3 class="info_title">Amenities</h3>
          <div class="amenities_grid">
            <div 
              v-for="amenity in accommodation.amenities" 
              :key="amenity.name"
              class="amenity_item"
            >
              <img
                class="amenity_icon"
                :src="get_amenities_icon(amenity.icon_name)" 
                :alt="amenity.name" 
              />
              <span class="amenity_name">{{ amenity.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rooms Section -->
    <section class="rooms_section">
      <div class="container">
        <h2 class="section_title">Rooms</h2>
        <div class="rooms_list">
          <div 
            v-for="(room, index) in accommodation.rooms" 
            :key="index"
            class="room_card"
          >
            <h3 class="room_title">Room {{ index + 1 }}</h3>
            <div class="room_content">
              
              <!-- Room Images -->
              <div class="room_image">
                <div class="room_image_grid">
                  <div
                    v-for="(img, img_index) in room.images.slice(0, 4)"
                    :key="img_index"
                    class="room_image_item"
                    @click="openImagePopup(room.images, img_index)"
                  >
                    <img :src="img" :alt="`Room ${index + 1} - image ${img_index + 1}`" />
                    
                    <!-- Overlay ở ảnh thứ 3 -->
                    <div 
                      v-if="img_index === 3 && room.images.length > 4" 
                      class="room_image_overlay"
                    >
                      +{{ room.images.length - 4 }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Popup Fullscreen Slideshow -->
              <div v-if="showImagePopup" class="popup_fullscreen">
                <button class="popup_close" @click="closeImagePopup">✖</button>

                <!-- Ảnh đang xem -->
                <img 
                  :src="selectedRoomImages[current_image_index]" 
                  :alt="`Room image ${current_image_index+1}`" 
                  class="popup_img_large"
                />

                <!-- Điều hướng -->
                <button v-if="current_image_index > 0" class="nav_btn left" @click="prevImage">‹</button>
                <button v-if="current_image_index < selectedRoomImages.length - 1" class="nav_btn right" @click="nextImage">›</button>

                <!-- Số ảnh -->
                <div class="image_counter">
                  {{ current_image_index + 1 }} / {{ selectedRoomImages.length }}
                </div>
              </div>

              <div class="room_detail">
                <h4>Room Details</h4>
                <p> {{ room.detail }}</p>
              </div>
              <div class="room_guests">
                <h4>Capacity</h4>
                <p>{{ room.maxGuests }}</p>
              </div>
              <div class="room_price">
                <h4>Price</h4>
                <p class="price">{{ formatPrice(room.price) }}</p>
                <p class="price_unit">per day</p>
                <button class="book_btn">Book now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ratings Section -->
    <section class="ratings_section">
      <div class="container">
        <h2 class="section_title">Ratings</h2>
        <div class="ratings_list">
          <div 
            v-for="(rating, index) in accommodation.ratings" 
            :key="index"
            class="rating_card"
          >
            <div class="rating_header">
              <span class="username">{{ rating.username }}</span>
                <span class="rating_score">{{ rating.score }}</span>
            </div>
            <p class="rating_comment">{{ rating.comment }}</p>

            <!-- Rating Images -->
            <div class="rating_images">
              <div class="rating_images_row">
                <div
                  v-for="(img, imgIndex) in rating.images.slice(0, 5)"
                  :key="imgIndex"
                  class="rating_image_item"
                  @click="openImagePopup(rating.images, imgIndex)"
                >
                  <img :src="img" :alt="`Rating image ${imgIndex + 1}`" />

                  <!-- Overlay ở ảnh thứ 5 -->
                  <div
                    v-if="imgIndex === 4 && rating.images.length > 5"
                    class="rating_image_overlay"
                  >
                    +{{ rating.images.length - 4 }}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  </section>
  <footer-modal/>
</template>

<script setup>
import HeaderModal from '@/components/HeaderModal.vue';
import FooterModal from '@/components/FooterModal.vue';
import SearchModal from '@/components/SearchModal.vue';
import hero_img from "@/assets/hero-img-singin.jpg";
import info_icon from "@/assets/icon/info_icon.svg";
import address_icon from "@/assets/icon/address_icon.svg";

import { ref, watch, onUnmounted, onMounted } from 'vue'
import api from '@/frontend-api-helper.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const accommodationId = "1"

const accommodation = ref(null)
const loading = ref(true)

const to_snake_case = (str) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")   // thay khoảng trắng bằng _
    .replace(/[^\w_]/g, "") + "_icon"// bỏ ký tự đặc biệt (nếu có)
}

const fetch_accommodation = async (id) => {
  try {
    const result = await api.get(`/accommodations/${id}`)
    if (result.success) {
      const data = result.data

      if (Array.isArray(data.amenities)) {
        data.amenities = data.amenities.map(a => ({
          ...a,
          icon_name: to_snake_case(a.name)
        }))
      }

      accommodation.value = data

      console.log('Accommodation:', accommodation.value)
    } else {
      console.error('Failed to fetch accommodation:', result.message)
      accommodation.value = null
    }
  } catch (error) {
    console.error('Error fetching accommodation:', error)
    accommodation.value = null
  } finally {
    loading.value = false
  }
}

const rooms = ref(null)

const fetch_rooms = async (id) => {
  loading.value = true
  try {
    const result = await api.get(`/accommodations/accommodation/${id}`)
    if (result.success) {
      rooms.value = result.data  // <-- sửa ở đây
      console.log('Rooms:', rooms.value)
    } else {
      console.error('Failed to fetch rooms:', result.message)
      rooms.value = null  // <-- sửa ở đây
    }
  } catch (error) {
    console.error('Error fetching rooms:', error)
    rooms.value = null  // <-- sửa ở đây
  } finally {
    loading.value = false
  }
}

const modules = import.meta.glob("@/assets/AmenityIcons/*.svg", { eager: true });

const amenities_icons = Object.entries(modules).map(([path, module]) => {
  return {
    name: path.split("/").pop().replace(".svg", ""),
    src: module.default
  };
});

const get_amenities_icon = (amenityName) => {
  if (!amenityName) return ""
  const found = amenities_icons.find(icon => icon.name === amenityName)
  return found ? found.src : ""
}

const showImagePopup = ref(false)
const selectedRoomImages = ref([])
const current_image_index = ref(0)

const openImagePopup = (images, startIndex = 0) => {
  selectedRoomImages.value = images
  current_image_index.value = startIndex
  showImagePopup.value = true
}

const closeImagePopup = () => {
  showImagePopup.value = false
  selectedRoomImages.value = []
  current_image_index.value = 0
}

const nextImage = () => {
  if (current_image_index.value < selectedRoomImages.value.length - 1) {
    current_image_index.value++
  }
}

const prevImage = () => {
  if (current_image_index.value > 0) {
    current_image_index.value--
  }
}

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

onMounted(() => {
  console.log(accommodation.value)
  fetch_accommodation(accommodationId)
  fetch_rooms(accommodationId)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Gallery */
.gallery {
  display: grid;
  grid-template-columns: 2fr 1fr; /* ảnh to : 2, cột nhỏ : 1 */
  gap: 16px;
  height: 400px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.main_image {
  border-radius: 8px;
  overflow: hidden;
  max-height: 400px;
}

.main_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.side_images {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  max-height: 400px;
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

.more_overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}


/* Info Section */
.info_section {
  padding: 32px 0;
}

.accommodation_name {
  font-weight: bold;
  font-size: 32px;
  color: #2563EB;
  margin-bottom: 32px;
  text-align: center;
}

.info_card {
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.info_title {
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: #111827;
  margin-bottom: 16px;
}

.info_description, .address {
  color: #4B5563;
  line-height: 1.6;
}

.amenities_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.amenity_item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
}

.amenity_icon {
  height: 1.5em;
}

/* Rooms Section */
.rooms_section {
  padding: 32px 0;
  background-color: #F9FAFB;
}

.section_title {
  font-weight: bold;
  font-size: 24px;
  color: #2563EB;
  margin-bottom: 24px;
}

.room_card {
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
}

.room_title {
  font-weight: bold;
  font-size: 20px;
  color: #111827;
  margin-bottom: 16px;
}

.room_content {
  display: grid;
  grid-template-columns: 150px 5fr 0.8fr 1.5fr;
  gap: 10px;
  align-items: start;
}

/* Grid ảnh nhỏ trong room card */
.room_image_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  width: 150px;
}

.room_image_item {
  position: relative;
  overflow: hidden;
  line-height: 0; /* loại bỏ khoảng trống inline */
}

.room_image_item img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

/* Overlay ở ảnh thứ 3 */
.room_image_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

/* Popup Fullscreen */
.popup_fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  flex-direction: column;
}

/* Ảnh lớn */
.popup_img_large {
  max-width: 90%;
  max-height: 80%;
  border-radius: 8px;
  object-fit: contain;
}

/* Nút đóng */
.popup_close {
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
  z-index: 1100;
}

/* Nút điều hướng */
.nav_btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  border: none;
  font-size: 36px;
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 50%;
  z-index: 1100;
}

.nav_btn.left {
  left: 20px;
}

.nav_btn.right {
  right: 20px;
}

/* Bộ đếm */
.image_counter {
  position: absolute;
  bottom: 20px;
  color: white;
  font-size: 16px;
}

.room_detail h4,
.room_guests h4,
.room_price h4 {
  font-weight: bold;
  font-size: 16px;
  color: #111827;
  margin-bottom: 8px;
}

.room_guests p {
  font-size: 16px;
  font-weight: bold;
}

.room_detail,
.room_guests,
.room_price {
  height: 100%;
  border: #E5E5E5, solid, 1px;
  padding: 10px;
  border-radius: 5px;
}

.room_features {
  list-style: none;
  color: #4B5563;
}

.room_features li {
  margin-bottom: 4px;
}

.room_guests p {
  color: #4B5563;
  text-align: center;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #16A34A;
}

.price_unit {
  color: #4B5563;
  font-size: 14px;
  margin-bottom: 12px;
}

.book_btn {
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.book_btn:hover {
  background-color: #1D4ED8;
}

/* Ratings Section */
.ratings_section {
  padding: 32px 0;
}

.rating_card {
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
}

.rating_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.username {
  font-weight: 500;
  color: #111827;
}

.rating_score {
  background-color: #FACC15;
  color: #2563EB;
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

.rating_comment {
  color: #4B5563;
  margin-bottom: 16px;
  line-height: 1.6;
}

.rating_images {
  display: flex;
  gap: 8px;
  align-items: center;
}

.rating_image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.rating_images_row {
  display: flex;
  gap: 6px;
}

.rating_image_item {
  position: relative;
  width: 80px; /* bạn chỉnh kích thước theo ý */
  height: 80px;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
}

.rating_image_item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rating_image_overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .main_image {
    height: 250px;
  }
  
  .thumbnail_grid {
    grid-template-columns: repeat(4, 1fr);
    height: 100px;
  }
  
  .room_content {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
