<template>
  <!-- <footer class="footer">
    <div class="footer_content">
      <div class="footer_section">
      <router-link to="/" class="logo">
        <img class="logo_icon" src="../assets/logo.svg" alt="Wego's logo">
      </router-link>
      </div>
      <div class="footer_section">
        <h4>Contact us</h4>
        <div class="social_links">
          <a href="https://www.facebook.com/">
            <img class="social_icon" src="../assets/facebook_logo.svg" alt="Facebook's logo">
          </a>
          <a href="https://www.instagram.com/">
            <img class="social_icon" src="../assets/instagram_logo.svg" alt="Instagram's logo">
          </a>
          <a href="https://github.com/lazymingg/travel-booking-system-test.git">
            <img class="social_icon" src="../assets/github_logo.svg" alt="Github's logo">
          </a>
        </div>
      </div>
      <div class="footer_section">
        <h4>Address</h4>
        <p>227 Street Nguyen Van, Ward Cau Ong Lanh, Ho Chi Minh City, Vietnam</p>
      </div>
      <div class="footer_section">
        <a href="#" class="nav_link">About us</a>
      </div>
    </div>
  </footer> -->
</template>

<script setup>
</script>

<style>
/* Footer */
.footer {
  background-color: #1D4ED8;
  color: white;
  height: 25vh; /* 1/4 of screen height */
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

.footer_content {
  width: 100%;
  max-width: 83.3vw;
  margin: 0 auto;
  align-items: top;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  gap: 3rem;
}

.footer_section h4 {
  font-weight:500;
  margin-bottom: 1rem;
}

.logo_icon {
  height: 80px;
}

.social_icon {
  height: 20px;
}

.nav_link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.nav_link:hover {
  color: #FACC15;
  text-decoration:underline;
  font-size: 1.02rem;
}

.social_links {
  display: flex;
  gap: 1rem;
}

.social_links a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>
