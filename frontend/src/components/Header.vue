<script setup>
</script>

<template>
  <header class="header">
    <div class="header-container">
      <div class="logo-section">
        <div class="logo-circle"></div>
        <span class="logo-text">WeGo</span>
      </div>
      <nav class="navigation">
        <a href="#" class="nav-link">Giới thiệu</a>
        <a href="#" class="nav-link">Đăng nhập</a>
        <a href="#" class="nav-link">Đăng ký</a>
        <div class="profile-icon">
          <svg class="profile-svg" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #57534e;
  color: white;
  padding: 12px 16px;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-circle {
  width: 32px;
  height: 32px;
  background-color: #a8a29e;
  border-radius: 50%;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 24px;
}

@media (max-width: 768px) {
  .navigation {
    display: none;
  }
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #d6d3d1;
}

.profile-icon {
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-svg {
  width: 20px;
  height: 20px;
  color: #57534e;
}
</style>