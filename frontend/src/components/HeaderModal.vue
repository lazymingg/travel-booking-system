<template>
  <header class="header">
    <div class="header_content">
      <router-link to="/" class="logo">
        <img class="logo_icon" src="../assets/logo.svg" alt="Wego's logo">
      </router-link>
      <div class="header_right">
        <a href="#" class="nav_link">About us</a>

        <!-- Chưa đăng nhập -->
        <template v-if="!isLoggedIn">
          <router-link to="Login" class="nav_link">Sign in</router-link>
          <router-link to="#" class="nav_link">Sign up</router-link>
        </template>

        <!-- Đã đăng nhập -->
        <template v-else>
          <div class="user_profile">
            <div class="profile_icon">👤</div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderModal',
  data() {
    return {
      isLoggedIn: false
    }
  }
}
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
  text-decoration:underline;
  transform: scale(1.02);
}

.user_profile {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile_icon {
  font-size: 1.2rem;
}

</style>