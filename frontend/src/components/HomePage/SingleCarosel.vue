<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import placeholderImg from '@/assets/Image/Teams/TranCaoVan.jpg'
import leftButton from '@/assets/HomePage/leftButton.svg' // inactive dot + arrows
import rightButton from '@/assets/HomePage/rightButton.svg' // inactive dot + arrows
import dotIcon from '@/assets/HomePage/dotNormal.svg' // active dot
import dotMarkedIcon from '@/assets/HomePage/dotMarked.svg' // active dot

const props = defineProps({
  accommodationList: Array,
  leftTitle: String,
  leftDesc: String,
  reverse: Boolean
})

// Always map to card objects for consistent rendering
const cards = computed(() =>
  props.accommodationList.map((item, i) =>
    typeof item === 'object'
      ? item
      : { id: i + 1, name: item, image: placeholderImg }
  )
)

const perSlide = ref(1)
function updatePerSlide() { perSlide.value = 1 }
onMounted(() => {
  updatePerSlide()
  window.addEventListener('resize', updatePerSlide)
})
onUnmounted(() => window.removeEventListener('resize', updatePerSlide))

const current = ref(0)
const totalSlides = computed(() => Math.ceil(cards.value.length / perSlide.value))
const slideItems = computed(() => {
  const start = current.value * perSlide.value
  return cards.value.slice(start, start + perSlide.value)
})
function prev() { if (current.value > 0) current.value-- }
function next() { if (current.value < totalSlides.value - 1) current.value++ }
function go(idx) { current.value = idx }

const maxDots = 6
const DOT_SLOT = 28
const dotStart = ref(0)
const clampDotStart = () => {
  const lastStart = Math.max(0, totalSlides.value - maxDots)
  if (totalSlides.value <= maxDots) dotStart.value = 0
  else dotStart.value = Math.min(Math.max(dotStart.value, 0), lastStart)
}
watch(totalSlides, clampDotStart, { immediate: true })
watch(current, (newVal) => {
  if (totalSlides.value <= maxDots) {
    dotStart.value = 0
    return
  }
  const lastStart = totalSlides.value - maxDots
  const pos = newVal - dotStart.value
  if (pos >= 5 && newVal < totalSlides.value - 1) {
    if (dotStart.value < lastStart) dotStart.value = Math.min(dotStart.value + 1, lastStart)
  }
  if (pos <= 0 && newVal > 0) {
    dotStart.value = Math.max(dotStart.value - 1, 0)
    if (newVal > 0 && dotStart.value > 0) dotStart.value = newVal - 1
  }
  clampDotStart()
})
const visibleDots = computed(() => {
  const dots = []
  for (let i = 0; i < maxDots; i++) {
    const dotIndex = dotStart.value + i
    dots.push(dotIndex < totalSlides.value ? dotIndex : null)
  }
  return dots
})
</script>

<template>
  <section class="accommodations-section">
    <div class="accommodations-wrapper" :class="{ reverse: reverse }">
      <div class="accommodations-left">
        <h2 class="accommodations-title">{{ leftTitle }}</h2>
        <p class="accommodations-subtext">{{ leftDesc }}</p>
      </div>
      <div class="accommodations-right">
        <div class="carousel-wrapper">
          <button class="carousel-btn left" :disabled="current === 0" @click="prev">
            <img :src="leftButton" alt="prev" class="arrow-icon"/>
          </button>
          <div class="carousel-track">
            <div class="carousel-card" v-for="acc in slideItems" :key="acc.id">
              <img class="card-img" :src="acc.image" :alt="acc.name" />
              <div class="card-name">{{ acc.name }}</div>
            </div>
          </div>
          <button class="carousel-btn right" :disabled="current >= totalSlides - 1" @click="next">
            <img :src="rightButton" alt="next" class="arrow-icon"/>
          </button>
        </div>
        <div class="carousel-dots" :style="{ width: `calc(var(--dot-slot) * ${maxDots})` }">
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
      </div>
    </div>
  </section>
</template>
<style scoped>
:root {
  --blue: #2563EB;
  --gray: #000;
  --gray-dark: #6B7280;
  --dot-slot: 28px; /* must match DOT_SLOT in script */
}

.accommodations-section {
  width: 100%;
  background: #fff;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
}
.accommodations-wrapper {
  display: flex;
  max-width: 1000px;
  width: 100%;
  padding: 1rem 2rem;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}
.accommodations-wrapper.reverse {
  flex-direction: row-reverse;
}
/* Left text */
.accommodations-left {
  flex: 0 0 40%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.accommodations-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--blue);
  margin-bottom: 1rem;
}
.accommodations-subtext {
  color: var(--gray-dark);
  font-size: 1.2rem;
}

/* Right */
.accommodations-right {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Carousel */
.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}
.carousel-track {
  display: flex;
  gap: 1rem;
  overflow: hidden;
  flex: 1;
  justify-content: center;
}
.carousel-card {
  width: 100%;
  max-width: 480px;
  background: #F9FAFB;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.carousel-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.card-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 0.8rem;
  background: #e5e5e5;
}
.card-name {
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--blue);
  text-align: center;
}

/* Buttons */
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

/* Dots (fixed window) */
.carousel-dots {
  overflow: hidden;
  margin-top: 1rem;
}
.dot-strip {
  display: flex;
  gap: 8px;                     /* 20 icon + 8 gap = 28px slot */
  transition: none;             /* No sliding animation for strip */
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

/* Responsive */
@media (max-width: 900px) {
  .accommodations-wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .accommodations-left {
    text-align: center;
  }
}
</style>
