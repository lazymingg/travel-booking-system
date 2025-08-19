<script setup>
// const axious = require('axios');
</script>

<template>
  <div class="main-container">
  <!-- <nav class ='nav-bar'>
    <h1 class="logo">Travel Booking System</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/userProfile">User Profile</a></li>
    </ul>
  </nav> -->
  <HeaderModal/>
  <SearchModal/>
  <div class="hero-pane">
  </div>
  <div class="search-bar">
    <h2>Search for your next adventure</h2>
    <form>
      <input type="text" placeholder="Enter destination" />
      <input type="date" placeholder="Select booking date - booking return day" />
      <input type="number" placeholder="Number of guests" />
      <button type="submit">Search</button>
    </form>
  </div>
  </div>
  <div>
    <h2>Featured Destinations</h2>
    <div class="featured-destinations">
      <p>Destination 1</p>
      <p>Destination 2</p>
      <p>Destination 3</p>
    </div>
  </div>
  <FooterModal/>
</template>

<script>
import HeaderModal from '@/components/HeaderModal.vue';
import FooterModal from '@/components/FooterModal.vue';
import SearchModal from '@/components/SearchModal.vue';

export default {
  name: 'WeGoBooking',
  components: {
    HeaderModal,
    SearchModal,
    FooterModal
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.hero-pane {
  background-color: var(--color-border);
  width: 100vw;
  height: 400px;
  /* background-size: cover; */
  /* background-position: center; */
}
.nav-bar {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 1rem;
  background-color: var(--color-background);
}
.nav-bar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-direction: row;
}
.nav-bar ul li {
  font-size: 1.2rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  text-align: center;
  /* text-overflow: none; */
  text-wrap: wrap;
  /* width: 200px; */
  height: 60px;
}
.search-bar {
  /* width: 100vw; */
  /* height: 120px; */
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-bar form{
  /* width: 100vw; */
  margin-top: 1rem;
  margin-bottom: 2rem;
  /* border: 1px solid var(--color-border); */
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}.search-bar form input{
  height: 4rem;
  width: 20rem;
  border-radius: 5px;
  border: 1px solid var(--color-border);;
}

</style>
