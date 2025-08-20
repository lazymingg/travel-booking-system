<script setup>
import HeaderModal from '@/components/HeaderModal.vue'
import FooterModal from '@/components/FooterModal.vue'
import SearchModal from '@/components/SearchModal.vue'
import SingleCarousel from '@/components/HomePage/SingleCarosel.vue'
import MultipleCarousel from '@/components/HomePage/MultipleCarousel.vue'

// Data for SingleCarousel
const accommodations = [
  "Hotel", "Resort", "Homestay", "Villa", "Apartment", "Hostel", "Guesthouse", "Motel", "Camping", "Bungalow",
  "Farmstay", "Eco-lodge", "Luxury Hotel", "Boutique Hotel", "Beach Resort", "Mountain Lodge", "Capsule Hotel",
  "Treehouse", "Floating House", "Glamping"
]

const popularPlaces = [
  "Ha Long Bay", "Phong Nha Cave", "Sapa", "Da Nang Beach", "Nha Trang", "Mekong Delta", "Hoi An Ancient Town", "Hue Imperial City",
  "Fansipan", "Da Lat", "Phu Quoc Island", "My Son Sanctuary", "Con Dao", "Tam Coc", "Ba Na Hills", "Cat Ba Island",
  "Mui Ne", "Pleiku", "Buon Ma Thuot", "Tay Ninh Holy See"
]

// Data for MultipleCarousel
const northernRegion = [
  "Ha Noi", "Quang Ninh", "Cao Bang", "Lang Son", "Lai Chau", "Dien Bien", "Son La", "Tuyen Quang", "Lao Cai",
  "Thai Nguyen", "Phu Tho", "Bac Ninh", "Hung Yen", "Hai Phong", "Ninh Binh", "Thanh Hoa"
]
const middleRegion = [
  "Hue", "Nghe An", "Ha Tinh", "Quang Tri", "Da Nang", "Quang Ngai", "Gia Lai", "Khanh Hoa", "Lam Dong", "Dak Lak"
]
const southernRegion = [
  "Ho Chi Minh City", "Dong Nai", "Tay Ninh", "Can Tho", "Vinh Long", "Dong Thap", "Ca Mau", "An Giang"
]
</script>

<template>
  <div class="homepage-root">
    <HeaderModal />
    <SearchModal />

    <!-- Hero Banner -->
    <section class="hero-banner">
      <img class="hero-bg" src="@/assets/Image/Teams/TranCaoVan.jpg" alt="banner" />
      <div class="hero-overlay">
        <h1 class="hero-title">Welcome to WeGo</h1>
      </div>
    </section>

    <!-- Accommodations Section -->
    <section class="section accommodations-section">
      <SingleCarousel
        :accommodation-list="accommodations"
        left-title="Accommodations"
        left-desc="Various accommodations for you. Choose and enjoy your journey"
        :reverse="false"
      />
    </section>

    <!-- Popular Places Section -->
    <section class="section popular-section">
      <SingleCarousel
        :accommodation-list="popularPlaces"
        left-title="Popular places"
        left-desc="Explore Vietnam's most famous destinations"
        :reverse="true"
      />
    </section>

    <!-- Region Sections -->
    <section class="section region-section">
      <MultipleCarousel
        :region-list="northernRegion"
        title="Northern Region"
        desc="Where history whispers through ancient streets and four seasons paint the land"
      />
    </section>
    <section class="section region-section">
      <MultipleCarousel
        :region-list="middleRegion"
        title="Middle Region"
        desc="Where mountains meet the sea, and royal heritage dances with spicy flavors"
      />
    </section>
    <section class="section region-section">
      <MultipleCarousel
        :region-list="southernRegion"
        title="Southern Region"
        desc="Where rivers weave life through endless orchards under the tropical sun"
      />
    </section>

    <FooterModal />
  </div>
</template>

<style>
:root {
  --background: #FFFFFF;
  --foreground: #0A0A0A;
  --primary: #171717;
  --primary-foreground: #FAFAFA;
  --secondary: #F5F5F5;
  --muted: #F5F5F5;
  --muted-foreground: #737373;
  --destructive: #EF4444;
  --border: #E5E5E5;
  --blue: #2563EB;
  --blue-dark: #1D4ED8;
  --blue-light: #DBEAFE;
  --gray-100: #F9FAFB;
  --gray-200: #F3F4F6;
  --gray-500: #4B5563;
  --gray-600: #374151;
  --gray-900: #111827;
  --success: #16A34A;
  --success-bg: #DCFCE7;
  --success-dark: #166534;
  --danger: #DC2626;
  --danger-bg: #FEE2E2;
  --danger-dark: #EF4444;
  --warning: #CA8A04;
  --warning-bg: #FEF3C7;
  --warning-dark: #FACC15;
  --purple: #9333EA;
  --purple-bg: #F3E8FF;
  --chart-1: #E07A5F;
  --chart-2: #429B8C;
  --chart-3: #3D5A80;
  --chart-4: #F2CC8F;
  --chart-5: #F4A261;
  --dot-slot: 28px;
}

.homepage-root {
  background: var(--background);
  color: var(--foreground);
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

/* Hero Banner */
.hero-banner {
  position: relative;
  width: 100vw;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  background: var(--gray-100);
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 1;
}
.hero-overlay {
  position: absolute;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(37,99,235,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.hero-title {
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 0 2px 12px rgba(0,0,0,0.18);
  letter-spacing: 2px;
  text-align: center;
}

/* Section */
.section {
  width: 100vw;
  max-width: 1400px;
  margin: 0 auto 3rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Responsive */
@media (max-width: 1200px) {
  .section {
    max-width: 100vw;
    padding: 0 0.5rem;
  }
}
@media (max-width: 900px) {
  .hero-banner {
    height: 180px;
  }
  .section {
    max-width: 100vw;
    padding: 0 0.2rem;
  }
}
@media (max-width: 600px) {
  .hero-banner {
    height: 120px;
  }
  .section {
    padding: 0;
  }
}
</style>