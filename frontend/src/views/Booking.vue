<template>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <div class="brand">
          <div class="logo">WeGo</div>
          <div class="icon">✈️</div>
        </div>
        <div class="nav">
          <span>About us</span>
          <div class="profile">
            <span>👤</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Search Bar -->
    <div class="search-bar">
      <div class="search-container">
        <div class="search-item">
          <label>Destination:</label>
          <input v-model="destination" />
        </div>
        <div class="search-item">
          <label>Check-in date:</label>
          <input v-model="checkIn" type="date" />
        </div>
        <div class="search-item">
          <label>Check-out date:</label>
          <input v-model="checkOut" type="date" />
        </div>
        <div class="search-buttons">
          <button>☰</button>
          <button>🔍</button>
        </div>
      </div>
    </div>

    <div class="content">
      <!-- Progress Steps -->
      <div class="steps">
        <div class="step active">
          <div class="circle">1</div>
          <div class="label">Selection</div>
        </div>
        <div class="line"></div>
        <div class="step">
          <div class="circle gray">2</div>
          <div class="label gray">Your details</div>
        </div>
        <div class="line"></div>
        <div class="step">
          <div class="circle gray">3</div>
          <div class="label gray">Confirmation</div>
        </div>
      </div>

      <!-- Selection Options -->
      <h2 class="section-title">Select your option</h2>
      
      <div class="options">
        <button>13/08/2025 - 12:00:00</button>
        <button>15/08/2025 - 12:00:00</button>
        <button>2 people</button>
        <button>Change search</button>
      </div>

      <!-- Booking Table -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Room type</th>
              <th>Booking policy</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="room-title">Two-bedrooms apartment with balcony</div>
                <div class="room-detail">
                  <div>Bedroom 1: queen size</div>
                  <div>Bedroom 2: king size</div>
                </div>
                <div class="room-detail">
                  <div>Entire apartment</div>
                  <div>65m²2</div>
                  <div>Balcony</div>
                  <div>Private kitchen</div>
                  <div>Private bathroom</div>
                </div>
                <div class="room-features">
                  <div>✓ Washing machine</div>
                  <div>✓ Wifi ✓ Bidet ✓ Sofa</div>
                  <div>✓ Towels ✓ Streaming service</div>
                </div>
              </td>
              <td>
                <div class="policy">
                  <div class="green">✓ Free cancellation before August 18, 2025</div>
                  <div class="green">✓ 20% discount applied</div>
                  <div class="red">✗ Only 4 left on our site</div>
                </div>
              </td>
              <td>
                <div class="old-price">$250</div>
                <div class="new-price">$220</div>
                <div class="note">* including taxes and charges</div>
                <div class="discount">8% off</div>
              </td>
              <td>
                <div class="note">1 room for</div>
                <select v-model="selectedAmount">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </td>
              <td>
                <div class="old-price">$250</div>
                <div class="new-price">$220</div>
                <div class="note">* including taxes and charges</div>
                <button @click="proceedToDetails" class="reserve-btn">
                  Reserve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Navigation -->
      <div class="nav-next">
        <button @click="proceedToDetails">→</button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="brand">
          <div class="logo">WeGo</div>
          <div class="icon">✈️</div>
        </div>
        <div>
          <div class="footer-title">Contact us</div>
          <div class="socials">
            <span>📘</span>
            <span>📷</span>
            <span>🐙</span>
          </div>
        </div>
        <div>
          <div class="footer-title">Address</div>
          <div class="address">227 Street Nguyen Van, Ward Cau Ong</div>
          <div class="address">Lanh, Ho Chi Minh City, Vietnam</div>
        </div>
        <div>
          <div class="footer-title">About us</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const destination = ref('Ho Chi Minh City')
const checkIn = ref('2025-08-13')
const checkOut = ref('2025-08-15')
const selectedAmount = ref('1')

const proceedToDetails = () => {
  console.log('Proceeding to details page')
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
}
.header {
  background: #2563eb;
  color: white;
  padding: 1rem;
}
.header-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
}
.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.profile {
  width: 32px;
  height: 32px;
  background: white;
  color: #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-bar {
  background: white;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
}
.search-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  gap: 1rem;
}
.search-item {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.search-item label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
}
.search-item input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.search-buttons {
  display: flex;
  gap: 0.5rem;
}
.search-buttons button {
  background: #2563eb;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.content {
  max-width: 1200px;
  margin: auto;
  padding: 2rem 1.5rem;
}
.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
.step {
  display: flex;
  align-items: center;
}
.circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.circle.gray {
  background: #ccc;
  color: #555;
}
.label {
  margin-left: 0.5rem;
  margin-right: 2rem;
  font-weight: 600;
}
.label.gray {
  color: #555;
}
.line {
  width: 100px;
  height: 4px;
  background: #ddd;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
}
.options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.options button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  background: #2563eb;
  color: white;
}
th, td {
  padding: 1rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid #eee;
}
.room-title {
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 0.5rem;
}
.room-detail {
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 0.5rem;
}
.room-features {
  font-size: 0.875rem;
  color: #16a34a;
}
.policy {
  font-size: 0.875rem;
}
.policy .green {
  color: #16a34a;
  margin-bottom: 0.5rem;
}
.policy .red {
  color: #dc2626;
}
.old-price {
  text-decoration: line-through;
  color: #888;
}
.new-price {
  font-size: 1.25rem;
  font-weight: bold;
}
.note {
  font-size: 0.875rem;
  color: #555;
}
.discount {
  background: #16a34a;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  display: inline-block;
}
.reserve-btn {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
}
.reserve-btn:hover {
  background: #1e40af;
}
.nav-next {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}
.nav-next button {
  font-size: 2rem;
  color: #555;
  background: none;
  border: none;
  cursor: pointer;
}
.nav-next button:hover {
  color: #2563eb;
}
.footer {
  background: #2563eb;
  color: white;
  padding: 2rem;
  margin-top: auto;
}
.footer-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.footer-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.address {
  font-size: 0.875rem;
}
.socials {
  display: flex;
  gap: 1rem;
}
</style>
