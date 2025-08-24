<template>
  <header class="header">
    <div class="header_content">
      <router-link to="/" class="logo">
        <img class="logo_icon" src="../assets/logo.svg" alt="Wego's logo">
      </router-link>
      <div class="header_right">
        <router-link to="about-us" class="nav_link">About us</router-link>

        <template v-if="!isLoggedIn">
          <router-link to="Login" class="nav_link">Sign in</router-link>
          <router-link to="SignUp" class="nav_link">Sign up</router-link>
        </template>

        <template v-else>
          <router-link to="/userProfile" class="nav user_profile">
            <span class="user_name">{{ userName }}</span>
            <div class="profile_icon">👤</div>
          </router-link>
        </template>
      </div>
    </div>

  </header>


</template>

<script setup>
import { useUserStore } from '../../stores/user.js'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { isLoggedIn, userName } = storeToRefs(userStore)

</script>

<style scoped>
.header {
  width: 100%;
  background-color: #1D4ED8;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.header_content {
  width: 100%;
  max-width: 83.3vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo_icon {
  height: 80px;
}

.header_right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav_link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.nav_link:hover {
  color: #FACC15;
  text-decoration: underline;
  transform: scale(1.02);
}

.user_profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-radius: 20px;
  padding: 5px 10px;
  text-decoration: none;
}

.user_name {
  color: #1D4ED8;
  font-weight: bold;
}

.profile_icon {
  font-size: 1.2rem;
}
</style>