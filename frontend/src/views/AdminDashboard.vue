<template>
    <div class="admin-dashboard">
      <!-- Header Stats -->
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in statList" :key="stat.label">
          <div class="stat-icon">
            <img :src="stat.icon" alt="icon"/>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-number">{{ stat.value }}</div>
          </div>
        </div>
      </div>
  
      <!-- Tabs -->
      <div class="tabs">
        <button :class="{active: tab==='users'}" @click="tab='users'">
          Users
        </button>
        <button :class="{active: tab==='accommodations'}" @click="tab='accommodations'">
          Accommodations
        </button>
        <button :class="{active: tab==='bookings'}" @click="tab='bookings'">
          Bookings
        </button>
      </div>
  
      <!-- Users Tab -->
      <div v-if="tab==='users'" class="tab-content">
        <h2 class="section-header">User Management</h2>
        <div class="table-responsive">
          <table class="user-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td class="user-info">
                  <img :src="user.avatar" alt="avatar" class="user-avatar" />
                  <span>{{ user.name }}</span>
                </td>
                <td>{{ user.email }}</td>
                <td><span :class="['badge', user.role]">{{ user.role }}</span></td>
                <td><span :class="['badge', user.status]">{{ user.status }}</span></td>
                <td>
                  <button class="details-btn">
                    <img src="@/assets/adminDashboardIcons/viewIcon.svg" alt="logo" class="svg-icon" />
                    <span>View Details</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Accommodations Tab -->
      <div v-if="tab==='accommodations'" class="tab-content">
        <h2 class="section-header">Accommodations</h2>
        <div class="accommodation-grid">
          <div class="accommodation-card" v-for="acc in accommodations" :key="acc.id">
            <img :src="acc.image" alt="acc.name" class="acc-img" />
            <div class="acc-content">
              <div class="acc-name">{{ acc.name }}</div>
              <div class="acc-address">{{ acc.address }}</div>
              <div class="acc-row">
                <div class="acc-price">${{ acc.price }}/night</div>
                <span :class="['badge', acc.status]">{{ acc.status }}</span>
              </div>
              <button class="details-btn acc-detail-btn">
                <img src="@/assets/adminDashboardIcons/viewIcon.svg" alt="logo" class="svg-icon" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bookings Tab -->
      <div v-if="tab==='bookings'" class="tab-content">
        <h2 class="section-header">Booking Management</h2>
        <div class="table-responsive">
          <table class="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Property</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in bookings" :key="booking.id">
                <td>{{ booking.id }}</td>
                <td>{{ booking.guest }}</td>
                <td>{{ booking.property }}</td>
                <td>{{ booking.dates }}</td>
                <td>
                  <span :class="['badge', booking.status]">{{ booking.status }}</span>
                </td>
                <td>${{ booking.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  const tab = ref('users')
  
  const users = [
    { id: 1, avatar: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'Alice', email: 'alice@mail.com', role: 'admin', status: 'active' },
    { id: 2, avatar: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'Bob', email: 'bob@mail.com', role: 'user', status: 'inactive' },
    { id: 3, avatar: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'Charlie', email: 'charlie@mail.com', role: 'manager', status: 'active' },
    { id: 4, avatar: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'David', email: 'david@mail.com', role: 'user', status: 'active' },
  ]
  
  const accommodations = [
    { id: 1, image: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'Sunrise Hotel', address: '123 Beach Ave', price: 120, status: 'approved' },
    { id: 2, image: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'Mountain Resort', address: '456 Hill St', price: 180, status: 'pending' },
    { id: 3, image: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'City Hostel', address: '789 Main Rd', price: 60, status: 'approved' },
    { id: 4, image: 'src/assets/Image/Teams/TranCaoVan.jpg', name: 'Lakeview Inn', address: '321 Lake Rd', price: 90, status: 'approved' },
  ]
  
  const bookings = [
    { id: 'B001', guest: 'Alice', property: 'Sunrise Hotel', dates: '2024-06-01 ~ 2024-06-05', status: 'confirmed', total: 480 },
    { id: 'B002', guest: 'Bob', property: 'Mountain Resort', dates: '2024-06-10 ~ 2024-06-12', status: 'pending', total: 360 },
    { id: 'B003', guest: 'Charlie', property: 'City Hostel', dates: '2024-06-15 ~ 2024-06-16', status: 'completed', total: 60 },
    { id: 'B004', guest: 'David', property: 'Lakeview Inn', dates: '2024-06-20 ~ 2024-06-22', status: 'confirmed', total: 180 },
    { id: 'B005', guest: 'Bob', property: 'Sunrise Hotel', dates: '2024-06-25 ~ 2024-06-27', status: 'completed', total: 240 },
  ]
  
  const statList = computed(() => [
    {
      label: 'Total Users',
      value: users.filter(u => u.role !== 'admin').length,
      icon: 'src/assets/adminDashboardIcons/userIcon.svg'
    },
    {
      label: 'Properties',
      value: accommodations.filter(a => a.status === 'approved').length,
      icon: 'src/assets/adminDashboardIcons/accommodationIcon.svg'
    },
    {
      label: 'Bookings',
      value: bookings.filter(b => b.status === 'completed' || b.status === 'confirmed').length,
      icon: 'src/assets/adminDashboardIcons/bookingIcon.svg'
    },
    {
      label: 'Revenue',
      value: '$' + bookings
        .filter(b => b.status === 'completed' || b.status === 'confirmed')
        .reduce((sum, b) => sum + b.total, 0)
        .toLocaleString(),
        icon: 'src/assets/adminDashboardIcons/revenueIcon.svg'
    }
  ])
  </script>
  
  <style>
  :root {
    --background: #FFFFFF;
    --foreground: #0A0A0A;
    --primary: #171717;
    --secondary: #F5F5F5;
    --muted: #F5F5F5;
    --muted-foreground: #737373;
    --border: #E5E5E5;
    --blue-600: #2563EB;
    --blue-700: #1D4ED8;
    --gray-900: #111827;
    --gray-700: #374151;
    --green-100: #DCFCE7;
    --green-800: #166534;
    --yellow-100: #FEF3C7;
    --yellow-600: #CA8A04;
    --red-100: #FEE2E2;
    --red-600: #DC2626;
  }
  
  .admin-dashboard {
    background: var(--background);
    color: var(--foreground);
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem 1rem;
    border-radius: 2rem;
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    animation: fadeIn 0.7s;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
    animation: fadeIn 0.7s;
  }
  .stat-card {
    background: linear-gradient(120deg, #eef2ff 60%, #f9fafb 100%);
    border-radius: 16px;
    box-shadow: 0 4px 18px rgba(37,99,235,0.10);
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .stat-card:hover {
    box-shadow: 0 8px 32px rgba(37,99,235,0.18);
    transform: translateY(-2px) scale(1.03);
  }
  .stat-icon img {
    width: 40px;
    height: 40px;
    display: block;
    animation: bounceIn 0.8s;
    filter: drop-shadow(0 2px 8px #2563eb33);
  }
  .stat-content {
    text-align: left;
  }
  .stat-label {
    font-size: 1.1rem;
    color: var(--gray-700);
    margin-bottom: 0.3rem;
  }
  .stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--gray-900);
  }
  
  /* Chrome-style Tabs */
  .tabs {
    display: flex;
    align-items: flex-end;
    gap: 0.2rem;
    background: transparent;
    padding-bottom: 0.2rem;
    margin-bottom: 2rem;
    border-bottom: none;
    box-shadow: none;
    background: none;
  }
  
  .tabs button {
    position: relative;
    background: #f3f4f6;
    color: #374151;
    font-weight: 500;
    font-size: 1.08rem;
    padding: 0.7rem 2.2rem 0.7rem 2.2rem;
    cursor: pointer;
    border: none;
    outline: none;
    margin-bottom: 0;
    transition: background 0.2s, color 0.2s;
    z-index: 1;
    clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
    border-radius: 0.7rem 0.7rem 0 0;
    box-shadow: 0 2px 8px rgba(37,99,235,0.04);
  }
  
  .tabs button:not(.active):hover {
    background: #e5e7eb;
    color: #171717;
  }
  
  .tabs button.active {
    background: #2563EB;
    color: #fff;
    z-index: 2;
    box-shadow: 0 4px 16px rgba(37,99,235,0.10);
    border-bottom: none;
    animation: tabPulse 1.2s;
  }
  
  /* Tab Content */
  .tab-content {
    background: var(--secondary);
    border-radius: 1.5rem;
    box-shadow: 0 2px 12px rgba(37,99,235,0.07);
    padding: 2rem;
    margin-bottom: 2rem;
    animation: fadeIn 0.7s;
  }
  
  .section-header {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1.2rem;
    color: var(--gray-900);
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  
  .user-table, .booking-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--background);
    border-radius: 1.2rem;
    box-shadow: 0 2px 12px rgba(37,99,235,0.07);
    overflow: hidden;
    font-size: 1rem;
    animation: fadeIn 0.7s;
  }
  .user-table th, .user-table td,
  .booking-table th, .booking-table td {
    padding: 0.9rem 0.7rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .user-table th, .booking-table th {
    background: var(--secondary);
    font-weight: 600;
    color: var(--gray-700);
    font-size: 1.08rem;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--blue-100);
  }
  .badge {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.97rem;
    font-weight: 600;
    text-transform: capitalize;
    animation: pulseBadge 2s infinite;
    box-shadow: 0 2px 8px rgba(37,99,235,0.07);
  }
  .admin { background: var(--blue-100); color: var(--blue-700);}
  .manager { background: var(--green-100); color: var(--green-800);}
  .user { background: var(--gray-100); color: var(--gray-900);}
  .active, .confirmed, .approved { background: var(--green-100); color: var(--green-800); animation: pulseGreen 1.5s infinite;}
  .inactive, .cancelled, .suspended { background: var(--red-100); color: var(--red-600); animation: pulseRed 1.5s infinite;}
  .pending { background: var(--yellow-100); color: var(--yellow-600); animation: pulseYellow 1.5s infinite;}
  
  /* View Details Button */
  .details-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(90deg, #2563EB 60%, #3B82F6 100%);
    color: #fff;
    border: none;
    border-radius: 1rem;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(37,99,235,0.10);
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  .details-btn:hover {
    background: linear-gradient(90deg, #1E40AF 60%, #2563EB 100%);
    box-shadow: 0 6px 18px rgba(37,99,235,0.18);
    transform: scale(1.05);
  }
  .acc-detail-btn {
    margin-top: 1rem;
    width: fit-content;
  }
  .svg-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  
  /* Accommodation Cards */
  .accommodation-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .accommodation-card {
    background: var(--background);
    border-radius: 2rem;
    box-shadow: 0 2px 12px rgba(37,99,235,0.07);
    margin: 12px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    transition: box-shadow 0.2s, transform 0.2s;
    animation: fadeInUp 0.8s;
  }
  .accommodation-card:hover {
    box-shadow: 0 8px 32px rgba(37,99,235,0.18);
    transform: translateY(-2px) scale(1.03);
  }
  .acc-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 1.2rem 1.2rem 0 0;
  }
  .acc-content {
    width: 100%;
    padding: 1.2rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .acc-name {
    font-weight: 600;
    font-size: 1.15rem;
  }
  .acc-address {
    font-size: 1rem;
    color: var(--gray-700);
    margin-bottom: 0.3rem;
  }
  .acc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
  }
  .acc-price {
    font-weight: 600;
    color: var(--blue-600);
  }
  
  /* Responsive */
  @media (max-width: 1100px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .accommodation-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 700px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    .accommodation-grid {
      grid-template-columns: 1fr;
    }
    .admin-dashboard {
      padding: 1rem 0.2rem;
    }
    .tab-content {
      padding: 1rem;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px);}
    to { opacity: 1; transform: translateY(0);}
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px);}
    to { opacity: 1; transform: translateY(0);}
  }
  @keyframes bounceIn {
    0% { transform: scale(0.7);}
    60% { transform: scale(1.15);}
    100% { transform: scale(1);}
  }
  @keyframes tabPulse {
    0% { box-shadow: 0 0 0 0 #2563eb44;}
    50% { box-shadow: 0 0 12px 6px #2563eb22;}
    100% { box-shadow: 0 0 0 0 #2563eb44;}
  }
  @keyframes pulseBadge {
    0%, 100% { opacity: 1;}
    50% { opacity: 0.85;}
  }
  @keyframes pulseGreen {
    0%, 100% { box-shadow: 0 0 0 0 #22c55e44;}
    50% { box-shadow: 0 0 8px 4px #22c55e22;}
  }
  @keyframes pulseYellow {
    0%, 100% { box-shadow: 0 0 0 0 #eab30844;}
    50% { box-shadow: 0 0 8px 4px #eab30822;}
  }
  @keyframes pulseRed {
    0%, 100% { box-shadow: 0 0 0 0 #dc262644;}
    50% { box-shadow: 0 0 8px 4px #dc262622;}
  }
  </style>