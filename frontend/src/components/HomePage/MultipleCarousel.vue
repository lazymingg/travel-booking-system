<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import placeholderImg from '@/assets/Image/Teams/TranCaoVan.jpg'
import leftButton from '@/assets/HomePage/leftButton.svg' // inactive dot + arrows
import rightButton from '@/assets/HomePage/rightButton.svg' // inactive dot + arrows
import dotIcon from '@/assets/HomePage/dotNormal.svg' // active dot
import dotMarkedIcon from '@/assets/HomePage/dotMarked.svg' // active dot

const props = defineProps({
  regionList: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})

const regionCards = computed(() =>
  props.regionList.map((name, i) => ({
    id: i + 1,
    name,
    image: placeholderImg
  }))
)

const perSlide = ref(6)
function updatePerSlide() {
  if (window.innerWidth < 900) perSlide.value = 2
  else perSlide.value = 6
}
onMounted(() => {
  updatePerSlide()
  window.addEventListener('resize', updatePerSlide)
})
onUnmounted(() => window.removeEventListener('resize', updatePerSlide))

const current = ref(0)
const totalSlides = computed(() => Math.ceil(regionCards.value.length / perSlide.value))
const slideItems = computed(() => {
  const start = current.value * perSlide.value
  return regionCards.value.slice(start, start + perSlide.value)
})
function prev() { if (current.value > 0) current.value-- }
function next() { if (current.value < totalSlides.value - 1) current.value++ }
function go(idx) { current.value = idx }

const maxDots = computed(() => Math.ceil(regionCards.value.length / perSlide.value))
const DOT_SLOT = 28
const dotStart = ref(0)
const clampDotStart = () => {
  const lastStart = Math.max(0, maxDots.value - 6)
  if (maxDots.value <= 6) dotStart.value = 0
  else dotStart.value = Math.min(Math.max(dotStart.value, 0), lastStart)
}
watch(maxDots, clampDotStart, { immediate: true })
watch(current, (newVal, oldVal) => {
  if (maxDots.value <= 6) {
    dotStart.value = 0
    return
  }
  const lastStart = maxDots.value - 6
  const pos = newVal - dotStart.value
  if (pos >= 5 && newVal < maxDots.value - 1) {
    if (dotStart.value < lastStart) {
      dotStart.value = Math.min(dotStart.value + 1, lastStart)
    }
  }
  if (pos <= 0 && newVal > 0) {
    dotStart.value = Math.max(dotStart.value - 1, 0)
    if (newVal > 0 && dotStart.value > 0) {
      dotStart.value = newVal - 1
    }
  }
  clampDotStart()
})
const visibleDots = computed(() => {
  const dots = []
  const dotCount = Math.min(6, maxDots.value)
  for (let i = 0; i < dotCount; i++) {
    const dotIndex = dotStart.value + i
    if (dotIndex < maxDots.value) {
      dots.push(dotIndex)
    } else {
      dots.push(null)
    }
  }
  return dots
})
</script>

<template>
  <section class="regions-section">
    <div class="region-center">
      <h2 class="region-title">{{ title }}</h2>
      <p class="region-desc">{{ desc }}</p>
    </div>
    <div class="carousel-group">
      <div class="carousel-btn-wrap">
        <button class="carousel-btn left" :disabled="current === 0" @click="prev">
          <img :src="leftButton" alt="prev" class="arrow-icon"/>
        </button>
      </div>
      <div class="carousel-track region-grid">
        <div class="carousel-card" v-for="card in slideItems" :key="card.id">
          <img class="card-img" :src="card.image" :alt="card.name" />
          <div class="card-name">{{ card.name }}</div>
        </div>
      </div>
      <div class="carousel-btn-wrap">
        <button class="carousel-btn right" :disabled="current >= maxDots.value - 1" @click="next">
          <img :src="rightButton" alt="next" class="arrow-icon"/>
        </button>
      </div>
    </div>
    <div class="carousel-dots" :style="{ width: `calc(var(--dot-slot) * ${visibleDots.length})` }">
      <div class="dot-strip">
        <img
          v-for="(dotIndex, i) in visibleDots"
          :key="i"
          :src="dotIndex !== null && current === dotIndex ? dotMarkedIcon : dotIcon"
          class="dot-icon"
          :class="{ disabled: dotIndex === null }"
          @click="dotIndex !== null && go(dotIndex)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
:root {
  --blue: #2563EB;
  --gray: #000;
  --gray-dark: #6B7280;
  --dot-slot: 28px;
}
.regions-section {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.region-center {
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.region-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--blue);
  margin-bottom: 1rem;
}
.region-desc {
  color: var(--gray-dark);
  font-size: 1.2rem;
}
.carousel-group {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 1.5rem auto;
  padding: 0;
  box-sizing: border-box;
  gap: 0;
}
.carousel-btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.carousel-btn {
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  flex-shrink: 0;
  margin: 0;
}
.carousel-btn:hover {
  background: rgba(37,99,235,0.08);
  transform: scale(1.06);
}
.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.arrow-icon {
  width: 32px;
  height: 32px;
}
.carousel-track.region-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;      /* Center items in each grid cell */
  align-items: center;        /* Vertically center items */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;    /* Center the grid itself */
}
.carousel-card {
  width: 100%;
  max-width: 320px;
  background: #F9FAFB;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  margin: 0 auto;             /* Center card in grid cell */
}
.carousel-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.card-img {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1.2rem;
  background: #e5e5e5;
}
.card-name {
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--blue);
  text-align: center;
}
.carousel-dots {
  overflow: hidden;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.dot-strip {
  display: flex;
  gap: 8px;
  transition: none;
  will-change: transform;
}
.dot-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}
.dot-icon:hover {
  transform: scale(1.2);
}
.dot-icon.disabled {
  opacity: 0.3;
  pointer-events: none;
}
@media (max-width: 900px) {
  .carousel-track.region-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 600px;
  }
  .carousel-card {
    max-width: 220px;
    padding: 1rem;
  }
  .region-title {
    font-size: 1.5rem;
  }
}
@media (max-width: 600px) {
  .carousel-track.region-grid {
    grid-template-columns: 1fr;
    max-width: 340px;
  }
  .carousel-card {
    max-width: 100%;
    padding: 0.7rem;
  }
  .card-img {
    max-height: 80px;
    margin-bottom: 0.5rem;
  }
}
</style>